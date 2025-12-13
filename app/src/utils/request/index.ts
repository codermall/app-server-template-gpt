/**
 * 流式请求工具 - 用于处理 NDJSON 格式的流式响应
 */

export interface StreamAskOptions {
  /** 每次收到增量文本时的回调 */
  onDelta?: (delta: string) => void;
  /** 用于取消请求的 AbortSignal */
  signal?: AbortSignal;
}

/**
 * 向 /api/ask 发送流式请求，并逐步解析 NDJSON 格式的响应
 * @param question 用户问题
 * @param options 配置选项
 * @throws 当请求失败或解析出错时抛出错误
 */
export async function streamAsk(
  question: string,
  options: StreamAskOptions = {}
): Promise<void> {
  const { onDelta, signal } = options;

  // 发送 POST 请求
  const response = await fetch('/api/ask', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ question }),
    signal,
  });

  if (!response.ok) {
    throw new Error(`请求失败: ${response.status} ${response.statusText}`);
  }

  // 获取响应流
  const reader = response.body?.getReader();
  if (!reader) {
    throw new Error('响应流为空');
  }

  // 创建文本解码器
  const decoder = new TextDecoder('utf-8');
  let buffer = ''; // 用于处理跨 chunk 的不完整行

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      // 解码当前 chunk 并加入 buffer
      buffer += decoder.decode(value, { stream: true });

      // 按行分割
      const lines = buffer.split('\n');
      
      // 保留最后一段（可能不完整）
      buffer = lines.pop() || '';

      // 处理完整的行
      for (const line of lines) {
        const trimmedLine = line.trim();
        if (!trimmedLine) continue; // 跳过空行

        try {
          const data = JSON.parse(trimmedLine);
          if (data.response && onDelta) {
            onDelta(data.response);
          }
        } catch (e) {
          console.error('JSON 解析失败:', trimmedLine, e);
        }
      }
    }

    // 处理剩余的 buffer（如果有）
    if (buffer.trim()) {
      try {
        const data = JSON.parse(buffer.trim());
        if (data.response && onDelta) {
          onDelta(data.response);
        }
      } catch (e) {
        console.error('JSON 解析失败（剩余 buffer）:', buffer, e);
      }
    }
  } finally {
    reader.releaseLock();
  }
}


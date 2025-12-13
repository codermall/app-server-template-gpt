import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Button, Input, Space, Typography, message } from 'antd';
import { AudioOutlined, PlusOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { streamAsk } from '../../utils/request';

interface Message {
  role: 'user' | 'bot';
  text: string;
}

export const MainSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // 自动滚动到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const question = query.trim();
    if (!question || loading) return;

    // 添加用户消息
    setMessages((prev) => [...prev, { role: 'user', text: question }]);
    setQuery('');
    setLoading(true);

    // 添加 bot 消息占位符
    setMessages((prev) => [...prev, { role: 'bot', text: '' }]);

    // 创建 AbortController
    abortControllerRef.current = new AbortController();

    try {
      await streamAsk(question, {
        signal: abortControllerRef.current.signal,
        onDelta: (delta) => {
          // 增量更新最后一条 bot 消息
          setMessages((prev) => {
            const updated = [...prev];
            const lastIndex = updated.length - 1;
            if (lastIndex >= 0 && updated[lastIndex].role === 'bot') {
              updated[lastIndex] = {
                ...updated[lastIndex],
                text: updated[lastIndex].text + delta,
              };
            }
            return updated;
          });
        },
      });
    } catch (error: unknown) {
      if (error instanceof Error && error.name === 'AbortError') {
        console.log('请求已取消');
      } else {
        console.error('请求失败:', error);
        message.error('请求失败，请稍后重试');
        // 移除空的 bot 消息
        setMessages((prev) => prev.filter((msg) => msg.text !== ''));
      }
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  };

  const canSend = useMemo(() => query.trim().length > 0 && !loading, [query, loading]);

  const inputArea = (
    <>
      <form onSubmit={handleSubmit}>
        <Input
          size="large"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="询问任何问题"
          disabled={loading}
          style={{ borderRadius: 999 }}
          prefix={
            <Button
              type="text"
              icon={<PlusOutlined />}
              aria-label="Add attachment"
              onClick={() => {}}
            />
          }
          suffix={
            <Space size={4}>
              <Button type="text" icon={<AudioOutlined />} aria-label="Voice input" />
              <Button
                type="primary"
                shape="circle"
                icon={<ArrowUpOutlined />}
                htmlType="submit"
                disabled={!canSend}
                aria-label="Send"
              />
            </Space>
          }
        />
      </form>
      <Typography.Text
        type="secondary"
        style={{ textAlign: 'center', display: 'block', marginTop: 8, fontSize: 12 }}
      >
        ChatGPT 可能会犯错。请检查重要信息。
      </Typography.Text>
    </>
  );

  return (
    <div
      style={{
        height: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* 主内容区域 */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* 如果没有消息，显示欢迎界面 */}
        {messages.length === 0 ? (
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 16px',
            }}
          >
            <Space orientation="vertical" size={24} style={{ width: '100%', maxWidth: 720 }}>
              <Typography.Title level={2} style={{ margin: 0, textAlign: 'center' }}>
                今天有什么计划？
              </Typography.Title>
              {inputArea}
            </Space>
          </div>
        ) : (
          /* 消息列表 */
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '24px 16px',
            }}
          >
            <div style={{ maxWidth: 720, margin: '0 auto' }}>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                    marginBottom: 16,
                  }}
                >
                  <div
                    style={{
                      maxWidth: '70%',
                      padding: '10px 14px',
                      borderRadius: 18,
                      backgroundColor: msg.role === 'user' ? '#daf1ff' : '#e6e6e6',
                      color: msg.role === 'user' ? '#333' : '#222',
                      ...(msg.role === 'user'
                        ? { borderBottomRightRadius: 4 }
                        : { borderBottomLeftRadius: 4 }),
                    }}
                  >
                    <div style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>
                      {msg.role === 'user' ? '🧑‍💻 我' : '🤖 模型'}
                    </div>
                    <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                      {msg.text || (loading && msg.role === 'bot' ? '正在思考...' : '')}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
        )}

        {/* 有消息时：输入区域固定在底部 */}
        {messages.length > 0 && (
          <div
            style={{
              padding: '16px',
              borderTop: '1px solid #e8e8e8',
              backgroundColor: '#fff',
            }}
          >
            <div style={{ maxWidth: 720, margin: '0 auto' }}>{inputArea}</div>
          </div>
        )}
      </div>
    </div>
  );
};


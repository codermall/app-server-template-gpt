const embeddingModel = process.env.EMBEDDING_MODEL || 'nomic-embed-text:latest';

export async function getEmbedding(text: string): Promise<number[]> {
  // 调用本地的 nomic-embed-text 模型来做转换
  const res = await fetch("http://localhost:11434/api/embed", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: embeddingModel,
      input: text,
    }),
  });
  const result = (await res.json()) as { embeddings: number[][]};
  /**
   *
    {
      "model": "<string>",
      "embeddings": [
        [
          123
        ]
      ],
      "total_duration": 123,
      "load_duration": 123,
      "prompt_eval_count": 123
    } 
   */
  return result.embeddings[0];
}


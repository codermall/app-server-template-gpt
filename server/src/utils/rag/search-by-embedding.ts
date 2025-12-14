import { getEmbedding } from './embedding'

export async function searchByEmbedding(question: string, vectorDB: { embedding: number[], content: string }[] = [], topK: number = 5) {
  if(vectorDB.length === 0) {
    return []
  }
  // 1. 获取用户问题的向量
  const questionEmbedding = await getEmbedding(question)
  // 2. 计算用户问题的向量与向量数据库中每个向量的余弦相似度
  const similarities = vectorDB.map((chunk) => {
    const score = calculateCosineSimilarity(questionEmbedding, chunk.embedding)
    return {
      ...chunk,
      score,
    }
  })
  // 3. 返回相似度最高的 topK 个向量
  const results = similarities.sort((a: {score: number}, b: {score: number}) => b.score - a.score).slice(0, topK)
  // 4. 返回结果
  return results
}

// 计算余弦相似度
export function calculateCosineSimilarity(vecA: number[], vecB: number[]) {
  const dot = vecA.reduce((sum, val, i) => sum + val * vecB[i], 0);
  const normA = Math.sqrt(vecA.reduce((sum, val) => sum + val * val, 0));
  const normB = Math.sqrt(vecB.reduce((sum, val) => sum + val * val, 0));
  return dot / (normA * normB);
}
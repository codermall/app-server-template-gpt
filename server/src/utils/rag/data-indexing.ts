/**
 * TODO:
 * 1. 获取知识库内容
 * 2. 切分 chunks
 * 3. 向量化
 * 4. 存储到向量数据库
 */

import fs from 'fs'
import { PDFParse } from 'pdf-parse'
import { getEmbedding } from './embedding'
import { EMBEDDING_PATH, KNOWLEDGE_BASE_PATH } from './paths'

async function generateEmbeddings() {
  const pdfBuffer = fs.readFileSync(KNOWLEDGE_BASE_PATH)
  const pdfParse = new PDFParse({data: pdfBuffer})
  // 1. 获取本地知识库内容
  const knowledgeBaseContent =await pdfParse.getText()


  // 2. 切分 chunks
  const chunks = knowledgeBaseContent.text
    .split(/\n\s*\n/)
    .map((chunk, i) => ({
      content: chunk.trim(),
      id: `chunk-${i}`,
    }))
    .filter(p => p.content.length > 20);

  // 3. 向量化
  const withEmbeddings = []
  for(const p of chunks) {
    const embeddings = await getEmbedding(p.content)
    withEmbeddings.push({
      ...p,
      embedding: [...embeddings],
    })
  }

  // 4. 存储到向量数据库，这里就写入到一个 JSON 中
  fs.writeFileSync(EMBEDDING_PATH, JSON.stringify(withEmbeddings, null, 2), 'utf-8')

  console.log('Embeddings generated and saved to:', EMBEDDING_PATH)
  
  return
}

async function loadEmbeddings() {
  if(fs.existsSync(EMBEDDING_PATH)) {
    return JSON.parse(fs.readFileSync(EMBEDDING_PATH, 'utf-8'))
  } else {
    return await generateEmbeddings()
  }
}

loadEmbeddings();
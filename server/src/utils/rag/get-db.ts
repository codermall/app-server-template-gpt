import fs from 'fs'
import { EMBEDDING_PATH } from './paths'

// 获取向量数据库内容
export function getVectorDB() {
  if(fs.existsSync(EMBEDDING_PATH)) {
    return JSON.parse(fs.readFileSync(EMBEDDING_PATH, 'utf-8'))
  } else {
    return []
  }
}
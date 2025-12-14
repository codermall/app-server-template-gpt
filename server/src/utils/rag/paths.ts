import { dirname } from 'path'
import { fileURLToPath } from 'url'
import path from 'path'

export const currentDir = dirname(fileURLToPath(import.meta.url))

export const SERVER_DIR_PATH = path.join(currentDir, '../../..')

export const EMBEDDING_PATH= path.join(SERVER_DIR_PATH, 'embeddings.json')

export const KNOWLEDGE_BASE_PATH= path.join(SERVER_DIR_PATH, '香蕉手机参数配置.pdf')
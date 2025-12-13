# 快速启动指南

## 一键启动

```bash
# 1. 安装依赖（首次运行）
pnpm install

# 2. 并行启动前后端
pnpm dev
```

访问：
- 前端：http://localhost:5173
- 后端 API：http://localhost:4000/api

## 验证

### 后端验证
```bash
curl http://localhost:4000/api/health
```

应返回：
```json
{
  "ok": true,
  "timestamp": "2025-12-13T09:44:34.660Z",
  "uptime": 8.776558917,
  "environment": "development"
}
```

### 前端验证
访问 http://localhost:5173 应该看到：
- ✅ 左侧深色侧边栏（带菜单、项目、聊天历史）
- ✅ 右侧主区域（顶部 Header + 居中搜索框）
- ✅ 大标题："今天有什么计划？"
- ✅ 圆角搜索输入框（可输入、可提交）

## 常用命令

```bash
# 仅启动前端
pnpm dev:app

# 仅启动后端
pnpm dev:server

# 构建所有项目
pnpm build

# 类型检查
pnpm typecheck

# 代码格式化
pnpm format

# Lint 检查
pnpm lint
```

## 端口配置

### 前端端口（默认 5173）
修改 `app/vite.config.ts`:
```typescript
server: {
  port: 5173,  // 改成你想要的端口
  ...
}
```

### 后端端口（默认 4000）
修改 `server/.env`:
```env
PORT=4000  # 改成你想要的端口
```

## 项目结构速览

```
RAG-demo/
├── app/                    # 前端（Vite + React + Tailwind）
│   ├── src/
│   │   ├── layout/        # 布局组件（Sidemenu, Header, MainContent）
│   │   ├── components/    # 业务组件（MainSearch）
│   │   └── App.tsx        # 根组件
│   └── package.json
├── server/                 # 后端（Express + TypeScript）
│   ├── bin/www.ts         # 启动入口
│   ├── src/
│   │   ├── routes/        # API 路由
│   │   ├── middlewares/   # 中间件
│   │   └── app.ts         # Express 配置
│   ├── .env               # 环境变量
│   └── package.json
├── eslint.config.js        # ESLint 配置
├── prettier.config.cjs     # Prettier 配置
└── pnpm-workspace.yaml     # Workspace 配置
```

详细文档请查看 [README.md](./README.md)


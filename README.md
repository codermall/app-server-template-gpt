# RAG-demo

基于 pnpm workspace 管理的全栈项目模板，包含前端（Vite + React + TypeScript + Tailwind）和后端（Express + TypeScript）。

## 项目结构

```
RAG-demo/
├── app/                    # 前端应用
│   ├── src/
│   │   ├── layout/        # 布局组件
│   │   │   ├── components/
│   │   │   │   ├── Sidemenu.tsx
│   │   │   │   ├── Header.tsx
│   │   │   │   └── MainContent.tsx
│   │   │   └── index.tsx
│   │   ├── components/    # 业务组件
│   │   │   └── MainSearch/
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── package.json
├── server/                 # 后端应用
│   ├── bin/
│   │   └── www.ts         # 入口启动文件
│   ├── src/
│   │   ├── routes/        # 路由
│   │   ├── middlewares/   # 中间件
│   │   ├── app.ts         # Express 应用配置
│   │   └── index.ts       # 应用导出
│   ├── .env               # 环境变量
│   └── package.json
├── eslint.config.js        # ESLint 配置（全局）
├── prettier.config.cjs     # Prettier 配置（全局）
├── pnpm-workspace.yaml     # pnpm workspace 配置
└── package.json            # 根配置
```

## 技术栈

### 前端
- **框架**: React 19 + TypeScript
- **构建工具**: Vite 7
- **样式**: Tailwind CSS v4（使用 Vite 插件）
- **开发端口**: 5173

### 后端
- **框架**: Express 4 + TypeScript
- **运行时**: Node.js（使用 tsx watch 开发）
- **环境变量**: dotenv
- **日志**: morgan
- **跨域**: cors
- **开发端口**: 4000

### 开发工具
- **包管理**: pnpm workspace
- **代码规范**: ESLint + Prettier（根目录统一管理）
- **TypeScript**: 5.9.3（共享基础配置）

## 快速开始

### 前置要求
- Node.js >= 18
- pnpm >= 8

### 安装依赖

```bash
# 安装根目录和所有 workspace 依赖
pnpm install
```

### 开发模式

#### 方式 1：并行启动前后端（推荐）
```bash
pnpm dev
```

#### 方式 2：分别启动

```bash
# 终端 1：启动前端（端口 5173）
pnpm dev:app

# 终端 2：启动后端（端口 4000）
pnpm dev:server
```

### 构建

```bash
# 构建所有项目
pnpm build

# 或分别构建
pnpm -C app build
pnpm -C server build
```

### 类型检查

```bash
# 检查所有项目
pnpm typecheck
```

### 代码格式化

```bash
# 格式化所有代码
pnpm format

# 运行 ESLint
pnpm lint
```

## 验收清单

### 前端验收
1. 访问 http://localhost:5173
2. 应该看到类似 ChatGPT 的界面：
   - ✅ 左侧深色侧边栏（包含菜单、项目列表、历史记录、用户信息）
   - ✅ 右侧顶部 Header（标题 "ChatGPT"、下拉按钮、右上角操作按钮）
   - ✅ 主区域居中显示大标题 "今天有什么计划？"
   - ✅ 圆角搜索框（左侧 + 按钮、右侧语音和发送按钮）
3. 在搜索框输入文字，点击发送或按回车，console 会打印查询内容

### 后端验收
1. 确认服务在端口 4000 启动：
```bash
curl http://localhost:4000/api/health
```
2. 应该返回类似以下 JSON：
```json
{
  "ok": true,
  "timestamp": "2025-01-13T10:00:00.000Z",
  "uptime": 123.456,
  "environment": "development"
}
```

### 环境变量验收
1. 确认 `server/.env` 存在且包含：
```env
PORT=4000
NODE_ENV=development
```
2. 修改 PORT 并重启，服务应在新端口运行

### 前后端联调（可选）
前端已配置 Vite proxy，可以在前端代码中调用：
```typescript
fetch('/api/health')
  .then(res => res.json())
  .then(data => console.log(data));
```
请求会自动代理到 `http://localhost:4000/api/health`

## 常见问题

### 端口被占用
如果 5173 或 4000 被占用，可以：
- 前端：修改 `app/vite.config.ts` 中的 `server.port`
- 后端：修改 `server/.env` 中的 `PORT`

### pnpm 安装失败
确保使用 pnpm >= 8：
```bash
pnpm --version
# 如果版本过低，升级 pnpm
npm install -g pnpm@latest
```

### TypeScript 报错
运行类型检查定位问题：
```bash
pnpm typecheck
```

## 后续开发建议

### 前端
1. 在 `app/src/components` 添加业务组件
2. 使用 React Router 添加路由
3. 集成状态管理（Zustand / Redux）
4. 添加 API 请求封装（axios / fetch wrapper）

### 后端
1. 在 `server/src/routes` 添加业务路由
2. 添加数据库连接（Prisma / TypeORM）
3. 实现认证中间件（JWT）
4. 添加请求验证（zod / joi）

## License

ISC


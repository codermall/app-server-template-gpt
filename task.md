# 工程化需求

## 文件路径说明

在本需求文件中，我提供的路径都是基于 pwd ，比如当前这个任务文档的地址我提供给你的就是：task.md

## 需求

1. 该工程是一个由pnpm管理的包含前端应用与服务端应用的项目
2. 前端应用位于 app 中，服务端应用位于 server 中

## 前端工程需求说明

1. 请你在 app 文件夹下生成一个基础前端应用
2. 前端应用使用 Vite + React + Typescript + Tailwindcss
3. 你可以使用 Vite 脚手架生成一个初始的模板，然后基于此再向其内部添加内容
4. 整体的布局请你参考 gpt.png 这个图片资源
5. 整体布局把他拆分为 左右 两栏布局，将他们输出到 app/src/layout 这个文件夹下；app/src/layout 包含一个 index.tsx 和一个 components 文件夹，components 文件夹中包含Sidemenu.tsx 、 MainContent.tsx、Header.tsx，其中 MainContent.tsx 接受 children 子组件，我的内容就要渲染到这里面，在 app/src/layout/index.tsx 中使用这几个组件，然后在 app/src/App.tsx 中使用这个 Layout 组件，内容就是一个搜索框，具体你可以查看 gpt.png 这个图片中的内容，并且请把这个内容组件单独创建一个模块，比如 app/src/components/MainSearch/index.tsx 

## 服务端工程需求说明

1. 请你在 server 下生成一个基础服务端工程
2. 服务端工程要求使用 express、typescript，你可以是基于 express 官方的模板去生成，具备 router、基本的中间件、dotenv 处理等

## 我与你的说明

请你基于我提供给你的这些信息，生成我需要的工程，并且如果你有不理解或者想要去新增某些功能，你可以询问我，让我们一步一步的实现前端与服务端的两个基础工程模板
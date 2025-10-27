# 移动电商示例应用

使用 Vite + React + TypeScript 构建的移动端电商壳应用，内置 Ant Design Mobile 组件库与 Tailwind CSS 工具类样式，方便快速迭代业务功能。

## 技术栈

- [Vite](https://vitejs.dev/) + [React 19](https://react.dev/) + TypeScript
- [Ant Design Mobile](https://mobile.ant.design/) 与 [@ant-design/icons](https://www.npmjs.com/package/@ant-design/icons)
- [Tailwind CSS](https://tailwindcss.com/)（PostCSS + Autoprefixer 处理）
- [React Router](https://reactrouter.com/) 负责页面路由与底部 TabBar 联动
- 自定义 `CartContext`（Context + reducer）管理购物车状态

## 快速开始

```bash
npm install
npm run dev
```

开发服务器默认运行在 `http://localhost:5173`。

## 目录结构

```
.
├── public/                 # 静态资源
├── src/
│   ├── App.tsx             # 顶层路由 & TabBar 布局
│   ├── main.tsx            # 入口文件，挂载路由与 CartProvider
│   ├── index.css           # Tailwind 指令、Antd Mobile reset 及全局样式
│   ├── pages/
│   │   ├── Home/           # 首页及商品相关逻辑
│   │   │   ├── index.tsx   # 热卖商品瀑布流展示
│   │   │   ├── types.ts    # 商品数据接口类型定义
│   │   │   └── useProducts.ts # 可替换的数据获取 Hook（当前返回本地假数据）
│   │   ├── Categories/     # 分类占位页
│   │   ├── Cart/           # 购物车页，展示购物车状态
│   │   └── Profile/        # 我的页占位内容
│   └── state/
│       └── cart/CartContext.tsx # 购物车 Context + reducer + 持久化
├── tailwind.config.cjs     # Tailwind 配置，包含颜色等扩展
├── postcss.config.cjs      # PostCSS 配置
└── README.md
```

## 假数据策略

- `src/pages/Home/useProducts.ts` 中封装了 `useProducts` Hook，内部通过 `fetchProducts` 返回本地数组。
- Hook 暴露 `products / isLoading / error / refresh`，后续替换为真实接口时只需调整 `fetchProducts` 的实现，无需改动组件层。

## 接入真实接口的建议步骤

1. 在 `useProducts.ts` 中将 `fetchProducts` 替换为真正的 `fetch` / `axios` 请求，保持 `Promise<Product[]>` 的返回类型。
2. 在 `CartContext.tsx` 的 `syncWithServer` 中发起购物车同步 API，或根据业务拆分为新增 / 删除等动作。
3. 如果需要鉴权，可在 `Profile` 页面接入登录态并根据 `CartContext` 中的 `clear`/`addItem` 扩展更多操作。
4. 根据接口返回结构调整 `Product` 类型定义，确保组件与类型保持一致。

## 与 Antd Mobile 共存的 Tailwind 配置

- 在 `src/index.css` 顶部通过 `@import 'antd-mobile/dist/reset.css'` 引入官方 Reset，避免 Tailwind Preflight 与 Antd Mobile 样式冲突。
- 同时设置 `:root { --adm-color-primary: #1677ff; }`，确保组件主色与 Tailwind 配置保持一致。

## 脚本

- `npm run dev`：启动开发服务器
- `npm run build`：构建生产版本
- `npm run preview`：预览生产构建
- `npm run lint`：ESLint 检查

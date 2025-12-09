# AI SvelteKit Admin

基于 SvelteKit + TypeScript + Tailwind CSS 的后台管理系统。

## 技术栈

- **框架**: SvelteKit
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **HTTP 客户端**: Axios
- **表单验证**: Zod

## 项目结构

```
src/
├── lib/
│   ├── api/              # API 请求层
│   ├── components/        # 组件
│   │   └── auth/         # 认证相关组件
│   ├── config/           # 配置文件
│   ├── constants/        # 常量定义
│   ├── services/         # 业务服务层
│   ├── stores/           # 状态管理
│   ├── types/            # TypeScript 类型定义
│   └── utils/            # 工具函数
├── routes/               # 路由页面
│   └── (auth)/           # 认证相关路由
└── hooks/                # SvelteKit hooks
```

## 开发

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 构建

```bash
npm run build
```

### 预览构建结果

```bash
npm run preview
```

## 环境变量

创建 `.env` 文件（参考 `.env.example`）：

```env
PUBLIC_API_BASE_URL=http://localhost:3000/api
```

## 功能特性

### 已实现

- ✅ 项目基础架构
- ✅ TypeScript 配置
- ✅ Tailwind CSS 配置
- ✅ HTTP 请求封装（Axios）
- ✅ 工具函数层（storage, validation, format, date, permission, router, file）
- ✅ 类型定义
- ✅ 配置文件
- ✅ 认证 Store 和 Service
- ✅ 认证相关组件（登录、注册、忘记密码、重置密码、验证码）
- ✅ 认证页面路由（左右布局）
- ✅ 路由守卫

### 待实现

- ⏳ shadcn-svelte UI 组件库集成
- ⏳ 布局组件（Header, Sidebar, Breadcrumb）
- ⏳ 菜单管理
- ⏳ 国际化（i18n）
- ⏳ 主题切换
- ⏳ 表单和表格组件封装

## 认证页面

所有认证页面采用左右布局：
- **左侧**: 图片展示区域（渐变背景）
- **右侧**: Logo 和表单信息

### 页面路由

- `/login` - 登录页面
- `/register` - 注册页面
- `/forgot-password` - 忘记密码页面
- `/reset-password` - 重置密码页面（需要 token 参数）

## 开发规范

- 使用 TypeScript 进行类型检查
- 组件使用 PascalCase 命名
- 工具函数使用 camelCase 命名
- Store 文件使用 camelCase 命名

## License

MIT

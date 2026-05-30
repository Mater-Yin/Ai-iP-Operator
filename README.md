# AI IP操盘手

专属于每个创作者的 AI 操盘团队。

通过人格建模、知识沉淀、内容分析、热点匹配和结构化表达，帮助用户持续输出高质量内容。

## 快速开发

```bash
# 前端开发（http://localhost:3000）
npm run dev

# 后端开发（http://localhost:8000）
cd backend
uvicorn app.main:app --reload --port 8000
```

## 桌面版（Electron）

### 开发模式
```bash
npm run dev:electron
```

### 打包为 Windows EXE 安装包
```bash
npm run build:electron
```
输出在 `./release/` 目录下，运行 `AI-IP操盘手-1.0.0-setup.exe` 安装。

## 技术栈

| 层级 | 技术 |
|------|------|
| **前端** | Next.js 16 + TypeScript + TailwindCSS + Shadcn UI |
| **桌面** | Electron + electron-builder |
| **后端** | Python FastAPI + PostgreSQL |
| **AI** | GPT-4o / Claude + 多 Agent 串行工作流 |

## 项目结构

```
ai-ip-operator/
├── electron/              # Electron 桌面端
│   ├── main.js            # 主进程（开发/生产模式）
│   └── preload.js         # 安全预加载脚本
├── src/                   # Next.js 前端
│   ├── app/               # 页面路由
│   │   ├── page.tsx                    # 欢迎页
│   │   ├── onboarding/                # 人格档案（5步引导）
│   │   ├── dashboard/                 # AI操盘中心
│   │   ├── records/                   # 每日记录/录音
│   │   ├── analysis/[id]/             # 内容分析
│   │   ├── skills/                    # Skill推荐
│   │   ├── content/generate/          # 内容生成
│   │   ├── teleprompter/              # 提词器
│   │   └── assets/                    # 内容资产库
│   ├── components/         # 组件
│   │   ├── layout/         # 布局（Sidebar, AI Assistant）
│   │   ├── shared/         # 通用组件
│   │   └── ui/             # Shadcn UI 组件
│   └── types/              # TypeScript 类型定义
├── backend/                # FastAPI 后端
│   └── app/
│       ├── api/v1/         # 27个API端点
│       ├── agents/         # 7个AI Agent
│       ├── models/         # 14张数据库表
│       ├── schemas/        # Pydantic 校验
│       └── core/           # 配置/安全/数据库
└── public/                 # 静态资源
```

## 核心工作流

```
记录 → AI分析 → 热点匹配 → Skill推荐 → 内容生成 → 提词器拍摄 → 归档
```

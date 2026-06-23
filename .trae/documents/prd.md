# UIUX设计师个人作品集网站 PRD

## 1. Concept & Vision 概念与愿景

一个沉浸式、高端、克制的UIUX设计师个人作品集网站。整体风格参考Bruno Simon作品集——以大图片为核心，配合极简文字，营造出画廊般的浏览体验。暗色调搭配绿色点缀，营造科技感与高级感，让访客专注于作品本身，而非花哨的装饰。

**关键词**: 暗色系、大图留白、克制、科技感、高端画廊风

## 2. Design Language 设计语言

### 2.1 Aesthetic Direction 美学方向
- **风格参考**: Bruno Simon作品集 - 画廊式大图展示
- **整体感觉**: 深邃、沉浸、专注、克制、有呼吸感

### 2.2 Color Palette 色彩系统
```
--bg-primary: #0a0a0a        // 主背景 - 近乎纯黑
--bg-secondary: #141414      // 次级背景
--bg-elevated: #1a1a1a       // 提升背景
--text-primary: #ffffff      // 主文字 - 纯白
--text-secondary: #888888    // 次级文字
--text-muted: #555555        // 弱化文字
--accent-primary: #22c55e    // 主强调色 - 品牌绿
--accent-glow: #4ade80       // 发光效果
--border: #2a2a2a            // 边框色
```

### 2.3 Typography 字体系统
- **标题字体**: "Space Grotesk", sans-serif (几何感、现代)
- **正文字体**: "Inter", sans-serif (高可读性)
- **字号层级**:
  - Hero标题: 80-120px, font-weight 700
  - 板块标题: 48-64px, font-weight 600
  - 卡片标题: 24px, font-weight 500
  - 正文: 16px, font-weight 400
  - 辅助文字: 14px, font-weight 400

### 2.4 Spatial System 空间系统
- **内容宽度**: 最大1700px
- **模块间距**: 200px (大区块间隔)
- **组件内边距**: 48-80px
- **网格**: 12列网格，gutter 24px

### 2.5 Motion Philosophy 动效哲学
- **页面加载**: 渐入式揭示，opacity 0→1, 800ms ease-out
- **图片悬停**: scale 1→1.05, 600ms cubic-bezier(0.4, 0, 0.2, 1)
- **文字出现**: translateY 30px→0, opacity 0→1, staggered 100ms
- **滚动触发**: Intersection Observer, 阈值0.2

## 3. Layout & Structure 布局结构

### 3.1 页面结构
```
├── Navbar (固定导航栏，滚动时背景模糊)
├── Hero Section (全屏，背景图+大标题)
├── About Section (大图+简介，图片为主文字为辅)
├── Projects Section (大卡片网格，横向展开)
├── Skills Section (抽象图片展示，3列网格)
├── Contact Section (全屏收尾，大图背景+联系方式)
└── Footer (极简版权信息)
```

### 3.2 Responsive Strategy 响应式策略
- **桌面优先**: 主要为1700px左右的大屏设计
- **平板适配**: 1200px以下调整为2列
- **移动端**: 768px以下调整为单列堆叠

## 4. Features & Interactions 功能与交互

### 4.1 Navbar 导航栏
- 固定在顶部，初始透明
- 滚动超过100px后添加毛玻璃背景
- 包含: Logo、导航链接、联系按钮
- 悬停链接: 下划线动画出现

### 4.2 Hero Section 首屏
- 全屏高度，背景使用生成的抽象科技图片
- 居中大标题 + 副标题
- 向下滚动箭头，持续脉动动画

### 4.3 About Section 关于部分
- 左右分栏布局
- 左侧: 大尺寸人物/工作环境图 (aspect-ratio 4/5)
- 右侧: 大尺寸工作场景图 (aspect-ratio 4/5)
- 极简文字说明

### 4.4 Projects Section 项目展示
- 横向大卡片布局
- 每张卡片: 大图 + 项目名 + 简短描述
- 悬停: 图片放大，叠加绿色光晕
- 卡片尺寸: 高度500px，宽度占满

### 4.5 Skills Section 技能展示
- 三列网格布局
- 每列: 1:1正方形抽象图片
- 图片下方简短文字标签
- 悬停: 图片轻微放大，绿色边框发光

### 4.6 Contact Section 联系方式
- 全屏高度作为收尾
- 两列大图 (工作环境)
- 底部居中联系方式 + 社交链接

### 4.7 Empty/Loading States 空状态与加载
- 图片使用loading占位动画
- 懒加载实现 (Intersection Observer)

## 5. Component Inventory 组件清单

| 组件 | 描述 | 状态 |
|-----|------|-----|
| Navbar | 固定导航栏 | default, scrolled |
| Hero | 全屏首图 | default, loaded |
| About | 关于双图区块 | default |
| ProjectCard | 项目展示卡片 | default, hover |
| SkillImage | 技能展示图片 | default, hover |
| Contact | 联系区块 | default |
| Footer | 页脚 | default |
| ScrollReveal | 滚动动画包装 | hidden, visible |

## 6. Technical Approach 技术方案

### 6.1 技术栈
- **框架**: React 18 + TypeScript
- **构建**: Vite 6.5.0
- **样式**: Tailwind CSS 3
- **图标**: Lucide React
- **动画**: CSS Transitions + Intersection Observer

### 6.2 项目结构
```
src/
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Projects.tsx
│   ├── Skills.tsx
│   ├── Contact.tsx
│   └── Footer.tsx
├── data/
│   └── personalData.ts
├── App.tsx
├── main.tsx
└── index.css
```

### 6.3 图片策略
- 使用AI生成的抽象科技图片作为占位
- 图片尺寸根据容器自适应
- 使用object-fit: cover保持比例

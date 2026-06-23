# 技术架构文档

## 1. 技术栈选择

### 核心框架
- **React 18**: 现代化UI框架，支持Concurrent Features
- **TypeScript**: 类型安全，提高代码质量
- **Vite 6.5.0**: 极速构建工具，优化的开发体验

### 样式方案
- **Tailwind CSS 3**: 原子化CSS，快速实现自定义设计
- **自定义CSS变量**: 实现主题色板和暗色系设计系统

### 依赖库
- **lucide-react**: 图标库，与设计系统风格统一
- **clsx** / **tailwind-merge**: 条件类名合并

## 2. 项目初始化

### 创建命令
```bash
npm create vite@latest . -- --template react-ts
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install lucide-react
```

### Tailwind配置
```javascript
// tailwind.config.js
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#0a0a0a',
          secondary: '#141414',
          elevated: '#1a1a1a',
        },
        text: {
          primary: '#ffffff',
          secondary: '#888888',
          muted: '#555555',
        },
        accent: {
          primary: '#22c55e',
          glow: '#4ade80',
        },
        border: '#2a2a2a',
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      maxWidth: {
        container: '1700px',
      },
    },
  },
  plugins: [],
};
```

## 3. 组件架构

### 3.1 组件层次
```
App
├── Navbar (固定定位，z-50)
├── main
│   ├── Hero (100vh)
│   ├── About (padding-y: 200px)
│   ├── Projects (padding-y: 200px)
│   ├── Skills (padding-y: 200px)
│   └── Contact (100vh 或 min-h-screen)
└── Footer
```

### 3.2 组件接口定义

#### NavbarProps
```typescript
interface NavbarProps {
  links: { label: string; href: string }[];
  contactText: string;
}
```

#### HeroProps
```typescript
interface HeroProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
}
```

#### AboutProps
```typescript
interface AboutProps {
  portraitImage: string;
  workspaceImage: string;
  name: string;
}
```

#### Project {
```typescript
interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
}
```

#### SkillsProps
```typescript
interface Skill {
  id: number;
  title: string;
  image: string;
}
```

#### ContactProps
```typescript
interface ContactProps {
  email: string;
  phone: string;
  location: string;
  socialLinks: { platform: string; url: string }[];
}
```

## 4. 数据管理

### 4.1 个人数据文件
```typescript
// src/data/personalData.ts
export const personalInfo = {
  name: '您的名字',
  title: 'UI/UX Designer',
  email: 'email@example.com',
  phone: '+86 xxx xxxx xxxx',
  location: '中国',
};

export const projects = [
  {
    id: 1,
    title: '项目名称',
    description: '简短描述',
    image: '生成的图片URL',
    tags: ['UI设计', 'UX研究'],
  },
  // ...
];

export const skills = [
  { id: 1, title: '用户研究', image: '图片URL' },
  { id: 2, title: '界面设计', image: '图片URL' },
  { id: 3, title: '交互原型', image: '图片URL' },
];
```

## 5. 动画实现

### 5.1 CSS过渡
- 使用CSS transition属性
- 统一缓动函数: `cubic-bezier(0.4, 0, 0.2, 1)`

### 5.2 滚动动画
```typescript
// 使用Intersection Observer
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.2 }
);
```

### 5.3 动画类
```css
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
```

## 6. 性能优化

### 6.1 图片优化
- 使用AI生成图片作为占位
- 图片懒加载 (loading="lazy")
- 使用aspect-ratio保持布局稳定

### 6.2 代码分割
- Vite自动进行代码分割
- 组件级别懒加载 (如需要)

### 6.3 构建优化
- 生产构建使用 minify + tree-shaking
- CSS purge (Tailwind自动处理)

## 7. 目录结构
```
Personal_website/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Projects.tsx
│   │   ├── Skills.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   ├── data/
│   │   └── personalData.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── postcss.config.js
```

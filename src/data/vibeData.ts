export const vibeDesignSteps = [
  {
    id: 'design-1',
    icon: '01',
    title: '需求分析',
    description: '深入理解业务目标与用户需求，建立清晰的设计方向',
    tools: ['业务访谈', '竞品分析', '需求文档'],
    method: 'KANO模型',
  },
  {
    id: 'design-2',
    icon: '02',
    title: '用户研究',
    description: '通过调研、访谈、数据分析构建用户画像与旅程地图',
    tools: ['问卷调研', '深度访谈', '行为分析'],
    method: 'JTBD理论',
  },
  {
    id: 'design-3',
    icon: '03',
    title: '交互设计',
    description: '设计流畅的用户体验流程与交互原型',
    tools: ['信息架构', '流程图', '低保真原型'],
    method: '卡片分类',
  },
  {
    id: 'design-4',
    icon: '04',
    title: '视觉设计',
    description: '打造品牌一致性的视觉语言与界面设计',
    tools: ['设计系统', '组件库', '高保真设计'],
    method: '原子设计',
  },
  {
    id: 'design-5',
    icon: '05',
    title: '规范搭建',
    description: '建立设计系统、组件库与设计规范文档',
    tools: ['设计规范', '组件标注', '设计token'],
    method: '设计系统架构',
  },
  {
    id: 'design-6',
    icon: '06',
    title: '交付落地',
    description: '设计稿标注、走查验证与跨团队协同交付',
    tools: ['设计标注', '走查报告', '开发协作'],
    method: '敏捷迭代',
  },
];

export const vibeCodeSteps = [
  {
    id: 'code-1',
    icon: '01',
    title: '架构规划',
    description: '技术选型与系统架构设计',
    tools: ['需求拆解', '架构图', '技术方案'],
    tech: ['React', 'Vue', 'Node.js'],
  },
  {
    id: 'code-2',
    icon: '02',
    title: '代码开发',
    description: '模块化开发与代码质量保障',
    tools: ['Git协作', '代码审查', '单元测试'],
    tech: ['TypeScript', 'Webpack', 'Vite'],
  },
  {
    id: 'code-3',
    icon: '03',
    title: '测试验证',
    description: '单元测试与集成测试',
    tools: ['E2E测试', '性能测试', '安全测试'],
    tech: ['Jest', 'Cypress', 'Lighthouse'],
  },
  {
    id: 'code-4',
    icon: '04',
    title: '部署上线',
    description: 'CI/CD 自动化部署流程',
    tools: ['Docker', 'K8s', '自动化部署'],
    tech: ['AWS', 'Vercel', 'GitHub Actions'],
  },
];

export const promptManagementFeatures = [
  {
    id: 'prompt-1',
    icon: '📚',
    title: 'Prompt 模板库',
    description: '分类管理各类场景的提示词模板，支持快速调用',
  },
  {
    id: 'prompt-2',
    icon: '📊',
    title: '版本控制',
    description: '追踪提示词迭代历史，支持回滚与对比分析',
  },
  {
    id: 'prompt-3',
    icon: '🎭',
    title: '多模态设计',
    description: '支持文本、图像、语音等多模态提示词创作',
  },
  {
    id: 'prompt-4',
    icon: '📈',
    title: '效果分析',
    description: '数据分析提示词效果，量化评估生成质量',
  },
  {
    id: 'prompt-5',
    icon: '🧪',
    title: 'A/B 测试',
    description: '多版本提示词对比测试，优化输出效果',
  },
  {
    id: 'prompt-6',
    icon: '🛡️',
    title: '安全审核',
    description: '敏感内容检测与合规性审查机制',
  },
];

export const promptUseCases = [
  'UI设计稿生成',
  '文案内容创作',
  '代码辅助生成',
  '数据分析报告',
  '用户研究分析',
  '产品需求文档',
];
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Send, Bot, User, ChevronRight, ChevronLeft, Check, RefreshCw,
  Layers, Image, Code, Figma, Eye, AlertCircle, TrendingUp, MousePointerClick
} from 'lucide-react';

interface ProcessStep {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  aiTools: string[];
  userPrompt: string;
  aiResponse: string;
  caseStudy: {
    project: string;
    example: string;
  };
  hasVisualization?: boolean;
}

const useTypewriter = (text: string, speed: number = 20, startTyping: boolean = false) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    if (!startTyping) {
      setDisplayText('');
      setIsTyping(false);
      setIsComplete(false);
      indexRef.current = 0;
      return;
    }

    setIsTyping(true);
    setIsComplete(false);
    setDisplayText('');
    indexRef.current = 0;

    const timer = setInterval(() => {
      if (indexRef.current < text.length) {
        setDisplayText(text.slice(0, indexRef.current + 1));
        indexRef.current++;
      } else {
        setIsTyping(false);
        setIsComplete(true);
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed, startTyping]);

  return { displayText, isTyping, isComplete };
};

const DesignCanvas = () => {
  const designs = [
    { id: 1, title: '首页', x: 0, y: 0 },
    { id: 2, title: '咨询页', x: 220, y: -30 },
    { id: 3, title: '3D模型页', x: 440, y: 10 },
    { id: 4, title: '健康档案', x: 100, y: 180 },
    { id: 5, title: '疫苗记录', x: 320, y: 200 },
    { id: 6, title: '个人中心', x: -100, y: 220 },
  ];

  return (
    <div className="relative w-full h-64 overflow-hidden rounded-xl bg-bg-elevated border border-border">
      {/* 画布网格背景 */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle, #333 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      />
      
      {/* Figma 工具栏 */}
      <div className="absolute top-3 left-3 flex gap-1.5 z-10">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
      </div>
      
      <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
        <div className="w-6 h-6 rounded bg-bg-card border border-border flex items-center justify-center">
          <Figma className="w-3 h-3 text-text-muted" />
        </div>
        <span className="text-xs text-text-muted">Figma</span>
      </div>

      {/* 设计稿卡片 */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full" style={{ transform: 'scale(0.7)' }}>
          {designs.map((design, index) => (
            <motion.div
              key={design.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className={`absolute w-36 h-52 rounded-lg bg-bg-card border border-border overflow-hidden`}
              style={{ 
                left: `calc(50% + ${design.x - 180}px)`, 
                top: `calc(50% + ${design.y - 100}px)`,
              }}
            >
              {/* 模拟页面内容 */}
              <div className="p-3">
                <div className="w-full h-2 bg-border rounded-full mb-2" />
                <div className="w-3/4 h-1.5 bg-border/50 rounded-full mb-4" />
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="aspect-square rounded-lg bg-bg-elevated" />
                  <div className="aspect-square rounded-lg bg-bg-elevated" />
                </div>
                <div className="w-full h-8 rounded-lg bg-bg-elevated mb-2" />
                <div className="w-full h-6 rounded-lg bg-accent-primary/20" />
              </div>
              <div className="absolute bottom-2 left-2 right-2">
                <p className="text-xs text-text-muted text-center">{design.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 缩放控制 */}
      <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-bg-card/80 rounded-lg px-2 py-1 border border-border">
        <button className="w-5 h-5 flex items-center justify-center text-text-muted hover:text-text-primary text-xs">−</button>
        <span className="text-xs text-text-muted px-1">50%</span>
        <button className="w-5 h-5 flex items-center justify-center text-text-muted hover:text-text-primary text-xs">+</button>
      </div>
    </div>
  );
};

const ValidateDemo = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [showData, setShowData] = useState(false);

  const pages = [
    { name: '首页' },
    { name: '咨询页' },
    { name: '结果页' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % pages.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [pages.length]);

  useEffect(() => {
    const timer = setTimeout(() => setShowData(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const metrics = [
    { label: '任务完成率', value: '92%', change: '+8%', positive: true },
    { label: '平均耗时', value: '45秒', change: '-12秒', positive: true },
    { label: '点击率', value: '68%', change: '+15%', positive: true },
  ];

  const issues = [
    { severity: 'high', title: '3D模型旋转操作不直观', desc: '用户难以找到旋转入口' },
    { severity: 'medium', title: '症状选择步骤过多', desc: '5步流程容易中途放弃' },
    { severity: 'low', title: '语音输入入口不明显', desc: '仅20%用户发现此功能' },
  ];

  return (
    <div className="space-y-4">
      {/* 页面切换演示 */}
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <p className="text-xs text-text-muted mb-2 flex items-center gap-1.5">
            <Eye className="w-3 h-3" />
            页面流转演示
          </p>
          <div className="relative h-36 rounded-xl bg-bg-elevated border border-border overflow-hidden">
            {/* 网格背景 */}
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: 'radial-gradient(circle, #333 1px, transparent 1px)',
                backgroundSize: '16px 16px'
              }}
            />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, x: 30, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -30, scale: 0.9 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="absolute inset-0 flex flex-col items-center justify-center gap-2"
              >
                {/* 页面缩略图 */}
                <div className="w-20 h-28 rounded-lg bg-bg-card border border-border overflow-hidden">
                  <div className="p-2">
                    <div className="w-full h-1.5 bg-border rounded-full mb-1.5" />
                    <div className="w-3/4 h-1 bg-border/50 rounded-full mb-3" />
                    <div className="grid grid-cols-2 gap-1.5 mb-2">
                      <div className="aspect-square rounded bg-bg-elevated" />
                      <div className="aspect-square rounded bg-bg-elevated" />
                    </div>
                    <div className="w-full h-5 rounded bg-bg-elevated mb-1.5" />
                    <div className="w-full h-4 rounded bg-accent-primary/20" />
                  </div>
                </div>
                {/* 页面名称 */}
                <p className="text-sm font-medium text-text-primary">{pages[currentPage].name}</p>
              </motion.div>
            </AnimatePresence>
            
            {/* 页面指示器 */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
              {pages.map((_, i) => (
                <div
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    i === currentPage ? 'bg-accent-primary' : 'bg-border'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 点击热区指示 */}
        <div className="w-24">
          <p className="text-xs text-text-muted mb-2 flex items-center gap-1.5">
            <MousePointerClick className="w-3 h-3" />
            热区分布
          </p>
          <div className="h-36 rounded-xl bg-bg-elevated border border-border p-2 flex flex-col justify-between">
            {[85, 60, 30].map((height, i) => (
              <div key={i} className="flex items-end gap-1 h-6">
                <div 
                  className="flex-1 rounded-t bg-accent-primary/40"
                  style={{ height: `${height}%` }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 数据指标 */}
      <AnimatePresence>
        {showData && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-3 gap-2"
          >
            {metrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-bg-elevated border border-border rounded-lg p-3"
              >
                <p className="text-xs text-text-muted mb-1">{metric.label}</p>
                <p className="text-lg font-bold text-text-primary">{metric.value}</p>
                <p className={`text-xs ${metric.positive ? 'text-green-400' : 'text-red-400'}`}>
                  {metric.change}
                </p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 可用性问题 */}
      <div>
        <p className="text-xs text-text-muted mb-2 flex items-center gap-1.5">
          <AlertCircle className="w-3 h-3" />
          可用性问题
        </p>
        <div className="space-y-2">
          {issues.map((issue, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="flex items-start gap-3 bg-bg-elevated border border-border rounded-lg p-3"
            >
              <span className={`px-2 py-0.5 rounded text-xs font-medium flex-shrink-0 ${
                issue.severity === 'high' 
                  ? 'bg-red-500/20 text-red-400' 
                  : issue.severity === 'medium'
                  ? 'bg-yellow-500/20 text-yellow-400'
                  : 'bg-blue-500/20 text-blue-400'
              }`}>
                {issue.severity === 'high' ? '高' : issue.severity === 'medium' ? '中' : '低'}
              </span>
              <div>
                <p className="text-sm text-text-primary font-medium">{issue.title}</p>
                <p className="text-xs text-text-muted">{issue.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const DeliverTabs = () => {
  const [activeTab, setActiveTab] = useState<'components' | 'design' | 'code'>('components');

  const tabs = [
    { id: 'components' as const, label: '组件', icon: Layers },
    { id: 'design' as const, label: '设计稿', icon: Image },
    { id: 'code' as const, label: '代码', icon: Code },
  ];

  const components = [
    { name: 'Button', desc: '按钮组件' },
    { name: 'Input', desc: '输入框' },
    { name: 'Card', desc: '卡片组件' },
    { name: 'Modal', desc: '弹窗组件' },
    { name: 'Avatar', desc: '头像组件' },
    { name: 'Badge', desc: '徽章组件' },
  ];

  const codeLines = [
    [{ type: 'comment', text: '// Button 组件' }],
    [{ type: 'keyword', text: 'interface' }, { text: ' ButtonProps {' }],
    [
      { text: '  ' },
      { type: 'property', text: 'variant?' },
      { text: ": 'primary' | 'secondary' | 'ghost';" }
    ],
    [
      { text: '  ' },
      { type: 'property', text: 'size?' },
      { text: ": 'sm' | 'md' | 'lg';" }
    ],
    [
      { text: '  ' },
      { type: 'property', text: 'children' },
      { text: ': ' },
      { type: 'type', text: 'React.ReactNode' },
      { text: ';' }
    ],
    [
      { text: '  ' },
      { type: 'property', text: 'onClick?' },
      { text: ': () => ' },
      { type: 'type', text: 'void' },
      { text: ';' }
    ],
    [{ text: '}' }],
    [{ text: '' }],
    [{ type: 'keyword', text: 'export' }, { type: 'keyword', text: ' const' }, { text: ' Button: ' }, { type: 'type', text: 'FC' }, { text: '<ButtonProps> = ({' }],
    [{ text: '  ' }, { type: 'property', text: 'variant' }, { text: " = 'primary'," }],
    [{ text: '  ' }, { type: 'property', text: 'size' }, { text: " = 'md'," }],
    [{ text: '  ' }, { type: 'property', text: 'children' }, { text: ',' }],
    [{ text: '  ' }, { type: 'property', text: 'onClick' }, { text: ',' }],
    [{ text: '}) => {' }],
    [{ text: '  ' }, { type: 'keyword', text: 'return' }, { text: ' (' }],
    [{ text: '    ' }, { type: 'tag', text: '<button' }],
    [{ text: '      ' }, { type: 'attr', text: 'className' }, { text: '={cn(' }],
    [{ text: '        ' }, { type: 'string', text: 'baseStyles' }, { text: ',' }],
    [{ text: '        ' }, { type: 'string', text: 'variantStyles[variant]' }, { text: ',' }],
    [{ text: '        ' }, { type: 'string', text: 'sizeStyles[size]' }],
    [{ text: '      ' }, { text: ')}' }],
    [{ text: '      ' }, { type: 'attr', text: 'onClick' }, { text: '={onClick}' }],
    [{ text: '    ' }, { text: '>' }],
    [{ text: '      ' }, { text: '{children}' }],
    [{ text: '    ' }, { type: 'tag', text: '</button>' }],
    [{ text: '  ' }, { text: ');' }],
    [{ text: '};' }],
  ];

  const renderCodeLine = (segments: any[], index: number) => {
    return (
      <div key={index} className="leading-5">
        <span className="text-gray-600 select-none mr-4 inline-block w-6 text-right">{(index + 1).toString().padStart(2, ' ')}</span>
        {segments.map((seg, i) => {
          if (seg.type === 'comment') return <span key={i} className="text-gray-500">{seg.text}</span>;
          if (seg.type === 'keyword') return <span key={i} className="text-pink-500">{seg.text}</span>;
          if (seg.type === 'type') return <span key={i} className="text-blue-400">{seg.text}</span>;
          if (seg.type === 'property') return <span key={i} className="text-purple-300">{seg.text}</span>;
          if (seg.type === 'tag') return <span key={i} className="text-red-400">{seg.text}</span>;
          if (seg.type === 'attr') return <span key={i} className="text-green-400">{seg.text}</span>;
          if (seg.type === 'string') return <span key={i} className="text-amber-300">{seg.text}</span>;
          return <span key={i} className="text-gray-200">{seg.text}</span>;
        })}
      </div>
    );
  };

  return (
    <div className="space-y-3">
      {/* 标签页 */}
      <div className="flex gap-1 bg-bg-elevated rounded-lg p-1 border border-border">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm transition-all ${
                activeTab === tab.id
                  ? 'bg-accent-primary/20 text-accent-primary'
                  : 'text-text-muted hover:text-text-secondary'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 内容区 */}
      <div className="min-h-[200px]">
        <AnimatePresence mode="wait">
          {activeTab === 'components' && (
            <motion.div
              key="components"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-3 gap-2"
            >
              {components.map((comp, index) => (
                <motion.div
                  key={comp.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-bg-elevated border border-border rounded-lg p-3 text-center hover:border-accent-primary/30 transition-colors cursor-pointer"
                >
                  <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-accent-primary/10 flex items-center justify-center">
                    <Layers className="w-5 h-5 text-accent-primary" />
                  </div>
                  <p className="text-sm font-medium text-text-primary">{comp.name}</p>
                  <p className="text-xs text-text-muted">{comp.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === 'design' && (
            <motion.div
              key="design"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-4 gap-2"
            >
              {[1, 2, 3, 4].map((item) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: item * 0.08 }}
                  className="aspect-[3/4] rounded-lg bg-bg-card border border-border overflow-hidden"
                >
                  <div className="p-2 h-full flex flex-col">
                    <div className="w-full h-1 bg-border rounded-full mb-1.5" />
                    <div className="w-2/3 h-1 bg-border/50 rounded-full mb-2" />
                    <div className="flex-1 grid grid-cols-2 gap-1">
                      <div className="rounded bg-bg-elevated" />
                      <div className="rounded bg-bg-elevated" />
                    </div>
                    <div className="mt-2 w-full h-4 rounded bg-accent-primary/20" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === 'code' && (
            <motion.div
              key="code"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="bg-[#1d1f21] rounded-lg border border-border overflow-hidden"
            >
              <div className="flex items-center justify-between px-3 py-2 border-b border-border/50 bg-[#1a1c1e]">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                    <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                  </div>
                  <span className="text-xs text-gray-400 ml-2">Button.tsx</span>
                </div>
                <span className="text-xs text-gray-500">TypeScript</span>
              </div>
              <pre className="p-3 text-xs overflow-x-auto font-mono">
                <code>{codeLines.map((line, i) => renderCodeLine(line, i))}</code>
              </pre>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 统计 */}
      <div className="flex items-center justify-around pt-2 border-t border-border">
        <div className="text-center">
          <p className="text-lg font-bold text-accent-primary">120+</p>
          <p className="text-xs text-text-muted">组件数量</p>
        </div>
        <div className="w-px h-8 bg-border" />
        <div className="text-center">
          <p className="text-lg font-bold text-text-primary">50+</p>
          <p className="text-xs text-text-muted">页面设计</p>
        </div>
        <div className="w-px h-8 bg-border" />
        <div className="text-center">
          <p className="text-lg font-bold text-text-primary">80%</p>
          <p className="text-xs text-text-muted">代码生成</p>
        </div>
      </div>
    </div>
  );
};

const DesignProcess = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [showUserMessage, setShowUserMessage] = useState(false);
  const [showAssistantMessage, setShowAssistantMessage] = useState(false);
  const [startTyping, setStartTyping] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const steps: ProcessStep[] = [
    {
      id: 1,
      title: 'Discover',
      subtitle: '发现',
      description: '通过大语言模型深度分析业务场景与用户需求，快速生成行业洞察与研究报告。',
      aiTools: ['GPT-4o', 'Claude 3.5', '通义千问'],
      userPrompt: '帮我分析一下宠物医疗行业的现状和宠物主的核心痛点有哪些？',
      aiResponse: `根据行业数据分析，宠物医疗市场呈现以下趋势：

📊 **市场现状**
- 宠物健康咨询市场年增长率达 35%，市场规模已超 500 亿
- 线上宠物医疗用户规模突破 8000 万
- 78% 宠物主希望获得即时医疗建议

🎯 **核心痛点**
1. **信息获取滞后**：线下问诊受时间地域限制，夜间/周末求医困难
2. **健康数据零散**：疫苗、体重、患病记录缺乏系统性管理
3. **医疗门槛高**：专业术语复杂，用户容易产生焦虑情绪
4. **咨询成本高**：线下挂号费贵，轻度问题也需跑医院

💡 **机会点**
- 24小时在线AI咨询可以填补夜间医疗空白
- 健康数据可视化能提升用户参与度
- 用通俗语言解释医学概念，降低认知门槛`,
      caseStudy: {
        project: 'VetMew 汪喵灵灵',
        example: 'AI 分析了 10 万+ 宠物论坛帖子，提炼出「皮肤问题」「消化问题」「行为异常」三大高频咨询类别，为产品功能规划提供数据支撑。'
      }
    },
    {
      id: 2,
      title: 'Define',
      subtitle: '定义',
      description: '将研究洞察转化为清晰的问题陈述，AI 辅助生成设计目标与用户画像。',
      aiTools: ['GPT-4o', 'Notion AI', '通义千问'],
      userPrompt: '基于以上洞察，帮我定义问题陈述、设计目标和核心用户画像。',
      aiResponse: `🎯 **问题陈述**
宠物主在宠物出现健康问题时，难以获得即时、专业、可负担的医疗咨询服务，导致小问题拖成大问题，同时也让宠物主承受不必要的焦虑。

✨ **设计目标**
1. 打造 24 小时 AI 宠物健康咨询平台
2. 咨询响应时间 < 30 秒
3. 用户满意度 > 4.5 分
4. 覆盖 80% 常见宠物健康问题

👤 **核心用户画像**

「新手宠物主」25-30岁，首次养宠
• 缺乏养宠经验，对健康问题敏感焦虑
• 习惯使用数字化工具解决问题
• 希望获得专业、耐心的指导

「资深铲屎官」30-40岁，养宠3年以上
• 有一定经验，但遇到复杂问题仍需专业意见
• 关注性价比和效率
• 愿意为优质服务付费

「老年宠物家庭」40-55岁，宠物年龄较大
• 宠物慢性病较多，需要长期管理
• 更关注服务的专业性和可靠性
• 对新技术接受度稍低，需要简洁易用的界面`,
      caseStudy: {
        project: 'VetMew 汪喵灵灵',
        example: 'AI 生成了 3 类核心用户画像，并为每类用户定义了典型使用场景和核心诉求，指导后续的功能优先级排序。'
      }
    },
    {
      id: 3,
      title: 'Ideate',
      subtitle: '构思',
      description: 'AI 驱动的创意发散，快速生成多种解决方案和设计方向供评估选择。',
      aiTools: ['GPT-4o', 'Midjourney', 'Stable Diffusion'],
      userPrompt: '针对这个AI宠物健康咨询产品，有哪些可能的产品形态和解决方案？',
      aiResponse: `💡 **方案 A：AI 对话式咨询**
• 核心形态：类似 ChatGPT 的对话界面
• 优势：直观高效，用户学习成本低
• 劣势：缺乏引导，用户可能不知道怎么问
• 适合：有明确问题的用户

🎨 **方案 B：症状自查引导**
• 核心形态：分步式问卷 + 智能诊断
• 优势：精准诊断，引导用户完整描述症状
• 劣势：流程较长，可能失去耐心
• 适合：症状不明确、需要引导的用户

🧬 **方案 C：3D 健康模型**
• 核心形态：3D宠物模型 + 点击部位咨询
• 优势：视觉化呈现，直观有趣
• 劣势：开发成本高，3D性能要求高
• 适合：年轻用户、追求新奇体验的用户

🏆 **推荐组合方案**
「AI对话 + 3D健康模型」
• 默认进入对话界面，降低使用门槛
• 提供 3D 模型作为辅助输入方式
• 既保证专业性又提升趣味性
• 支持用户根据习惯自由切换`,
      caseStudy: {
        project: 'VetMew 汪喵灵灵',
        example: 'AI 生成了 5 种产品形态概念，结合用户偏好调研，最终确定「AI对话 + 3D健康模型」的组合方案。'
      }
    },
    {
      id: 4,
      title: 'Design',
      subtitle: '设计',
      description: '从 Google Stitch 初步构思到 Figma 精细化设计，再到 AI 代码生成，全链路提效。',
      aiTools: ['Google Stitch', 'Figma AI', 'v0.dev', 'GitHub Copilot'],
      userPrompt: '描述一下从原型设计到代码交付的完整设计工作流，每个阶段用什么AI工具？',
      aiResponse: `🎨 **第一阶段：快速构思（Google Stitch）**
• 输入产品描述和核心功能
• AI 快速生成交互原型和线框图
• 快速验证信息架构和用户流程
• 输出：低保真原型、页面流程图

🖌️ **第二阶段：精细设计（Figma + Figma AI）**
• 在 Stitch 原型基础上细化视觉设计
• Figma AI 辅助：
  - 组件自动布局与变体生成
  - 内容填充和图片生成
  - 自动重命名和整理图层
• 建立设计系统和组件库
• 输出：高保真设计稿、设计规范、组件库

⚡ **第三阶段：代码生成（v0.dev）**
• 将 Figma 设计稿导入 v0.dev
• AI 自动生成 React + TypeScript 组件
• 支持 Tailwind CSS 样式
• 可迭代调整细节
• 输出：可运行的前端组件代码

🛠️ **第四阶段：开发集成（GitHub Copilot）**
• 开发者在生成代码基础上补充业务逻辑
• Copilot 辅助编写 API 调用、状态管理
• 自动补全和代码建议
• 输出：完整可交付的产品代码

📈 **效率提升**
传统设计到开发需要 2 周 → AI 辅助仅需 3-5 天，效率提升 3 倍以上`,
      caseStudy: {
        project: 'VetMew 汪喵灵灵',
        example: '使用 Figma AI 批量生成 50+ 页面的组件变体，通过 v0.dev 将核心页面转化为可运行的 React 代码，设计到开发的效率提升 3 倍。'
      },
      hasVisualization: true
    },
    {
      id: 5,
      title: 'Validate',
      subtitle: '验证',
      description: '通过 AI 生成的 Demo 进行智能用户测试，自动分析行为数据与可用性问题。',
      aiTools: ['Maze AI', 'Hotjar AI', 'GPT-4o'],
      userPrompt: '如何用AI工具进行用户测试和可用性验证？具体能做什么？',
      aiResponse: `🧪 **自动化用户测试流程**

📹 **第一步：录制用户行为**
• Hotjar AI 自动录制用户操作录像
• 跟踪点击、滚动、停留时间等行为数据
• 生成热力图和点击分布图
• 自动识别用户困惑的页面区域

📊 **第二步：AI 分析测试数据**
• Maze AI 自动分析测试结果
• 识别可用性问题并按严重程度排序
• 生成任务完成率、时间等量化指标
• 对比不同版本的表现差异

💬 **第三步：AI 访谈分析**
• GPT-4o 分析用户访谈文字稿
• 提取关键观点和反馈主题
• 情感分析：正面/负面/中性评价
• 自动生成用户洞察报告

📈 **VetMew 测试结果示例**
✅ **好的表现**
• 首页信息层级：用户平均 2 秒找到咨询入口
• 咨询流程：完成率 92%，平均耗时 45 秒

⚠️ **待优化问题**
1. 3D 模型旋转操作不直观（严重程度：高）
2. 症状选择步骤过多，用户容易中途放弃（中）
3. 语音输入入口不明显（低）

🎯 **AI 优化建议**
• 简化症状选择步骤，从 5 步减到 3 步
• 增加新手引导动画，演示 3D 模型操作
• 在输入框旁增加语音输入快捷按钮`,
      caseStudy: {
        project: 'VetMew 汪喵灵灵',
        example: 'AI 分析了 200 位用户的测试录像，自动识别出「3D模型旋转操作不直观」等 8 个可用性问题，并按优先级排序，指导第二轮迭代优化。'
      },
      hasVisualization: true
    },
    {
      id: 6,
      title: 'Deliver',
      subtitle: '交付',
      description: '交付完整设计资产：组件库、设计系统、以及 AI 生成的前端代码。',
      aiTools: ['Figma Tokens', 'Storybook AI', 'GitHub Copilot'],
      userPrompt: '最终交付给开发团队的设计资产都包含什么？AI 如何提升交付效率？',
      aiResponse: `📦 **完整设计交付包**

🎨 **设计系统（Design System）**
• 120+ 个可复用组件（按钮、输入框、卡片、弹窗等）
• 完整的 Design Token 体系
  - 颜色系统（主色、功能色、中性色）
  - 字体系统（字号、行高、字重）
  - 间距系统、圆角、阴影、动效规范
• 组件支持多状态、多变体
• 暗黑模式/亮色模式一键切换

📚 **组件库（Component Library）**
• React + TypeScript 技术栈
• Storybook 组件文档
• 每个组件包含：
  - 用法说明和最佳实践
  - 可交互的演示
  - Props API 文档
  -  accessibility 规范
• 支持主题定制
• 完善的单元测试覆盖

⚡ **AI 提效亮点**

**设计侧：**
• Figma Tokens 自动同步设计变量
• AI 自动生成组件文档和使用指南
• 设计规范自动检查，确保一致性

**开发侧：**
• AI 生成 80% 的基础组件代码
• GitHub Copilot 辅助业务逻辑开发
• Storybook AI 自动生成组件用例
• 代码审查 AI 辅助发现问题

📊 **交付成果对比**
传统交付：设计稿 + 标注 → 开发从零写代码
AI 交付：设计系统 + 组件库 + 80% 代码 → 开发专注业务逻辑

整体开发周期缩短 **40%**，设计与开发沟通成本降低 **60%**`,
      caseStudy: {
        project: 'VetMew 汪喵灵灵',
        example: '交付了包含 120+ 组件的设计系统，AI 自动生成 80% 的基础组件代码，开发团队只需专注业务逻辑，整体开发周期缩短 40%。'
      },
      hasVisualization: true
    }
  ];

  const currentStep = steps.find(s => s.id === activeStep) || steps[0];
  const { displayText, isTyping, isComplete } = useTypewriter(currentStep.aiResponse, 15, startTyping);

  const playAnimation = useCallback(() => {
    setShowUserMessage(false);
    setShowAssistantMessage(false);
    setStartTyping(false);
    setIsAnimating(true);

    setTimeout(() => {
      setShowUserMessage(true);
    }, 300);

    setTimeout(() => {
      setShowAssistantMessage(true);
    }, 1200);

    setTimeout(() => {
      setStartTyping(true);
      setIsAnimating(false);
    }, 2000);
  }, []);

  const handleStepClick = (stepId: number) => {
    if (stepId === activeStep || isAnimating) return;
    setActiveStep(stepId);
  };

  useEffect(() => {
    playAnimation();
  }, [activeStep, playAnimation]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.reveal');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [displayText, showUserMessage, showAssistantMessage]);

  const renderVisualization = () => {
    if (!currentStep.hasVisualization) return null;

    return (
      <AnimatePresence>
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-6"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-accent-primary" />
              </div>
              <h4 className="font-heading text-lg font-bold text-text-primary">
                {activeStep === 4 && '设计画布预览'}
                {activeStep === 5 && '验证数据看板'}
                {activeStep === 6 && '交付成果展示'}
              </h4>
            </div>
            <div className="bg-bg-elevated/50 border border-border rounded-2xl p-5">
              {activeStep === 4 && <DesignCanvas />}
              {activeStep === 5 && <ValidateDemo />}
              {activeStep === 6 && <DeliverTabs />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative py-32 bg-bg-secondary overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid opacity-30" />
      
      <div className="max-w-container mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center mb-16">
          <div className="reveal">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-primary/10 text-accent-primary text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              AI 增强设计流程
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-text-primary mb-4">
              My Design <span className="gradient-text">Process</span>
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              融合 AI 工具的智能化设计工作流，从发现到交付，每个环节都有 AI 赋能
            </p>
          </div>
        </div>

        <div className="reveal">
          {/* 步骤导航 */}
          <div className="relative mb-12">
            <div className="hidden md:block">
              <div className="flex">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex-1 flex flex-col items-center relative">
                    {/* 序号圆圈 */}
                    <button
                      onClick={() => handleStepClick(step.id)}
                      className={`group transition-all duration-300 relative z-10 ${
                        activeStep >= step.id ? 'opacity-100' : 'opacity-50'
                      }`}
                    >
                      <div
                        className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                          activeStep === step.id
                            ? 'bg-accent-primary scale-110'
                            : activeStep > step.id
                            ? 'bg-accent-primary/20 border-2 border-accent-primary'
                            : 'bg-bg-card border-2 border-border group-hover:border-accent-primary/50'
                        }`}
                      >
                        {activeStep > step.id ? (
                          <Check className="w-5 h-5 text-accent-primary" />
                        ) : (
                          <span className={`font-numbers text-lg font-bold ${
                            activeStep === step.id ? 'text-bg-primary' : 'text-text-secondary'
                          }`}>
                            {String(step.id).padStart(2, '0')}
                          </span>
                        )}
                      </div>
                    </button>
                    
                    {/* 连接线 - 从当前圆圈右侧到下一个圆圈左侧 */}
                    {index < steps.length - 1 && (
                      <div 
                        className="absolute top-6 md:top-7 h-0.5 bg-border"
                        style={{ left: 'calc(50% + 40px)', width: 'calc(100% - 80px)' }}
                      >
                        {activeStep > step.id && (
                          <div className="h-full bg-accent-primary w-full" />
                        )}
                      </div>
                    )}
                    
                    {/* 步骤文字 */}
                    <div className="text-center mt-2 relative z-10">
                      <p className={`text-sm font-medium transition-colors ${
                        activeStep === step.id ? 'text-accent-primary' : 'text-text-secondary'
                      }`}>
                        {step.subtitle}
                      </p>
                      <p className="text-xs text-text-muted hidden md:block">
                        {step.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-4 md:hidden relative z-10">
              {steps.map((step) => (
                <button
                  key={step.id}
                  onClick={() => handleStepClick(step.id)}
                  className={`flex flex-col items-center group transition-all duration-300 ${
                    activeStep >= step.id ? 'opacity-100' : 'opacity-50'
                  }`}
                >
                  <div
                    className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-300 mb-2 ${
                      activeStep === step.id
                        ? 'bg-accent-primary scale-110'
                        : activeStep > step.id
                        ? 'bg-accent-primary/20 border-2 border-accent-primary'
                        : 'bg-bg-card border-2 border-border group-hover:border-accent-primary/50'
                    }`}
                  >
                    {activeStep > step.id ? (
                      <Check className="w-5 h-5 text-accent-primary" />
                    ) : (
                      <span className={`font-numbers text-lg font-bold ${
                        activeStep === step.id ? 'text-bg-primary' : 'text-text-secondary'
                      }`}>
                        {String(step.id).padStart(2, '0')}
                      </span>
                    )}
                  </div>
                  <div className="text-center">
                    <p className={`text-sm font-medium transition-colors ${
                      activeStep === step.id ? 'text-accent-primary' : 'text-text-secondary'
                    }`}>
                      {step.subtitle}
                    </p>
                    <p className="text-xs text-text-muted hidden md:block">
                      {step.title}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 主内容区 */}
          <div className="grid lg:grid-cols-5 gap-6">
            {/* 左侧：步骤信息 */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-bg-card border border-border rounded-2xl p-6 lg:p-8 h-[320px]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-accent-primary/10 border border-accent-primary/30 flex items-center justify-center">
                    <span className="font-numbers text-xl font-bold text-accent-primary">
                      {String(currentStep.id).padStart(2, '0')}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-heading text-2xl font-bold text-text-primary">
                      {currentStep.title}
                    </h3>
                    <p className="text-accent-primary text-sm">
                      {currentStep.subtitle}
                    </p>
                  </div>
                </div>
                
                <p className="text-text-secondary leading-relaxed mb-6">
                  {currentStep.description}
                </p>

                <div>
                  <p className="text-text-muted text-sm mb-3">AI 工具栈</p>
                  <div className="flex flex-wrap gap-2">
                    {currentStep.aiTools.map((tool, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 rounded-full bg-accent-primary/10 text-accent-primary text-sm border border-accent-primary/20"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* 项目案例 */}
              <div className="bg-bg-elevated rounded-2xl p-6 lg:p-8 border border-border h-[180px]">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-accent-primary" />
                  </div>
                  <h4 className="font-heading text-lg font-bold text-text-primary">
                    项目案例：{currentStep.caseStudy.project}
                  </h4>
                </div>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {currentStep.caseStudy.example}
                </p>
              </div>

              {/* 重播按钮 */}
              <button
                onClick={playAnimation}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-bg-card border border-border text-text-secondary hover:text-accent-primary hover:border-accent-primary/30 transition-all duration-300"
              >
                <RefreshCw className="w-4 h-4" />
                <span>重新播放对话</span>
              </button>
            </div>

            {/* 右侧：AI 对话演示 + 可视化 */}
            <div className="lg:col-span-3">
              <div className="bg-bg-card border border-border rounded-2xl overflow-hidden h-full flex flex-col">
                {/* 聊天头部 */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-bg-elevated/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-accent-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-text-primary">AI 设计助手</p>
                      <p className="text-xs text-text-muted">
                        {isTyping ? '正在输入...' : isComplete ? '回答已完成' : '在线'}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                  </div>
                </div>

                {/* 聊天内容区 */}
                <div
                  ref={chatContainerRef}
                  className="overflow-y-auto p-6 space-y-4"
                  style={{ height: '480px' }}
                >
                  <AnimatePresence>
                    {showUserMessage && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, x: 20 }}
                        animate={{ opacity: 1, y: 0, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex justify-end"
                      >
                        <div className="flex items-start gap-3 max-w-[80%]">
                          <div className="flex-1">
                            <div className="bg-accent-primary text-white rounded-2xl rounded-tr-sm px-5 py-3">
                              <p className="text-sm leading-relaxed">{currentStep.userPrompt}</p>
                            </div>
                          </div>
                          <div className="w-8 h-8 rounded-full bg-bg-elevated border border-border flex-shrink-0 flex items-center justify-center">
                            <User className="w-4 h-4 text-text-secondary" />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    {showAssistantMessage && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, x: -20 }}
                        animate={{ opacity: 1, y: 0, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex justify-start"
                      >
                        <div className="flex items-start gap-3 max-w-[90%]">
                          <div className="w-8 h-8 rounded-full bg-accent-primary/10 border border-accent-primary/20 flex-shrink-0 flex items-center justify-center">
                            <Bot className="w-4 h-4 text-accent-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="bg-bg-elevated border border-border rounded-2xl rounded-tl-sm px-5 py-4">
                              <div className="text-sm text-text-secondary leading-relaxed whitespace-pre-wrap">
                                {displayText}
                                {isTyping && (
                                  <span className="inline-block w-2 h-4 bg-accent-primary ml-1 animate-pulse" />
                                )}
                              </div>
                              
                              {/* 可视化演示区 */}
                              {currentStep.hasVisualization && isComplete && (
                                <motion.div
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.4, delay: 0.2 }}
                                  className="mt-4 pt-4 border-t border-border"
                                >
                                  {renderVisualization()}
                                </motion.div>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 输入框 */}
                <div className="px-6 py-4 border-t border-border bg-bg-elevated/30">
                  <div className="flex items-center gap-3 bg-bg-elevated border border-border rounded-xl px-4 py-3">
                    <input
                      type="text"
                      value={currentStep.userPrompt}
                      disabled
                      className="flex-1 bg-transparent text-sm text-text-primary placeholder-text-muted outline-none"
                      placeholder="输入你的问题..."
                    />
                    <button
                      disabled
                      className="w-9 h-9 rounded-lg bg-accent-primary/20 text-accent-primary flex items-center justify-center hover:bg-accent-primary/30 transition-colors"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-text-muted text-center mt-3">
                    💡 这是一个演示对话，展示 AI 如何辅助设计流程的每个环节
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 底部导航按钮 */}
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={() => handleStepClick(Math.max(1, activeStep - 1))}
              disabled={activeStep === 1}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 ${
                activeStep === 1
                  ? 'opacity-30 cursor-not-allowed text-text-muted'
                  : 'text-text-secondary hover:text-accent-primary hover:bg-accent-primary/10'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              <span>上一步</span>
            </button>

            <div className="flex gap-2">
              {steps.map((step) => (
                <button
                  key={step.id}
                  onClick={() => handleStepClick(step.id)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeStep === step.id
                      ? 'w-8 bg-accent-primary'
                      : 'bg-border hover:bg-text-muted'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => handleStepClick(Math.min(6, activeStep + 1))}
              disabled={activeStep === 6}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 ${
                activeStep === 6
                  ? 'opacity-30 cursor-not-allowed text-text-muted'
                  : 'text-text-secondary hover:text-accent-primary hover:bg-accent-primary/10'
              }`}
            >
              <span>下一步</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DesignProcess;

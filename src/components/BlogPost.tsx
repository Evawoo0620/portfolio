import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Share2, Bookmark } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import SmartHomeAI from './SmartHomeAI';

interface BlogPost {
  id: number;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string;
  tags: string[];
  author: { name: string; avatar: string };
  hasInteractiveDemo?: boolean;
}

const blogPosts: Record<string, BlogPost> = {
  '1': {
    id: 1,
    title: 'AI 产品设计的未来趋势',
    category: 'Design',
    date: '2024-01-15',
    readTime: '8分钟',
    excerpt: '探讨人工智能如何改变产品设计的方式，从自动化设计到智能助手的应用。',
    content: `
## 引言

人工智能正在深刻改变产品设计的方方面面。从设计工具的智能化到用户体验的个性化，AI技术正在重新定义设计师的工作方式和设计产出。

## AI 驱动的设计工具革新

### 自动化设计生成

AI设计工具如Midjourney、DALL-E等已经能够根据文字描述生成高质量的视觉内容。这对设计师来说既是挑战也是机遇：

- **快速原型生成**：设计师可以在几分钟内生成多个设计方案
- **创意灵感拓展**：AI生成的图像可以作为创意起点
- **风格探索**：快速尝试不同的视觉风格和配色方案

### 智能设计助手

设计软件正在集成AI功能，提供实时建议：

- **自动布局优化**：AI分析内容结构，自动调整排版
- **色彩搭配建议**：根据品牌调性推荐配色方案
- **组件自动生成**：根据描述自动创建UI组件

## 用户体验的智能化

### 个性化体验

AI使产品能够提供高度个性化的用户体验：

- **内容推荐**：根据用户行为推荐相关内容
- **界面自适应**：根据用户习惯调整界面布局
- **交互预测**：预测用户下一步操作，提前加载资源

### 智能交互模式

新的交互模式正在出现：

- **自然语言交互**：用户可以用语音或文字与产品对话
- **手势识别**：AI识别用户手势，提供直观操作
- **情感识别**：根据用户表情或行为调整产品响应

## 设计师的角色转变

### 从执行者到策展人

设计师的角色正在从"创建者"转变为"策展人"：

- **筛选和优化**：从AI生成的方案中选择最佳方案
- **品牌一致性把控**：确保AI输出符合品牌标准
- **创意指导**：为AI提供明确的创意方向

### 新技能要求

设计师需要掌握新技能：

- **AI工具使用**：熟练使用各类AI设计工具
- **提示词编写**：学习如何有效地与AI沟通
- **伦理考量**：理解AI设计的伦理边界

## 挑战与机遇

### 需要关注的问题

- **版权与原创性**：AI生成内容的版权归属
- **设计同质化**：过度依赖AI可能导致设计风格趋同
- **伦理边界**：AI设计可能带来的伦理问题

### 发展机遇

- **效率提升**：大幅缩短设计周期
- **创意拓展**：突破传统设计思维局限
- **新服务模式**：提供AI辅助的设计服务

## 结语

AI不是要取代设计师，而是要赋能设计师。未来的产品设计将是人机协作的过程——设计师提供创意方向和审美判断，AI提供执行效率和方案多样性。拥抱AI，设计师将迎来更加广阔的创作空间。
    `,
    tags: ['AI', '产品设计', '用户体验', '未来趋势'],
    author: {
      name: '朱超',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20portrait%20photo%20of%20a%20Chinese%20UX%20designer%20in%20casual%20office%20setting&image_size=square',
    },
  },
  '2': {
    id: 2,
    title: '设计系统搭建指南',
    category: 'System',
    date: '2024-01-10',
    readTime: '12分钟',
    excerpt: '从零开始构建企业级设计系统，包含组件库、设计规范和协作流程。',
    content: `
## 为什么需要设计系统

设计系统是现代产品开发的基础设施。它不仅是一套组件库，更是一种设计理念和协作方式。

### 设计系统的价值

- **一致性**：确保产品体验的视觉和交互一致性
- **效率**：设计师和开发者可以快速复用已有组件
- **可维护性**：统一管理设计资产，便于更新迭代
- **协作效率**：设计语言统一，降低沟通成本

## 设计系统的核心组成

### 1. 设计原则

设计原则是设计系统的灵魂，指导所有设计决策：

- **品牌价值观**：体现品牌的核心价值
- **设计哲学**：如"简洁至上"、"用户中心"
- **具体原则**：如间距规则、层级关系

### 2. 设计规范

规范文档是设计系统的骨架：

- **视觉规范**：色彩、字体、图标、间距
- **布局规范**：栅格系统、页面结构
- **交互规范**：动效、状态、手势
- **文案规范**：语气、用词、格式

### 3. 组件库

组件库是设计系统的工具集：

- **基础组件**：按钮、输入框、卡片等
- **复合组件**：表单、导航、列表等
- **业务组件**：特定业务场景的组件

## 搭建步骤详解

### 第一步：调研与规划

- **需求分析**：梳理现有产品的设计痛点
- **竞品研究**：学习成熟的设计系统案例
- **范围界定**：确定设计系统的覆盖范围

### 第二步：定义设计语言

#### 色彩系统

建立完整的色彩体系：

- **主色**：品牌核心色彩
- **辅助色**：用于强调和区分
- **中性色**：文字、背景、边框
- **语义色**：成功、警告、错误等

#### 字体系统

定义字体规范：

- **字体族**：标题、正文、代码
- **字号阶梯**：从小到大的一套字号
- **字重**：Regular、Medium、Bold等
- **行高**：保证阅读体验

#### 间距系统

使用统一的间距倍数：

- **基础单位**：如4px或8px
- **间距阶梯**：4、8、12、16、24、32等
- **应用场景**：内边距、外边距、元素间距

### 第三步：构建组件库

#### 基础组件优先

先构建高频使用的基础组件：

- Button（按钮）
- Input（输入框）
- Typography（文字排版）
- Icon（图标）
- Layout（布局容器）

#### 组件设计要点

每个组件需要考虑：

- **状态**：默认、悬停、点击、禁用等
- **变体**：不同尺寸、样式变体
- **响应式**：不同屏幕尺寸下的表现
- **无障碍**：符合WCAG标准

### 第四步：文档与协作

#### 组件文档

为每个组件编写详细文档：

- **使用说明**：何时使用、如何使用
- **API说明**：属性、方法、事件
- **示例代码**：实际使用案例
- **设计规范**：视觉和交互规范

#### 协作流程

建立设计与开发协作机制：

- **设计交付**：使用Figma等工具交付设计
- **开发实现**：开发者基于设计实现组件
- **验收流程**：设计验收开发成果
- **迭代更新**：持续优化设计系统

## 维护与迭代

设计系统不是一次性项目，需要持续维护：

- **版本管理**：记录每次变更
- **反馈收集**：听取使用者的反馈
- **定期更新**：根据需求迭代优化
- **推广培训**：确保团队正确使用

## 工具推荐

- **设计工具**：Figma、Sketch
- **文档工具**：Storybook、Notion
- **代码工具**：React、Vue组件库
- **协作工具**：GitHub、GitLab

## 结语

搭建设计系统是一项长期投入，但其回报是巨大的。它不仅能提升团队的效率和产品的质量，还能形成组织的设计资产沉淀。从小处着手，逐步完善，你的设计系统将成为团队最宝贵的工具。
    `,
    tags: ['设计系统', '组件库', '协作流程', '设计规范'],
    author: {
      name: '朱超',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20portrait%20photo%20of%20a%20Chinese%20UX%20designer%20in%20casual%20office%20setting&image_size=square',
    },
  },
  '3': {
    id: 3,
    title: '用户体验研究方法',
    category: 'Research',
    date: '2024-01-05',
    readTime: '10分钟',
    excerpt: '深入了解用户研究的核心方法，包括访谈、可用性测试和数据分析。',
    content: `
## 用户研究的意义

用户研究是产品设计的基础。没有用户研究，设计就是基于猜测而非证据。科学的用户研究能帮助我们：

- **理解用户需求**：发现用户真正的痛点
- **验证设计方向**：在投入开发前验证方案
- **优化产品体验**：发现体验问题并改进

## 用户研究方法分类

### 定性研究

定性研究深入理解用户的行为和心理：

- **用户访谈**：一对一深入了解用户
- **焦点小组**：群体讨论获取多元观点
- **日记研究**：记录用户长期行为
- **观察研究**：实地观察用户行为

### 定量研究

定量研究用数据验证假设：

- **问卷调查**：大规模收集用户反馈
- **数据分析**：分析产品使用数据
- **A/B测试**：对比不同方案效果
- **可用性测试**：量化用户体验指标

## 核心方法详解

### 用户访谈

#### 访谈类型

- **结构化访谈**：固定问题，便于对比
- **半结构化访谈**：有框架但有灵活空间
- **非结构化访谈**：开放式对话

#### 访谈技巧

- **建立信任**：营造轻松的访谈氛围
- **开放提问**：避免引导性问题
- **深入追问**：挖掘用户真实想法
- **记录反馈**：录音或详细笔记

#### 访谈流程

1. **准备阶段**：确定访谈目标、设计问题
2. **招募用户**：选择目标用户群体
3. **执行访谈**：按流程进行访谈
4. **分析整理**：提取关键洞察

### 可用性测试

#### 测试类型

- ** Moderated测试**：有研究员指导
- **Unmoderated测试**：用户独立完成
- **远程测试**：通过网络进行
- **现场测试**：在用户真实环境中进行

#### 测试流程

1. **定义任务**：设计用户要完成的任务
2. **招募参与者**：选择代表性用户
3. **执行测试**：观察用户操作过程
4. **分析结果**：识别问题和改进点

#### 关键指标

- **任务完成率**：用户能否完成任务
- **完成时间**：任务完成所需时间
- **错误率**：用户操作错误次数
- **满意度**：用户主观评价

### 问卷调查

#### 问卷设计原则

- **问题简洁**：避免复杂表述
- **逻辑清晰**：问题顺序合理
- **选项完整**：覆盖可能答案
- **长度适中**：避免问卷过长

#### 常用量表

- **NPS**：净推荐值，衡量用户忠诚度
- **CSAT**：用户满意度
- **CES**：客户费力指数
- **LIKERT**：态度量表

### 数据分析

#### 行为数据分析

- **用户路径**：分析用户行为路径
- **转化漏斗**：识别流失节点
- **留存分析**：分析用户留存情况
- **热力图**：了解用户点击分布

#### 研究整合

将定性定量研究结合：

- **定性发现假设**：通过访谈发现洞察
- **定量验证假设**：通过数据验证假设
- **迭代优化**：持续研究持续改进

## 用户研究流程

### 研究规划

- **明确目标**：研究要解决什么问题
- **选择方法**：根据目标选择合适方法
- **制定计划**：时间、资源、执行方案

### 研究执行

- **准备工具**：访谈大纲、测试任务等
- **招募用户**：找到合适的参与者
- **收集数据**：按计划执行研究

### 研究分析

- **整理数据**：整理访谈笔记、测试数据
- **分析洞察**：提取关键发现
- **形成报告**：撰写研究报告

### 结果应用

- **分享结果**：向团队分享研究发现
- **指导设计**：将洞察转化为设计决策
- **跟踪效果**：验证设计改进效果

## 研究工具推荐

- **访谈工具**：Zoom、腾讯会议
- **问卷工具**：问卷星、Typeform
- **测试工具**：Lookback、UserTesting
- **分析工具**：Google Analytics、Hotjar

## 结语

用户研究是设计师必备的核心技能。掌握多种研究方法，根据不同场景选择合适的方法，才能做出真正以用户为中心的设计。记住，研究不是一次性的，而是持续的过程——产品在不断演进，用户需求也在不断变化。
    `,
    tags: ['用户研究', '可用性测试', '数据分析', '用户访谈'],
    author: {
      name: '朱超',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20portrait%20photo%20of%20a%20Chinese%20UX%20designer%20in%20casual%20office%20setting&image_size=square',
    },
  },
  '4': {
    id: 4,
    title: '数据可视化设计原则',
    category: 'Visual',
    date: '2024-01-01',
    readTime: '6分钟',
    excerpt: '如何将复杂数据转化为清晰直观的可视化图表，提升数据传达效果。',
    content: `
## 数据可视化的价值

数据可视化是将抽象数据转化为视觉形式的过程。好的数据可视化能让复杂信息一目了然，帮助用户快速理解、发现规律、做出决策。

### 核心价值

- **信息传达**：比文字更直观高效
- **规律发现**：揭示数据中的隐藏规律
- **决策支持**：为决策提供清晰依据
- **故事讲述**：用数据讲述有说服力的故事

## 设计原则

### 1. 准确性原则

数据可视化首先要准确：

- **数据真实**：不能扭曲数据事实
- **比例正确**：视觉比例反映真实比例
- **标注清晰**：轴标签、数值标注准确

### 2. 清晰性原则

让用户快速理解信息：

- **重点突出**：核心数据视觉突出
- **层次分明**：信息有清晰的视觉层级
- **去除干扰**：删除不必要的装饰元素

### 3. 简洁性原则

遵循"少即是多"：

- **简化形式**：选择最简洁的表达方式
- **精简元素**：只保留必要的设计元素
- **避免过度**：不添加过多装饰效果

### 4. 一致性原则

保持视觉一致性：

- **色彩一致**：相同含义使用相同颜色
- **样式一致**：同类图表样式统一
- **交互一致**：交互方式保持统一

## 图表类型选择

### 对比类数据

- **柱状图**：适合分类数据对比
- **条形图**：适合长标签的对比
- **雷达图**：多维度对比

### 趋势类数据

- **折线图**：展示时间趋势
- **面积图**：展示趋势和量级
- **阶梯图**：展示离散变化

### 构成类数据

- **饼图**：展示占比构成
- **环形图**：更现代的占比展示
- **堆叠图**：展示多层构成

### 关系类数据

- **散点图**：展示两个变量关系
- **气泡图**：增加第三维度
- **关系图**：展示网络关系

### 分布类数据

- **直方图**：展示数据分布
- **箱线图**：展示分布特征
- **密度图**：展示概率分布

## 设计要点

### 色彩设计

- **语义色彩**：用颜色传达含义（如红表示负面）
- **对比适度**：颜色对比便于区分但不刺眼
- **色盲友好**：考虑色盲用户可识别性
- **品牌一致**：与品牌色彩体系协调

### 排版设计

- **标题醒目**：图表标题清晰醒目
- **标注合理**：轴标签、数值标注位置合理
- **图例清晰**：图例位置便于查看
- **注释必要**：必要注释说明数据来源

### 交互设计

- **悬停提示**：悬停显示详细数据
- **筛选功能**：允许用户筛选数据范围
- **缩放功能**：大数据量时支持缩放查看
- **动画效果**：数据变化时有过渡动画

## 常见问题避免

### 过度装饰

- **避免3D效果**：增加理解难度
- **避免过多装饰**：干扰数据本身
- **避免炫酷效果**：不以传达为目的

### 数据误导

- **截断轴**：不要截断轴夸大差异
- **双Y轴**：谨慎使用双Y轴
- ** cherry-picking**：不要选择性展示数据

### 信息过载

- **数据过多**：一张图不要承载太多数据
- **元素过多**：删除不必要的网格线、背景
- **信息混乱**：确保信息组织有序

## 设计流程

### 理解数据

- **数据特点**：了解数据类型、规模
- **数据含义**：理解数据背后的含义
- **数据关系**：了解数据之间的关系

### 明确目标

- **传达目标**：要传达什么信息
- **用户需求**：用户需要获取什么
- **使用场景**：在什么场景下使用

### 选择图表

- **根据数据**：选择适合数据类型的图表
- **根据目标**：选择能达成目标的图表
- **组合使用**：必要时组合多种图表

### 设计实现

- **原型设计**：先做草图验证方向
- **细节打磨**：色彩、排版、交互细节
- **用户测试**：验证用户理解效果

## 工具推荐

- **设计工具**：Figma、Sketch
- **专业工具**：D3.js、ECharts
- **简易工具**：Tableau、Google Charts
- **BI工具**：Power BI、Looker

## 结语

数据可视化是一门平衡艺术——既要准确传达数据，又要美观易读。掌握基本原则，了解各种图表特点，避免常见错误，你就能做出既美观又有价值的数据可视化。记住，好的数据可视化不是炫技，而是让数据说话。
    `,
    tags: ['数据可视化', '图表设计', '信息设计', '数据传达'],
    author: {
      name: '朱超',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20portrait%20photo%20of%20a%20Chinese%20UX%20designer%20in%20casual%20office%20setting&image_size=square',
    },
  },
  '5': {
    id: 5,
    title: '智能家居 AI Agent',
    category: 'AI',
    date: '2024-02-01',
    readTime: '互动体验',
    excerpt: '探索智能家居 AI Agent 的交互设计，体验智能家庭的未来生活方式。',
    content: `
## 智能家居 AI Agent

智能家居 AI Agent 是下一代智能家庭的核心交互方式。通过自然语言交互和自动化场景控制，AI Agent 能够理解用户意图，自主协调家中各种智能设备，创造舒适、安全、高效的居住体验。

## 核心功能

### 自然语言交互

支持语音和文字两种交互方式：
- **语音助手**：通过语音指令控制所有设备
- **智能对话**：理解复杂的自然语言请求
- **上下文理解**：记住对话上下文，提供连贯的服务

### 场景自动化

预设多种生活场景，一键切换：
- **回家模式**：自动开启灯光、空调，播放欢迎音乐
- **睡眠模式**：关闭所有灯光，调整温度，开启安防
- **晨起模式**：拉开窗帘，启动咖啡机，播报天气
- **观影模式**：调暗灯光，开启电视，关闭其他设备

### 智能感知

AI Agent 能够感知环境变化：
- **环境监测**：温度、湿度、空气质量实时监控
- **行为识别**：通过摄像头和传感器识别用户行为
- **学习能力**：根据用户习惯自动调整设备设置

## 交互设计特点

### 直观的控制界面

设计了清晰直观的设备控制界面：
- **房间分组**：按房间组织设备，一目了然
- **状态可视化**：设备状态实时显示，颜色区分
- **快捷操作**：支持一键控制多个设备

### 渐进式交互

从简单到复杂的交互层次：
- **基础控制**：单个设备开关操作
- **场景控制**：一键执行预设场景
- **智能建议**：AI 根据时间和场景提供建议

## 体验演示

下方是智能家居 AI Agent 的交互演示，你可以：

1. **点击设备卡片**：单独控制每个设备的开关
2. **选择快捷场景**：一键切换整个家居环境
3. **观察状态变化**：设备状态实时更新，能源消耗实时计算

尽情体验智能家居的未来生活方式吧！
    `,
    tags: ['智能家居', 'AI Agent', '交互设计', '物联网'],
    author: {
      name: '朱超',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20portrait%20photo%20of%20a%20Chinese%20UX%20designer%20in%20casual%20office%20setting&image_size=square',
    },
    hasInteractiveDemo: true,
  },
};

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const post = blogPosts[id as keyof typeof blogPosts];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!post) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text-primary mb-4">文章不存在</h1>
          <button onClick={() => navigate('/')} className="btn-primary px-6 py-3 rounded-lg">
            返回首页
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      <Navbar />
      <main className="pt-32 pb-24">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto px-6 lg:px-12 mb-12">
          {/* Back Button */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-text-secondary hover:text-accent-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>返回博客</span>
          </button>

          {/* Category & Meta */}
          <div className="flex items-center gap-4 mb-6">
            <span className="px-4 py-2 rounded-full bg-accent-primary/10 text-accent-primary text-sm font-medium">
              {post.category}
            </span>
            <div className="flex items-center gap-2 text-text-muted text-sm">
              <Calendar className="w-4 h-4" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-2 text-text-muted text-sm">
              <Clock className="w-4 h-4" />
              <span>{post.readTime}阅读</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-text-primary mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Author */}
          <div className="flex items-center gap-4 mb-8">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <div className="text-text-primary font-medium">{post.author.name}</div>
              <div className="text-text-muted text-sm">UX Designer</div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-bg-elevated border border-border hover:border-accent-primary/30 transition-colors">
              <Share2 className="w-4 h-4 text-text-secondary" />
              <span className="text-text-secondary text-sm">分享</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-bg-elevated border border-border hover:border-accent-primary/30 transition-colors">
              <Bookmark className="w-4 h-4 text-text-secondary" />
              <span className="text-text-secondary text-sm">收藏</span>
            </button>
          </div>
        </div>

        {/* Cover Image */}
        <div className="max-w-4xl mx-auto px-6 lg:px-12 mb-12">
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-bg-elevated border border-border">
            <img
              src={`https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${encodeURIComponent(post.title + ' - professional blog illustration minimalist style')}&image_size=landscape_16_9`}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <article className="prose prose-lg prose-invert max-w-none">
            <div className="text-text-secondary leading-relaxed whitespace-pre-wrap">
              {post.content.split('\n').map((line, index) => {
                if (line.startsWith('## ')) {
                  return (
                    <h2 key={index} className="font-heading text-2xl font-bold text-text-primary mt-8 mb-4">
                      {line.replace('## ', '')}
                    </h2>
                  );
                }
                if (line.startsWith('### ')) {
                  return (
                    <h3 key={index} className="font-heading text-xl font-semibold text-text-primary mt-6 mb-3">
                      {line.replace('### ', '')}
                    </h3>
                  );
                }
                if (line.startsWith('- **')) {
                  const parts = line.replace('- **', '').split('**：');
                  return (
                    <li key={index} className="text-text-secondary mb-2 flex items-start gap-2">
                      <span className="text-accent-primary font-medium">{parts[0]}</span>
                      {parts[1] && <span>：{parts[1]}</span>}
                    </li>
                  );
                }
                if (line.startsWith('- ')) {
                  return (
                    <li key={index} className="text-text-secondary mb-2 pl-4">
                      {line.replace('- ', '')}
                    </li>
                  );
                }
                if (line.trim() === '') {
                  return <br key={index} />;
                }
                return (
                  <p key={index} className="text-text-secondary mb-4">
                    {line}
                  </p>
                );
              })}
            </div>
          </article>
        </div>

        {/* Interactive Demo */}
        {post.hasInteractiveDemo && (
          <div className="max-w-4xl mx-auto px-6 lg:px-12 mt-12">
            <SmartHomeAI />
          </div>
        )}

        {/* Tags */}
        <div className="max-w-4xl mx-auto px-6 lg:px-12 mt-12">
          <div className="flex flex-wrap gap-3">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 rounded-full bg-bg-elevated border border-border text-text-secondary text-sm hover:border-accent-primary/30 transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Related Posts */}
        <div className="max-w-4xl mx-auto px-6 lg:px-12 mt-16">
          <h3 className="font-heading text-xl font-bold text-text-primary mb-6">相关文章</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {Object.values(blogPosts)
              .filter((p) => p.id !== post.id)
              .slice(0, 3)
              .map((relatedPost) => (
                <button
                  key={relatedPost.id}
                  onClick={() => navigate(`/blog/${relatedPost.id}`)}
                  className="group bg-bg-card border border-border rounded-xl p-4 hover:border-accent-primary/30 transition-all"
                >
                  <span className="text-xs text-accent-primary font-medium mb-2">{relatedPost.category}</span>
                  <h4 className="text-text-primary font-medium text-sm group-hover:text-accent-primary transition-colors">
                    {relatedPost.title}
                  </h4>
                </button>
              ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
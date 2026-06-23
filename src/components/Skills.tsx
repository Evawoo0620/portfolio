import { useEffect, useRef } from 'react';

const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

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

  const aiTools = [
    { category: '大语言模型', tools: ['ChatGPT', 'Gemini', '豆包', 'DeepSeek'] },
    { category: 'AI 创意', tools: ['Midjourney', 'Tripo 3D', 'Lovart'] },
    { category: 'UI/UX', tools: ['Figma'] },
    { category: '视频输出', tools: ['After Effects', '剪映'] },
  ];

  const capabilities = [
    { title: '设计能力', items: ['用户体验', '视觉设计', '设计系统', '交互设计'] },
    { title: '技术能力', items: ['前端开发', '组件库', '响应式', '性能优化'] },
    { title: 'AI 能力', items: ['AI产品设计', 'Prompt工程', 'AI工具集成', '数据驱动'] },
  ];

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-32 bg-bg-primary"
    >
      <div className="max-w-container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <div className="reveal">
            <span className="inline-block px-4 py-2 rounded-full bg-accent-primary/10 text-accent-primary text-sm font-medium mb-4">
              专业能力
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-text-primary">
              Skills & Expertise
            </h2>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="reveal bg-bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-6">Skills</h3>
            <div className="space-y-4">
              <div>
                <div className="text-xs font-medium mb-2 text-accent-primary">Vibe Design</div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 text-sm rounded-lg bg-accent-primary/10 text-accent-primary">Intent-Driven UX</span>
                  <span className="px-3 py-1.5 text-sm rounded-lg bg-accent-primary/10 text-accent-primary">意图驱动体验设计</span>
                </div>
              </div>
              <div>
                <div className="text-xs font-medium mb-2 text-accent-primary">Context Engineering</div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 text-sm rounded-lg bg-accent-primary/10 text-accent-primary">面向UI生成</span>
                  <span className="px-3 py-1.5 text-sm rounded-lg bg-accent-primary/10 text-accent-primary">上下文工程</span>
                </div>
              </div>
              <div>
                <div className="text-xs font-medium mb-2 text-accent-primary">AI Prototyping</div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 text-sm rounded-lg bg-accent-primary/10 text-accent-primary">全栈原型开发</span>
                  <span className="px-3 py-1.5 text-sm rounded-lg bg-accent-primary/10 text-accent-primary">Vibe Coding</span>
                </div>
              </div>
              <div>
                <div className="text-xs font-medium mb-2 text-accent-primary">Design Systems</div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 text-sm rounded-lg bg-accent-primary/10 text-accent-primary">Design Tokens</span>
                  <span className="px-3 py-1.5 text-sm rounded-lg bg-accent-primary/10 text-accent-primary">DESIGN.md</span>
                  <span className="px-3 py-1.5 text-sm rounded-lg bg-accent-primary/10 text-accent-primary">AI可读设计系统</span>
                </div>
              </div>
            </div>
          </div>

          <div className="reveal stagger-2 bg-bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-6">AI 工具箱</h3>
            <div className="space-y-4">
              {aiTools.map((category, index) => (
                <div key={index}>
                  <div className="text-xs font-medium mb-2 text-accent-primary">
                    {category.category}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.tools.map((tool, toolIndex) => (
                      <span
                        key={toolIndex}
                        className="px-3 py-1.5 text-sm rounded-lg bg-accent-primary/10 text-accent-primary"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="reveal stagger-3">
          <h3 className="text-lg font-semibold text-text-primary mb-6">全栈设计能力</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {capabilities.map((capability, index) => (
              <div key={index} className="bg-bg-card border border-border rounded-xl p-6">
                <div className="w-10 h-10 rounded-lg bg-accent-primary/10 flex items-center justify-center mb-4">
                  {capability.title === '设计能力' && (
                    <svg className="w-5 h-5 text-accent-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 20h9" />
                      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                    </svg>
                  )}
                  {capability.title === '技术能力' && (
                    <svg className="w-5 h-5 text-accent-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="16 18 22 12 16 6" />
                      <polyline points="8 6 2 12 8 18" />
                    </svg>
                  )}
                  {capability.title === 'AI 能力' && (
                    <svg className="w-5 h-5 text-accent-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6l4 2" />
                    </svg>
                  )}
                </div>
                <h4 className="text-text-primary font-semibold mb-4">{capability.title}</h4>
                <div className="grid grid-cols-2 gap-2">
                  {capability.items.map((item, itemIndex) => (
                    <span
                      key={itemIndex}
                      className="px-3 py-1.5 text-sm rounded-lg bg-bg-elevated text-text-secondary"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;

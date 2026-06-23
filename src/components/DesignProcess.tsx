import { useEffect, useRef } from 'react';

const DesignProcess = () => {
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

  const steps = [
    {
      id: 1,
      title: 'Discover',
      subtitle: '发现',
      description: '深入理解业务目标和用户需求，通过研究和分析定义问题。',
      tools: ['业务访谈', '竞品分析', '用户调研'],
    },
    {
      id: 2,
      title: 'Define',
      subtitle: '定义',
      description: '将研究洞察转化为清晰的问题陈述和设计目标。',
      tools: ['需求梳理', '用户画像', '场景分析'],
    },
    {
      id: 3,
      title: 'Ideate',
      subtitle: '构思',
      description: '头脑风暴并探索多种解决方案，寻找最佳设计方向。',
      tools: ['草图绘制', '概念设计', '方案对比'],
    },
    {
      id: 4,
      title: 'Design',
      subtitle: '设计',
      description: '将概念转化为高保真设计，构建完整的用户体验。',
      tools: ['原型设计', '视觉设计', '交互设计'],
    },
    {
      id: 5,
      title: 'Validate',
      subtitle: '验证',
      description: '通过用户测试验证设计方案，收集反馈并迭代优化。',
      tools: ['可用性测试', 'A/B测试', '数据分析'],
    },
    {
      id: 6,
      title: 'Launch',
      subtitle: '上线',
      description: '交付设计资产，支持开发团队实现产品落地。',
      tools: ['设计标注', '组件交付', '走查验收'],
    },
  ];

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative py-32 bg-bg-secondary"
    >
      <div className="max-w-container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <div className="reveal">
            <span className="inline-block px-4 py-2 rounded-full bg-accent-primary/10 text-accent-primary text-sm font-medium mb-4">
              设计流程
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-text-primary">
              My Design Process
            </h2>
          </div>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent-primary/20 to-transparent -translate-y-1/2" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-6">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className="reveal group relative"
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="relative bg-bg-card border border-border rounded-xl p-6 hover:border-accent-primary/30 transition-all duration-300 h-full">
                  <div className="absolute -top-4 left-6 lg:-top-6">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-accent-primary/10 border border-accent-primary/30 flex items-center justify-center group-hover:bg-accent-primary/20 transition-colors">
                      <span className="font-numbers text-xl lg:text-2xl font-bold text-accent-primary">
                        {String(step.id).padStart(2, '0')}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 lg:mt-8">
                    <h3 className="font-heading text-xl lg:text-2xl font-bold text-text-primary mb-1">
                      {step.title}
                    </h3>
                    <p className="text-accent-primary text-sm mb-4">
                      {step.subtitle}
                    </p>
                    <p className="text-text-secondary text-sm leading-relaxed mb-6">
                      {step.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {step.tools.map((tool, toolIndex) => (
                        <span
                          key={toolIndex}
                          className="px-3 py-1 rounded-full bg-bg-elevated text-text-muted text-xs"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DesignProcess;

import { useEffect, useRef, useState } from 'react';
import {
  vibeDesignSteps,
  vibeCodeSteps,
  promptManagementFeatures,
  promptUseCases,
} from '../data/vibeData';

export default function VibeWorkflow() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number>(0);

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

    const revealElements = sectionRef.current?.querySelectorAll('.reveal');
    revealElements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const modules = [
    {
      id: 'design',
      title: 'VibeDesign',
      subtitle: '设计驱动工作流',
      icon: (
        <svg className="w-6 h-6 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      steps: vibeDesignSteps,
      renderStep: (item: typeof vibeDesignSteps[0]) => (
        <>
          <div className="flex items-center gap-3 mb-2">
            <h4 className="text-text-primary font-semibold text-base truncate">
              {item.title}
            </h4>
            <span className="px-2 py-0.5 rounded bg-accent-primary/10 text-accent-primary text-xs flex-shrink-0">
              {item.method}
            </span>
          </div>
          <p className="text-text-secondary text-sm mb-3">
            {item.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {item.tools?.map((tool, toolIndex) => (
              <span
                key={toolIndex}
                className="px-2 py-1 rounded bg-bg-elevated text-text-muted text-xs"
              >
                {tool}
              </span>
            ))}
          </div>
        </>
      ),
    },
    {
      id: 'coding',
      title: 'VibeCoding',
      subtitle: '工程化开发流程',
      icon: (
        <svg className="w-6 h-6 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      steps: vibeCodeSteps,
      renderStep: (item: typeof vibeCodeSteps[0]) => (
        <>
          <h4 className="text-text-primary font-semibold text-base mb-2">
            {item.title}
          </h4>
          <p className="text-text-secondary text-sm mb-3">
            {item.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-2">
            {item.tools?.map((tool, toolIndex) => (
              <span
                key={toolIndex}
                className="px-2 py-1 rounded bg-bg-elevated text-text-muted text-xs"
              >
                {tool}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-1">
            {item.tech?.map((tech, techIndex) => (
              <span
                key={techIndex}
                className="px-2 py-0.5 rounded bg-accent-primary/10 text-accent-primary text-xs"
              >
                {tech}
              </span>
            ))}
          </div>
        </>
      ),
    },
    {
      id: 'prompt',
      title: 'Prompt 管理',
      subtitle: 'AI 提示词系统',
      icon: (
        <svg className="w-6 h-6 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      steps: promptManagementFeatures,
      renderStep: (item: typeof promptManagementFeatures[0]) => (
        <>
          <h4 className="text-text-primary font-semibold text-base mb-2">
            {item.title}
          </h4>
          <p className="text-text-secondary text-sm">
            {item.description}
          </p>
        </>
      ),
      useCases: promptUseCases,
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="vibe-workflow"
      className="py-32 md:py-48 bg-bg-primary"
    >
      <div className="max-w-container mx-auto px-8">
        {/* Section Title */}
        <div className="reveal text-center mb-16">
          <p className="text-accent-primary text-lg mb-4">工作方法</p>
          <h2 className="font-heading font-semibold text-4xl md:text-5xl lg:text-6xl mb-8">
            VibeDesign & VibeCoding
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            融合设计思维与工程能力，打造从创意到落地的完整工作流
          </p>
        </div>

        {/* Accordion Modules */}
        <div className="space-y-0">
          {modules.map((module, moduleIndex) => (
            <div
              key={module.id}
              className="border-b border-border/50 last:border-b-0"
            >
              {/* Header */}
              <button
                onClick={() => setOpenIndex(openIndex === moduleIndex ? -1 : moduleIndex)}
                className="w-full flex items-center justify-between p-6 hover:bg-bg-elevated/30 transition-colors text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-accent-primary/10 flex items-center justify-center flex-shrink-0">
                    {module.icon}
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-2xl md:text-3xl text-text-primary">
                      {module.title}
                    </h3>
                    <p className="text-text-secondary text-xs">{module.subtitle}</p>
                  </div>
                </div>
                
                {/* Arrow */}
                <div className="flex items-center gap-3">
                  <span className="text-text-muted text-sm">
                    {module.steps.length} 个步骤
                  </span>
                  <svg
                    className={`w-5 h-5 text-text-secondary transition-transform duration-300 flex-shrink-0 ${
                      openIndex === moduleIndex ? '' : 'rotate-180'
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                </div>
              </button>

              {/* Content */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === moduleIndex ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-6">
                  <div className="space-y-0 ml-14">
                    {module.steps.map((item, index) => (
                      <div
                        key={typeof item === 'string' ? item : (item as any).id}
                        className="flex items-start gap-3 py-6 border-b border-border last:border-b-0 hover:bg-bg-elevated/20 transition-colors"
                      >
                        <span className="text-accent-primary font-heading text-2xl font-bold flex-shrink-0 w-8">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <div className="flex-1 min-w-0">
                          {module.renderStep(item as any)}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Use Cases for Prompt Module */}
                  {module.useCases && (
                    <div className="mt-6 pt-6 border-t border-border ml-14">
                      <h4 className="text-text-primary font-medium text-sm mb-3">应用场景</h4>
                      <div className="flex flex-wrap gap-2">
                        {module.useCases.slice(0, 6).map((useCase, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 rounded-full bg-accent-primary/10 text-accent-primary text-xs"
                          >
                            {useCase}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
import { useEffect, useRef } from 'react';

const Hero = () => {
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

  const stats = [
    { value: '8+', label: '年设计经验' },
    { value: '50+', label: '交付项目' },
    { value: '6', label: '行业覆盖' },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-bg-primary"
    >
      <div className="bg-grid absolute inset-0 opacity-30" />
      
      <div className="absolute inset-0 bg-gradient-to-b from-accent-primary/5 via-transparent to-transparent" />

      <div className="relative z-10 max-w-container mx-auto px-6 lg:px-12 py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-12">
            <div className="reveal">
              <span className="inline-block px-4 py-2 rounded-full bg-accent-primary/10 text-accent-primary text-sm font-medium mb-8">
                AI 产品设计师 | 数字体验专家
              </span>
            </div>

            <h1 className="reveal stagger-1 font-heading text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.2] tracking-tight">
              <span className="block text-text-primary mb-2">Designing</span>
              <span className="block gradient-text mb-2">AI Products,</span>
              <span className="block text-text-primary mb-2">Digital</span>
              <span className="block gradient-text mb-2">Experiences,</span>
              <span className="block text-text-primary mb-2">and</span>
              <span className="block gradient-text">Future Interfaces.</span>
            </h1>

            <p className="reveal stagger-2 text-text-secondary text-lg md:text-xl max-w-xl leading-loose mt-10">
              我相信设计的力量，将复杂的AI技术转化为优雅、直观且具有商业价值的产品体验。
            </p>

            <div className="reveal stagger-3 flex flex-wrap gap-4 mt-12">
              <a 
                href="https://drive.google.com/uc?export=download&id=1et82pKktvsRWOJ_YDIexVRMJKKgpW95B" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-primary px-8 py-4 rounded-lg text-lg inline-block"
              >
                查看作品集
              </a>
              <a 
                href="https://drive.google.com/file/d/1Snx5h1DA0e1bT9xtJ971_4bkNNd0teWf/view?usp=drive_link" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-secondary px-8 py-4 rounded-lg text-lg inline-block"
              >
                下载简历
              </a>
            </div>

            <div className="reveal stagger-4 grid grid-cols-5 gap-6 md:gap-10 mt-16">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="font-numbers text-2xl md:text-3xl lg:text-4xl font-bold text-accent-primary">
                    {stat.value}
                  </div>
                  <div className="text-text-muted text-sm md:text-base mt-2">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative reveal stagger-3">
            <div className="relative w-full aspect-square">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/20 via-accent-cyan/20 to-accent-pink/20 rounded-full blur-3xl" />
              
              <div className="absolute top-10 right-10 w-48 h-64 bg-bg-card border border-accent-cyan/30 rounded-xl p-3 animate-float">
                <div className="w-full h-full bg-gradient-to-br from-accent-cyan/10 to-transparent rounded-lg flex flex-col p-3">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 bg-accent-cyan/40 rounded w-3/4" />
                    <div className="h-2 bg-accent-cyan/30 rounded w-full" />
                    <div className="h-2 bg-accent-cyan/40 rounded w-1/2" />
                  </div>
                </div>
              </div>

              <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-48 bg-bg-card border border-accent-purple/30 rounded-xl p-3 animate-float-delayed">
                <div className="w-full h-full bg-gradient-to-br from-accent-purple/10 to-transparent rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-text-secondary text-sm">Dashboard</span>
                    <span className="text-accent-purple text-xs">Live</span>
                  </div>
                  <div className="h-24 flex items-end gap-1">
                    {[40, 60, 45, 80, 65, 90, 70].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-accent-purple/40 rounded-t"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-56 h-72 bg-bg-card border border-accent-pink/30 rounded-xl p-3 animate-float">
                <div className="w-full h-full bg-gradient-to-br from-accent-pink/10 to-transparent rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-text-secondary text-xs">Analytics</span>
                    <div className="w-6 h-6 rounded-full bg-accent-pink/20 flex items-center justify-center">
                      <svg className="w-3 h-3 text-accent-pink" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-text-muted text-xs">Users</span>
                      <span className="text-text-primary text-sm font-medium">1.2K</span>
                    </div>
                    <div className="w-full h-1.5 bg-bg-elevated rounded-full overflow-hidden">
                      <div className="h-full w-3/4 bg-accent-pink rounded-full" />
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted text-xs">Revenue</span>
                      <span className="text-text-primary text-sm font-medium">$45K</span>
                    </div>
                    <div className="w-full h-1.5 bg-bg-elevated rounded-full overflow-hidden">
                      <div className="h-full w-5/6 bg-accent-pink rounded-full" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-20 right-0 w-44 h-44 bg-bg-card border border-accent-orange/30 rounded-xl p-3 animate-float-delayed">
                <div className="w-full h-full bg-gradient-to-br from-accent-orange/10 to-transparent rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-accent-orange/20 flex items-center justify-center">
                      <svg className="w-6 h-6 text-accent-orange" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M8 15s1.5-2 4-2 4 2 4 2" />
                        <circle cx="12" cy="9" r="3" />
                      </svg>
                    </div>
                    <span className="text-text-secondary text-xs">AI Assistant</span>
                  </div>
                </div>
              </div>

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 rounded-full bg-gradient-to-br from-accent-purple/10 via-accent-cyan/10 to-accent-pink/10 flex items-center justify-center">
                  <div className="w-48 h-48 rounded-full border border-accent-cyan/30 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-accent-cyan/30 via-accent-purple/30 to-accent-pink/30 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">AI</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

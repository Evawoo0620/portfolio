import { useEffect, useRef } from 'react';

const About = () => {
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

  const tags = [
    'AI Product Design',
    'UX Strategy',
    'UI Design',
    'Design System',
    'User Research',
    'Data Visualization',
    'Vibe Coding',
    'Design Thinking',
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-32 bg-bg-secondary"
    >
      <div className="max-w-container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-5 gap-16">
          <div className="lg:col-span-2 reveal">
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden">
              <img
                src="/portfolio/assets/avatar.png" loading="lazy"
                alt="朱超 - AI产品设计师"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-3 space-y-8">
            <div className="reveal">
              <span className="inline-block px-4 py-2 rounded-full bg-accent-primary/10 text-accent-primary text-sm font-medium mb-4">
                关于我
              </span>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-text-primary">
                八年深耕<br />
                <span className="gradient-text">数字产品设计</span>
              </h2>
            </div>

            <div className="reveal stagger-1 space-y-4">
              <p className="text-text-secondary text-lg leading-relaxed">
                我是一名专注于 AI 产品的设计师，在数字产品设计领域拥有八年经验。
                擅长将复杂的技术转化为直观、优雅的用户体验，帮助企业打造具有竞争力的产品。
              </p>
              <p className="text-text-secondary text-lg leading-relaxed">
                我相信设计不仅仅是视觉上的美感，更是解决问题、创造价值的过程。
                通过深入理解用户需求和业务目标，我致力于创造既美观又实用的数字产品。
              </p>
            </div>

            <div className="reveal stagger-2">
              <div className="flex flex-wrap gap-3">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 rounded-lg bg-bg-card border border-border text-text-secondary text-sm hover:border-accent-primary/50 hover:text-accent-primary transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="reveal stagger-3 grid grid-cols-3 gap-6">
              <div className="text-center p-6 rounded-xl bg-bg-card border border-border">
                <div className="font-numbers text-4xl font-bold text-accent-primary mb-2">8+</div>
                <div className="text-text-muted">年经验</div>
              </div>
              <div className="text-center p-6 rounded-xl bg-bg-card border border-border">
                <div className="font-numbers text-4xl font-bold text-accent-primary mb-2">50+</div>
                <div className="text-text-muted">项目交付</div>
              </div>
              <div className="text-center p-6 rounded-xl bg-bg-card border border-border">
                <div className="font-numbers text-4xl font-bold text-accent-primary mb-2">6</div>
                <div className="text-text-muted">行业覆盖</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

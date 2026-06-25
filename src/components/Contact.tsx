import { useEffect, useRef } from 'react';

const Contact = () => {
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

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-32 bg-bg-secondary overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-t from-accent-primary/10 to-transparent" />
      </div>

      <div className="max-w-container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="reveal">
            <span className="inline-block px-4 py-2 rounded-full bg-accent-primary/10 text-accent-primary text-sm font-medium mb-6">
              联系我
            </span>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6">
              Let's Build Something
              <br />
              <span className="gradient-text">Great Together</span>
            </h2>
            <p className="text-text-secondary text-lg md:text-xl mb-10">
              我很期待与您讨论您的项目需求。无论是产品设计、用户体验还是品牌设计，我都能提供专业的解决方案。
            </p>
          </div>

          <div className="reveal stagger-1 mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-bg-card border border-border rounded-xl p-6">
              <div className="w-12 h-12 rounded-lg bg-accent-primary/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-accent-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <h4 className="text-text-primary font-semibold mb-2">邮箱</h4>
              <p className="text-text-muted">zhuchaotcl@sina.com</p>
            </div>

            <div className="bg-bg-card border border-border rounded-xl p-6">
              <div className="w-12 h-12 rounded-lg bg-accent-primary/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-accent-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <h4 className="text-text-primary font-semibold mb-2">电话</h4>
              <p className="text-text-muted">+86 186 8221 7772</p>
            </div>

            <div className="bg-bg-card border border-border rounded-xl p-6">
              <div className="w-12 h-12 rounded-lg bg-accent-primary/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-accent-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <h4 className="text-text-primary font-semibold mb-2">地址</h4>
              <p className="text-text-muted">深圳市</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

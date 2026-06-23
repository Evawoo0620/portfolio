import { useEffect, useRef } from 'react';

const Testimonials = () => {
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

  const testimonials = [
    {
      id: 1,
      content: '朱超的设计能力非常出色，他不仅有扎实的视觉设计功底，更重要的是他能深入理解业务需求，提供创新的解决方案。',
      author: '张伟',
      title: '产品总监',
      company: '某科技公司',
      avatar: 'Z',
    },
    {
      id: 2,
      content: '在我们的AI产品设计项目中，朱超展现了出色的专业素养和团队协作能力。他的设计方案大大提升了用户体验和产品转化率。',
      author: '李娜',
      title: 'CEO',
      company: 'AI创业公司',
      avatar: 'L',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-32 bg-bg-secondary"
    >
      <div className="max-w-container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <div className="reveal">
            <span className="inline-block px-4 py-2 rounded-full bg-accent-primary/10 text-accent-primary text-sm font-medium mb-4">
              用户评价
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-text-primary">
              What People Say
            </h2>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="reveal bg-bg-card border border-border rounded-xl p-8 hover:border-accent-primary/30 transition-all"
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center gap-2 mb-6">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-accent-primary fill-accent-primary" viewBox="0 0 24 24">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>

              <p className="text-text-secondary text-lg leading-relaxed mb-8">
                "{testimonial.content}"
              </p>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-accent-primary/20 flex items-center justify-center">
                  <span className="text-accent-primary font-bold text-xl">
                    {testimonial.avatar}
                  </span>
                </div>
                <div>
                  <div className="text-text-primary font-semibold">{testimonial.author}</div>
                  <div className="text-text-muted text-sm">
                    {testimonial.title} @ {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

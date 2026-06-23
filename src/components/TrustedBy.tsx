import { useEffect, useRef } from 'react';

const TrustedBy = () => {
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

  const brands = [
    { name: 'Baidu', logo: 'BD' },
    { name: 'Tencent', logo: 'T' },
    { name: 'Huawei', logo: 'HW' },
    { name: 'Alibaba', logo: 'AB' },
    { name: 'JD', logo: 'JD' },
    { name: 'Meituan', logo: 'MT' },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-24 bg-bg-primary"
    >
      <div className="max-w-container mx-auto px-6 lg:px-12">
        <div className="text-center mb-12">
          <div className="reveal">
            <h3 className="font-heading text-xl font-semibold text-text-muted">
              Trusted By
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="reveal flex flex-col items-center justify-center p-6"
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 rounded-xl bg-bg-card border border-border flex items-center justify-center mb-4 hover:border-accent-primary/30 transition-colors">
                <span className="text-text-muted font-bold text-xl">{brand.logo}</span>
              </div>
              <span className="text-text-muted text-sm">{brand.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;

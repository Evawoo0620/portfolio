import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../data/personalData';

const SelectedWorks = () => {
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
      id="works"
      ref={sectionRef}
      className="relative py-32 bg-bg-primary"
    >
      <div className="max-w-container mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div className="reveal">
            <span className="inline-block px-4 py-2 rounded-full bg-accent-primary/10 text-accent-primary text-sm font-medium mb-4">
              精选作品
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-text-primary">
              Selected Works
            </h2>
          </div>
          <div className="reveal stagger-1 mt-6 md:mt-0">
            <button className="btn-secondary px-6 py-3 rounded-lg">
              查看全部作品
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Link
              key={project.id}
              to={`/project/${project.id}`}
              className={`reveal group block`}
              style={{ transitionDelay: `${(index % 2) * 0.1}s` }}
            >
              <div className="relative rounded-xl overflow-hidden bg-bg-card border border-border hover:border-accent-primary/30 transition-all duration-500">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-transparent to-transparent" />
                </div>
                
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-accent-primary/90 text-white text-xs font-medium">
                    {project.category}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="text-text-primary font-semibold text-xl mb-2 group-hover:text-accent-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-text-muted text-sm mb-4">{project.subtitle}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 rounded-full bg-bg-elevated/80 text-text-muted text-xs backdrop-blur"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SelectedWorks;
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Blog = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

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

  const articles = [
    {
      id: 1,
      title: 'AI 产品设计的未来趋势',
      category: 'Design',
      excerpt: '探讨人工智能如何改变产品设计的方式，从自动化设计到智能助手的应用。',
      date: '2024-01-15',
      readTime: '8分钟',
    },
    {
      id: 2,
      title: '设计系统搭建指南',
      category: 'System',
      excerpt: '从零开始构建企业级设计系统，包含组件库、设计规范和协作流程。',
      date: '2024-01-10',
      readTime: '12分钟',
    },
    {
      id: 3,
      title: '用户体验研究方法',
      category: 'Research',
      excerpt: '深入了解用户研究的核心方法，包括访谈、可用性测试和数据分析。',
      date: '2024-01-05',
      readTime: '10分钟',
    },
    {
      id: 4,
      title: '数据可视化设计原则',
      category: 'Visual',
      excerpt: '如何将复杂数据转化为清晰直观的可视化图表，提升数据传达效果。',
      date: '2024-01-01',
      readTime: '6分钟',
    },
    {
      id: 5,
      title: '智能家居 AI Agent',
      category: 'AI',
      excerpt: '探索智能家居 AI Agent 的交互设计，体验智能家庭的未来生活方式。',
      date: '2024-02-01',
      readTime: '互动体验',
    },
  ];

  return (
    <section
      id="blog"
      ref={sectionRef}
      className="relative py-32 bg-bg-primary"
    >
      <div className="max-w-container mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div className="reveal">
            <span className="inline-block px-4 py-2 rounded-full bg-accent-primary/10 text-accent-primary text-sm font-medium mb-4">
              设计思考
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-text-primary">
              Blog & Articles
            </h2>
          </div>
          <div className="reveal stagger-1 mt-6 md:mt-0">
            <button className="btn-secondary px-6 py-3 rounded-lg">
              查看全部文章
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {articles.map((article, index) => (
            <div
              key={article.id}
              className="reveal group cursor-pointer bg-bg-card border border-border rounded-xl p-6 hover:border-accent-primary/30 transition-all duration-300"
              style={{ transitionDelay: `${(index % 2) * 0.1}s` }}
              onClick={() => navigate(`/blog/${article.id}`)}
            >
              <div className="flex items-start justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-accent-primary/10 text-accent-primary text-xs font-medium">
                  {article.category}
                </span>
                <span className="text-text-muted text-sm">{article.date}</span>
              </div>

              <h3 className="text-text-primary font-semibold text-xl mb-3 group-hover:text-accent-primary transition-colors">
                {article.title}
              </h3>

              <p className="text-text-secondary text-sm mb-4">{article.excerpt}</p>

              <div className="flex items-center justify-between">
                <span className="text-text-muted text-sm">{article.readTime} 阅读</span>
                <div className="flex items-center gap-2 text-accent-primary">
                  <span className="text-sm">阅读更多</span>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;

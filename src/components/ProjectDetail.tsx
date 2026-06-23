import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { projects } from '../data/personalData';

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const project = projects.find((p) => p.id === parseInt(id || '0'));
  
  // 根据项目ID设置对应的图片范围（只包含实际存在的图片）
  const getImageRange = (projectId: number | undefined) => {
    switch (projectId) {
      case 1: return [5, 6, 7, 8, 9, 10, 11]; // 全部存在
      case 2: return [12, 16, 17, 18]; // 存在 12, 16, 17, 18
      case 3: return [20, 21, 22, 23, 24, 25, 26, 27]; // 20-27 全部存在
      case 4: return [34, 35, 36, 37]; // 34-37
      case 5: return [39]; // 39
      case 6: return [38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48]; // 38-48
      default: return [];
    }
  };
  
  const imageNumbers = getImageRange(project?.id);
  const galleryImages = imageNumbers.map(num => `/${String(num).padStart(2, '0')}.png`);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.2 }
    );

    const revealElements = sectionRef.current?.querySelectorAll('.reveal');
    revealElements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex !== null) {
        if (e.key === 'ArrowLeft') {
          setSelectedImageIndex(prev => prev !== null && prev > 0 ? prev - 1 : galleryImages.length - 1);
        } else if (e.key === 'ArrowRight') {
          setSelectedImageIndex(prev => prev !== null && prev < galleryImages.length - 1 ? prev + 1 : 0);
        } else if (e.key === 'Escape') {
          setSelectedImageIndex(null);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, galleryImages.length]);

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
  };

  const prevImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(selectedImageIndex > 0 ? selectedImageIndex - 1 : galleryImages.length - 1);
    }
  };

  const nextImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(selectedImageIndex < galleryImages.length - 1 ? selectedImageIndex + 1 : 0);
    }
  };

  if (!project) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-bg-primary">
        <div className="text-center">
          <h2 className="font-heading font-bold text-5xl mb-4">项目不存在</h2>
          <Link to="/" className="text-accent-primary hover:underline">
            返回首页
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="min-h-screen bg-bg-primary">
      {/* Back Button */}
      <div className="fixed top-24 left-8 z-50">
        <Link
          to="/"
          className="flex items-center gap-2 text-text-secondary hover:text-accent-primary transition-colors"
        >
          <ArrowLeft size={20} />
          <span>返回</span>
        </Link>
      </div>

      <div className="max-w-container mx-auto px-8 py-32">
        {/* Project Image */}
        <div className="reveal mb-16">
          <img
            src={project.image}
            alt={project.title}
            className="w-full aspect-[21/9] object-cover rounded-xl"
          />
        </div>

        {/* Project Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Left Column - Info */}
          <div className="lg:col-span-2">
            <div className="reveal stagger-2">
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 text-sm text-accent-primary border border-accent-primary/50 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="font-heading font-bold text-5xl md:text-6xl mb-8">
                {project.title}
              </h1>
              <p className="text-text-secondary text-xl leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Project Gallery - Moved above text content */}
            <div className="reveal stagger-3 mt-16">
              <h2 className="font-heading font-semibold text-2xl mb-6">项目展示</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {imageNumbers.map((num, index) => (
                  <div 
                    key={num} 
                    className="group relative rounded-xl overflow-hidden bg-bg-card border border-border hover:border-accent-primary/30 transition-all duration-300 cursor-pointer"
                    onClick={() => openLightbox(index)}
                  >
                    <img
                      src={`/${String(num).padStart(2, '0')}.png`}
                      alt={`项目展示图 ${num}`}
                      className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-3">
                      <span className="text-white text-sm font-medium">点击查看大图</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Project Background */}
            <div className="reveal stagger-4 mt-16">
              <h2 className="font-heading font-semibold text-2xl mb-6">项目背景</h2>
              <div className="space-y-6">
                <div 
                  className="text-text-secondary leading-relaxed whitespace-pre-line"
                  dangerouslySetInnerHTML={{ 
                    __html: (project.story?.challenge || '该项目致力于通过数字化手段，为用户提供一站式的服务体验。').replace(/\*\*(.*?)\*\*/g, '<strong class="text-accent-primary font-semibold">$1</strong>').replace(/\n\n/g, '</p><p class="text-text-secondary leading-relaxed mt-4">').replace(/\n-/g, '<br>-')
                  }}
                />
              </div>
            </div>

            {/* Design Strategy */}
            <div className="reveal stagger-5 mt-16">
              <h2 className="font-heading font-semibold text-2xl mb-6">设计策略</h2>
              <div className="space-y-6">
                <div 
                  className="text-text-secondary leading-relaxed whitespace-pre-line"
                  dangerouslySetInnerHTML={{ 
                    __html: (project.story?.solution || '通过创新的设计理念和技术手段，打造优质的用户体验。').replace(/\*\*(.*?)\*\*/g, '<strong class="text-accent-primary font-semibold">$1</strong>').replace(/\n\n/g, '</p><p class="text-text-secondary leading-relaxed mt-4">').replace(/\n-/g, '<br>-')
                  }}
                />
              </div>
            </div>

            {/* Design Solutions */}
            <div className="reveal stagger-6 mt-16">
              <h2 className="font-heading font-semibold text-2xl mb-6">设计方案</h2>
              <div className="space-y-6">
                <div 
                  className="text-text-secondary leading-relaxed whitespace-pre-line"
                  dangerouslySetInnerHTML={{ 
                    __html: (project.story?.impact || '通过先进的设计技术与人性化的交互设计，成功打造了出色的数字服务体验。').replace(/\*\*(.*?)\*\*/g, '<strong class="text-accent-primary font-semibold">$1</strong>').replace(/\n\n/g, '</p><p class="text-text-secondary leading-relaxed mt-4">').replace(/\n-/g, '<br>-')
                  }}
                />
              </div>
            </div>
          </div>

          {/* Right Column - Stats */}
          <div className="reveal stagger-4">
            <div className="bg-bg-secondary p-8 rounded-xl">
              <h3 className="font-heading font-semibold text-xl mb-8">项目数据</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-text-muted text-sm">项目周期</p>
                  <p className="text-text-primary text-lg">3个月</p>
                </div>
                <div>
                  <p className="text-text-muted text-sm">团队规模</p>
                  <p className="text-text-primary text-lg">5人</p>
                </div>
                <div>
                  <p className="text-text-muted text-sm">交付成果</p>
                  <p className="text-text-primary text-lg">UI设计稿、交互原型、设计规范</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImageIndex !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            className="absolute top-8 right-8 text-white/70 hover:text-white transition-colors z-10"
            onClick={closeLightbox}
          >
            <X size={32} />
          </button>

          {/* Previous Button */}
          <button
            className="absolute left-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
          >
            <ChevronLeft size={48} />
          </button>

          {/* Next Button */}
          <button
            className="absolute right-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
          >
            <ChevronRight size={48} />
          </button>

          {/* Image */}
          <div 
            className="max-w-5xl max-h-[80vh] p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={`/${String(imageNumbers[selectedImageIndex!]).padStart(2, '0')}.png`}
              alt={`项目展示图 ${selectedImageIndex! + 1}`}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
            <div className="text-center mt-4 text-white/70 text-sm">
              {selectedImageIndex! + 1} / {galleryImages.length}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

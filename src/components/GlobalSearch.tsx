import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, FileText, Folder, Code, X, ArrowRight } from 'lucide-react';

interface SearchResult {
  id: string;
  type: 'blog' | 'project' | 'skill';
  title: string;
  description: string;
  path?: string;
}

const searchData: SearchResult[] = [
  { id: 'blog-1', type: 'blog', title: 'AI 产品设计的未来趋势', description: '探讨人工智能如何改变产品设计的方式', path: '/blog/1' },
  { id: 'blog-2', type: 'blog', title: '设计系统搭建指南', description: '从零开始构建企业级设计系统', path: '/blog/2' },
  { id: 'blog-3', type: 'blog', title: '用户体验研究方法', description: '深入了解用户研究的核心方法', path: '/blog/3' },
  { id: 'blog-4', type: 'blog', title: '数据可视化设计原则', description: '如何将复杂数据转化为清晰直观的可视化图表', path: '/blog/4' },
  { id: 'blog-5', type: 'blog', title: '智能家居 AI Agent', description: '探索智能家居 AI Agent 的交互设计', path: '/blog/5' },
  { id: 'project-1', type: 'project', title: '品牌设计系统', description: '为企业打造统一的品牌形象和设计语言' },
  { id: 'project-2', type: 'project', title: '移动应用 UI', description: 'iOS 和 Android 双平台应用界面设计' },
  { id: 'project-3', type: 'project', title: '网页后台管理系统', description: '数据可视化与用户权限管理系统' },
  { id: 'project-4', type: 'project', title: '电商平台设计', description: '完整的电商购物流程与用户体验优化' },
  { id: 'skill-1', type: 'skill', title: 'UI/UX 设计', description: '界面设计与用户体验优化' },
  { id: 'skill-2', type: 'skill', title: 'Figma', description: '原型设计与协作工具' },
  { id: 'skill-3', type: 'skill', title: 'React', description: '前端框架与组件化开发' },
  { id: 'skill-4', type: 'skill', title: '用户研究', description: '定性与定量研究方法' },
];

const typeIcons = { blog: FileText, project: Folder, skill: Code };
const typeLabels = { blog: '博客', project: '项目', skill: '技能' };

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

const GlobalSearch = ({ isOpen, onClose }: GlobalSearchProps) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchBoxRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery('');
      setResults([]);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const lowerQuery = query.toLowerCase();
    const filtered = searchData.filter(
      (item) =>
        item.title.toLowerCase().includes(lowerQuery) ||
        item.description.toLowerCase().includes(lowerQuery)
    );
    setResults(filtered);
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      e.preventDefault();
      handleSelect(results[selectedIndex]);
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleSelect = (result: SearchResult) => {
    if (result.path) {
      navigate(result.path);
    } else {
      const sectionMap: Record<string, string> = { project: '#works', skill: '#skills' };
      const section = sectionMap[result.type];
      if (section) {
        window.location.hash = section;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
    onClose();
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(e.target as Node)) {
        if (isOpen && !query) onClose();
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, query, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative min-h-screen flex items-start justify-center pt-[15vh] px-4">
        <div ref={searchBoxRef} className="w-full max-w-2xl bg-bg-card rounded-2xl border border-border shadow-2xl overflow-hidden">
          <div className="flex items-center gap-3 px-4 py-4 border-b border-border">
            <Search className="w-5 h-5 text-text-muted" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="搜索博客、项目、技能..."
              className="flex-1 bg-transparent text-text-primary placeholder-text-muted outline-none text-lg"
            />
            {query && (
              <button onClick={() => setQuery('')} className="p-1 rounded-lg hover:bg-bg-elevated">
                <X className="w-5 h-5 text-text-muted" />
              </button>
            )}
            <button onClick={onClose} className="px-2 py-1 rounded-lg bg-bg-elevated border border-border text-xs text-text-muted">
              ESC
            </button>
          </div>

          <div className="max-h-[400px] overflow-y-auto">
            {query && results.length === 0 && (
              <div className="px-4 py-8 text-center text-text-muted">
                <p>未找到相关结果</p>
                <p className="text-sm mt-2">尝试搜索其他关键词</p>
              </div>
            )}

            {!query && (
              <div className="px-4 py-6">
                <p className="text-sm text-text-muted mb-3">快捷导航</p>
                <div className="space-y-1">
                  {searchData.slice(0, 5).map((item) => {
                    const Icon = typeIcons[item.type];
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleSelect(item)}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-bg-elevated text-left"
                      >
                        <Icon className="w-4 h-4 text-text-muted" />
                        <span className="text-text-secondary">{item.title}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {results.length > 0 && (
              <div className="py-2">
                {results.map((result, index) => {
                  const Icon = typeIcons[result.type];
                  return (
                    <button
                      key={result.id}
                      onClick={() => handleSelect(result)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left ${
                        index === selectedIndex ? 'bg-bg-elevated' : 'hover:bg-bg-elevated/50'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-lg bg-bg-primary border border-border flex items-center justify-center">
                        <Icon className="w-4 h-4 text-text-muted" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-text-primary font-medium truncate">{result.title}</span>
                          <span className="px-2 py-0.5 rounded-full bg-bg-primary text-text-muted text-xs">{typeLabels[result.type]}</span>
                        </div>
                        <p className="text-sm text-text-muted truncate">{result.description}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-text-muted" />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="px-4 py-3 border-t border-border bg-bg-primary/50">
            <div className="flex items-center gap-4 text-xs text-text-muted">
              <div className="flex items-center gap-1.5">
                <kbd className="px-1.5 py-0.5 rounded bg-bg-primary border border-border font-mono">↑↓</kbd>
                <span>导航</span>
              </div>
              <div className="flex items-center gap-1.5">
                <kbd className="px-1.5 py-0.5 rounded bg-bg-primary border border-border font-mono">↵</kbd>
                <span>选择</span>
              </div>
              <div className="flex items-center gap-1.5">
                <kbd className="px-1.5 py-0.5 rounded bg-bg-primary border border-border font-mono">esc</kbd>
                <span>关闭</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalSearch;

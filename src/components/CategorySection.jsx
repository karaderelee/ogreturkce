import React from 'react';
import { 
  Sparkles, 
  FolderOpen, 
  Laptop, 
  HeartHandshake, 
  GraduationCap, 
  ArrowRight,
  BookOpen
} from 'lucide-react';

const iconMap = {
  Sparkles: Sparkles,
  FolderOpen: FolderOpen,
  Laptop: Laptop,
  HeartHandshake: HeartHandshake,
  GraduationCap: GraduationCap,
};

export default function CategorySection({ categories, onSelectCategory, onNavigateToCategories }) {
  return (
    <section className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-teal-700 text-xs sm:text-sm font-bold tracking-wider uppercase mb-1">
              <FolderOpen className="w-4 h-4" />
              <span>Geniş İçerik Yelpazesi</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Kategorilere Göre Keşfedin
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              İhtiyaç duyduğunuz pedagojik alana ve dijital araçlara hızlıca ulaşın
            </p>
          </div>

          <button
            onClick={onNavigateToCategories}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-teal-700 hover:text-teal-800 group"
          >
            <span>Tüm Kategorileri Gör</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {categories.map((cat) => {
            const IconComponent = iconMap[cat.icon] || BookOpen;
            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.slug)}
                className="group bg-white rounded-2xl p-6 border border-slate-200/80 hover:border-teal-400 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl ${cat.iconBg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <IconComponent className="w-6 h-6" />
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors mb-2">
                    {cat.name}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed mb-4">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-auto">
                  <span className="text-xs font-semibold text-slate-400">
                    {cat.count} Yazı
                  </span>
                  <span className="text-xs font-bold text-teal-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    İncele <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

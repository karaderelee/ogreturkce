import React from 'react';
import { 
  FolderOpen, 
  Sparkles, 
  Laptop, 
  HeartHandshake, 
  GraduationCap, 
  ArrowRight,
  BookOpen
} from 'lucide-react';
import PostCard from './PostCard';

const iconMap = {
  Sparkles: Sparkles,
  FolderOpen: FolderOpen,
  Laptop: Laptop,
  HeartHandshake: HeartHandshake,
  GraduationCap: GraduationCap,
};

export default function CategoriesView({ 
  categories, 
  posts, 
  selectedCategory, 
  setSelectedCategory, 
  onSelectPost 
}) {
  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider mb-3">
            <FolderOpen className="w-3.5 h-3.5" />
            <span>Kategori Rehberi</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            Türkçe Alanları & Konu Başlıkları
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">
            Ortaokul Türkçe dersi ve LGS hazırlık ihtiyaçlarınıza göre yapılandırılmış tematik kategoriler arasında gezinin.
          </p>
        </div>

        {/* Categories Overview Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mb-14">
          {categories.map((cat) => {
            const IconComponent = iconMap[cat.icon] || BookOpen;
            const isSelected = selectedCategory === cat.slug;
            return (
              <div
                key={cat.id}
                onClick={() => setSelectedCategory(isSelected ? null : cat.slug)}
                className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isSelected 
                    ? 'bg-teal-700 text-white border-teal-700 shadow-lg scale-[1.02]' 
                    : 'bg-white text-slate-800 border-slate-200/90 hover:border-teal-400 hover:shadow-md'
                }`}
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                    isSelected ? 'bg-white/20 text-white' : cat.iconBg
                  }`}>
                    <IconComponent className="w-6 h-6" />
                  </div>

                  <h3 className={`text-base font-bold mb-2 ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                    {cat.name}
                  </h3>

                  <p className={`text-xs leading-relaxed mb-4 ${isSelected ? 'text-teal-100' : 'text-slate-500'}`}>
                    {cat.description}
                  </p>
                </div>

                <div className={`pt-3 border-t flex items-center justify-between text-xs font-semibold ${
                  isSelected ? 'border-white/20 text-teal-200' : 'border-slate-100 text-slate-400'
                }`}>
                  <span>{cat.count} İçerik</span>
                  <span className="flex items-center gap-1 font-bold">
                    {isSelected ? 'Seçildi ✓' : 'Filtrele →'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Categorized Posts */}
        {categories.map((cat) => {
          if (selectedCategory && selectedCategory !== cat.slug) return null;
          const catPosts = posts.filter(p => p.categorySlug === cat.slug);
          const IconComponent = iconMap[cat.icon] || BookOpen;

          return (
            <div key={cat.id} className="mb-14 last:mb-0">
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl ${cat.iconBg} flex items-center justify-center`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                      {cat.name}
                    </h2>
                    <span className="text-xs text-slate-400">{cat.description}</span>
                  </div>
                </div>

                <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-200 text-slate-700">
                  {catPosts.length} Yazı
                </span>
              </div>

              {catPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {catPosts.map((post) => (
                    <PostCard
                      key={post.id}
                      post={post}
                      onSelectPost={onSelectPost}
                      onSelectCategory={setSelectedCategory}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-400 italic">Bu kategoride henüz yazı bulunmamaktadır.</p>
              )}
            </div>
          );
        })}

      </div>
    </div>
  );
}

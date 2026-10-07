import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Compass, 
  Clock, 
  BookOpen, 
  X, 
  SlidersHorizontal,
  FolderOpen,
  CheckCircle2,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import PostCard from './PostCard';

export default function BlogView({ 
  posts, 
  categories, 
  selectedCategory, 
  setSelectedCategory, 
  onSelectPost 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'oldest'

  // Sync internal category selection with parent prop or local selection
  const activeCategorySlug = selectedCategory || 'all';

  const handleCategoryChange = (slug) => {
    if (slug === 'all' || slug === null) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(slug);
    }
  };

  // Find active category details
  const activeCategoryObj = useMemo(() => {
    if (!selectedCategory || selectedCategory === 'all') return null;
    return categories.find(c => c.slug === selectedCategory || c.name === selectedCategory) || null;
  }, [categories, selectedCategory]);

  // Compute live post count per category
  const categoryCounts = useMemo(() => {
    const counts = { all: posts.length };
    categories.forEach(cat => {
      counts[cat.slug] = posts.filter(
        p => p.categorySlug === cat.slug || p.category === cat.name
      ).length;
    });
    return counts;
  }, [posts, categories]);

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      // Category match
      const matchesCategory = (!selectedCategory || selectedCategory === 'all')
        ? true
        : (post.categorySlug === selectedCategory || post.category === selectedCategory || post.category === activeCategoryObj?.name);

      // Search query match
      const matchesSearch = searchQuery.trim() === '' || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))) ||
        (post.author?.name && post.author.name.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'newest') return (b.date || '').localeCompare(a.date || '') || b.id.localeCompare(a.id);
      return (a.date || '').localeCompare(b.date || '') || a.id.localeCompare(b.id);
    });
  }, [posts, selectedCategory, activeCategoryObj, searchQuery, sortBy]);

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>Türkçe Zümre Arşivi</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            Türkçe Blogu & Ders Materyalleri
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">
            LGS yeni nesil paragraf analizleri, dil bilgisi oyunları ve yazma atölyesi içeriklerini kategorilerine göre filtreleyin.
          </p>
        </div>

        {/* Dedicated Category Filtering Bar */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-sm mb-8 space-y-5">
          
          {/* Section Label & Mobile Dropdown */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <FolderOpen className="w-4 h-4 text-teal-700" />
              <span className="text-xs sm:text-sm font-bold text-slate-800">
                Kategoriye Göre Filtrele:
              </span>
            </div>

            {/* Mobile dropdown selector */}
            <div className="sm:hidden">
              <select
                value={selectedCategory || 'all'}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-800"
              >
                <option value="all">Tüm Kategoriler ({posts.length})</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.slug}>
                    {c.name} ({categoryCounts[c.slug] || 0})
                  </option>
                ))}
              </select>
            </div>

            {/* Total counts note on desktop */}
            <span className="hidden sm:inline-block text-xs text-slate-400 font-medium">
              Toplam {posts.length} Türkçe içeriği
            </span>
          </div>

          {/* Desktop & Tablet Category Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            
            {/* All Categories Button */}
            <button
              onClick={() => handleCategoryChange('all')}
              className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                !selectedCategory || selectedCategory === 'all'
                  ? 'bg-teal-700 text-white shadow-md shadow-teal-700/20 scale-[1.02]'
                  : 'bg-slate-100/90 text-slate-600 hover:bg-slate-200 hover:text-slate-900 border border-slate-200/60'
              }`}
            >
              <span>Tüm Yazılar</span>
              <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                !selectedCategory || selectedCategory === 'all'
                  ? 'bg-white/20 text-white'
                  : 'bg-slate-200 text-slate-700'
              }`}>
                {posts.length}
              </span>
            </button>

            {/* Individual Category Buttons */}
            {categories.map((c) => {
              const isSelected = selectedCategory === c.slug;
              const count = categoryCounts[c.slug] || 0;
              return (
                <button
                  key={c.id}
                  onClick={() => handleCategoryChange(isSelected ? 'all' : c.slug)}
                  className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                    isSelected
                      ? 'bg-teal-700 text-white shadow-md shadow-teal-700/20 scale-[1.02]'
                      : 'bg-slate-100/90 text-slate-600 hover:bg-slate-200 hover:text-slate-900 border border-slate-200/60'
                  }`}
                >
                  <span>{c.name}</span>
                  <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                    isSelected
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-200 text-slate-700'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Input & Sort Options Bar */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3 items-center justify-between">
            
            {/* Live Search Input */}
            <div className="relative w-full sm:max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Konu, başlık veya anahtar kelime ara..."
                className="w-full pl-10 pr-9 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all placeholder:text-slate-400"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  title="Aramayı Temizle"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Results count & Sorting */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              <span className="text-xs font-semibold text-slate-500">
                {filteredPosts.length} yazı listeleniyor
              </span>

              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-xs font-semibold rounded-lg px-2.5 py-1.5 text-slate-700 focus:outline-none focus:ring-1 focus:ring-teal-500 cursor-pointer"
                >
                  <option value="newest">En Yeni Yazılar</option>
                  <option value="oldest">Eski Yazılar</option>
                </select>
              </div>
            </div>

          </div>

        </div>

        {/* Selected Category Notice Banner */}
        {activeCategoryObj && (
          <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-teal-50/80 border border-teal-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fadeIn">
            <div className="flex items-start gap-3">
              <div className={`w-9 h-9 rounded-xl ${activeCategoryObj.iconBg || 'bg-teal-100 text-teal-800'} flex items-center justify-center shrink-0 mt-0.5`}>
                <FolderOpen className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase text-teal-800 tracking-wider">
                    Seçili Kategori:
                  </span>
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                    {activeCategoryObj.name}
                  </h3>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-teal-200/80 text-teal-900 font-bold">
                    {filteredPosts.length} Yazı
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-0.5">
                  {activeCategoryObj.description}
                </p>
              </div>
            </div>

            <button
              onClick={() => handleCategoryChange('all')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-teal-200 text-teal-800 hover:bg-teal-100 text-xs font-bold transition-colors shrink-0 shadow-2xs"
            >
              <X className="w-3.5 h-3.5" />
              <span>Filtreyi Kaldır (Tümünü Göster)</span>
            </button>
          </div>
        )}

        {/* Search Query Notice Banner */}
        {searchQuery && !activeCategoryObj && (
          <div className="mb-6 flex items-center justify-between p-3.5 bg-slate-200/70 rounded-2xl text-xs text-slate-700">
            <span>
              <strong>"{searchQuery}"</strong> araması için {filteredPosts.length} sonuç listeleniyor.
            </span>
            <button
              onClick={() => setSearchQuery('')}
              className="font-bold text-teal-800 hover:underline"
            >
              Aramayı Temizle
            </button>
          </div>
        )}

        {/* Posts Grid or Empty State */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onSelectPost={onSelectPost}
                onSelectCategory={(slug) => handleCategoryChange(slug)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center max-w-md mx-auto border border-slate-200/80 shadow-2xs">
            <div className="w-16 h-16 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center mx-auto mb-4">
              <FolderOpen className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">
              Bu Kategoride Yazı Bulunamadı
            </h3>
            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              {activeCategoryObj
                ? `"${activeCategoryObj.name}" kategorisine henüz bir içerik eklenmemiş veya arama kriterlerinizle eşleşmiyor.`
                : 'Arama kriterlerinize uygun içerik bulunamadı.'}
            </p>
            <button
              onClick={() => {
                handleCategoryChange('all');
                setSearchQuery('');
              }}
              className="px-5 py-2.5 bg-teal-700 text-white rounded-xl text-xs font-bold hover:bg-teal-800 transition-colors shadow-sm"
            >
              Tüm Yazıları Göster
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Compass, ArrowRight } from 'lucide-react';
import PostCard from './PostCard';

export default function RecentPostsSection({ posts, onSelectPost, onSelectCategory, onNavigateToBlog }) {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filterOptions = [
    { id: 'all', label: 'Tüm İçerikler' },
    { id: 'lgs-turkce', label: 'LGS Türkçe' },
    { id: 'dil-bilgisi', label: 'Dil Bilgisi' },
    { id: 'okuma-ve-yazma', label: 'Okuma & Yazma' },
    { id: 'ders-materyalleri', label: 'Çalışma Kağıtları' },
  ];

  const filteredPosts = selectedFilter === 'all'
    ? posts.slice(0, 6)
    : posts.filter(p => p.categorySlug === selectedFilter).slice(0, 6);

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Filter Pills */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-teal-700 text-xs sm:text-sm font-bold tracking-wider uppercase mb-1">
              <Compass className="w-4 h-4" />
              <span>Zümreden Son Paylaşımlar</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Son Eklenen Türkçe İçerikleri
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              5, 6, 7 ve 8. sınıf derslerinizde hemen kullanabileceğiniz etkinlik ve rehberler
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {filterOptions.map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFilter(f.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedFilter === f.id
                    ? 'bg-teal-700 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onSelectPost={onSelectPost}
              onSelectCategory={onSelectCategory}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-12 text-center">
          <button
            onClick={onNavigateToBlog}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-teal-700 text-white font-semibold text-sm shadow-md hover:shadow-teal-600/20 transition-all group"
          >
            <span>Tüm Türkçe Arşivini İncele</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
}

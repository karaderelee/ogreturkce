import React from 'react';
import { Sparkles, Calendar, Clock, ArrowRight, User } from 'lucide-react';

export default function FeaturedSection({ posts, onSelectPost, onSelectCategory }) {
  const featuredPosts = posts.filter(p => p.featured);
  const mainFeatured = featuredPosts[0];
  const sideFeatured = featuredPosts.slice(1, 3);

  if (!mainFeatured) return null;

  return (
    <section className="py-12 sm:py-16 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-teal-700 text-xs sm:text-sm font-bold tracking-wider uppercase mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Gündem & Öneri</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Öne Çıkan İçerikler
            </h2>
          </div>
          <span className="hidden sm:inline-block text-xs text-slate-500 font-medium">
            Öğretmenler tarafından en çok okunan rehberler
          </span>
        </div>

        {/* Featured Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* Main Big Featured Post */}
          <div 
            onClick={() => onSelectPost(mainFeatured)}
            className="lg:col-span-7 group relative bg-slate-900 rounded-3xl overflow-hidden shadow-lg cursor-pointer flex flex-col justify-end min-h-[380px] sm:min-h-[460px]"
          >
            <img
              src={mainFeatured.coverImage}
              alt={mainFeatured.title}
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-50 group-hover:scale-105 transition-all duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

            <div className="relative p-6 sm:p-8 z-10">
              <div className="flex items-center gap-2 mb-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onSelectCategory) onSelectCategory(mainFeatured.categorySlug);
                  }}
                  className="px-3 py-1 rounded-full text-xs font-bold bg-teal-500 text-white shadow-sm hover:bg-teal-400 transition-colors"
                >
                  {mainFeatured.category}
                </button>
                <span className="flex items-center gap-1 text-xs text-slate-300 font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  {mainFeatured.readTime}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white group-hover:text-teal-300 transition-colors leading-snug mb-3">
                {mainFeatured.title}
              </h3>

              <p className="text-sm sm:text-base text-slate-200/90 line-clamp-2 mb-5 font-normal">
                {mainFeatured.excerpt}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <img
                    src={mainFeatured.author.avatar}
                    alt={mainFeatured.author.name}
                    className="w-9 h-9 rounded-full object-cover ring-2 ring-white/30"
                  />
                  <div>
                    <span className="block text-xs sm:text-sm font-semibold text-white">
                      {mainFeatured.author.name}
                    </span>
                    <span className="block text-[11px] text-slate-300">
                      {mainFeatured.date}
                    </span>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1 text-xs font-semibold text-teal-400 group-hover:translate-x-1 transition-transform">
                  Yazıyı Oku <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>

          {/* Secondary Featured Posts */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {sideFeatured.map((post) => (
              <div
                key={post.id}
                onClick={() => onSelectPost(post)}
                className="group bg-slate-50 hover:bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 hover:border-teal-300 hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between flex-1"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onSelectCategory) onSelectCategory(post.categorySlug);
                      }}
                      className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white text-teal-800 border border-slate-200 group-hover:border-teal-400 transition-colors"
                    >
                      {post.category}
                    </button>
                    <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {post.readTime}
                    </span>
                  </div>

                  <h4 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors mb-2 line-clamp-2">
                    {post.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-200/60 mt-auto">
                  <div className="flex items-center gap-2">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-7 h-7 rounded-full object-cover"
                    />
                    <span className="text-xs font-semibold text-slate-700">
                      {post.author.name}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400">
                    {post.date}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}

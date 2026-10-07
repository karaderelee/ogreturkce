import React from 'react';
import { Calendar, Clock, ArrowRight, User } from 'lucide-react';

export default function PostCard({ post, onSelectPost, onSelectCategory }) {
  return (
    <article className="group bg-white rounded-2xl overflow-hidden border border-slate-200/90 hover:border-teal-400 hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      {/* Cover Image Container */}
      <div 
        className="relative overflow-hidden aspect-[16/10] bg-slate-100 cursor-pointer"
        onClick={() => onSelectPost(post)}
      >
        <img
          src={post.coverImage}
          alt={post.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Category Badge on image */}
        <div className="absolute top-3 left-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onSelectCategory) onSelectCategory(post.categorySlug);
            }}
            className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md bg-white/95 text-slate-800 shadow-sm border border-white/50 hover:bg-teal-600 hover:text-white transition-colors`}
          >
            {post.category}
          </button>
        </div>

        {/* Read time pill */}
        <div className="absolute bottom-3 right-3 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-black/60 text-white backdrop-blur-sm flex items-center gap-1">
          <Clock className="w-3 h-3 text-teal-300" />
          <span>{post.readTime}</span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 sm:p-6 flex flex-col flex-grow">
        {/* Date */}
        <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-2.5">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span>{post.date}</span>
        </div>

        {/* Title */}
        <h3 
          onClick={() => onSelectPost(post)}
          className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-teal-700 transition-colors line-clamp-2 mb-2.5 cursor-pointer leading-snug"
        >
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed mb-4 flex-grow">
          {post.excerpt}
        </p>

        {/* Author & Read More Link footer */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
          <div className="flex items-center gap-2.5">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-teal-500/20"
            />
            <div className="text-left">
              <span className="block text-xs font-semibold text-slate-800 line-clamp-1">
                {post.author.name}
              </span>
              <span className="block text-[11px] text-slate-400 line-clamp-1">
                {post.author.role}
              </span>
            </div>
          </div>

          <button
            onClick={() => onSelectPost(post)}
            className="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-teal-600 text-slate-500 group-hover:text-white flex items-center justify-center transition-colors"
            title="Yazıyı Oku"
          >
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </article>
  );
}

import React, { useState, useEffect } from 'react';
import { Search, X, Clock, ArrowRight, BookOpen } from 'lucide-react';

export default function SearchModal({ isOpen, onClose, posts, onSelectPost }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const results = query.trim() === '' ? [] : posts.filter(p => {
    const q = query.toLowerCase();
    return p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q)) ||
      p.category.toLowerCase().includes(q);
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Search Input Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-teal-600 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Hangi konuyu veya materyali arıyorsunuz? (örn: paragraf, fiilimsiler, LGS, noktalama)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 text-sm sm:text-base outline-none text-slate-800 placeholder-slate-400 bg-transparent"
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-4 overflow-y-auto flex-1 space-y-2">
          {query.trim() === '' ? (
            <div className="text-center py-10 text-slate-400 text-xs sm:text-sm">
              <BookOpen className="w-8 h-8 mx-auto mb-2 text-slate-300" />
              <span>Aramak istediğiniz terimi yazarak sonuçları anında görüntüleyin.</span>
            </div>
          ) : results.length > 0 ? (
            results.map((post) => (
              <div
                key={post.id}
                onClick={() => {
                  onSelectPost(post);
                  onClose();
                }}
                className="p-3.5 rounded-2xl hover:bg-teal-50/70 cursor-pointer border border-transparent hover:border-teal-200 transition-all flex items-center justify-between gap-4 group"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-teal-100 text-teal-800">
                      {post.category}
                    </span>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {post.readTime}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-teal-700 transition-colors line-clamp-1">
                    {post.title}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                    {post.excerpt}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-teal-600 group-hover:translate-x-1 transition-all shrink-0" />
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-slate-400 text-xs sm:text-sm">
              <span>"{query}" ile eşleşen bir içerik bulunamadı.</span>
            </div>
          )}
        </div>

        {/* Footer shortcuts hint */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between">
          <span>Esc tuşuna basarak kapatabilirsiniz</span>
          <span>{results.length} sonuç listelendi</span>
        </div>
      </div>
    </div>
  );
}

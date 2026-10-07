import React from 'react';
import { Sparkles, ArrowRight, BookOpen, Search, Feather } from 'lucide-react';

export default function Hero({ onExploreClick, onCategoryClick, onOpenSearch }) {
  const trendingTopics = [
    { label: 'LGS Paragraf Taktikleri', cat: 'lgs-turkce' },
    { label: 'Fiilimsiler & Etkinlikler', cat: 'dil-bilgisi' },
    { label: 'Yaratıcı Yazarlık Sandığı', cat: 'okuma-ve-yazma' },
    { label: 'Yazım & Noktalama Oyunları', cat: 'ders-materyalleri' },
    { label: 'ChatGPT ile Okuma Metni', cat: 'dijital-turkce' },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-teal-50/70 via-slate-50 to-slate-50 pt-12 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-200/60">
      {/* Background ambient blurs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100/90 border border-teal-200 text-teal-800 text-xs sm:text-sm font-semibold mb-6 shadow-sm">
            <Feather className="w-4 h-4 text-teal-700" />
            <span>Ortaokul Türkçe Öğretmenlerinin Dijital Zümre Odası</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-6">
            Türkçe Öğretmenlerinin <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-700 to-emerald-600">
              Ortak Paylaşım Sayfası
            </span>
          </h1>

          {/* Short Description */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed font-normal mb-8 max-w-2xl mx-auto">
            5, 6, 7 ve 8. sınıflar için MEB kazanım uyumlu çalışma yaprakları, LGS yeni nesil paragraf analizleri, somut dil bilgisi etkinlikleri ve yaratıcı yazma atölyeleri.
          </p>

          {/* Search bar inside Hero */}
          <div className="max-w-xl mx-auto mb-8">
            <div 
              onClick={onOpenSearch}
              className="bg-white p-2 rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-200 flex items-center gap-3 cursor-pointer hover:border-teal-400 transition-all group"
            >
              <div className="p-2.5 rounded-xl bg-slate-100 group-hover:bg-teal-50 text-slate-400 group-hover:text-teal-700 transition-colors">
                <Search className="w-5 h-5" />
              </div>
              <div className="flex-1 text-left">
                <span className="text-sm text-slate-400 font-medium">Hangi Türkçe konusunu veya çalışma kağıdını arıyorsunuz?</span>
              </div>
              <button 
                type="button" 
                className="px-4 py-2.5 bg-teal-700 hover:bg-teal-800 text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors shadow-sm"
              >
                Ara
              </button>
            </div>
          </div>

          {/* Trending Topics / Quick Tags */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm">
            <span className="text-slate-400 font-medium">Zümrede Popüler:</span>
            {trendingTopics.map((topic, i) => (
              <button
                key={i}
                onClick={() => onCategoryClick(topic.cat)}
                className="px-3 py-1 rounded-full bg-white hover:bg-teal-50 text-slate-600 hover:text-teal-800 border border-slate-200/90 hover:border-teal-300 font-medium transition-all shadow-2xs"
              >
                {topic.label}
              </button>
            ))}
          </div>

        </div>

        {/* Quick highlight stats banner */}
        <div className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm border border-slate-200/80 p-4 rounded-2xl text-center shadow-2xs">
            <span className="block text-2xl sm:text-3xl font-extrabold text-teal-700">50+</span>
            <span className="text-xs text-slate-500 font-medium">Çalışma Kağıdı & Etkinlik</span>
          </div>
          <div className="bg-white/80 backdrop-blur-sm border border-slate-200/80 p-4 rounded-2xl text-center shadow-2xs">
            <span className="block text-2xl sm:text-3xl font-extrabold text-teal-700">5-8. Sınıf</span>
            <span className="text-xs text-slate-500 font-medium">Kazanım Uyumlu Düzey</span>
          </div>
          <div className="bg-white/80 backdrop-blur-sm border border-slate-200/80 p-4 rounded-2xl text-center shadow-2xs">
            <span className="block text-2xl sm:text-3xl font-extrabold text-teal-700">LGS</span>
            <span className="text-xs text-slate-500 font-medium">Yeni Nesil Soru Taktikleri</span>
          </div>
          <div className="bg-white/80 backdrop-blur-sm border border-slate-200/80 p-4 rounded-2xl text-center shadow-2xs">
            <span className="block text-2xl sm:text-3xl font-extrabold text-teal-700">%100 Açık</span>
            <span className="text-xs text-slate-500 font-medium">Zümre Paylaşımına Açık</span>
          </div>
        </div>

      </div>
    </section>
  );
}

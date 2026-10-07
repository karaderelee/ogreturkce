import React from 'react';
import { BookOpen, Heart, Sparkles, Mail, Send, Feather } from 'lucide-react';

export default function Footer({ onNavigate, onSelectCategory, onGoToAdmin }) {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div 
              onClick={() => onNavigate('home')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center text-slate-950 shadow-md">
                <BookOpen className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="text-2xl font-extrabold text-white tracking-tight">
                öğre<span className="text-teal-400 font-black">T</span>ürkçe
              </span>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Ortaokul Türkçe öğretmenleri için 5, 6, 7 ve 8. sınıf ders materyalleri, LGS soru taktikleri, dil bilgisi oyunları ve yazma atölyelerini bir araya getiren bağımsız paylaşım platformu.
            </p>

            <div className="pt-2 text-xs text-slate-400">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-teal-400 border border-slate-700">
                <Feather className="w-3.5 h-3.5" />
                Türkçe Zümresinden Türkçe Zümresine
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Hızlı Erişim
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button 
                  onClick={() => onNavigate('home')} 
                  className="hover:text-teal-400 transition-colors text-slate-400"
                >
                  Ana Sayfa
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('blog')} 
                  className="hover:text-teal-400 transition-colors text-slate-400"
                >
                  Tüm Türkçe İçerikleri
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('categories')} 
                  className="hover:text-teal-400 transition-colors text-slate-400"
                >
                  Kategori Arşivi
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('about')} 
                  className="hover:text-teal-400 transition-colors text-slate-400"
                >
                  Hakkımızda & Zümre
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('contact')} 
                  className="hover:text-teal-400 transition-colors text-slate-400"
                >
                  Materyal Paylaş & İletişim
                </button>
              </li>
              <li className="pt-1">
                <button 
                  onClick={onGoToAdmin} 
                  className="hover:text-teal-300 transition-colors text-slate-400 font-medium inline-flex items-center gap-1.5"
                >
                  <span>Öğretmen / Admin Paneli</span>
                  <span className="text-[10px] bg-slate-800 text-teal-400 px-1.5 py-0.5 rounded border border-slate-700">/admin</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Categories Column */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Türkçe Alanları
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button 
                  onClick={() => onSelectCategory('lgs-turkce')} 
                  className="hover:text-teal-400 transition-colors text-slate-400"
                >
                  LGS Türkçe & Yeni Nesil
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('dil-bilgisi')} 
                  className="hover:text-teal-400 transition-colors text-slate-400"
                >
                  Dil Bilgisi & Etkinlikler
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('okuma-ve-yazma')} 
                  className="hover:text-teal-400 transition-colors text-slate-400"
                >
                  Okuma & Yazma Atölyesi
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('ders-materyalleri')} 
                  className="hover:text-teal-400 transition-colors text-slate-400"
                >
                  Çalışma Kağıtları
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('dijital-turkce')} 
                  className="hover:text-teal-400 transition-colors text-slate-400"
                >
                  Yapay Zekâ & Dijital Türkçe
                </button>
              </li>
            </ul>
          </div>

          {/* Guidelines / Info */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Yayın İlkeleri
            </h4>
            <ul className="space-y-2 text-xs text-slate-400 leading-relaxed">
              <li>✓ MEB 2024 Türkçe Dersi Öğretim Programı Uyumlu</li>
              <li>✓ 5, 6, 7 ve 8. Sınıf Kazanımlarına Özel</li>
              <li>✓ Telifsiz & Sınıfta Doğrudan Yazdırılabilir</li>
              <li className="pt-2">
                <span className="text-slate-500 block">Zümre İletişim:</span>
                <span className="text-slate-300 font-medium">zumre@ogreturkce.org</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Sub-footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} öğreTürkçe. Türkçe Öğretmenlerinin Paylaşım Sayfası.</p>
          <p className="flex items-center gap-1.5 text-slate-400">
            Türkçemizi sevgiyle öğreten tüm Türkçe öğretmenleri için <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> ile hazırlandı.
          </p>
        </div>

      </div>
    </footer>
  );
}

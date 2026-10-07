import React, { useState } from 'react';
import { 
  BookOpen, 
  Menu, 
  X, 
  Search, 
  Sparkles, 
  Compass, 
  FolderOpen, 
  Info, 
  Mail,
  PenTool,
  LogIn,
  LogOut,
  User,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';

export default function Navbar({ 
  activePage, 
  setActivePage, 
  onOpenSearch, 
  currentUser, 
  onOpenAuthModal, 
  onLogout, 
  onOpenMaterialShare 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Ana Sayfa', icon: BookOpen },
    { id: 'blog', label: 'Blog & İçerikler', icon: Compass },
    { id: 'categories', label: 'Kategoriler', icon: FolderOpen },
    { id: 'about', label: 'Hakkında', icon: Info },
    { id: 'contact', label: 'İletişim & Paylaşım', icon: Mail },
  ];

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand: öğreTürkçe */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3.5 cursor-pointer group select-none"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-teal-700 to-emerald-600 flex items-center justify-center text-white shadow-md shadow-teal-700/20 group-hover:scale-105 transition-transform">
              <BookOpen className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-extrabold tracking-tight text-slate-900">
                  öğre<span className="text-teal-600 font-black">T</span>ürkçe
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-teal-50 text-teal-800 border border-teal-200/80">
                  <Sparkles className="w-2.5 h-2.5 mr-1 text-teal-600" /> TÜRKÇE ZÜMRESİ
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">
                Türkçe Öğretmenlerinin Paylaşım Sayfası
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-150 ${
                    isActive
                      ? 'bg-teal-50 text-teal-800 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons, Auth & CTA */}
          <div className="hidden sm:flex items-center gap-2.5">
            
            {/* Quick Search trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2.5 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors border border-slate-200/80 flex items-center gap-2 text-xs font-medium"
              title="Türkçe Materyali Ara"
            >
              <Search className="w-4 h-4 text-slate-400" />
              <span className="text-slate-400 hidden xl:inline">Ara...</span>
            </button>

            {/* Materyal Paylaş Button (Member-Only) */}
            <button
              onClick={onOpenMaterialShare}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-slate-900 hover:bg-teal-700 shadow-sm transition-all duration-200 hover:shadow-teal-600/20 active:scale-95"
              title={currentUser ? "Materyal Paylaş" : "Sadece kayıtlı üyeler materyal paylaşabilir"}
            >
              <PenTool className="w-4 h-4 text-teal-400" />
              <span>Materyal Paylaş</span>
            </button>

            {/* USER LOGIN / PROFILE CONTROLS */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 py-1.5 px-3 rounded-2xl bg-teal-50 hover:bg-teal-100/80 border border-teal-200/80 transition-all text-left"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-7 h-7 rounded-full object-cover ring-2 ring-teal-600/30"
                  />
                  <div className="hidden lg:block text-left">
                    <span className="block text-xs font-bold text-slate-800 leading-tight">
                      {currentUser.name}
                    </span>
                    <span className="block text-[10px] text-teal-800 font-medium">
                      Öğretmen
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white shadow-xl border border-slate-200/90 py-2 z-50 animate-fadeIn">
                    <div className="px-4 py-2.5 border-b border-slate-100">
                      <div className="flex items-center gap-1 text-teal-700 text-[11px] font-bold">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Kayıtlı Zümre Üyesi</span>
                      </div>
                      <span className="block text-xs font-bold text-slate-900 mt-0.5">
                        {currentUser.name}
                      </span>
                      <span className="block text-[11px] text-slate-500">
                        {currentUser.email}
                      </span>
                      <span className="block text-[11px] text-teal-800 mt-1 font-medium bg-teal-50 px-2 py-0.5 rounded-md inline-block">
                        {currentUser.branch}
                      </span>
                    </div>

                    <div className="py-1">
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          onOpenMaterialShare();
                        }}
                        className="w-full px-4 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-teal-50 hover:text-teal-800 flex items-center gap-2"
                      >
                        <PenTool className="w-3.5 h-3.5 text-teal-600" />
                        <span>Yeni Materyal Paylaş</span>
                      </button>

                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          onLogout();
                        }}
                        className="w-full px-4 py-2 text-left text-xs font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-2 border-t border-slate-100 mt-1"
                      >
                        <LogOut className="w-3.5 h-3.5 text-rose-500" />
                        <span>Çıkış Yap</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => onOpenAuthModal('login')}
                className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 transition-all active:scale-95"
              >
                <LogIn className="w-4 h-4 text-teal-700" />
                <span>Giriş Yap / Kayıt Ol</span>
              </button>
            )}

          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={onOpenSearch}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100"
              aria-label="Ara"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Menüyü Aç"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Slide-down Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white/98 px-4 pt-3 pb-6 space-y-2 shadow-lg animate-fadeIn">
          
          {/* User Status Bar in Mobile */}
          {currentUser ? (
            <div className="p-3 bg-teal-50 rounded-2xl border border-teal-200 flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <img
                  src={currentUser.avatar}
                  alt=""
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-teal-600/30"
                />
                <div>
                  <span className="block text-xs font-bold text-slate-900">{currentUser.name}</span>
                  <span className="block text-[11px] text-teal-800">{currentUser.branch}</span>
                </div>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onLogout();
                }}
                className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl"
                title="Çıkış Yap"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="pb-3 border-b border-slate-100 mb-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuthModal('login');
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 font-bold text-xs"
              >
                <LogIn className="w-4 h-4" />
                <span>Öğretmen Girişi / Kayıt Ol</span>
              </button>
            </div>
          )}

          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold text-left transition-colors ${
                  isActive
                    ? 'bg-teal-50 text-teal-800'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <IconComponent className={`w-5 h-5 ${isActive ? 'text-teal-600' : 'text-slate-400'}`} />
                {item.label}
              </button>
            );
          })}

          <div className="pt-3 border-t border-slate-100">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenMaterialShare();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-white font-medium bg-teal-700 hover:bg-teal-800 transition-colors shadow-sm"
            >
              <PenTool className="w-4 h-4" />
              <span>Materyal Paylaş (Üyelere Özel)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

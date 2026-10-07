import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import FeaturedSection from './components/FeaturedSection';
import CategorySection from './components/CategorySection';
import RecentPostsSection from './components/RecentPostsSection';
import NewsletterSection from './components/NewsletterSection';
import BlogView from './components/BlogView';
import PostDetailView from './components/PostDetailView';
import CategoriesView from './components/CategoriesView';
import AboutView from './components/AboutView';
import ContactView from './components/ContactView';
import SearchModal from './components/SearchModal';
import AdminLayout from './components/admin/AdminLayout';
import AdminLogin from './components/admin/AdminLogin';
import AuthModal from './components/auth/AuthModal';
import MaterialShareModal from './components/materials/MaterialShareModal';

import { posts as initialPosts } from './data/posts';
import { categories as initialCategories } from './data/categories';
import { INITIAL_USERS } from './data/auth';

export default function App() {
  // Bootstrap registered users in localStorage if empty
  useEffect(() => {
    try {
      const stored = localStorage.getItem('ogreturkce_users');
      if (!stored) {
        localStorage.setItem('ogreturkce_users', JSON.stringify(INITIAL_USERS));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Currently logged-in teacher
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('ogreturkce_current_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  // Auth modal states
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login'); // 'login' or 'register'
  const [authLockMessage, setAuthLockMessage] = useState(null);

  // Material Share modal state
  const [materialShareModalOpen, setMaterialShareModalOpen] = useState(false);

  // Global toast
  const [toastMessage, setToastMessage] = useState(null);
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Load posts and categories from localStorage if present
  const [posts, setPosts] = useState(() => {
    try {
      const saved = localStorage.getItem('ogreturkce_posts');
      return saved ? JSON.parse(saved) : initialPosts;
    } catch {
      return initialPosts;
    }
  });

  const [categories, setCategories] = useState(() => {
    try {
      const saved = localStorage.getItem('ogreturkce_categories');
      return saved ? JSON.parse(saved) : initialCategories;
    } catch {
      return initialCategories;
    }
  });

  // Check if current URL path is /admin
  const [isAdmin, setIsAdmin] = useState(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      return path === '/admin' || path === '/admin/';
    }
    return false;
  });

  // Admin authentication state & credentials
  const [adminConfig, setAdminConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('ogreturkce_admin_config');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          username: parsed.username || 'admin',
          password: parsed.password || 'ogreturkce2024'
        };
      }
    } catch {
      // ignore
    }
    return { username: 'admin', password: 'ogreturkce2024' };
  });

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    try {
      return localStorage.getItem('ogreturkce_admin_authenticated') === 'true';
    } catch {
      return false;
    }
  });

  const handleAdminLoginSuccess = () => {
    setIsAdminAuthenticated(true);
    try {
      localStorage.setItem('ogreturkce_admin_authenticated', 'true');
    } catch (e) {
      console.error(e);
    }
    showToast('Yönetici girişi başarılı. Hoş geldiniz!');
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    try {
      localStorage.removeItem('ogreturkce_admin_authenticated');
    } catch (e) {
      console.error(e);
    }
    showToast('Yönetici oturumu güvenli şekilde kapatıldı.');
  };

  const handleSaveAdminConfig = (newConfig) => {
    setAdminConfig(newConfig);
    try {
      localStorage.setItem('ogreturkce_admin_config', JSON.stringify(newConfig));
    } catch (e) {
      console.error(e);
    }
  };

  const [activePage, setActivePage] = useState('home'); // 'home', 'blog', 'categories', 'about', 'contact', 'post-detail'
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);

  // Sync with browser URL changes (/admin)
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname.toLowerCase();
      if (path === '/admin' || path === '/admin/') {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  // Auth Handlers
  const handleOpenAuthModal = (mode = 'login', lockMsg = null) => {
    setAuthModalMode(mode);
    setAuthLockMessage(lockMsg);
    setAuthModalOpen(true);
  };

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('ogreturkce_current_user', JSON.stringify(user));
    } catch (e) {
      console.error(e);
    }
    showToast(`Hoş geldiniz, ${user.name}! Başarıyla giriş yaptınız.`);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('ogreturkce_current_user');
    } catch (e) {
      console.error(e);
    }
    showToast('Oturumunuz güvenli şekilde kapatıldı.');
  };

  // MEMBER-ONLY Material Share trigger
  const handleOpenMaterialShare = () => {
    if (!currentUser) {
      // Prompt auth with member-only lock message
      handleOpenAuthModal(
        'login', 
        'Materyal paylaşımı yalnızca kayıtlı öğretmen üyelerimize açıktır. Lütfen giriş yapın veya ücretsiz üye olun.'
      );
    } else {
      // Open share modal
      setMaterialShareModalOpen(true);
    }
  };

  // When member shares a material, automatically add as a new post/material
  const handleMaterialShared = (newMaterial) => {
    const today = new Date();
    const formattedDate = `${today.getDate()} ${
      ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'][today.getMonth()]
    } ${today.getFullYear()}`;

    const catObj = categories.find(c => c.slug === newMaterial.categorySlug) || categories[0];

    const newPost = {
      id: `paylasim-${Date.now()}`,
      slug: `paylasim-${Date.now()}`,
      title: newMaterial.title,
      coverImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80',
      category: catObj.name,
      categorySlug: catObj.slug,
      categoryColor: catObj.badgeColor || 'bg-teal-50 text-teal-800 border-teal-200',
      date: formattedDate,
      readTime: '4 dk okuma',
      featured: false,
      author: {
        name: currentUser.name,
        role: currentUser.branch,
        avatar: currentUser.avatar,
        bio: `${currentUser.school} bünyesinde görev yapan Türkçe öğretmeni.`
      },
      excerpt: newMaterial.description.slice(0, 140) + '...',
      content: `## ${newMaterial.title}\n\n**Sınıf Kademesi:** ${newMaterial.grade}\n**Paylaşan:** ${currentUser.name} (${currentUser.school})\n\n### Sınıf İçi Uygulama Yönergesi\n\n${newMaterial.description}\n\n> "Bu materyal kayıtlı zümre üyemiz tarafından öğretmenlerimizin sınıflarında ücretsiz kullanması için paylaşılmıştır."`,
      tags: ['Çalışma Kağıdı', 'Zümre Paylaşımı', newMaterial.grade]
    };

    const updated = [newPost, ...posts];
    setPosts(updated);
    try {
      localStorage.setItem('ogreturkce_posts', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    showToast('Materyaliniz zümre arşivine eklendi ve yayına alındı!');
  };

  // Enter admin mode
  const handleGoToAdmin = () => {
    if (window.location.pathname !== '/admin') {
      window.history.pushState({}, '', '/admin');
    }
    setIsAdmin(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Exit admin mode back to public site
  const handleExitAdmin = () => {
    if (window.location.pathname === '/admin' || window.location.pathname === '/admin/') {
      window.history.pushState({}, '', '/');
    }
    setIsAdmin(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset to initial sample contents
  const handleResetDefaults = () => {
    if (window.confirm('Tüm içerikler başlangıçtaki örnek Türkçe zümre yazılarına ve kategorilerine sıfırlansın mı?')) {
      setPosts(initialPosts);
      setCategories(initialCategories);
      localStorage.setItem('ogreturkce_posts', JSON.stringify(initialPosts));
      localStorage.setItem('ogreturkce_categories', JSON.stringify(initialCategories));
      showToast('İçerikler varsayılan zümre yazılarına sıfırlandı.');
    }
  };

  // Navigate to post detail
  const handleSelectPost = (post) => {
    setSelectedPost(post);
    setActivePage('post-detail');
    setIsAdmin(false);
    if (window.location.pathname === '/admin') {
      window.history.pushState({}, '', '/');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navigate to category
  const handleSelectCategory = (catSlug) => {
    setSelectedCategory(catSlug);
    setActivePage('blog');
    setIsAdmin(false);
    if (window.location.pathname === '/admin') {
      window.history.pushState({}, '', '/');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Back from post detail
  const handleBackFromDetail = () => {
    setActivePage('blog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render Admin View if on /admin (Protected by Admin Authentication)
  if (isAdmin) {
    if (!isAdminAuthenticated) {
      return (
        <AdminLogin
          onLoginSuccess={handleAdminLoginSuccess}
          onExitToSite={handleExitAdmin}
          adminConfig={adminConfig}
          onUpdateAdminConfig={handleSaveAdminConfig}
        />
      );
    }

    return (
      <AdminLayout
        posts={posts}
        setPosts={setPosts}
        categories={categories}
        setCategories={setCategories}
        onExitAdmin={handleExitAdmin}
        onAdminLogout={handleAdminLogout}
        adminConfig={adminConfig}
        onSaveAdminConfig={handleSaveAdminConfig}
        onViewLivePost={handleSelectPost}
        onResetDefaults={handleResetDefaults}
      />
    );
  }

  // Render Public Website
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans text-slate-800">
      
      {/* Top Navbar with Auth Controls */}
      <Navbar
        activePage={activePage === 'post-detail' ? 'blog' : activePage}
        setActivePage={(page) => {
          setActivePage(page);
          if (page === 'blog') setSelectedCategory(null);
        }}
        onOpenSearch={() => setSearchOpen(true)}
        currentUser={currentUser}
        onOpenAuthModal={handleOpenAuthModal}
        onLogout={handleLogout}
        onOpenMaterialShare={handleOpenMaterialShare}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        {activePage === 'home' && (
          <>
            {/* Hero Section */}
            <Hero
              onExploreClick={() => setActivePage('blog')}
              onCategoryClick={handleSelectCategory}
              onOpenSearch={() => setSearchOpen(true)}
            />

            {/* Öne Çıkan İçerikler */}
            <FeaturedSection
              posts={posts}
              onSelectPost={handleSelectPost}
              onSelectCategory={handleSelectCategory}
            />

            {/* Kategoriler */}
            <CategorySection
              categories={categories}
              onSelectCategory={handleSelectCategory}
              onNavigateToCategories={() => {
                setActivePage('categories');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Son Eklenen Blog Yazıları */}
            <RecentPostsSection
              posts={posts}
              onSelectPost={handleSelectPost}
              onSelectCategory={handleSelectCategory}
              onNavigateToBlog={() => {
                setActivePage('blog');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Newsletter Call to Action */}
            <NewsletterSection />
          </>
        )}

        {activePage === 'blog' && (
          <BlogView
            posts={posts}
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            onSelectPost={handleSelectPost}
          />
        )}

        {activePage === 'categories' && (
          <CategoriesView
            categories={categories}
            posts={posts}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            onSelectPost={handleSelectPost}
          />
        )}

        {activePage === 'about' && (
          <AboutView
            onNavigateToContact={() => {
              setActivePage('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activePage === 'contact' && (
          <ContactView 
            currentUser={currentUser}
            onOpenAuthModal={handleOpenAuthModal}
          />
        )}

        {activePage === 'post-detail' && selectedPost && (
          <PostDetailView
            post={selectedPost}
            allPosts={posts}
            onBack={handleBackFromDetail}
            onSelectPost={handleSelectPost}
            onSelectCategory={handleSelectCategory}
          />
        )}
      </main>

      {/* Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        posts={posts}
        onSelectPost={handleSelectPost}
      />

      {/* Teacher Authentication Modal (Login / Register) */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => {
          setAuthModalOpen(false);
          setAuthLockMessage(null);
        }}
        onLoginSuccess={handleLoginSuccess}
        initialMode={authModalMode}
        lockMessage={authLockMessage}
      />

      {/* Member-Only Material Share Modal */}
      <MaterialShareModal
        isOpen={materialShareModalOpen}
        onClose={() => setMaterialShareModalOpen(false)}
        currentUser={currentUser}
        categories={categories}
        onMaterialShared={handleMaterialShared}
      />

      {/* Global Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-slate-700 animate-fadeIn">
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
          <span className="text-xs sm:text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Footer with Admin Access Link */}
      <Footer
        onNavigate={(page) => {
          setActivePage(page);
          if (page === 'blog') setSelectedCategory(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectCategory={handleSelectCategory}
        onGoToAdmin={handleGoToAdmin}
      />
    </div>
  );
}

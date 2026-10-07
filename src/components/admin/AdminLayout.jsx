import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  FolderOpen, 
  ArrowLeft, 
  BookOpen, 
  ExternalLink,
  Plus,
  CheckCircle2,
  Sparkles,
  Menu,
  X,
  KeyRound,
  LogOut
} from 'lucide-react';
import AdminDashboard from './AdminDashboard';
import AdminPosts from './AdminPosts';
import AdminCategories from './AdminCategories';
import AdminPostFormModal from './AdminPostFormModal';
import AdminPasswordModal from './AdminPasswordModal';

export default function AdminLayout({ 
  posts, 
  setPosts, 
  categories, 
  setCategories, 
  onExitAdmin, 
  onAdminLogout,
  adminConfig,
  onSaveAdminConfig,
  onViewLivePost,
  onResetDefaults 
}) {
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'posts', 'categories'
  const [modalOpen, setModalOpen] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [postToEdit, setPostToEdit] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Open modal for new post
  const handleOpenNewPost = () => {
    setPostToEdit(null);
    setModalOpen(true);
  };

  // Open modal to edit post
  const handleEditPost = (post) => {
    setPostToEdit(post);
    setModalOpen(true);
  };

  // Save (Create or Update) post
  const handleSavePost = (savedPost) => {
    const exists = posts.some(p => p.id === savedPost.id);
    let updated;
    if (exists) {
      updated = posts.map(p => p.id === savedPost.id ? savedPost : p);
      showToast('Blog yazısı başarıyla güncellendi!');
    } else {
      updated = [savedPost, ...posts];
      showToast('Yeni blog yazısı başarıyla eklendi ve yayına alındı!');
    }
    setPosts(updated);
    localStorage.setItem('ogreturkce_posts', JSON.stringify(updated));
  };

  // Delete post
  const handleDeletePost = (postId) => {
    const updated = posts.filter(p => p.id !== postId);
    setPosts(updated);
    localStorage.setItem('ogreturkce_posts', JSON.stringify(updated));
    showToast('Blog yazısı başarıyla silindi.');
  };

  // Add category
  const handleAddCategory = (newCat) => {
    const updated = [...categories, newCat];
    setCategories(updated);
    localStorage.setItem('ogreturkce_categories', JSON.stringify(updated));
    showToast(`"${newCat.name}" kategorisi başarıyla eklendi!`);
  };

  // Delete category
  const handleDeleteCategory = (catSlug) => {
    const updated = categories.filter(c => c.slug !== catSlug);
    setCategories(updated);
    localStorage.setItem('ogreturkce_categories', JSON.stringify(updated));
    showToast('Kategori başarıyla silindi.');
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'posts', label: 'Blog Yazıları', icon: FileText, badge: posts.length },
    { id: 'categories', label: 'Kategoriler', icon: FolderOpen, badge: categories.length },
  ];

  return (
    <div className="min-h-screen bg-slate-100/90 text-slate-800 flex flex-col font-sans">
      
      {/* Top Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 lg:hidden"
            >
              {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Brand */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-teal-700 flex items-center justify-center text-white shadow-sm">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold text-base sm:text-lg text-slate-900 tracking-tight">
                  öğre<span className="text-teal-500 font-black text-[1.28em] inline-block -translate-y-0.5 px-0.5 drop-shadow-xs">T</span>ürkçe
                </span>
                <span className="text-xs font-semibold text-teal-800 ml-2 px-2 py-0.5 rounded-full bg-teal-50 border border-teal-200">
                  Öğretmen Yönetim Paneli
                </span>
              </div>
            </div>
          </div>

          {/* Action buttons: Add Post, Change Password, View Site, Logout */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleOpenNewPost}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-50 text-teal-800 hover:bg-teal-100 border border-teal-200 text-xs font-bold transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Yazı Ekle</span>
            </button>

            <button
              onClick={() => setPasswordModalOpen(true)}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors border border-slate-200"
              title="Yönetici Şifresini Değiştir"
            >
              <KeyRound className="w-4 h-4" />
            </button>

            <button
              onClick={onExitAdmin}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-teal-700 text-white text-xs font-semibold transition-all shadow-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Siteyi Gör</span>
            </button>

            <button
              onClick={onAdminLogout}
              className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 transition-colors border border-rose-200/60"
              title="Yönetici Oturumunu Kapat"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

        </div>
      </header>

      {/* Main Body with Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full flex gap-8">
        
        {/* Desktop Sidebar */}
        <aside className="w-64 shrink-0 hidden lg:block space-y-6">
          <div className="bg-white rounded-3xl p-4 border border-slate-200/90 shadow-sm space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 py-2 block">
              Menü
            </span>
            {navItems.map((item) => {
              const IconComp = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                    isActive
                      ? 'bg-teal-700 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <IconComp className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Teacher Info Box */}
          <div className="bg-teal-50/70 border border-teal-200 rounded-3xl p-5 text-teal-900">
            <h4 className="text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5 text-teal-800">
              <Sparkles className="w-3.5 h-3.5" />
              Öğretmen İpucu
            </h4>
            <p className="text-xs text-teal-800/90 leading-relaxed">
              Eklediğiniz her yazı anında ana sayfa akışında ve arama sonuçlarında yerini alır. Görsel bağlantısı seçmek için hazır şablon butonlarını kullanabilirsiniz.
            </p>
          </div>
        </aside>

        {/* Mobile Slide Drawer Menu */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-40 lg:hidden flex">
            <div 
              className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <div className="relative bg-white w-72 max-w-xs p-6 shadow-2xl flex flex-col justify-between z-50">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <span className="font-bold text-slate-800">Yönetim Menüsü</span>
                  <button onClick={() => setMobileSidebarOpen(false)}>
                    <X className="w-5 h-5 text-slate-400" />
                  </button>
                </div>
                <div className="space-y-1">
                  {navItems.map((item) => {
                    const IconComp = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.id);
                          setMobileSidebarOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold ${
                          isActive
                            ? 'bg-teal-700 text-white shadow-sm'
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <IconComp className="w-4 h-4" />
                          <span>{item.label}</span>
                        </div>
                        {item.badge !== undefined && (
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                onClick={onExitAdmin}
                className="w-full py-3 rounded-2xl bg-slate-900 text-white text-xs font-bold flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Siteyi Görüntüle</span>
              </button>
            </div>
          </div>
        )}

        {/* Content Area */}
        <main className="flex-1 min-w-0">
          {activeTab === 'dashboard' && (
            <AdminDashboard
              posts={posts}
              categories={categories}
              onNavigateTab={(tab) => setActiveTab(tab)}
              onOpenNewPostModal={handleOpenNewPost}
              onEditPost={handleEditPost}
              onResetDefaults={onResetDefaults}
            />
          )}

          {activeTab === 'posts' && (
            <AdminPosts
              posts={posts}
              categories={categories}
              onOpenNewPostModal={handleOpenNewPost}
              onEditPost={handleEditPost}
              onDeletePost={handleDeletePost}
              onViewLivePost={onViewLivePost}
            />
          )}

          {activeTab === 'categories' && (
            <AdminCategories
              categories={categories}
              posts={posts}
              onAddCategory={handleAddCategory}
              onDeleteCategory={handleDeleteCategory}
            />
          )}
        </main>

      </div>

      {/* Add / Edit Post Modal */}
      <AdminPostFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSavePost={handleSavePost}
        postToEdit={postToEdit}
        categories={categories}
      />

      {/* Change Password Modal */}
      <AdminPasswordModal
        isOpen={passwordModalOpen}
        onClose={() => setPasswordModalOpen(false)}
        currentConfig={adminConfig}
        onSaveConfig={(newCfg) => {
          onSaveAdminConfig(newCfg);
          showToast('Yönetici şifreniz başarıyla güncellendi!');
        }}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-xl flex items-center gap-3 border border-slate-700 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0" />
          <span className="text-xs sm:text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

    </div>
  );
}

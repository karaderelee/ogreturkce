import React, { useState, useMemo } from 'react';
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  ExternalLink, 
  Clock, 
  Calendar,
  Filter,
  Check,
  AlertCircle
} from 'lucide-react';

export default function AdminPosts({ 
  posts, 
  categories, 
  onOpenNewPostModal, 
  onEditPost, 
  onDeletePost,
  onViewLivePost 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [postToDelete, setPostToDelete] = useState(null);

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesCat = selectedCategory === 'all' || post.categorySlug === selectedCategory;
      const matchesSearch = searchQuery.trim() === '' || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author?.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [posts, selectedCategory, searchQuery]);

  const confirmDelete = () => {
    if (postToDelete) {
      onDeletePost(postToDelete.id);
      setPostToDelete(null);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Türkçe Blog Yazıları
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Sitede yayınlanan tüm içerikleri listeleyin, düzenleyin veya yenilerini ekleyin.
          </p>
        </div>

        <button
          onClick={onOpenNewPostModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-sm shadow-md transition-all active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Yeni Yazı Ekle</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
        
        {/* Search */}
        <div className="relative w-full sm:max-w-xs">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Başlık veya yazar ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50 focus:bg-white"
          />
        </div>

        {/* Category filter */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          <span className="text-xs text-slate-400 font-medium">Kategori:</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
          >
            <option value="all">Tüm Kategoriler ({posts.length})</option>
            {categories.map((c) => (
              <option key={c.id} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* Posts Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
        {filteredPosts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50/80 text-slate-400 text-[11px] font-bold uppercase tracking-wider border-b border-slate-100">
                <tr>
                  <th className="py-3.5 px-6">Yazı & Kapak</th>
                  <th className="py-3.5 px-4">Kategori</th>
                  <th className="py-3.5 px-4">Yazar</th>
                  <th className="py-3.5 px-4">Tarih</th>
                  <th className="py-3.5 px-6 text-right">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-slate-50/60 transition-colors group">
                    
                    {/* Title and Thumbnail */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={post.coverImage}
                          alt=""
                          className="w-12 h-12 rounded-xl object-cover shrink-0 bg-slate-100 border border-slate-200/60"
                        />
                        <div>
                          <span className="font-bold text-slate-900 line-clamp-1 group-hover:text-teal-700 transition-colors">
                            {post.title}
                          </span>
                          <span className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                            {post.excerpt}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-200">
                        {post.category}
                      </span>
                    </td>

                    {/* Author */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="text-xs font-semibold text-slate-800">
                        {post.author?.name}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {post.author?.role}
                      </div>
                    </td>

                    {/* Date */}
                    <td className="py-4 px-4 whitespace-nowrap text-xs text-slate-400">
                      {post.date}
                    </td>

                    {/* Actions: Edit, Delete, View */}
                    <td className="py-4 px-6 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onViewLivePost(post)}
                          className="p-2 rounded-xl text-slate-400 hover:text-teal-700 hover:bg-slate-100 transition-colors"
                          title="Sitede Görüntüle"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => onEditPost(post)}
                          className="p-2 rounded-xl text-teal-700 hover:bg-teal-50 transition-colors font-semibold"
                          title="Yazıyı Düzenle"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => setPostToDelete(post)}
                          className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 transition-colors"
                          title="Yazıyı Sil"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-slate-400">
            <p className="text-sm">Aradığınız kriterlere uygun yazı bulunamadı.</p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {postToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
          <div 
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4">
              <AlertCircle className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Yazıyı Silmek İstiyor musunuz?
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
              <strong>"{postToDelete.title}"</strong> başlıklı blog yazısı siteden kalıcı olarak kaldırılacaktır. Bu işlemi onaylıyor musunuz?
            </p>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setPostToDelete(null)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50"
              >
                Vazgeç
              </button>
              <button
                onClick={confirmDelete}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-sm transition-all"
              >
                Evet, Sil
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

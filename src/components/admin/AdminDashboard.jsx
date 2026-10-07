import React from 'react';
import { 
  FileText, 
  FolderOpen, 
  Plus, 
  ArrowRight, 
  Calendar, 
  User, 
  ExternalLink,
  Sparkles,
  RotateCcw
} from 'lucide-react';

export default function AdminDashboard({ 
  posts, 
  categories, 
  onNavigateTab, 
  onOpenNewPostModal, 
  onEditPost,
  onResetDefaults 
}) {
  const recentPosts = posts.slice(0, 5);

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-teal-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-700/60 text-teal-200 border border-teal-500/30 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-teal-300" />
            <span>öğreTürkçe Yönetim Masası</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            Hoş Geldiniz, Değerli Öğretmenimiz
          </h1>
          <p className="text-sm text-slate-300 max-w-xl">
            Buradan kolayca yeni Türkçe ders materyalleri ve LGS soru taktikleri ekleyebilir, mevcut yazılarınızı ve kategorilerinizi yönetebilirsiniz.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onOpenNewPostModal}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm shadow-md transition-all active:scale-95"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Yeni Yazı Ekle</span>
          </button>
        </div>
      </div>

      {/* Stats Cards - Dashboard Requirement */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Total Blog Posts */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Toplam Blog Yazısı
            </span>
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              {posts.length}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Sitede yayında olan Türkçe içeriği
            </p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
            <FileText className="w-7 h-7" />
          </div>
        </div>

        {/* Total Categories */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Toplam Kategori
            </span>
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              {categories.length}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Aktif Türkçe ders alanı
            </p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0">
            <FolderOpen className="w-7 h-7" />
          </div>
        </div>

        {/* Quick Help Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm flex flex-col justify-between sm:col-span-2 lg:col-span-1">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Hızlı İşlem
            </span>
            <h4 className="text-sm font-bold text-slate-800">
              Pratik ve Kolay Kullanım
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              Teknik bilgi gerekmez; yazı ekleyin, kaydedin ve anında sitede görün.
            </p>
          </div>
          <div className="pt-3 flex items-center justify-between border-t border-slate-100 mt-3">
            <button
              onClick={() => onNavigateTab('posts')}
              className="text-xs font-bold text-teal-700 hover:text-teal-800 inline-flex items-center gap-1"
            >
              Yazıları Yönet <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onResetDefaults}
              className="text-[11px] text-slate-400 hover:text-slate-600 inline-flex items-center gap-1"
              title="Örnek içerikleri geri yükler"
            >
              <RotateCcw className="w-3 h-3" />
              Sıfırla
            </button>
          </div>
        </div>

      </div>

      {/* Recent Posts Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Son Eklenen Blog Yazıları
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              En son yayınlanan veya güncellenen Türkçe materyalleri
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('posts')}
            className="text-xs font-bold text-teal-700 hover:text-teal-800 inline-flex items-center gap-1"
          >
            Tümünü Gör ({posts.length}) <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50/70 text-slate-400 text-[11px] font-bold uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="py-3.5 px-6">Yazı Başlığı</th>
                <th className="py-3.5 px-4">Kategori</th>
                <th className="py-3.5 px-4">Yazar</th>
                <th className="py-3.5 px-4">Tarih</th>
                <th className="py-3.5 px-6 text-right">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentPosts.map((post) => (
                <tr key={post.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={post.coverImage}
                        alt=""
                        className="w-10 h-10 rounded-xl object-cover shrink-0 bg-slate-100"
                      />
                      <span className="font-semibold text-slate-900 line-clamp-1 max-w-xs sm:max-w-md">
                        {post.title}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-200">
                      {post.category}
                    </span>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap text-xs text-slate-600 font-medium">
                    {post.author?.name || 'Anonim Öğretmen'}
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap text-xs text-slate-400">
                    {post.date}
                  </td>
                  <td className="py-4 px-6 text-right whitespace-nowrap">
                    <button
                      onClick={() => onEditPost(post)}
                      className="text-xs font-bold text-teal-700 hover:text-teal-900 px-3 py-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 transition-colors"
                    >
                      Düzenle
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

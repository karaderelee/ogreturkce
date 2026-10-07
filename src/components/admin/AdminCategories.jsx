import React, { useState } from 'react';
import { 
  FolderOpen, 
  Plus, 
  Trash2, 
  Sparkles, 
  AlertCircle,
  BookOpen,
  Laptop,
  GraduationCap,
  HeartHandshake
} from 'lucide-react';

const COLOR_PRESETS = [
  { label: 'Zümrüt Yeşili', badge: 'bg-emerald-100 text-emerald-800 border-emerald-200', iconBg: 'bg-emerald-50 text-emerald-600' },
  { label: 'İndigo / LGS Mavisi', badge: 'bg-indigo-100 text-indigo-800 border-indigo-200', iconBg: 'bg-indigo-50 text-indigo-600' },
  { label: 'Gül / Edebiyat', badge: 'bg-rose-100 text-rose-800 border-rose-200', iconBg: 'bg-rose-50 text-rose-600' },
  { label: 'Kehribar / Dil Bilgisi', badge: 'bg-amber-100 text-amber-800 border-amber-200', iconBg: 'bg-amber-50 text-amber-600' },
  { label: 'Teal / Dijital', badge: 'bg-teal-100 text-teal-800 border-teal-200', iconBg: 'bg-teal-50 text-teal-600' },
  { label: 'Mor / Yapay Zekâ', badge: 'bg-purple-100 text-purple-800 border-purple-200', iconBg: 'bg-purple-50 text-purple-600' },
];

export default function AdminCategories({ 
  categories, 
  posts, 
  onAddCategory, 
  onDeleteCategory 
}) {
  const [newCatName, setNewCatName] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');
  const [selectedColor, setSelectedColor] = useState(COLOR_PRESETS[0]);
  const [catToDelete, setCatToDelete] = useState(null);

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    // Generate slug from name
    const slug = newCatName
      .toLowerCase()
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '') || `kategori-${Date.now()}`;

    const newCategory = {
      id: slug,
      slug: slug,
      name: newCatName.trim(),
      description: newCatDesc.trim() || `${newCatName.trim()} alanındaki içerik ve etkinlikler.`,
      icon: 'BookOpen',
      badgeColor: selectedColor.badge,
      iconBg: selectedColor.iconBg,
      count: 0
    };

    onAddCategory(newCategory);
    setNewCatName('');
    setNewCatDesc('');
  };

  const confirmDelete = () => {
    if (catToDelete) {
      onDeleteCategory(catToDelete.slug);
      setCatToDelete(null);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Türkçe Ders Kategorileri
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Blog yazılarınızı gruplandıracak yeni tematik kategoriler ekleyin veya yönetin.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Form: Add New Category */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
            <Plus className="w-5 h-5 text-teal-600" />
            <h3 className="text-base font-bold text-slate-900">
              Yeni Kategori Ekle
            </h3>
          </div>

          <form onSubmit={handleAddSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Kategori Adı *
              </label>
              <input
                type="text"
                required
                placeholder="Örn: 7. Sınıf Fiilde Anlam & Kip"
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Kısa Açıklama
              </label>
              <textarea
                rows={3}
                placeholder="Bu kategoride hangi tür materyal ve yazılar yer alacak?"
                value={newCatDesc}
                onChange={(e) => setNewCatDesc(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Kategori Rengi
              </label>
              <div className="grid grid-cols-2 gap-2">
                {COLOR_PRESETS.map((color, i) => (
                  <button
                    type="button"
                    key={i}
                    onClick={() => setSelectedColor(color)}
                    className={`p-2 rounded-xl border text-xs font-semibold text-left transition-all flex items-center gap-2 ${
                      selectedColor.label === color.label
                        ? 'border-teal-600 bg-teal-50/50 text-teal-900 ring-1 ring-teal-500'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    <span className={`w-3.5 h-3.5 rounded-full ${color.iconBg.split(' ')[0]}`} />
                    <span className="truncate">{color.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Kategoriyi Kaydet</span>
            </button>
          </form>
        </div>

        {/* Right Table: Existing Categories */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">
              Mevcut Kategoriler ({categories.length})
            </h3>
            <span className="text-xs text-slate-400">
              Aktif kategoriler
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {categories.map((cat) => {
              const postCount = posts.filter(p => p.categorySlug === cat.slug).length;
              return (
                <div key={cat.id} className="p-5 flex items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                  <div className="flex items-start gap-3.5">
                    <div className={`w-10 h-10 rounded-xl ${cat.iconBg || 'bg-teal-50 text-teal-600'} flex items-center justify-center shrink-0 mt-0.5`}>
                      <FolderOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm font-bold text-slate-900">
                          {cat.name}
                        </h4>
                        <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-600">
                          {postCount} Yazı
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {cat.description}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setCatToDelete(cat)}
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors shrink-0"
                    title="Kategoriyi Sil"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Delete Confirmation Modal */}
      {catToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
          <div 
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4">
              <AlertCircle className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Kategoriyi Silmek İstiyor musunuz?
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
              <strong>"{catToDelete.name}"</strong> kategorisi silinecektir. (Bu kategorideki yazılar genel arşive aktarılır). Onaylıyor musunuz?
            </p>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setCatToDelete(null)}
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

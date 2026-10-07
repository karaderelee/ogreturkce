import React, { useState, useEffect } from 'react';
import { 
  X, 
  Image as ImageIcon, 
  Check, 
  Sparkles, 
  BookOpen, 
  User, 
  Tag, 
  HelpCircle,
  Eye
} from 'lucide-react';

const PRESET_IMAGES = [
  { label: 'Kitap & Paragraf', url: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Sınıf & Defter', url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Yazarlık & Kalem', url: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Teknoloji & Tahta', url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Kütüphane & Okuma', url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Ölçme & Test', url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80' },
];

export default function AdminPostFormModal({ 
  isOpen, 
  onClose, 
  onSavePost, 
  postToEdit, 
  categories 
}) {
  const [title, setTitle] = useState('');
  const [coverImage, setCoverImage] = useState(PRESET_IMAGES[0].url);
  const [categorySlug, setCategorySlug] = useState('');
  const [authorName, setAuthorName] = useState('Türkçe Öğretmeni');
  const [authorRole, setAuthorRole] = useState('Ortaokul Türkçe Öğretmeni');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [tagsInput, setTagsInput] = useState('Türkçe, LGS, Etkinlik');
  const [featured, setFeatured] = useState(false);
  const [readTime, setReadTime] = useState('5 dk okuma');

  // Load existing post if editing
  useEffect(() => {
    if (postToEdit) {
      setTitle(postToEdit.title || '');
      setCoverImage(postToEdit.coverImage || PRESET_IMAGES[0].url);
      setCategorySlug(postToEdit.categorySlug || (categories[0]?.slug || ''));
      setAuthorName(postToEdit.author?.name || 'Türkçe Öğretmeni');
      setAuthorRole(postToEdit.author?.role || 'Ortaokul Türkçe Öğretmeni');
      setExcerpt(postToEdit.excerpt || '');
      setContent(postToEdit.content || '');
      setTagsInput(postToEdit.tags?.join(', ') || 'Türkçe');
      setFeatured(!!postToEdit.featured);
      setReadTime(postToEdit.readTime || '5 dk okuma');
    } else {
      // Default new post values
      setTitle('');
      setCoverImage(PRESET_IMAGES[0].url);
      setCategorySlug(categories[0]?.slug || 'lgs-turkce');
      setAuthorName('Türkçe Öğretmeni');
      setAuthorRole('Ortaokul Türkçe Öğretmeni');
      setExcerpt('');
      setContent(`## Giriş: Konunun Önemi\n\nBu etkinlikte öğrencilerimizin dikkatini çekmek ve kazanımı somutlaştırmak için...\n\n### 1. Sınıf İçi Uygulama Adımları\n\n* Adım 1: Öğrencilere yönergeyi açıklayın.\n* Adım 2: 10 dakikalık grup çalışması yapın.\n\n> "Türkçe dersinde kalıcı öğrenme, öğrencinin bizzat ürettiği cümleyle başlar."`);
      setTagsInput('Türkçe, Etkinlik, Ortaokul');
      setFeatured(false);
      setReadTime('5 dk okuma');
    }
  }, [postToEdit, categories, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const selectedCatObj = categories.find(c => c.slug === categorySlug) || categories[0];

    const today = new Date();
    const formattedDate = `${today.getDate()} ${
      ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'][today.getMonth()]
    } ${today.getFullYear()}`;

    const tagsArray = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    const postData = {
      id: postToEdit?.id || `turkce-yazi-${Date.now()}`,
      slug: postToEdit?.slug || `turkce-yazi-${Date.now()}`,
      title: title.trim(),
      coverImage: coverImage.trim() || PRESET_IMAGES[0].url,
      category: selectedCatObj.name,
      categorySlug: selectedCatObj.slug,
      categoryColor: selectedCatObj.badgeColor || 'bg-teal-50 text-teal-800 border-teal-200',
      date: postToEdit?.date || formattedDate,
      readTime: readTime || '5 dk okuma',
      featured: featured,
      author: {
        name: authorName.trim() || 'Türkçe Öğretmeni',
        role: authorRole.trim() || 'Ortaokul Türkçe Öğretmeni',
        avatar: postToEdit?.author?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        bio: postToEdit?.author?.bio || 'Ortaokul Türkçe zümre öğretmeni.'
      },
      excerpt: excerpt.trim() || title.trim(),
      content: content.trim(),
      tags: tagsArray.length > 0 ? tagsArray : ['Türkçe']
    };

    onSavePost(postData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/60 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div 
        className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col my-8 max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {postToEdit ? 'Blog Yazısını Düzenle' : 'Yeni Türkçe Blog Yazısı Ekle'}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Tüm alanları doldurarak yazınızı yayına alabilirsiniz
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Yazı Başlığı *
            </label>
            <input
              type="text"
              required
              placeholder="Örn: 8. Sınıf Cümlenin Ögeleri Konusunu 3 Adımda Kavratma Yolu"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
            />
          </div>

          {/* Category & Read Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Kategori *
              </label>
              <select
                required
                value={categorySlug}
                onChange={(e) => setCategorySlug(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Tahmini Okuma Süresi
              </label>
              <input
                type="text"
                placeholder="Örn: 5 dk okuma"
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          {/* Author fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Yazar Adı Soyadı *
              </label>
              <input
                type="text"
                required
                placeholder="Örn: Hakan Yıldırım"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Yazar Unvanı / Branşı
              </label>
              <input
                type="text"
                placeholder="Örn: Türkçe Öğretmeni & LGS Koordinatörü"
                value={authorRole}
                onChange={(e) => setAuthorRole(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          {/* Cover Image with Presets and Preview */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700">
              Kapak Görseli *
            </label>
            <input
              type="url"
              required
              placeholder="Görsel bağlantısı (https://...)"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono text-xs"
            />
            
            {/* Quick Presets */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-[11px] text-slate-400 font-medium">Hızlı Görsel Seç:</span>
              {PRESET_IMAGES.map((preset, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setCoverImage(preset.url)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${
                    coverImage === preset.url
                      ? 'bg-teal-700 text-white border-teal-700'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border-slate-200'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>

            {/* Live Thumbnail Preview */}
            {coverImage && (
              <div className="mt-2 relative rounded-2xl overflow-hidden aspect-[21/9] bg-slate-100 max-h-40 border border-slate-200">
                <img
                  src={coverImage}
                  alt="Önizleme"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = PRESET_IMAGES[0].url;
                  }}
                />
                <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/60 text-white text-[10px] font-semibold">
                  Kapak Önizleme
                </span>
              </div>
            )}
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Kısa Özet (Kartlarda görünen açıklama)
            </label>
            <textarea
              rows={2}
              placeholder="Yazının kartlarda görünecek 1-2 cümlelik kısa pedagojik özeti..."
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Content */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Yazı İçeriği *
              </label>
              <span className="text-[11px] text-slate-400">
                Başlık için <code className="bg-slate-100 px-1 py-0.5 rounded text-teal-800">## Başlık</code>, liste için <code className="bg-slate-100 px-1 py-0.5 rounded text-teal-800">* Madde</code> kullanabilirsiniz
              </span>
            </div>
            <textarea
              required
              rows={8}
              placeholder="Yazınızın detaylı anlatımı, öğretmen ipuçları, sınıf yönergeleri..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 font-sans leading-relaxed"
            />
          </div>

          {/* Tags & Featured Checkbox */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center pt-2 border-t border-slate-100">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Etiketler (Virgülle ayırın)
              </label>
              <input
                type="text"
                placeholder="Örn: Paragraf, LGS, 8. Sınıf, Etkinlik"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>

            <div className="flex items-center gap-2 pt-4 sm:pt-0">
              <input
                type="checkbox"
                id="featuredCheck"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500 border-slate-300 cursor-pointer"
              />
              <label htmlFor="featuredCheck" className="text-xs font-semibold text-slate-700 cursor-pointer">
                Ana sayfada "Öne Çıkanlar" vitrininde göster
              </label>
            </div>
          </div>

          {/* Footer Submit Buttons */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 text-sm font-semibold transition-colors"
            >
              İptal
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-sm font-bold shadow-md transition-all active:scale-95"
            >
              {postToEdit ? 'Değişiklikleri Kaydet' : 'Yazıyı Yayınla'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}

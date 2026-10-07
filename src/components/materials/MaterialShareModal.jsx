import React, { useState } from 'react';
import { 
  X, 
  UploadCloud, 
  CheckCircle2, 
  FileText, 
  Sparkles, 
  Send, 
  BookOpen, 
  ShieldCheck,
  Tag,
  Download
} from 'lucide-react';

export default function MaterialShareModal({ 
  isOpen, 
  onClose, 
  currentUser, 
  categories, 
  onMaterialShared 
}) {
  const [title, setTitle] = useState('');
  const [grade, setGrade] = useState('8. Sınıf (LGS)');
  const [categorySlug, setCategorySlug] = useState('ders-materyalleri');
  const [materialType, setMaterialType] = useState('calisma-kagidi');
  const [description, setDescription] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !currentUser) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const newMaterial = {
      id: `mat-${Date.now()}`,
      title: title.trim(),
      grade: grade,
      categorySlug: categorySlug,
      materialType: materialType,
      description: description.trim(),
      fileUrl: fileUrl.trim() || 'https://drive.google.com/ornek-materyal-indir.pdf',
      author: {
        name: currentUser.name,
        branch: currentUser.branch,
        school: currentUser.school,
        avatar: currentUser.avatar
      },
      date: 'Bugün',
      approved: true
    };

    onMaterialShared(newMaterial);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
      setTitle('');
      setDescription('');
      setFileUrl('');
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col my-8 max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-teal-800 to-slate-900 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-400/30 text-xs font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Onaylı Öğretmen Materyal Paylaşım Formu</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            Türkçe Zümresiyle Materyal Paylaşın
          </h2>

          <div className="mt-3 flex items-center gap-2.5 text-xs text-teal-100 bg-white/10 p-2.5 rounded-xl border border-white/15">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-7 h-7 rounded-full object-cover ring-1 ring-white/30"
            />
            <div>
              <span className="font-bold text-white">{currentUser.name}</span>
              <span className="text-teal-200 ml-1.5">({currentUser.branch} · {currentUser.school})</span>
            </div>
          </div>
        </div>

        {/* Modal Form */}
        <div className="p-6 overflow-y-auto flex-1">
          {submitted ? (
            <div className="py-12 text-center space-y-3 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Materyaliniz Başarıyla Paylaşıldı!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Değerli zümremiz, katkınız için teşekkür ederiz. Çalışma yaprağınız Türkçe öğretmenleri arşivine eklenmiştir.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Title */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Materyal Başlığı *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Örn: 8. Sınıf Cümlenin Ögeleri Dedektiflik Çalışma Kağıdı (PDF)"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
                />
              </div>

              {/* Grade & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Sınıf Kademesi
                  </label>
                  <select
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
                  >
                    <option value="5. Sınıf">5. Sınıf Türkçe</option>
                    <option value="6. Sınıf">6. Sınıf Türkçe</option>
                    <option value="7. Sınıf">7. Sınıf Türkçe</option>
                    <option value="8. Sınıf (LGS)">8. Sınıf (LGS Hazırlık)</option>
                    <option value="Tüm Kademeler">Tüm Kademeler (5-8)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Kategori
                  </label>
                  <select
                    value={categorySlug}
                    onChange={(e) => setCategorySlug(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Material Type */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Materyal Türü
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'calisma-kagidi', label: 'Çalışma Kağıdı' },
                    { id: 'lgs-deneme', label: 'LGS Deneme / Soru' },
                    { id: 'oyun-karti', label: 'Eğitsel Oyun Kartı' },
                    { id: 'ders-plani', label: 'Ders Planı & Şablon' }
                  ].map((t) => (
                    <button
                      type="button"
                      key={t.id}
                      onClick={() => setMaterialType(t.id)}
                      className={`py-2 px-2.5 rounded-xl text-xs font-semibold border transition-all text-center ${
                        materialType === t.id
                          ? 'border-teal-700 bg-teal-50 text-teal-900 font-bold'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description & Usage */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Sınıf İçi Uygulama Yönergesi ve Açıklama *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Materyalin nasıl uygulanacağı, öğrencilere kazandıracağı beceriler ve zümre meslektaşlarınıza tavsiyeleriniz..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 leading-relaxed"
                />
              </div>

              {/* File / Cloud Link */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Materyal İndirme / Dosya Bağlantısı (Google Drive, PDF, Canva vb.)
                </label>
                <input
                  type="text"
                  placeholder="https://drive.google.com/... veya doğrudan dosya linki"
                  value={fileUrl}
                  onChange={(e) => setFileUrl(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">
                  İpucu: Dosyanızı Google Drive veya MEB bulutuna yükleyip bağlantısını buraya yapıştırabilirsiniz.
                </span>
              </div>

              {/* Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95 flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Materyali Zümreyle Paylaş</span>
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
}

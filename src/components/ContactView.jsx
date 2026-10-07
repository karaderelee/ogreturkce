import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Send, 
  CheckCircle2, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Clock, 
  Feather, 
  BookOpen,
  Lock,
  ShieldCheck,
  LogIn
} from 'lucide-react';

export default function ContactView({ currentUser, onOpenAuthModal }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    grade: '8-lgs',
    topic: 'calisma-kagidi',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  // Sync form with logged in teacher
  useEffect(() => {
    if (currentUser) {
      setFormData(prev => ({
        ...prev,
        name: currentUser.name || prev.name,
        email: currentUser.email || prev.email
      }));
    }
  }, [currentUser]);

  const isMaterialTopic = formData.topic === 'calisma-kagidi' || formData.topic === 'lgs-soru';

  const handleSubmit = (e) => {
    e.preventDefault();

    // If trying to share material without login, prompt auth
    if (isMaterialTopic && !currentUser) {
      if (onOpenAuthModal) {
        onOpenAuthModal('login', 'Materyal ve soru paylaşımı yalnızca kayıtlı öğretmen üyelerimize açıktır.');
      }
      return;
    }

    setSubmitted(true);
    setTimeout(() => {
      setFormData(prev => ({
        ...prev,
        message: ''
      }));
    }, 2000);
  };

  const faqs = [
    {
      q: 'öğreTürkçe üzerindeki çalışma kağıtlarını ve LGS sorularını sınıfta çoğaltabilir miyim?',
      a: 'Kesinlikle evet! Sitemizdeki tüm çalışma yaprakları, LGS taktik föyleri ve dil bilgisi etkinlikleri ortaokul Türkçe öğretmenlerinin sınıflarında çıktı alıp öğrencilerine ücretsiz dağıtması için hazırlanmıştır.'
    },
    {
      q: 'Kendi hazırladığım bir etkinliği veya LGS deneme sorusunu nasıl paylaşabilirim?',
      a: 'Materyal paylaşımı zümre kalitesini korumak adına yalnızca kayıtlı öğretmen üyelerimize açıktır. Ücretsiz üye olarak yukarıdaki "Materyal Paylaş" butonundan kendi materyalinizi doğrudan paylaşabilirsiniz.'
    },
    {
      q: 'İçerikler MEB 2024 Türkiye Yüzyılı Maarif Modeli Türkçe müfredatına uygun mu?',
      a: 'Evet. Tüm okuma metinleri, anlama soruları ve dil bilgisi tasnifleri güncel MEB Ortaokul Türkçe Öğretim Programı ve Maarif Modeli beceri temelli yaklaşımlarına tam uyumludur.'
    },
    {
      q: 'Çalışma kağıtlarını Word (düzenlenebilir) formatında indirebiliyor muyuz?',
      a: 'Yazı detaylarındaki indirme alanlarında hem yazdırılmaya hazır yüksek çözünürlüklü PDF hem de zümre öğretmenlerimizin kendi okuluna göre uyarlayabileceği şablon seçenekleri sunulmaktadır.'
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Feather className="w-3.5 h-3.5" />
            <span>Türkçe Zümre İletişimi</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            Türkçe Öğretmenleri Odası
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">
            Sorularınız, zümre önerileriniz, LGS soru katkılarınız veya materyal paylaşımlarınız için bize her zaman yazabilirsiniz.
          </p>
        </div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                Zümre İletişim Kanalları
              </h3>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs font-semibold text-slate-400">E-Posta Adresi</span>
                  <span className="text-sm font-bold text-slate-800">zumre@ogreturkce.org</span>
                  <p className="text-xs text-slate-500 mt-0.5">Türkçe öğretmenleri ve materyal paylaşımları için</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs font-semibold text-slate-400">Dönüş Süresi</span>
                  <span className="text-sm font-bold text-slate-800">24-48 Saat</span>
                  <p className="text-xs text-slate-500 mt-0.5">Tüm iletiler Türkçe zümre öğretmenlerimizce yanıtlanır</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs font-semibold text-slate-400">Materyal Paylaşımı</span>
                  <span className="text-sm font-bold text-slate-800">Üyelere Özel</span>
                  <p className="text-xs text-slate-500 mt-0.5">Yalnızca kayıtlı öğretmenler materyal paylaşabilir</p>
                </div>
              </div>
            </div>

            {/* Quote Card */}
            <div className="bg-gradient-to-br from-teal-900 via-slate-900 to-slate-950 rounded-3xl p-6 text-white shadow-sm">
              <div className="flex items-center gap-2 text-teal-300 text-xs font-bold uppercase mb-2">
                <Sparkles className="w-4 h-4" />
                <span>Zümre Dayanışması</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
                "Bir Türkçe öğretmeninin sınıfında tahtaya yazdığı can alıcı bir örnek, yüzlerce kilometre ötedeki bir meslektaşının dersine ışık olabilir."
              </p>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-xl font-bold text-slate-900">
                Zümreye Katkı Sunun veya Yazın
              </h3>
              {currentUser ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-teal-800 bg-teal-50 border border-teal-200 px-2.5 py-1 rounded-full">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                  Kayıtlı Üye
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => onOpenAuthModal && onOpenAuthModal('login')}
                  className="text-xs text-teal-700 hover:underline font-bold inline-flex items-center gap-1"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  Giriş Yap
                </button>
              )}
            </div>

            <p className="text-xs text-slate-500 mb-6">
              Soru, öneri veya materyal paylaşımı için aşağıdaki formu kullanabilirsiniz.
            </p>

            {submitted ? (
              <div className="p-8 text-center bg-teal-50 rounded-2xl border border-teal-200 animate-fadeIn">
                <div className="w-12 h-12 rounded-full bg-teal-600 text-white flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-teal-900 mb-1">İletiniz Zümreye Ulaştı!</h4>
                <p className="text-xs text-teal-700 max-w-sm mx-auto">
                  Değerli öğretmenimiz, mesajınız başarıyla iletildi. En kısa sürede e-posta adresinize dönüş yapacağız.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-4 py-2 bg-teal-700 text-white rounded-xl text-xs font-semibold hover:bg-teal-800"
                >
                  Yeni Mesaj Gönder
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Member-only notice if non-logged user selects material topic */}
                {isMaterialTopic && !currentUser && (
                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center justify-between gap-3 animate-fadeIn">
                    <div className="flex items-center gap-2.5">
                      <Lock className="w-5 h-5 text-amber-700 shrink-0" />
                      <div>
                        <strong className="block font-bold">Materyal Paylaşımı Yalnızca Üyelere Açıktır</strong>
                        <span className="text-[11px] text-amber-800">Çalışma kağıdı eklemek için lütfen öğretmen hesabınızla giriş yapın.</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => onOpenAuthModal && onOpenAuthModal('login', 'Materyal paylaşmak için lütfen giriş yapın veya kayıt olun.')}
                      className="px-3.5 py-1.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs shrink-0 shadow-xs"
                    >
                      Giriş Yap / Üye Ol
                    </button>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Adınız Soyadınız *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Örn: Burak Kaya"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      E-Posta Adresiniz *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="Örn: burak@meb.k12.tr"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Sınıf Kademesi
                    </label>
                    <select
                      value={formData.grade}
                      onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white cursor-pointer"
                    >
                      <option value="5-sinif">5. Sınıf Türkçe</option>
                      <option value="6-sinif">6. Sınıf Türkçe</option>
                      <option value="7-sinif">7. Sınıf Türkçe</option>
                      <option value="8-lgs">8. Sınıf / LGS Hazırlık</option>
                      <option value="tum-kademeler">Tüm Ortaokul Kademeleri</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Konu Başlığı
                    </label>
                    <select
                      value={formData.topic}
                      onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white cursor-pointer"
                    >
                      <option value="calisma-kagidi">🔒 Özgün Çalışma Kağıdı Paylaşımı (Üyelere Özel)</option>
                      <option value="lgs-soru">🔒 LGS Deneme / Soru Önerisi (Üyelere Özel)</option>
                      <option value="oyun-etkinlik">Dil Bilgisi Oyunu / Etkinlik Fikri</option>
                      <option value="kitap-tavsiye">Kitap Tahlili & Okuma Saati Önerisi</option>
                      <option value="genel">Genel Soru & Zümre İletişimi</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mesajınız veya Açıklama *
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Paylaşmak istediğiniz Türkçe etkinliği veya düşüncelerinizi detaylandırabilirsiniz..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-teal-700 text-white font-bold text-sm shadow-md transition-all active:scale-95"
                  >
                    <span>{isMaterialTopic && !currentUser ? 'Giriş Yaparak Paylaş' : 'Zümreye Gönder'}</span>
                    <Send className="w-4 h-4 text-teal-400" />
                  </button>
                </div>
              </form>
            )}

          </div>

        </div>

        {/* FAQ Accordion Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <HelpCircle className="w-5 h-5 text-teal-600" />
            <h3 className="text-xl font-bold text-slate-900">
              Türkçe Zümresi Sıkça Sorulan Sorular
            </h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div 
                  key={index}
                  className="border border-slate-200 rounded-2xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full p-4 sm:p-5 text-left font-bold text-sm sm:text-base text-slate-800 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-teal-600 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}

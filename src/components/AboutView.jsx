import React from 'react';
import { 
  Info, 
  Sparkles, 
  Target, 
  Heart, 
  Users, 
  BookOpen, 
  Award, 
  ShieldCheck, 
  Feather,
  ArrowRight
} from 'lucide-react';

export default function AboutView({ onNavigateToContact }) {
  const team = [
    {
      name: 'Hakan Yıldırım',
      role: '8. Sınıf LGS Türkçe Koordinatörü',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      bio: '14 yıllık ortaokul Türkçe öğretmeni. LGS paragraf analizi, mantık-muhakeme soruları ve soru bankası yazarı.'
    },
    {
      name: 'Selin Öztürk',
      role: 'Dil Bilgisi & Eğitsel Oyun Tasarımcısı',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      bio: '9 yıllık Türkçe eğitimcisi. Fiilimsiler, cümlenin ögeleri ve sözcükte anlam konularını oyunlaştıran etkinlikler hazırlıyor.'
    },
    {
      name: 'Derya Aydın',
      role: 'Yazma Becerisi & Çocuk Edebiyatı Editörü',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
      bio: '11 yıldır ortaokulda görev yapıyor. Yaratıcı yazarlık atölyeleri, sınıf kitap kulüpleri ve metin tahlili modelleri geliştiriyor.'
    },
    {
      name: 'Mehmet Can',
      role: 'Dijital Türkçe & Web 2.0 Sorumlusu',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      bio: 'Türkçe derslerinde akıllı tahta uygulamaları, ChatGPT ile metin üretimi ve dijital sözlük projeleri üzerine çalışıyor.'
    }
  ];

  const values = [
    {
      icon: Target,
      title: '5, 6, 7 ve 8. Sınıf Kazanım Uyumu',
      desc: 'Yayınlanan her çalışma kağıdı ve soru, MEB Türkçe Öğretim Programı ve Türkiye Yüzyılı Maarif Modeli kazanımları baz alınarak hazırlanır.'
    },
    {
      icon: Sparkles,
      title: 'LGS Odaklı Muhakeme & Analiz',
      desc: 'Sadece kuru bilgi değil; grafik okuma, infografik analizi ve sözel mantık sorularına yönelik somut çözüm stratejileri sunarız.'
    },
    {
      icon: BookOpen,
      title: 'Okuma Kültürü ve Dil Zevki',
      desc: 'Öğrencilere kitap okumayı sevdiren çağdaş yöntemler ve anadilimiz Türkçenin zenginliğini kavratan yaratıcı yazma atölyeleri kurgularız.'
    },
    {
      icon: Heart,
      title: 'Açık Zümre Dayanışması',
      desc: 'Türkçe öğretmenlerinin birbirinden güç aldığı, tüm materyallerin reklamsız ve ücretsiz paylaşıldığı bağımsız bir zümre alanı sunarız.'
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Feather className="w-3.5 h-3.5" />
            <span>öğre<span className="text-teal-600">T</span>ürkçe Hikâyesi</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Türkçe Öğretmenlerinin Paylaşım Sayfası
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Ortaokul Türkçe öğretmenlerinin ders hazırlıklarında yalnız hissetmediği, özgün materyallerini ve LGS taktiklerini cömertçe paylaştığı dijital zümre odası.
          </p>
        </div>

        {/* Story Section */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-sm mb-14">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Neden öğre<span className="text-teal-600">T</span>ürkçe?
          </h2>
          <div className="prose text-slate-600 text-sm sm:text-base leading-relaxed space-y-4">
            <p>
              Türkçe dersi, öğrencilerin sadece bir dersi değil, tüm akademik hayatlarını ve düşünme biçimlerini belirleyen anadil eğitimidir. Özellikle LGS döneminde öğrencilerin uzun paragraflar ve sözel mantık karşısındaki kaygıları, Türkçe öğretmenlerinin omzuna büyük bir sorumluluk yüklemektedir.
            </p>
            <p>
              <strong>öğre<span className="text-teal-600">T</span>ürkçe</strong>, Türkiye genelindeki ortaokul Türkçe öğretmenlerini bir araya getirmek amacıyla kuruldu. 5. sınıftan 8. sınıfa kadar; çalışma kağıtları, dil bilgisi oyunları, metin tahlilleri ve LGS soru çözme stratejilerini sade ve pratik bir yapıda sunuyoruz.
            </p>
            <div className="p-4 bg-teal-50 rounded-2xl border-l-4 border-teal-700 text-teal-900 font-medium italic my-6">
              "Türkçemiz, ses bayrağımızdır. Onu seven ve sevdiren öğretmenlerin zümre dayanışması en büyük zenginliğimizdir."
            </div>
          </div>
        </div>

        {/* Values Grid */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Zümre İlkelerimiz
            </h2>
            <p className="text-slate-500 text-sm mt-1">öğreTürkçe içeriklerinin dayandığı 4 temel prensip</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((v, i) => {
              const IconComp = v.icon;
              return (
                <div key={i} className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-2xs flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-teal-100/80 text-teal-700 flex items-center justify-center shrink-0">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 mb-1.5">{v.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Editorial Team */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Türkçe Zümre Kurulu
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Farklı okullarda bilfiil sınıfta olan ortaokul Türkçe öğretmenleri
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200/90 text-center shadow-2xs flex flex-col items-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full object-cover ring-4 ring-teal-500/10 mb-4"
                />
                <h3 className="text-base font-bold text-slate-900 mb-1">{member.name}</h3>
                <span className="text-xs text-teal-700 font-semibold mb-3">{member.role}</span>
                <p className="text-xs text-slate-500 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Join as Author Banner */}
        <div className="bg-gradient-to-r from-teal-800 to-emerald-800 rounded-3xl p-8 sm:p-12 text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div className="max-w-xl">
            <h3 className="text-xl sm:text-2xl font-extrabold mb-2">
              Kendi Çalışma Kağıdınızı veya Sorunuzu Paylaşın!
            </h3>
            <p className="text-xs sm:text-sm text-teal-100 leading-relaxed">
              Sınıfınızda uyguladığınız etkili bir Türkçe etkinliği veya özgün bir LGS paragraf sorusu mu var? Adınızla paylaşın, binlerce zümredaşınıza ulaşsın.
            </p>
          </div>
          <button
            onClick={onNavigateToContact}
            className="px-6 py-3.5 rounded-xl bg-white text-teal-900 hover:bg-teal-50 font-bold text-sm shadow-sm whitespace-nowrap transition-all flex items-center gap-2"
          >
            <span>Materyal / Yazı Gönder</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}

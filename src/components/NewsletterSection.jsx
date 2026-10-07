import React, { useState } from 'react';
import { Mail, CheckCircle2, Sparkles, Send } from 'lucide-react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => {
        setEmail('');
      }, 3000);
    }
  };

  return (
    <section className="py-14 bg-gradient-to-br from-teal-900 via-slate-900 to-slate-950 text-white relative overflow-hidden">
      {/* Decorative background circles */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-teal-600/20 blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-80 h-80 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-800/60 text-teal-200 border border-teal-500/30 text-xs font-semibold mb-4">
          <Sparkles className="w-3.5 h-3.5 text-teal-300" />
          <span>Haftalık Türkçe Zümre Bülteni</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-4">
          Her Pazartesi Türkçe Dersiniz İçin Taze Bir Fikir Alın
        </h2>

        <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto mb-8 font-normal leading-relaxed">
          1 yeni nesil LGS soru analizi, 1 yaratıcı yazma yönergesi ve 1 yazdırılabilir çalışma kağıdı doğrudan gelen kutunuza gelsin.
        </p>

        {submitted ? (
          <div className="inline-flex items-center gap-2.5 px-6 py-4 rounded-2xl bg-teal-500/20 border border-teal-400 text-teal-200 text-sm font-semibold animate-fadeIn">
            <CheckCircle2 className="w-5 h-5 text-teal-400" />
            <span>Türkçe zümre bültenimize hoş geldiniz! İlk materyal paketiniz önümüzdeki Pazartesi e-postanızda.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="relative flex-1">
              <Mail className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="turkce.ogretmeni@meb.k12.tr"
                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:bg-white/15 transition-all"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm shadow-md transition-all active:scale-95"
            >
              <span>Zümreye Katıl</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        )}

        <div className="mt-6 flex items-center justify-center gap-6 text-xs text-slate-400">
          <span>✓ 100% Ücretsiz Materyaller</span>
          <span>✓ 5-8. Sınıf Kazanım Odaklı</span>
          <span>✓ Reklamsız Zümre Dayanışması</span>
        </div>
      </div>
    </section>
  );
}

import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  Mail, 
  User, 
  School, 
  BookOpen, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  ShieldCheck,
  LogIn,
  UserPlus
} from 'lucide-react';

export default function AuthModal({ 
  isOpen, 
  onClose, 
  onLoginSuccess, 
  initialMode = 'login', // 'login' or 'register'
  lockMessage = null 
}) {
  const [mode, setMode] = useState(initialMode); // 'login' or 'register'

  // Login form states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Register form states
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regBranch, setRegBranch] = useState('8-lgs');
  const [regSchool, setRegSchool] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regError, setRegError] = useState('');

  if (!isOpen) return null;

  // Handle Login
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginError('');

    // Fetch existing users from localStorage
    let users = [];
    try {
      const stored = localStorage.getItem('ogreturkce_users');
      users = stored ? JSON.parse(stored) : [];
    } catch {
      users = [];
    }

    const found = users.find(
      u => u.email.toLowerCase() === loginEmail.trim().toLowerCase() && u.password === loginPassword
    );

    if (found) {
      onLoginSuccess(found);
      onClose();
    } else {
      setLoginError('E-posta adresi veya şifre hatalı. Lütfen kontrol edip tekrar deneyin.');
    }
  };

  // Quick Demo Login for instant testing
  const handleQuickDemoLogin = () => {
    let users = [];
    try {
      const stored = localStorage.getItem('ogreturkce_users');
      users = stored ? JSON.parse(stored) : [];
    } catch {
      users = [];
    }

    const demoUser = users[0] || {
      id: 'demo-user-1',
      name: 'Zeynep Kaya',
      email: 'zeynep.ogretmen@meb.k12.tr',
      password: 'ogretmen123',
      branch: '8. Sınıf LGS Türkçe Öğretmeni',
      school: 'Atatürk Ortaokulu / Ankara',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      sharedMaterialsCount: 3
    };

    onLoginSuccess(demoUser);
    onClose();
  };

  // Handle Register
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setRegError('');

    if (!regName.trim() || !regEmail.trim() || !regPassword.trim()) {
      setRegError('Lütfen tüm zorunlu alanları doldurun.');
      return;
    }

    // Check if user already exists
    let users = [];
    try {
      const stored = localStorage.getItem('ogreturkce_users');
      users = stored ? JSON.parse(stored) : [];
    } catch {
      users = [];
    }

    const exists = users.some(u => u.email.toLowerCase() === regEmail.trim().toLowerCase());
    if (exists) {
      setRegError('Bu e-posta adresi ile zaten kayıtlı bir öğretmen hesabı bulunmaktadır.');
      return;
    }

    const branchLabels = {
      '5-sinif': '5. Sınıf Türkçe Öğretmeni',
      '6-sinif': '6. Sınıf Türkçe Öğretmeni',
      '7-sinif': '7. Sınıf Türkçe Öğretmeni',
      '8-lgs': '8. Sınıf LGS Türkçe Öğretmeni',
      'genel': 'Ortaokul Türkçe Öğretmeni'
    };

    const newUser = {
      id: `user-${Date.now()}`,
      name: regName.trim(),
      email: regEmail.trim(),
      branch: branchLabels[regBranch] || 'Ortaokul Türkçe Öğretmeni',
      school: regSchool.trim() || 'MEB Ortaokulu',
      password: regPassword,
      avatar: `https://images.unsplash.com/photo-${1534528741775 + (Date.now() % 1000)}?auto=format&fit=crop&w=200&q=80`,
      sharedMaterialsCount: 0,
      joinedDate: 'Ekim 2024'
    };

    const updatedUsers = [...users, newUser];
    localStorage.setItem('ogreturkce_users', JSON.stringify(updatedUsers));

    onLoginSuccess(newUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col my-8 max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 bg-gradient-to-br from-teal-50/80 to-slate-50 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-teal-700 text-white flex items-center justify-center shadow-sm">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-lg text-slate-900 tracking-tight">
                öğre<span className="text-teal-600 font-black">T</span>ürkçe
              </span>
              <span className="block text-[11px] text-teal-800 font-semibold">
                Öğretmen Topluluğu Girişi
              </span>
            </div>
          </div>

          {/* If opened due to member-only lock, show explicit alert */}
          {lockMessage && (
            <div className="mt-3 p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5 animate-fadeIn">
              <Lock className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold block">Materyal Paylaşımı Üyelere Özeldir</strong>
                <span>{lockMessage}</span>
              </div>
            </div>
          )}

          {/* Mode Switch Tabs */}
          <div className="mt-4 flex rounded-xl bg-slate-200/80 p-1">
            <button
              type="button"
              onClick={() => { setMode('login'); setLoginError(''); }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                mode === 'login'
                  ? 'bg-white text-teal-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Giriş Yap</span>
            </button>
            <button
              type="button"
              onClick={() => { setMode('register'); setRegError(''); }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                mode === 'register'
                  ? 'bg-white text-teal-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Öğretmen Kaydı</span>
            </button>
          </div>
        </div>

        {/* Modal Form Content */}
        <div className="p-6 overflow-y-auto flex-1">
          
          {/* TAB 1: LOGIN */}
          {mode === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              
              {loginError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  E-Posta Adresi
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="ornek@meb.k12.tr veya e-posta"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Şifre
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Giriş Yap</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* 1-Click Fast Demo Login Button */}
              <div className="pt-2 border-t border-slate-100 text-center">
                <span className="block text-[11px] text-slate-400 mb-2">Hemen test etmek için:</span>
                <button
                  type="button"
                  onClick={handleQuickDemoLogin}
                  className="w-full py-2.5 px-3 rounded-xl bg-teal-50 hover:bg-teal-100 border border-teal-200 text-teal-800 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                  <span>Örnek Öğretmen ile 1 Tıkla Hızlı Giriş Yap</span>
                </button>
              </div>

            </form>
          )}

          {/* TAB 2: REGISTER */}
          {mode === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              
              {regError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{regError}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Adınız Soyadınız *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Örn: Ayşe Demir"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  E-Posta Adresi *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="ornek@meb.k12.tr veya e-posta"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Branş / Kademe
                  </label>
                  <select
                    value={regBranch}
                    onChange={(e) => setRegBranch(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
                  >
                    <option value="8-lgs">8. Sınıf / LGS Türkçe</option>
                    <option value="7-sinif">7. Sınıf Türkçe</option>
                    <option value="6-sinif">6. Sınıf Türkçe</option>
                    <option value="5-sinif">5. Sınıf Türkçe</option>
                    <option value="genel">Tüm Kademeler</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Okul & İl
                  </label>
                  <input
                    type="text"
                    placeholder="Örn: Namık Kemal O.O. / Bursa"
                    value={regSchool}
                    onChange={(e) => setRegSchool(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Şifre Belirleyin *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    placeholder="En az 6 karakter"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-teal-50/70 border border-teal-100 text-[11px] text-teal-800 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Üye olan öğretmenler sınırsız materyal paylaşabilir ve zümre içeriklerine katkı sağlayabilir.</span>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Öğretmen Hesabımı Oluştur</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>

            </form>
          )}

        </div>

      </div>
    </div>
  );
}

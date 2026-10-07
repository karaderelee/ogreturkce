import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Share2, 
  Bookmark, 
  Download, 
  Check, 
  MessageSquare, 
  Send, 
  ThumbsUp, 
  Sparkles,
  User,
  Copy
} from 'lucide-react';
import PostCard from './PostCard';

export default function PostDetailView({ post, allPosts, onBack, onSelectPost, onSelectCategory }) {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [commentName, setCommentName] = useState('');
  const [commentBranch, setCommentBranch] = useState('');
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'Emine Kaya',
      branch: 'Türkçe Öğretmeni (Kayseri)',
      date: '1 gün önce',
      content: 'Harika bir paylaşım olmuş zümrem! Özellikle sözel mantık ve tablo kurma taktiğini yarın 8. sınıf LGS Türkçe etüdümde hemen uygulayacağım. Çok teşekkürler.',
      likes: 5
    },
    {
      id: 2,
      author: 'Burak Koç',
      branch: 'Ortaokul Türkçe Zümre Başkanı (İzmir)',
      date: '3 gün önce',
      content: 'Okulumuzdaki Türkçe zümresinde paylaştım. Fiilimsiler dedektiflik oyununu ve etkinlik yapraklarını denedik, öğrenciler derse çok istekli katıldı.',
      likes: 8
    }
  ]);
  const [commentSubmitted, setCommentSubmitted] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentName || !commentText) return;
    const newComment = {
      id: Date.now(),
      author: commentName,
      branch: commentBranch || 'Öğretmen',
      date: 'Az önce',
      content: commentText,
      likes: 0
    };
    setComments([newComment, ...comments]);
    setCommentName('');
    setCommentBranch('');
    setCommentText('');
    setCommentSubmitted(true);
    setTimeout(() => setCommentSubmitted(false), 3000);
  };

  // Related posts (same category, different id)
  const relatedPosts = allPosts
    .filter(p => p.id !== post.id && p.categorySlug === post.categorySlug)
    .slice(0, 3);

  return (
    <article className="bg-slate-50 min-h-screen py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation & Action Bar */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm font-semibold text-slate-700 hover:text-teal-700 hover:border-teal-300 shadow-2xs transition-all group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Geri Dön</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSaved(!saved)}
              className={`p-2 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-colors ${
                saved 
                  ? 'bg-teal-50 border-teal-300 text-teal-700' 
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
              title="Kaydet"
            >
              <Bookmark className={`w-4 h-4 ${saved ? 'fill-teal-600 text-teal-600' : ''}`} />
              <span className="hidden sm:inline">{saved ? 'Kaydedildi' : 'Kaydet'}</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-teal-700 hover:border-teal-300 text-xs font-medium flex items-center gap-1.5 transition-colors shadow-2xs"
              title="Bağlantıyı Kopyala"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span className="hidden sm:inline">{copied ? 'Kopyalandı!' : 'Paylaş'}</span>
            </button>
          </div>
        </div>

        {/* Article Container Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm mb-10">
          
          {/* Header Metadata */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <button
              onClick={() => onSelectCategory && onSelectCategory(post.categorySlug)}
              className="px-3.5 py-1 rounded-full text-xs font-bold bg-teal-50 text-teal-800 border border-teal-200 hover:bg-teal-600 hover:text-white transition-colors"
            >
              {post.category}
            </button>

            <span className="flex items-center gap-1 text-xs text-slate-400 font-medium">
              <Calendar className="w-3.5 h-3.5" />
              {post.date}
            </span>

            <span className="flex items-center gap-1 text-xs text-slate-400 font-medium">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
          </div>

          {/* Article Title */}
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
            {post.title}
          </h1>

          {/* Author Card Info */}
          <div className="flex items-center justify-between pb-6 mb-8 border-b border-slate-100 flex-wrap gap-4">
            <div className="flex items-center gap-3.5">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-teal-500/30"
              />
              <div>
                <span className="block text-sm sm:text-base font-bold text-slate-900">
                  {post.author.name}
                </span>
                <span className="block text-xs text-slate-500 font-medium">
                  {post.author.role}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-medium">Paylaş:</span>
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors text-xs font-bold"
                title="WhatsApp ile Paylaş"
              >
                WhatsApp
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-sky-50 text-sky-700 hover:bg-sky-100 transition-colors text-xs font-bold"
                title="X (Twitter) ile Paylaş"
              >
                Twitter / X
              </a>
            </div>
          </div>

          {/* Cover Image */}
          <div className="rounded-2xl overflow-hidden mb-8 aspect-[16/9] shadow-inner bg-slate-100">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Excerpt Lead */}
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium bg-slate-50 p-5 rounded-2xl border-l-4 border-teal-500 mb-8 italic">
            "{post.excerpt}"
          </p>

          {/* Full Content Body */}
          <div className="blog-content text-slate-700 text-sm sm:text-base leading-relaxed space-y-4">
            {post.content.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('## ')) {
                return (
                  <h2 key={index} className="text-xl sm:text-2xl font-bold text-slate-900 pt-4 pb-2 border-b border-slate-100">
                    {paragraph.replace('## ', '')}
                  </h2>
                );
              }
              if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={index} className="text-lg sm:text-xl font-bold text-slate-800 pt-2 pb-1">
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }
              if (paragraph.startsWith('> ')) {
                return (
                  <blockquote key={index} className="border-l-4 border-teal-500 pl-4 py-2 italic text-teal-900 bg-teal-50/70 rounded-r-xl my-4 text-sm sm:text-base">
                    {paragraph.replace('> ', '')}
                  </blockquote>
                );
              }
              if (paragraph.startsWith('```')) {
                const codeText = paragraph.replace(/```/g, '').trim();
                return (
                  <div key={index} className="bg-slate-900 text-slate-100 p-4 sm:p-5 rounded-2xl font-mono text-xs sm:text-sm my-4 overflow-x-auto shadow-inner">
                    <pre className="whitespace-pre-wrap">{codeText}</pre>
                  </div>
                );
              }
              if (paragraph.startsWith('* ')) {
                const listItems = paragraph.split('\n').filter(Boolean);
                return (
                  <ul key={index} className="list-disc list-inside space-y-1.5 my-3 pl-2 text-slate-700">
                    {listItems.map((item, i) => (
                      <li key={i} className="leading-relaxed">
                        {item.replace('* ', '')}
                      </li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={index} className="leading-relaxed text-slate-700">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Free Downloadable Resource Box (Simulated teacher resource) */}
          <div className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                <Download className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-bold text-slate-900">
                  Bu Konuya Özel Türkçe Çalışma Kağıdı & Etkinlik Föyü
                </h4>
                <p className="text-xs text-slate-600">
                  MEB Ortaokul Türkçe müfredatına uyarlanmış, yazdırılabilir A4 PDF şablonu (Ücretsiz).
                </p>
              </div>
            </div>
            <button
              onClick={() => alert('Örnek Türkçe çalışma kağıdı şablonu indirildi! Sınıfınızda ve LGS etütlerinizde başarıyla uygulamanızı dileriz.')}
              className="px-4 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs sm:text-sm font-semibold whitespace-nowrap shadow-sm transition-all"
            >
              Çalışma Kağıdını İndir (.PDF)
            </button>
          </div>

          {/* Tags */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-400">Etiketler:</span>
            {post.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs font-medium hover:bg-slate-200 transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Author Detailed Bio Card */}
          <div className="mt-10 p-6 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-teal-500/20 shrink-0"
            />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-base font-bold text-slate-900">{post.author.name}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 font-semibold">Yazar</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {post.author.bio}
              </p>
            </div>
          </div>

        </div>

        {/* Comment Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm mb-12">
          <div className="flex items-center gap-2 mb-6">
            <MessageSquare className="w-5 h-5 text-teal-600" />
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              Öğretmen Yorumları ({comments.length})
            </h3>
          </div>

          {/* New Comment Form */}
          <form onSubmit={handleAddComment} className="mb-8 p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Deneyiminizi veya Sorunuzu Paylaşın
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                required
                placeholder="Adınız Soyadınız *"
                value={commentName}
                onChange={(e) => setCommentName(e.target.value)}
                className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
              <input
                type="text"
                placeholder="Branşınız & Şehir (örn: Fen Bilgisi - Bursa)"
                value={commentBranch}
                onChange={(e) => setCommentBranch(e.target.value)}
                className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>

            <textarea
              required
              rows={3}
              placeholder="Bu yöntemi sınıfınızda uyguladınız mı? Fikirlerinizi meslektaşlarınızla paylaşın..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
            />

            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-slate-400">
                Yorumunuz öğretmen topluluğu nezaket kurallarına göre yayınlanır.
              </span>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors"
              >
                <span>Yorum Gönder</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>

            {commentSubmitted && (
              <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-medium border border-emerald-200">
                Yorumunuz başarıyla eklendi! Paylaşımınız için teşekkür ederiz.
              </div>
            )}
          </form>

          {/* Comments List */}
          <div className="space-y-4">
            {comments.map((c) => (
              <div key={c.id} className="p-4 rounded-2xl bg-white border border-slate-100 hover:border-slate-200 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-800 font-bold flex items-center justify-center text-xs">
                      {c.author.charAt(0)}
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-slate-800">{c.author}</span>
                      <span className="block text-[11px] text-slate-400">{c.branch}</span>
                    </div>
                  </div>
                  <span className="text-[11px] text-slate-400">{c.date}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-10">
                  {c.content}
                </p>
              </div>
            ))}
          </div>

        </div>

        {/* Related Posts Section */}
        {relatedPosts.length > 0 && (
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-6">
              Bu Kategorideki Diğer Yazılar
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map(p => (
                <PostCard
                  key={p.id}
                  post={p}
                  onSelectPost={onSelectPost}
                  onSelectCategory={onSelectCategory}
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </article>
  );
}

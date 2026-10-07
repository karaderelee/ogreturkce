# öğreTürkçe | Türkçe Öğretmenlerinin Paylaşım Sayfası 🇹🇷📖

**öğreTürkçe**, ortaokul (5, 6, 7 ve 8. sınıf) Türkçe öğretmenleri için özel olarak tasarlanmış; **LGS Türkçe yeni nesil soruları**, **dil bilgisi etkinlikleri**, **okuma kültürü & yazma atölyeleri**, **yazdırılabilir çalışma kağıtları** ve **eğitim teknolojileri** içeriklerinin paylaşıldığı modern ve sade bir dijital zümre platformudur.

---

## 🔐 Öğretmen Girişi & Üyelik Sistemi
* **Giriş Yap / Kayıt Ol:** Üst menüden öğretmenler ad-soyad, e-posta, branş/kademe (5-8. sınıf) ve okul bilgileriyle kayıt olabilir veya giriş yapabilir.
* **Hızlı Demo Girişi:** Test amaçlı hazır öğretmen hesabı (Zeynep Kaya / LGS Türkçe Öğretmeni) tek tıkla oturum açma imkânı sunar.
* **Üye Profil Menüsü:** Giriş yapan öğretmenin profil kartı, branş bilgisi ve çıkış yapma seçenekleri.

---

## 🔒 Üyelere Özel Materyal Paylaşımı
* **Korunan Paylaşım:** Materyal paylaşımı herkese açık değildir; yalnızca öğretmen hesabı olan üyeler materyal paylaşabilir.
* **Giriş Uyarısı:** Giriş yapmamış bir kullanıcı "Materyal Paylaş" butonuna tıkladığında bilgilendirici bir uyarı ile giriş/kayıt ekranına yönlendirilir.
* **Onaylı Materyal Formu:** Üye öğretmenler başlık, sınıf kademesi (5, 6, 7, 8. Sınıf), materyal türü (çalışma kağıdı, LGS sorusu, oyun kartı, ders planı) ve dosya/Drive bağlantısı ile zümre arşivine doğrudan katkı sunabilir.

---

## 🛠️ Öğretmen / Admin Paneli (`/admin`)

Teknik bilgisi olmayan öğretmenlerin içeriklerini kolayca yönetebilmesi için kullanıcı dostu bir yönetim paneli entegre edilmiştir.

### Erişim:
* Tarayıcı adres çubuğuna: **`http://localhost:5173/admin`**
* Ya da ana sayfanın en altındaki (Footer) **"Öğretmen / Admin Paneli (/admin)"** bağlantısına tıklayarak erişilebilir.

### Admin Panelinde Yer Alan Bölümler:

#### 1. Dashboard (Genel Bakış)
* **Toplam Blog Yazısı Sayacı:** Sitede yayında olan tüm Türkçe içeriklerinin anlık sayısı.
* **Toplam Kategori Sayacı:** Aktif ders alanı sayısı.
* **Son Eklenen Yazılar Tablosu:** En son güncellenen içerikler ve hızlı düzenleme kısayolu.
* **Örnek İçerikleri Sıfırla:** Dilediğiniz zaman varsayılan Türkçe zümre yazılarına tek tıkla geri dönme imkanı.

#### 2. Blog Yazıları Yönetimi
* **Yeni Yazı Ekleme:**
  * **Başlık:** İçeriğin başlığı.
  * **Kapak Görseli:** Özel görsel bağlantısı veya hazır tema butonları (*Kitap & Paragraf, Sınıf & Defter, Yazarlık & Kalem, Teknoloji & Tahta, Kütüphane, Ölçme & Test*) ile canlı kapak önizlemesi.
  * **Kategori:** Açılır listeden ders kategorisi seçimi.
  * **İçerik:** Markdown biçimlendirme ipuçlarıyla (başlıklar, madde imleri, alıntılar) zengin metin alanı.
  * **Yazar:** Yazar adı ve branş unvanı.
  * **Kısa Özet & Etiketler:** Kartlarda görünecek açıklama ve etiketler.
  * **Öne Çıkar Seçeneği:** Ana sayfa vitrinine sabitleme.
* **Mevcut Yazıları Listeleme:** Başlık ve yazara göre anlık arama, kategoriye göre filtreleme.
* **Yazı Düzenleme:** Form üzerinden anında güncelleme.
* **Yazı Silme:** Yanlışlıkla silmeyi önleyen onay penceresiyle güvenli silme.
* **Sitede Görüntüle:** Yazının canlı sayfadaki okuma görünümünü doğrudan açma.

#### 3. Kategoriler Yönetimi
* **Yeni Kategori Ekleme:** İsim, açıklama ve renk paleti seçimiyle otomatik URL dostu kategori üretimi.
* **Kategorileri Listeleme:** Kategori kartları ve içerdikleri yazı sayıları.
* **Kategori Silme:** Onay mekanizmasıyla kategori kaldırma.

---

## 🗂️ Türkçe Alanları & Kategoriler
1. **LGS Türkçe & Yeni Nesil Sorular:** 8. sınıf LGS hazırlık, mantık-muhakeme, grafik ve tablo yorumlama, paragraf şık eleme stratejileri.
2. **Dil Bilgisi & Etkinlikler:** Fiilimsiler, cümlenin ögeleri, sözcükte/cümlede anlam, anlatım bozuklukları ve eğitsel oyun şablonları.
3. **Okuma Kültürü & Yazma Atölyesi:** Ortaokul kitap tahlilleri, "Kitap Kafe" modelleri, yaratıcı yazarlık yönergeleri ve "Hikâye Sandığı" etkinlikleri.
4. **Ders Materyalleri & Çalışma Kağıtları:** 5-8. sınıf yazdırılabilir A4 etkinlik kağıtları, bulmacalar, pano şablonları ve yazım-noktalama oyunları.
5. **Yapay Zekâ & Dijital Türkçe:** ChatGPT ile 5-6. sınıf okuma metni ve 5N1K sorusu üretme rehberleri, akıllı tahta uygulamaları.

---

## 🚀 Çalıştırma

### Geliştirme Sunucusu (Dev Server):
```bash
npm run dev
```
Sunucu varsayılan olarak **http://localhost:5173/** adresinde çalışır.

### Canlı Dağıtım (Production Build):
```bash
npm run build
```
Oluşturulan optimize edilmiş statik dosyalar `dist/` dizinine kaydedilir.

---

## 📂 Dosya Mimarisi
* [`src/App.jsx`](file:///c:/Users/cihan/OneDrive/Apps/Ögretmen%20Blog/src/App.jsx) - Sayfa yönlendirmesi, `/admin` yönetimi ve localStorage senkronizasyonu
* [`src/components/admin/`](file:///c:/Users/cihan/OneDrive/Apps/Ögretmen%20Blog/src/components/admin/)
  * [`AdminLayout.jsx`](file:///c:/Users/cihan/OneDrive/Apps/Ögretmen%20Blog/src/components/admin/AdminLayout.jsx) - Admin paneli ana düzeni ve menüsü
  * [`AdminDashboard.jsx`](file:///c:/Users/cihan/OneDrive/Apps/Ögretmen%20Blog/src/components/admin/AdminDashboard.jsx) - İstatistik sayaçları ve son yazılar
  * [`AdminPosts.jsx`](file:///c:/Users/cihan/OneDrive/Apps/Ögretmen%20Blog/src/components/admin/AdminPosts.jsx) - Yazı listeleme, arama ve silme
  * [`AdminPostFormModal.jsx`](file:///c:/Users/cihan/OneDrive/Apps/Ögretmen%20Blog/src/components/admin/AdminPostFormModal.jsx) - Yeni yazı ekleme / düzenleme formu
  * [`AdminCategories.jsx`](file:///c:/Users/cihan/OneDrive/Apps/Ögretmen%20Blog/src/components/admin/AdminCategories.jsx) - Kategori ekleme ve yönetimi
* [`src/data/posts.js`](file:///c:/Users/cihan/OneDrive/Apps/Ögretmen%20Blog/src/data/posts.js) - Ortaokul Türkçe örnek blog yazıları
* [`src/data/categories.js`](file:///c:/Users/cihan/OneDrive/Apps/Ögretmen%20Blog/src/data/categories.js) - Türkçe ders kategorileri

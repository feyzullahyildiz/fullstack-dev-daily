# Day 1 — Next.js App Router | HTTP Fundamentals

📅 Tarih: 30 Mayıs 2026
⏱️ Tahmini süre: 3 saat

---

## 🖥️ Frontend: Next.js App Router — Routing, Layouts, Pages

### 📖 Okuma

Next.js, React dünyasının en popüler framework'ü haline geldi. Versiyon 13 ile birlikte tanıttığı **App Router** mimarisi, React Server Components (RSC) üzerine inşa edilmiş, modern web geliştirme standartlarını yeniden tanımlayan bir yapıdır. Eski `pages` dizini yerine gelen `app` dizini, dosya sistemi tabanlı bir yönlendirme (routing) sistemi sunar.

**Routing ve Dosya Yapısı:**
App Router'da her klasör bir **route segment**'i temsil eder. Bir segmentin halka açık (public) olabilmesi için klasör içinde mutlaka bir `page.js` (veya `.tsx`) dosyası bulunmalıdır. Örneğin, `app/dashboard/settings/page.tsx` dosyası `/dashboard/settings` URL'ine karşılık gelir.

**Layouts ve Templates:**
Next.js'in en güçlü özelliklerinden biri **Nested Layouts** (iç içe yerleşimler) yapısıdır. `layout.tsx` dosyaları, o segment ve altındaki tüm sayfalar için ortak bir kullanıcı arayüzü sağlar. En üstteki `app/layout.tsx` (Root Layout), tüm uygulama için geçerli olan `<html>` ve `<body>` etiketlerini içermelidir. Layoutlar sayfa geçişlerinde yeniden render edilmez (re-render olmaz), bu da state'in korunmasını ve performans artışını sağlar.

**Pages:**
`page.tsx` bir rotanın benzersiz arayüzüdür. Sunucu tarafında render edilir (Server Component) ve Next.js'in sunduğu tüm veri getirme (data fetching) avantajlarından yararlanabilir.

**Neden Önemli?**
Geleneksel React uygulamalarında routing için `react-router-dom` gibi kütüphanelere ve karmaşık konfigürasyonlara ihtiyaç duyulurdu. Next.js App Router ile:
1. Kod bölme (Code splitting) otomatik olarak yapılır.
2. Sunucu tarafında render (SSR) varsayılan olarak gelir.
3. Layoutlar sayesinde UI tutarlılığı ve performans artışı sağlanır.

**Dikkat edilecekler:**
- `app` klasörü altındaki her klasör rota segmentidir, ama sadece `page.tsx` içerenler erişilebilirdir.
- Root Layout (`app/layout.tsx`) zorunludur.
- Layoutlar `children` prop'unu almalı ve render etmelidir.

**Faydalı kaynaklar:**
- [Next.js Documentation - Routing Fundamentals](https://nextjs.org/docs/app/building-your-application/routing)
- [Next.js Documentation - Pages and Layouts](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts)

---

### 💻 Ödev

Task Management projemizin temelini atıyoruz. Bugün Next.js iskeletini kuracak ve basit bir dashboard yapısı oluşturacaksın.

**Yapılacaklar:**
- [ ] `npx create-next-app@latest` komutu ile `frontend/` klasörünü oluştur (TypeScript, ESLint, Tailwind CSS, App Router seçilmelidir).
- [ ] Root Layout içinde uygulamanın ana başlığını (Navbar gibi) ekle.
- [ ] `/dashboard` rotasını oluştur ve içine bir `page.tsx` ekle.
- [ ] `/dashboard/settings` rotasını oluştur.
- [ ] Dashboard için özel bir layout (`app/dashboard/layout.tsx`) oluştur ve dashboard sayfalarına özel bir sidebar ekle.

**Beklenen çıktı:**
- `/` adresinde hoş geldiniz mesajı.
- `/dashboard` adresinde "Görev Listesi" başlığı ve sidebar.
- `/dashboard/settings` adresinde ayarlar sayfası ve aynı sidebar.
- Sayfalar arası geçişte sidebar'ın kaybolmaması.

**İskelet kod (`project/frontend/app/dashboard/layout.tsx`):**
```tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar - Bu kısım dashboard altındaki tüm sayfalarda ortak olacak */}
      <aside className="w-64 bg-gray-100 p-4 border-r">
        <nav>
          <ul className="space-y-2">
            <li><a href="/dashboard" className="text-blue-600">Görevler</a></li>
            <li><a href="/dashboard/settings" className="text-blue-600">Ayarlar</a></li>
          </ul>
        </nav>
      </aside>

      {/* Ana İçerik */}
      <main className="flex-1 p-8">
        {/* ALT SAYFALAR BURADA RENDER EDİLECEK */}
        {/* {children} */}
      </main>
    </div>
  )
}
```

---

### 🎤 Mülakat Sorusu

**Soru:** Next.js App Router'da `layout.tsx` ve `template.tsx` arasındaki temel fark nedir? Neden birini diğerine tercih ederiz?

<details>
<summary>Cevap için tıkla</summary>

`layout.tsx`, rotalar arasında geçiş yapıldığında state'ini korur ve yeniden render (re-render) olmaz. Bu, performans ve kullanıcı deneyimi açısından (örneğin bir videonun çalmaya devam etmesi veya scroll pozisyonunun korunması) avantajlıdır.

`template.tsx` ise her navigasyonda (geçişte) yeni bir instance oluşturur, yani tamamen yeniden mount edilir ve state'i sıfırlanır. Genellikle şu durumlarda tercih edilir:
1. `useEffect` tetiklenmesi gereken durumlar (örneğin sayfa görüntüleme loglaması).
2. Giriş/çıkış animasyonları (framer-motion gibi) için her seferinde yeni bir başlangıç gerekiyorsa.
3. Suspense sınırlarının her seferinde sıfırlanması isteniyorsa.

Genel kural olarak, özel bir ihtiyacınız yoksa her zaman `layout.tsx` kullanmalısınız.

</details>

---

## ⚙️ Backend: HTTP Fundamentals

### 📖 Okuma

Web'in kalbi HTTP (HyperText Transfer Protocol) üzerinden atar. Bir fullstack geliştirici olarak, tarayıcı ile sunucu arasındaki bu iletişimin nasıl çalıştığını bilmek zorundasın.

**Request/Response Döngüsü:**
Her iletişim istemcinin (tarayıcı) bir **Request** (istek) göndermesi ve sunucunun bir **Response** (yanıt) dönmesiyle gerçekleşir.

**HTTP Metotları:**
- **GET:** Veri almak için kullanılır. Güvenli (safe) ve idempotenttir (tekrarlandığında yan etkisi olmaz).
- **POST:** Yeni bir kaynak oluşturmak için kullanılır.
- **PUT:** Var olan bir kaynağı tamamen güncellemek için kullanılır.
- **PATCH:** Var olan bir kaynağın bir kısmını güncellemek için kullanılır.
- **DELETE:** Kaynağı silmek için kullanılır.

**Status Codes (Durum Kodları):**
- **2xx (Success):** Her şey yolunda (Örn: 200 OK, 201 Created).
- **3xx (Redirection):** Kaynak taşınmış (Örn: 301 Moved Permanently).
- **4xx (Client Error):** Sen (istemci) bir hata yaptın (Örn: 404 Not Found, 401 Unauthorized, 403 Forbidden).
- **5xx (Server Error):** Sunucu patladı (Örn: 500 Internal Server Error).

**Headers:**
İstek veya yanıt hakkında ek bilgiler (metadata) taşır. `Content-Type: application/json`, `Authorization: Bearer <token>` gibi.

**Dikkat edilecekler:**
- HTTP stateless (durum bilgisi tutmayan) bir protokoldür. Her istek birbirinden bağımsızdır.
- Status kodlarını doğru kullanmak, API tasarımının kalitesini belirler.

**Faydalı kaynaklar:**
- [MDN Web Docs - An overview of HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview)
- [HTTP Status Codes Reference](https://httpstatuses.com/)

---

### 💻 Ödev

Backend koduna henüz geçmiyoruz, ancak tarayıcının HTTP ile nasıl konuştuğunu analiz edeceğiz.

**Yapılacaklar:**
- [ ] Herhangi bir web sitesini (örneğin github.com) aç ve Tarayıcı Geliştirici Araçları (F12) -> Network sekmesini incele.
- [ ] Bir sayfayı yenilediğinde giden ilk isteğin (genelde sayfanın kendi ismi) Headers kısmına bak.
- [ ] Request Method, Status Code ve Remote Address bilgilerini not et.
- [ ] `backend/` klasörü altına bir `notes.md` oluştur ve orada 401, 403, 404 ve 500 hatalarının hangi gerçek hayat senaryolarında (örn: yanlış şifre girildiğinde hangisi?) çıkacağını açıkla.

**Beklenen çıktı:**
HTTP protokolünün işleyişine dair temel bir anlayış ve hata kodlarının mantığını kavrama.

**İskelet kod (`project/backend/notes.md`):**
```markdown
# HTTP Hata Senaryoları

- 401 Unauthorized: [Buraya açıklama yaz]
- 403 Forbidden: [Buraya açıklama yaz]
...
```

---

### 🎤 Mülakat Sorusu

**Soru:** HTTP "stateless" (durum bilgisi tutmayan) bir protokol ise, web siteleri bizim giriş yaptığımızı nasıl hatırlıyor?

<details>
<summary>Cevap için tıkla</summary>

HTTP her isteği birbirinden bağımsız görse de, oturum takibi için ek mekanizmalar kullanılır:
1. **Cookies:** Sunucu, yanıtla birlikte bir `Set-Cookie` header'ı gönderir. Tarayıcı bunu saklar ve sonraki her istekte sunucuya otomatik olarak geri gönderir.
2. **Sessions:** Sunucu tarafında kullanıcı bilgilerini tutan bir yapı. Cookie içinde sadece bir `session_id` taşınır.
3. **Tokens (JWT):** Kullanıcı bilgileri şifrelenmiş bir string içinde taşınır (genelde `Authorization` header'ında). Sunucu bu token'ı doğrulayarak kimliği anlar.

Yani protokolün kendisi stateless'tır, ancak biz bu yardımcı araçlarla "stateful" bir deneyim yaratırız.

</details>

---

*Sonraki gün: Next.js App Router — Routing, Layouts, Pages | REST API Prensipleri* 📖

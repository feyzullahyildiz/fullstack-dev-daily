# Day 2 — Next.js App Router — Routing, Layouts, Pages | Docker Nedir

📅 Tarih: 11 Haziran 2026
⏱️ Tahmini süre: 3 saat

---

## 🖥️ Frontend: Next.js App Router (Giriş - Bölüm 2)

### 📖 Okuma

Dün Next.js'in temel routing yapısını, Layout ve Page kavramlarını gördük. Bugün ise bu yapıyı daha dinamik ve kullanıcı dostu hale getirecek olan **Dynamic Routes**, **Link Component** ve **Navigation** kavramlarına odaklanacağız.

**Dynamic Routes (Dinamik Rotalar):**
Gerçek dünya uygulamalarında sayfalarımızın yolları her zaman statik değildir. Bir e-ticaret sitesinde binlerce ürün için ayrı ayrı klasör açmak yerine `products/[id]` yapısını kullanırız. Next.js'te bir klasör ismini köşeli parantez içine alırsanız (`[id]`, `[slug]` vb.), bu bir dinamik segment olur. Sayfa içinde bu `id` değerine `params` prop'u üzerinden erişebiliriz.

**Link Component ve Client-side Navigation:**
Geleneksel `<a href="...">` etiketi kullanıldığında tarayıcı tüm sayfayı yeniden yükler. Next.js'in `<Link>` bileşeni ise "Client-side Navigation" yaparak sadece değişen kısımları günceller. Bu, kullanıcıya bir Single Page Application (SPA) hızı ve akıcılığı sağlar. Ayrıca `<Link>` bileşeni, görünür alana giren linklerin arkasındaki kodları önceden yükleyerek (prefetching) geçişleri anlık hale getirir.

**Programmatic Navigation:**
Bazen bir butona tıklandığında veya bir işlem bittiğinde (örneğin form gönderildiğinde) sayfayı yönlendirmemiz gerekir. Bunun için Client Component'lerde `useRouter` hook'unu kullanırız. Ancak unutmayın; mümkünse her zaman `<Link>` tercih edilmelidir, çünkü SEO ve erişilebilirlik (accessibility) açısından daha sağlıklıdır.

**Dikkat edilecekler:**
- Dinamik rotalarda klasör ismindeki değişken (örn: `[id]`), `params` objesindeki anahtar ile aynı olmalıdır.
- Client-side navigation avantajından yararlanmak için her zaman `next/link` kullanın.
- Sayfa geçişlerinde scroll pozisyonunun korunması gibi detaylar Next.js tarafından otomatik yönetilir.

**Faydalı kaynaklar:**
- [Next.js Documentation: Dynamic Routes](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes)
- [Next.js Documentation: Linking and Navigating](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating)

---

### 💻 Ödev

Task Management projemizde görevlerin detaylarını görebileceğimiz bir yapı kuracağız.

**Yapılacaklar:**
- [ ] `/dashboard/tasks/[id]` klasör yapısını oluşturun.
- [ ] `[id]/page.tsx` içinde URL'den gelen `id` parametresini ekrana yazdırın.
- [ ] Ana dashboard sayfasında (`/dashboard/page.tsx`), birkaç örnek görev linki oluşturun (Örn: "Görev 1'e Git", "Görev 2't Git").
- [ ] `usePathname` hook'unu kullanarak sidebar'da aktif olan sayfanın (Dashboard veya Settings) stilini değiştirin (Bunun için sidebar'ın bir Client Component olması gerektiğini fark edeceksiniz).

**Beklenen çıktı:**
Dashboard sayfasındaki linklere tıklandığında sayfa yenilenmeden `/dashboard/tasks/1` gibi adreslere gidilmeli ve ekranda "Görev ID: 1" yazısı görünmelidir. Ayrıca sidebar'da hangi sayfadaysak o menü elemanı görsel olarak (örneğin kalın yazı tipi veya farklı renk ile) vurgulanmalıdır.

**İskelet kod (`project/frontend/app/dashboard/tasks/[id]/page.tsx`):**
```tsx
export default function TaskDetailPage({ params }: { params: { id: string } }) {
  // TODO: params içinden id'yi al ve ekranda göster
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Görev Detayı</h1>
      <p className="mt-2">Görüntülenen Görev ID: { /* Buraya id gelecek */ }</p>
    </div>
  );
}
```

---

### 🎤 Mülakat Sorusu

**Soru:** `<Link>` bileşeni ile standart `<a>` etiketi arasındaki fark nedir? Neden her zaman `<Link>` kullanmalıyız?

<details>
<summary>Cevap için tıkla</summary>

Standart `<a>` etiketi kullanıldığında tarayıcı sunucuya tam bir istek atar ve tüm HTML, CSS ve JavaScript dosyalarını yeniden yükler. Bu, state kaybına ve yavaş sayfa geçişlerine neden olur. 

Next.js `<Link>` bileşeni ise:
1. **Client-side Navigation:** Sadece gerekli verileri (JSON) çekerek sayfayı DOM üzerinden günceller.
2. **Prefetching:** Sayfadaki linkler viewport'a (görünür alan) girdiğinde, Next.js arka planda o sayfanın kodunu yükler. Kullanıcı tıkladığında sayfa anında açılır.
3. **State Preservation:** Uygulama state'i (örneğin bir input içindeki yazı) sayfa geçişi sırasında korunabilir.

</details>

---

## ⚙️ DevOps: Docker Nedir?

### 📖 Okuma

Yazılım dünyasının en meşhur sözlerinden biri şudur: *"Ama benim makinemde çalışıyordu!"*

Docker, bu sorunu kökten çözmek için tasarlanmış bir "containerization" (konteynerleştirme) platformudur. Bir uygulamayı; çalışması için gereken tüm kütüphaneler, ayarlar ve bağımlılıklarla birlikte paketleyip bir "konteyner" haline getirir.

**Temel Kavramlar:**

1. **Docker Engine:** Docker'ın kalbidir. Konteynerleri oluşturmanızı, çalıştırmanızı ve yönetmenizi sağlayan motor.
2. **Image (İmaj):** Uygulamanın çalışması için gereken her şeyin bulunduğu, değiştirilemez (read-only) bir pakettir. Bir yemek tarifine benzetilebilir.
3. **Container (Konteyner):** İmajın çalışan bir kopyasıdır. Tariften yapılmış gerçek bir yemek gibidir. Aynı imajdan onlarca konteyner türetebilirsiniz.
4. **Registry (Docker Hub):** İmajların depolandığı ve paylaşıldığı bulut deposudur (GitHub'ın kod için yaptığı şeyi Docker Hub imajlar için yapar).

**Neden Docker Kullanıyoruz?**
- **Tutarlılık:** Geliştirme, test ve canlı ortamların (production) birebir aynı olmasını sağlar.
- **İzolasyon:** Aynı makinede birbirine zıt versiyonlara sahip (örneğin bir proje Node 14, diğeri Node 20 isteyen) uygulamaları sorunsuz çalıştırabilirsiniz.
- **Hızlı Kurulum:** Yeni bir ekip üyesi geldiğinde, saatlerce kurulum yapmak yerine tek bir komutla tüm projeyi ayağa kaldırabilir.

**Dikkat edilecekler:**
- Konteynerler "stateless" (durumsuz) olmalıdır. Konteyner silindiğinde içindeki veriler de gider. Veriyi saklamak için "Volumes" kavramını kullanacağız (ileride).
- Docker, sanal makine (VM) değildir. VM'ler koca bir işletim sistemini simüle ederken, Docker ana makinenin çekirdeğini (kernel) paylaşır, bu yüzden çok daha hafiftir.

**Faydalı kaynaklar:**
- [Docker Curriculum (A comprehensive tutorial)](https://docker-curriculum.com/)
- [Docker Documentation: Get Started](https://docs.docker.com/get-started/)

---

### 💻 Ödev

Bugün teknik bir kurulum ve ilk "merhaba" aşamasını tamamlayacağız.

**Yapılacaklar:**
- [ ] Bilgisayarınıza **Docker Desktop**'ı kurun (Zaten kuruluysa bu adımı geçin).
- [ ] Terminali açın ve `docker --version` komutuyla kurulumu doğrulayın.
- [ ] `docker run hello-world` komutunu çalıştırın. Bu komutun ne yaptığını (imajı nerede aradı, ne yaptı) terminal çıktısından okuyun.
- [ ] `backend/notes.md` dosyasına bugün öğrendiğiniz Docker kavramlarını (Image, Container, Registry) kendi cümlelerinizle kısaca not edin.

**Beklenen çıktı:**
Terminalde "Hello from Docker!" yazısını görmeli ve Docker'ın çalışma mantığını anlatan mesajı okumalısınız.

**İskelet kod (`project/backend/notes.md`):**
```markdown
# Docker Notlarım

- **Image:** ...
- **Container:** ...
- **Docker Hub:** ...

`docker run hello-world` komutu çalıştırıldığında sırasıyla şunlar oldu:
1. ...
2. ...
```

---

### 🎤 Mülakat Sorusu

**Soru:** Docker konteynerleri ile Sanal Makineler (Virtual Machines) arasındaki en temel fark nedir?

<details>
<summary>Cevap için tıkla</summary>

En temel fark **kaynak kullanımı ve mimari**dir.

- **Sanal Makineler (VM):** Her VM kendi içinde tam bir "Misafir İşletim Sistemi" (Guest OS) barındırır. Bu, yüksek RAM ve CPU tüketimi demektir ve başlatılması dakikalar sürer. Donanım seviyesinde sanallaştırma yapar.
- **Docker Konteynerleri:** Ana makinenin (Host OS) çekirdeğini paylaşırlar. İçlerinde işletim sistemi değil, sadece uygulama ve bağımlılıkları vardır. Bu sayede saniyeler içinde açılırlar ve çok az kaynak tüketirler. İşletim sistemi seviyesinde sanallaştırma yaparlar.

</details>

---

## 🔁 Tekrar: Geçmiş Konular

| # | Soru | Konu |
|---|------|------|
| 1 | Next.js'te bir dosyanın "sayfa" (page) olması için ismi ne olmalıdır? | Routing |
| 2 | HTTP 404 ve 500 hata kodları ne anlama gelir? | HTTP Fundamentals |

<details>
<summary>Cevaplar</summary>

1. Dosya ismi mutlaka `page.tsx` (veya .js, .jsx) olmalıdır. Klasör ismi ise rotayı belirler.
2. **404 Not Found:** İstenen kaynak sunucuda bulunamadı. **500 Internal Server Error:** Sunucu tarafında beklenmedik bir hata oluştu.

</details>

---

*Sonraki gün: Next.js — Server Components vs Client Components | Dockerfile — İlk image, katmanlar* 📖

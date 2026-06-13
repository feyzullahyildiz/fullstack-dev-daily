# Day 8 — Next.js: Middleware & Route Handlers | Docker Build & Run

📅 Tarih: 12 Haziran 2026
⏱️ Tahmini süre: 3 saat

---

## 🖥️ Frontend: Middleware & Route Handlers (F05)

### 📖 Okuma

Next.js App Router ile gelen en güçlü özelliklerden biri, isteğin yaşam döngüsüne müdahale edebilme yeteneğidir. Bugün iki kritik konuya odaklanacağız: **Middleware** ve **Route Handlers**.

#### 1. Middleware
Middleware, bir istek tamamlanmadan önce çalışan koddur. Gelen isteğe göre yanıtı değiştirebilir, kullanıcıyı yönlendirebilir (redirect), isteği yeniden yazabilir (rewrite) veya header/cookie ekleyip çıkarabilir.

**Neden Middleware kullanırız?**
- **Kimlik Doğrulama (Auth):** Kullanıcının oturumu yoksa `/dashboard` sayfasına girmesini engellemek için her sayfada kontrol yapmak yerine tek bir merkezden (middleware) kontrol ederiz.
- **Localization:** Kullanıcının diline göre otomatik yönlendirme.
- **Bot Protection:** Zararlı botları engelleme.

Next.js'de middleware, projenin root dizininde (genelde `src/` içinde veya `app/` ile aynı seviyede) `middleware.ts` adıyla bulunur. **Edge Runtime** üzerinde çalıştığı için çok hızlıdır ancak her Node.js kütüphanesini desteklemez (örneğin dosya okuma işlemi yapamazsınız).

#### 2. Route Handlers
Route Handlers, Next.js uygulamanızın içine özel API endpoint'leri yazmanıza olanak tanır. Eskiden `pages/api` dizininde yaptığımız işi, artık `app/` dizini içinde `route.ts` dosyalarıyla yapıyoruz.

**Özellikleri:**
- `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `HEAD` ve `OPTIONS` metodlarını destekler.
- Server Components gibi sunucu tarafında çalışır.
- Veritabanına bağlanabilir, harici API'lere istek atabilir veya webhooks karşılayabilir.

**Dikkat edilecekler:**
- Middleware `middleware.ts` (veya `.js`) isminde olmalıdır.
- Middleware'de `matcher` kullanarak hangi rotalarda çalışacağını filtrelemek performans için kritiktir.
- Route Handler dosyaları `page.tsx` ile aynı klasörde olamaz (çakışma yaratır).

**Faydalı kaynaklar:**
- [Next.js Middleware Docs](https://nextjs.org/docs/app/building-your-application/routing/middleware)
- [Next.js Route Handlers Docs](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

---

### 💻 Ödev

Task Management projemize "güvenlik" ve "api" katmanlarını ekliyoruz.

**Yapılacaklar:**
- [ ] `frontend/` klasörünün kök dizinine `middleware.ts` dosyası oluşturun.
- [ ] `/dashboard` ile başlayan tüm rotaları korumaya alın. Eğer `auth-token` isimli bir cookie yoksa kullanıcıyı ana sayfaya (`/`) yönlendirin.
- [ ] `app/api/health/route.ts` isminde bir Route Handler oluşturun.
- [ ] Bu endpoint'e `GET` isteği atıldığında JSON formatında sistemin durumunu (ok: true) ve güncel zamanı döndürün.

**Beklenen çıktı:**
- `/dashboard` sayfasına tarayıcıdan gitmeye çalıştığınızda, cookie yoksa sizi `/` sayfasına atmalı.
- Tarayıcıdan `/api/health` adresine gittiğinizde bir JSON objesi görmelisiniz.

**İskelet kod (`project/frontend/middleware.ts`):**
```typescript
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')

  // EĞER kullanıcı /dashboard rotasına gidiyorsa VE token yoksa
  // Onu ana sayfaya yönlendir
  
  return NextResponse.next()
}

// Sadece dashboard rotalarında çalışması için yapılandırma
export const config = {
  matcher: '/dashboard/:path*',
}
```

---

### 🎤 Mülakat Sorusu

**Soru:** Middleware içinde neden veritabanı sorgusu yapmamalıyız veya ağır kütüphaneler kullanmamalıyız?

<details>
<summary>Cevap için tıkla</summary>

Middleware, **Edge Runtime** üzerinde çalışır. Bu runtime, gelen her isteğin önünde duran çok hafif ve hızlı bir katmandır. Veritabanı sorgusu gibi gecikme (latency) yaratan işlemler, kullanıcının sayfa yükleme hızını doğrudan etkiler (TTFB - Time to First Byte artar). Ayrıca Edge Runtime, standart Node.js kütüphanelerinin tamamını desteklemez; sadece V8 motoru üzerinde çalışan kısıtlı bir API setine sahiptir. Bu yüzden Middleware'de sadece yönlendirme, cookie kontrolü gibi hafif işlemler yapılmalıdır.

</details>

---

## ⚙️ DevOps: Docker Build & Run (D03)

### 📖 Okuma

Daha önce `Dockerfile` yazmayı ve katman mantığını öğrenmiştik. Bugün, o tariften (Dockerfile) gerçek bir yemek (Container) yapmayı öğreneceğiz.

#### Temel Komutlar:

1. **`docker build`**: Dockerfile'ı okur ve bir **Image** (kalıp) oluşturur.
   - `-t` flag'i ile image'a isim (tag) veririz: `docker build -t task-backend .`
   - Sondaki nokta (`.`), Dockerfile'ın mevcut klasörde olduğunu belirtir.

2. **`docker run`**: Oluşturulan image'dan bir **Container** başlatır.
   - `-p [HostPort]:[ContainerPort]`: Port mapping yapar. Dış dünyadan gelen isteği container içine iletir.
   - `-d` (Detached): Container'ın arka planda çalışmasını sağlar. Terminali meşgul etmez.
   - `--name`: Container'a özel bir isim verir.

3. **`docker ps`**: Çalışan container'ları listeler.
4. **`docker logs [container_id]`**: Uygulamanın çıktılarını (console.log vb.) görmemizi sağlar.
5. **`docker stop [container_id]`**: Container'ı durdurur.

**Neden Image ve Container ayrımı var?**
Image, uygulamanızın dondurulmuş bir halidir (örneğin Windows ISO dosyası gibi). Container ise bu image'ın çalışan halidir (kurulmuş ve açık bilgisayar gibi). Aynı image'dan farklı portlarda onlarca container çalıştırabilirsiniz.

**Faydalı kaynaklar:**
- [Docker Build Reference](https://docs.docker.com/engine/reference/commandline/build/)
- [Docker Run Reference](https://docs.docker.com/engine/reference/run/)

---

### 💻 Ödev

Backend tarafında yazdığımız Node.js uygulamasını bir image haline getirip container içinde çalıştıracağız.

**Yapılacaklar:**
- [ ] `backend/` klasörü içinde basit bir `Dockerfile` oluşturun (Day 6'daki bilgileri hatırlayın).
- [ ] Terminalden `docker build -t daily-backend ./backend` komutu ile image oluşturun.
- [ ] `docker run -d -p 4000:3000 --name my-running-backend daily-backend` komutu ile container'ı başlatın.
- [ ] `docker ps` komutu ile container'ın çalıştığını doğrulayın.
- [ ] `docker logs my-running-backend` ile backend loglarını (Day 7'de yazdığımız EventEmitter çıktılarını) görün.

**Beklenen çıktı:**
Terminalde `docker ps` yazdığınızda backend uygulamanızın 4000 numaralı porttan yayın yaptığını görmelisiniz.

**İskelet kod (`project/backend/Dockerfile`):**
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Uygulama hangi portu kullanacaksa onu belirtin (Dökümantasyon amaçlı)
# EXPOSE 3000 
CMD ["node", "index.js"]
```

---

### 🎤 Mülakat Sorusu

**Soru:** Docker'da "Port Mapping" nedir? `-p 8080:3000` komutu ne anlama gelir?

<details>
<summary>Cevap için tıkla</summary>

Docker container'ları izole ağlarda çalışır. Container içinde bir uygulama 3000 portunu dinlese bile, dış dünya (ana makine) buna doğrudan erişemez. **Port Mapping**, ana makinedeki bir portu container'daki bir porta bağlar. `-p 8080:3000` komutu, "Ana makinedeki 8080 portuna gelen istekleri, bu container'ın 3000 portuna yönlendir" demektir. Böylece tarayıcıdan `localhost:8080` adresine giderek container içindeki uygulamaya ulaşabiliriz.

</details>

---

## 🔁 Tekrar: Geçmiş Konular

| # | Soru | Konu |
|---|------|------|
| 1 | Server Action içinde 'use server' direktifi nerede olmalıdır? | Next.js Server Actions |
| 2 | `fs.appendFile` ve `fs.writeFile` arasındaki fark nedir? | Node.js Core Modules |

<details>
<summary>Cevaplar</summary>

1. Eğer dosyanın tamamı server action'lardan oluşuyorsa en üstte, değilse fonksiyonun en başında olmalıdır.
2. `appendFile` var olan içeriğin sonuna ekleme yaparken, `writeFile` dosyanın üzerine yazar (mevcut içeriği siler).

</details>

---

*Sonraki gün: Next.js: Middleware, Route Handlers | docker-compose* 📖

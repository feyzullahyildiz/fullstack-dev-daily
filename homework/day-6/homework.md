# Day 6 — Next.js Server Actions & Validation | Dockerfile: Katmanlar ve Optimizasyon

📅 Tarih: 12 Haziran 2026
⏱️ Tahmini süre: 3 saat

---

## 🖥️ Frontend: Server Actions & Validation

### 📖 Okuma

Dün Server Actions'ın temellerini ve bir formu nasıl "sunucuya bağladığımızı" öğrendik. Bugün ise bu sürecin en kritik parçasını ele alıyoruz: **Validasyon ve Hata Yönetimi.**

Bir Server Action sadece "mutlu yol" (happy path) için yazılmaz. Kullanıcı boş veri gönderebilir, veri tipi yanlış olabilir veya sunucu tarafında bir hata oluşabilir. Client-side validasyon (HTML `required` veya JS kontrolleri) sadece kullanıcı deneyimi içindir; gerçek güvenlik ve veri bütünlüğü **sunucu tarafında** sağlanmalıdır.

**Server Actions'da Hata Yönetimi Stratejileri:**

1.  **Dönüş Değerleri:** Action bir nesne dönebilir: `{ success: true }` veya `{ error: "Mesaj" }`.
2.  **useActionState (React 19):** Eskiden `useFormState` olan bu hook, formun sonucunu ve bekleme durumunu (pending) yönetmek için standart yoldur.
3.  **Zod Entegrasyonu:** Gelen `FormData`'yı manuel kontrol etmek yerine Zod gibi bir şema kütüphanesi ile doğrulamak en profesyonel yaklaşımdır.

**Neden Zod?**
Server Action'a gelen veri her zaman `FormData` nesnesidir ve tüm değerler string'dir. Zod kullanarak bu string'leri sayıya, tarihe veya belirli bir formatta string'e (email gibi) güvenli bir şekilde dönüştürebiliriz (parsing).

**Dikkat edilecekler:**
- Server Action içinde `try/catch` kullanarak beklenmedik hataları yakalayın.
- Kullanıcıya asla "Database Connection Error" gibi teknik detaylar göstermeyin; "Bir hata oluştu" gibi anlamlı mesajlar dönün.
- `useFormStatus` kullanarak butonun "Gönderiliyor..." durumunu yönetebilirsiniz.

**Faydalı kaynaklar:**
- [Next.js Docs: Server Actions Validation](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#server-side-validation-and-error-handling)
- [Zod Documentation](https://zod.dev/)
- [React Docs: useActionState](https://react.dev/reference/react/useActionState)

---

### 💻 Ödev

Dün oluşturduğumuz alt görev ekleme formunu daha sağlam hale getireceğiz.

**Yapılacaklar:**
- [ ] `project/frontend/actions/subtask-actions.ts` dosyasını güncelleyin.
- [ ] Basit bir Zod şeması tanımlayın (title en az 3 karakter olmalı).
- [ ] Action içindeki veriyi Zod ile parse edin. Hata varsa hata mesajı dönün.
- [ ] `AddSubtaskForm.tsx` içinde `useActionState` hook'unu kullanarak action'ı çağırın.
- [ ] Sunucudan gelen hata mesajını formun altında kırmızı renkle gösterin.
- [ ] (Opsiyonel) `useFormStatus` ile butonun "Ekle..." durumuna geçmesini sağlayın.

**Beklenen çıktı:**
Kullanıcı 3 karakterden kısa bir başlık girdiğinde formun altında "Başlık en az 3 karakter olmalıdır" uyarısı görünmeli ve sunucuya gereksiz kayıt isteği gitmemeli (veya sunucu bunu reddetmeli).

**İskelet kod (`project/frontend/actions/subtask-actions.ts`):**
```typescript
import { z } from 'zod';

const SubtaskSchema = z.object({
  title: z.string().min(3, "Başlık en az 3 karakter olmalıdır"),
  taskId: z.string()
});

export async function createSubtask(prevState: any, formData: FormData) {
  const validatedFields = SubtaskSchema.safeParse({
    title: formData.get('title'),
    taskId: formData.get('taskId'),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors.title?.[0],
    };
  }

  // İşlemi yap...
  return { success: true };
}
```

---

### 🎤 Mülakat Sorusu

**Soru:** Server Action içinde hata oluştuğunda neden `throw new Error()` kullanmak yerine bir obje (`return { error: ... }`) dönmeyi tercih ederiz?

<details>
<summary>Cevap için tıkla</summary>

Server Action içinde `throw` edildiğinde, Next.js bunu en yakın `error.tsx` boundary'sine iletir ve tüm sayfa "patlar". Ancak form validasyon hataları gibi "beklenen" hatalarda tüm sayfayı çökertmek yerine, hatayı bir veri olarak dönüp formun içinde (inline) kullanıcıya göstermek çok daha iyi bir UX sağlar. `throw` sadece uygulamanın devam edemeyeceği kritik hatalar için saklanmalıdır.

</details>

---

## ⚙️ DevOps: Dockerfile Katmanları ve Optimizasyon

### 📖 Okuma

Dockerfile yazmak sadece "çalışan bir image" yapmak değildir; onu hızlı, güvenli ve küçük yapmaktır. Docker her komutu (`RUN`, `COPY`, `ADD`) bir **katman (layer)** olarak saklar.

**Layer Caching (Katman Önbellekleme):**
Eğer bir katman değişmediyse, Docker bir sonraki build işleminde o katmanı tekrar çalıştırmaz, cache'ten alır. Bu yüzden Dockerfile yazarken "az değişenleri üste, çok değişenleri alta" yazmalıyız.

Örnek yanlış sıralama:
```dockerfile
COPY . .
RUN npm install
```
Kodunuzdaki her bir virgül değişikliğinde `npm install` tekrar çalışır.

Örnek doğru sıralama:
```dockerfile
COPY package.json package-lock.json ./
RUN npm install
COPY . .
```
Artık sadece paketler değiştiğinde install yapılır. Kod değişiklikleri cache'i bozmaz.

**.dockerignore:**
`.git`, `node_modules`, `build` gibi dosyaların Docker context'ine gönderilmesini engeller. Bu, build hızını artırır ve image boyutunu küçültür.

**Multi-stage Builds:**
Geliştirme araçlarını (compiler, linter) image içinde bırakmak yerine, sadece "çalışan çıktıları" son aşamaya taşımak image boyutunu devasa oranda (800MB -> 50MB) düşürür.

**Dikkat edilecekler:**
- Her zaman `.dockerignore` dosyası kullanın.
- `RUN apt-get update && apt-get install -y ...` gibi komutları tek satırda birleştirin ki tek bir layer oluşsun.
- `node:alpine` veya `node:slim` gibi küçük tabanlı image'lar tercih edin.

**Faydalı kaynaklar:**
- [Docker Docs: Best practices for writing Dockerfiles](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)
- [Node.js Docker Hub (Alpine vs Slim)](https://hub.docker.com/_/node)

---

### 💻 Ödev

Frontend projemiz için "Production-ready" bir Dockerfile ve `.dockerignore` hazırlayacağız.

**Yapılacaklar:**
- [ ] `project/frontend/.dockerignore` dosyası oluşturun (`node_modules`, `.next`, `.git` ekleyin).
- [ ] `project/frontend/Dockerfile` dosyasını optimize edin.
- [ ] Layer caching stratejisini uygulayın (önce package.json kopyala, sonra install yap).
- [ ] (Bonus) Multi-stage build yapısını araştırın ve `build` aşaması ile `runner` aşamasını ayırın.

**Beklenen çıktı:**
`docker build` komutu çalıştırıldığında, kod değişse bile `npm install` aşamasının atlandığını (CACHED) görmek.

**İskelet kod (`project/frontend/Dockerfile`):**
```dockerfile
# 1. Base image
FROM node:20-alpine AS base

# 2. Dependencies
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# 3. Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# 4. Runner
FROM base AS runner
WORKDIR /app
# Sadece gerekli dosyaları kopyala...
```

---

### 🎤 Mülakat Sorusu

**Soru:** Docker build sırasında `COPY . .` komutu neden `.dockerignore` dosyasına ihtiyaç duyar?

<details>
<summary>Cevap için tıkla</summary>

Docker, build işlemine başlamadan önce projedeki tüm dosyaları "Docker Daemon"a gönderir (build context). Eğer `node_modules` veya `.git` gibi devasa klasörleri ignore etmezseniz, her build başında GB'larca veri gereksiz yere transfer edilir. Ayrıca image içinde `node_modules` klasörünün olması, container içindeki işletim sistemi ile host makinenin mimari farkından dolayı hatalara yol açabilir (native binary'ler).

</details>

---

## 🔁 Tekrar: Geçmiş Konular

| # | Soru | Konu |
|---|------|------|
| 1 | Node.js'de `fs.readFile` ve `fs.readFileSync` arasındaki fark nedir? | Node.js |
| 2 | `revalidatePath` fonksiyonu nerede çalışır (Client mı Server mı)? | Next.js |

<details>
<summary>Cevaplar</summary>

1. `readFile` asenkrondur, event loop'u bloklamaz. `readFileSync` senkrondur, dosya okunana kadar tüm programı durdurur. Production ortamında her zaman asenkron versiyonlar kullanılmalıdır.
2. `revalidatePath` sadece sunucu tarafında (Server Actions veya Route Handlers) çalışır. İstemci tarafındaki cache'i sunucu talimatıyla yeniler.

</details>

---

*Sonraki gün: Next.js: Caching (Farkında Ol) | docker-compose Temelleri* 📖

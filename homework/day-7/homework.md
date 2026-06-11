# Day 7 — Next.js: Caching | Node.js Core Modülleri

📅 Tarih: 13 Haziran 2026
⏱️ Tahmini süre: 3 saat

---

## 🖥️ Frontend: Next.js — Caching (Farkında Ol)

### 📖 Okuma

Next.js, performansı artırmak ve maliyetleri düşürmek için agresif bir önbellekleme (caching) mekanizması kullanır. Bu mekanizma 4 farklı katmandan oluşur. Her birinin amacı ve geçerlilik süresi farklıdır.

**1. Request Memoization (Sunucu Tarafı):**
Aynı render döngüsü içinde aynı URL ve seçeneklerle yapılan `fetch` istekleri otomatik olarak memoize edilir. Yani aynı veriyi 5 farklı bileşende isteseniz bile sunucuya sadece 1 istek gider. Bu sadece `GET` istekleri için geçerlidir.

**2. Data Cache (Sunucu Tarafı):**
Sunucu tarafında yapılan `fetch` isteklerinin sonuçları, bir sonraki `revalidate` işlemine kadar saklanır. Bu sayede her kullanıcı isteğinde dış API'ya veya veritabanına gitmek yerine önbellekteki veri kullanılır. `revalidatePath` veya `revalidateTag` ile bu cache temizlenebilir.

**3. Full Route Cache (Sunucu Tarafı - Build Time):**
Next.js, build sırasında sayfalarınızı statik HTML ve RSC (React Server Component) verisi olarak render eder ve saklar. Eğer bir sayfa "Static" olarak işaretlendiyse, her istekte sunucu kodu çalışmaz, doğrudan bu önbellekteki dosya döner.

**4. Router Cache (İstemci Tarafı):**
Kullanıcı dashboard içinde gezinirken, Next.js ziyaret edilen rotaları tarayıcı hafızasında saklar. Geri butonuna basıldığında sayfa anında yüklenir çünkü veri zaten tarayıcıdadır.

**Neden Önemli?**
Next.js ile çalışırken en çok karşılaşılan sorunlardan biri "Veriyi güncelledim ama sayfada eski hali görünüyor" durumudur. Bu, genellikle **Data Cache** veya **Full Route Cache**'in temizlenmemesinden kaynaklanır.

**Dikkat edilecekler:**
- `dynamic = 'force-dynamic'` kullanarak caching'i tamamen kapatabilirsiniz (sadece gerektiğinde yapın).
- Server Actions (`'use server'`) varsayılan olarak `fetch` cache'ini bozmaz, manuel `revalidatePath` gerekir.
- Geliştirme ortamında (`next dev`) caching, production (`next start`) kadar agresif değildir. Davranışı test etmek için mutlaka build almalısınız.

**Faydalı kaynaklar:**
- [Next.js Docs: Caching in Next.js](https://nextjs.org/docs/app/building-your-application/caching)
- [Lee Robinson: Next.js Caching Explained](https://vercel.com/blog/nextjs-caching-explained)
- [Delba de Oliveira: Caching Visual Guide](https://caching-nextjs.vercel.app/)

---

### 💻 Ödev

Caching mekanizmasını bizzat test edip "görmeniz" gerekiyor.

**Yapılacaklar:**
- [ ] `app/dashboard/tasks/[id]/page.tsx` dosyasına `new Date().toLocaleTimeString()` ekleyerek sayfanın render edilme zamanını gösterin.
- [ ] Uygulamayı build alın (`npm run build`) ve sonra çalıştırın (`npm run start`).
- [ ] Sayfayı yenilediğinizde saatin değişip değişmediğini kontrol edin.
- [ ] Sayfanın başına `export const revalidate = 10` (10 saniyede bir yenile) veya `export const dynamic = 'force-dynamic'` ekleyerek farkı gözlemleyin.
- [ ] Server Action içindeki `revalidatePath` komutunun bu saate etkisini inceleyin.

**Beklenen çıktı:**
Static rendering vs Dynamic rendering arasındaki farkı ve "Build time" render kavramını anlamış olmak.

**İskelet kod (`project/frontend/app/dashboard/tasks/[id]/page.tsx`):**
```tsx
// TODO: Buraya caching ayarı ekleyerek test et (opsiyonel)
// export const dynamic = 'force-dynamic' 

export default async function TaskPage({ params }: { params: { id: string } }) {
  const currentTime = new Date().toLocaleTimeString();
  
  return (
    <div>
      <p className="text-xs text-gray-400">Render Zamanı: {currentTime}</p>
      {/* ... mevcut kodlar */}
    </div>
  )
}
```

---

### 🎤 Mülakat Sorusu

**Soru:** Next.js uygulamanızda veritabanındaki veri güncellenmesine rağmen sayfada hala eski veri görünüyor. Sorun ne olabilir ve nasıl çözersiniz?

<details>
<summary>Cevap için tıkla</summary>

Sorun genellikle **Data Cache** veya **Full Route Cache** katmanlarından kaynaklanır. Next.js bu sayfayı statik olarak render etmiş ve önbelleğe almış olabilir.
Çözüm için:
1. Veri güncellendiğinde Server Action içinde `revalidatePath('/path')` veya `revalidateTag('tag')` çağrılmalıdır.
2. Eğer sayfa her zaman güncel olmalıysa `export const dynamic = 'force-dynamic'` kullanılabilir.
3. `fetch` isteği içinde `{ next: { revalidate: 0 } }` veya `cache: 'no-store'` seçeneği eklenebilir.

</details>

---

## ⚙️ Backend: Node.js Core Modülleri

### 📖 Okuma

Node.js'in gücü sadece V8 motorundan değil, beraberinde gelen zengin standart kütüphaneden (Core Modules) gelir. Harici bir paket yüklemeden dosya sistemiyle konuşabilir, network işlemleri yapabilir ve işletim sistemi detaylarına ulaşabiliriz.

**Önemli Modüller:**
- **fs (File System):** Dosya okuma, yazma, silme ve klasör yönetimi. Modern projelerde `fs/promises` tercih edilir.
- **path:** Dosya yollarını (Windows/Linux farketmeksizin) güvenli bir şekilde birleştirme (`join`) ve parse etme.
- **os:** İşletim sistemi hakkında bilgi (CPU, RAM, kullanıcı dizini).
- **events:** Kendi olaylarımızı (event) tanımlama ve dinleme (EventEmitter). Node.js'in kalbi bu modül üzerine kuruludur.

**Neden Bilmeliyiz?**
Express.js gibi framework'ler bu modüllerin üzerine inşa edilmiştir. Dosya yükleme (upload), loglama veya config yönetimi yaparken bu modüllere her zaman ihtiyacınız olacak.

**Dikkat edilecekler:**
- Dosya yollarını asla manuel string birleştirme (`'/' + name`) ile yapmayın; her zaman `path.join()` kullanın.
- Büyük dosyalarla çalışırken `fs.readFile` tüm dosyayı RAM'e yükler; bu tehlikelidir. (İleride **Streams** konusuna değineceğiz).

**Faydalı kaynaklar:**
- [Node.js Docs: Path](https://nodejs.org/api/path.html)
- [Node.js Docs: File System](https://nodejs.org/api/fs.html)
- [Node.js Docs: Events](https://nodejs.org/api/events.html)

---

### 💻 Ödev

Node.js core modüllerini kullanarak basit bir "Task Logger" yapısı kuracağız.

**Yapılacaklar:**
- [ ] `project/backend/` içinde `task-logger.js` adında yeni bir dosya oluşturun.
- [ ] `EventEmitter` kullanarak bir `logger` nesnesi oluşturun.
- [ ] "taskCreated" ve "taskDeleted" olaylarını dinleyen listener'lar yazın.
- [ ] Bu olaylar tetiklendiğinde (emit), `fs` ve `path` modüllerini kullanarak `logs/activity.log` dosyasına tarihli bir mesaj ekleyin.
- [ ] Ana `index.js` dosyanızda bu logger'ı import edip birkaç olay tetikleyin.

**Beklenen çıktı:**
Node.js'in olay tabanlı yapısını ve dosya sistemiyle nasıl etkileşime girdiğini deneyimlemek.

**İskelet kod (`project/backend/task-logger.js`):**
```javascript
import { EventEmitter } from 'node:events';
import fs from 'node:fs/promises';
import path from 'node:path';

const logger = new EventEmitter();

logger.on('taskCreated', async (taskName) => {
  const logMessage = `[${new Date().toISOString()}] OLUŞTURULDU: ${taskName}\n`;
  // TODO: Path modülü ilelogs/activity.log yolunu belirle ve appendFile ile yaz
});

export default logger;
```

---

### 🎤 Mülakat Sorusu

**Soru:** Node.js'de `__dirname` ve `__filename` nedir? ESM (ECMAScript Modules) modunda bunları kullanırken neye dikkat etmelisiniz?

<details>
<summary>Cevap için tıkla</summary>

`__dirname` bulunulan klasörün, `__filename` ise çalıştırılan dosyanın tam yolunu verir. Ancak bunlar **CommonJS** modül sistemine özeldir. Projeniz ESM (`"type": "module"`) ise bu değişkenler tanımlı değildir. ESM'de dosya yolunu bulmak için `import.meta.url` kullanılır ve `path` modülündeki `fileURLToPath` fonksiyonu ile gerçek yola dönüştürülür.

</details>

---

## 🔁 Tekrar: Geçmiş Konular

| # | Soru | Konu |
|---|------|------|
| 1 | `useFormStatus` hook'u neden formun olduğu bileşende değil, formun altındaki bir bileşende kullanılmalıdır? | React Hooks |
| 2 | Docker'da `WORKDIR /app` komutu ne işe yarar? | Docker |

<details>
<summary>Cevaplar</summary>

1. Çünkü `useFormStatus` en yakın üst `<form>` elementinin durumunu dinler. Eğer formun kendisiyle aynı bileşende kullanılırsa, form henüz render edilmediği veya context içinde olmadığı için `pending` durumunu yakalayamaz.
2. Sonraki tüm komutların (RUN, COPY, CMD) bu klasör altında çalıştırılacağını belirtir. Eğer klasör yoksa Docker onu otomatik olarak oluşturur.

</details>

---

*Sonraki gün: Next.js: Middleware, Route Handlers | Docker — Image build ve Container çalıştırma* 📖

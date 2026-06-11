# Day 5 — Next.js: Server Actions | Node.js Temelleri

📅 Tarih: 11 Haziran 2026
⏱️ Tahmini süre: 3 saat

---

## 🖥️ Frontend: Next.js — Server Actions

### 📖 Okuma

Next.js Server Actions, modern web geliştirmede "full-stack" deneyimini en çok hissettiğimiz özelliklerden biridir. Geleneksel yaklaşımdaki form gönderimi (Client-side `onSubmit` -> `fetch('/api/...')` -> JSON response -> State update) döngüsünü inanılmaz derecede sadeleştirir.

Server Actions, sunucuda çalışan ve doğrudan bir Client Component veya Server Component içinden çağrılabilen asenkron fonksiyonlardır. `'use server'` direktifi ile tanımlanırlar.

**Neden Server Actions?**
1.  **Sadelik:** API endpoint'leri yazmak ve yönetmek zorunda kalmazsınız. Fonksiyonunuz doğrudan sunucuda çalışır.
2.  **Progressive Enhancement:** JS henüz yüklenmemiş olsa bile `<form action={action}>` yapısı sayesinde formlar çalışmaya devam eder.
3.  **Type Safety:** Client ve Server arasında aynı tipleri kullanarak veri transferi yaparsınız.
4.  **Caching & Revalidation:** Bir işlemden sonra `revalidatePath` veya `revalidateTag` kullanarak verinin anında güncellenmesini sağlayabilirsiniz.

Server Actions sadece formlarla sınırlı değildir; buton tıklamaları gibi herhangi bir client-side event içinden de çağrılabilirler. Ancak en verimli kullanım alanı formlardır.

**Dikkat edilecekler:**
- Server Actions her zaman **asenkron** olmalıdır (`async`).
- `'use server'` direktifi dosyanın en başında veya fonksiyonun en başında kullanılmalıdır.
- Hassas verilerle çalışırken Server Action içindeki yetki kontrolünü (authentication/authorization) unutmamalısınız.

**Faydalı kaynaklar:**
- [Next.js Docs: Server Actions and Mutations](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
- [Lee Robinson: Next.js Server Actions](https://vercel.com/blog/how-to-think-about-security-in-next-js-actions)
- [Kent C. Dodds: Progressive Enhancement](https://www.epicweb.dev/progressive-enhancement)

---

### 💻 Ödev

Task Management projemizde, görev detay sayfasında yeni bir "Alt Görev" eklemek için Server Action kullanacağız.

**Yapılacaklar:**
- [ ] `project/frontend/actions/subtask-actions.ts` adında bir dosya oluşturun ve `'use server'` ile işaretleyin.
- [ ] Yeni bir alt görev ekleyecek asenkron bir fonksiyon yazın. Bu fonksiyon simüle edilmiş bir veritabanına (şimdilik konsola yazdırabilir) kayıt yapmalı.
- [ ] `SubtaskItem.tsx` yanına veya altına yeni bir `AddSubtaskForm.tsx` bileşeni ekleyin.
- [ ] Formun `action` prop'una oluşturduğunuz Server Action'ı bağlayın.
- [ ] (Bonus) İşlem bittikten sonra formu temizlemek için `useFormStatus` veya `useActionState` (React 19) gibi hook'ları araştırın.

**Beklenen çıktı:**
Kullanıcı bir metin girip "Ekle" butonuna bastığında, sayfa yenilenmeden (veya minimal revalidation ile) sunucu tarafında fonksiyon çalışmalı ve yeni görev "eklenmiş" gibi davranmalı.

**İskelet kod (`project/frontend/actions/subtask-actions.ts`):**
```typescript
'use server'

import { revalidatePath } from 'next/cache';

export async function createSubtask(formData: FormData) {
  const title = formData.get('title');

  // 1. Validasyon yap (Zod ilerde gelecek ama manuel kontrol ekle)
  // 2. Veritabanına kaydet (Şimdilik delay ekleyip simüle et)
  // 3. Cache'i temizle: revalidatePath('/dashboard/tasks/[id]')
  
  console.log("Sunucuda alt görev oluşturuluyor:", title);
  
  // Eksik: Hata yönetimi ve dönüş tipi?
}
```

---

### 🎤 Mülakat Sorusu

**Soru:** Server Actions kullanırken "Progressive Enhancement" neden önemlidir ve Next.js bunu nasıl sağlar?

<details>
<summary>Cevap için tıkla</summary>

Progressive Enhancement, bir web uygulamasının temel özelliklerinin en düşük teknik imkanlarda bile çalışabilmesini sağlar. Server Actions, standart HTML `<form>` yapısını kullandığı için, istemcide JavaScript devre dışı bırakılmış olsa veya henüz yüklenmemiş olsa dahi çalışır. Next.js, form gönderildiğinde bunu standart bir HTTP POST isteği olarak sunucuya iletir ve sayfa durumunu sunucu tarafında güncelleyerek (SSR/RSC) kullanıcıya yeni durumu döner. Bu, uygulamanın dayanıklılığını (resilience) ve erişilebilirliğini artırır.

</details>

---

## ⚙️ Backend: Node.js Temelleri

### 📖 Okuma

Node.js, JavaScript'i tarayıcı dışına çıkaran, Chrome V8 motoru üzerine kurulu bir runtime'dır. Onu özel yapan en büyük özellik **Single-Threaded** ve **Non-blocking I/O** (olay tabanlı giriş/çıkış) yapısıdır.

**Event Loop (Olay Döngüsü):**
Node.js tek bir thread üzerinde çalışmasına rağmen, ağır I/O işlemlerini (dosya okuma, veritabanı sorgusu, network isteği) işletim sistemine devreder. Bu işlemler bittiğinde, sonuçlar bir "callback queue"ya atılır. Event Loop, ana thread boşaldığında bu kuyruktaki işlemleri sırayla işler.

**Async/Await & Promises:**
Callback Hell (iç içe geçmiş fonksiyonlar) probleminden kurtulmak için önce Promise yapısı, ardından da senkron kod yazar gibi asenkron kod yazmamızı sağlayan `async/await` geldi. Node.js backend geliştirirken kodun %90'ı asenkron olacaktır.

**CommonJS (CJS) vs ECMAScript Modules (ESM):**
-   **CJS:** `require()` ve `module.exports` kullanır. Node.js'in geleneksel yapısıdır.
-   **ESM:** `import` ve `export` kullanır. Modern standarttır. Artık projelerimizde ESM kullanmayı tercih ediyoruz.

**Dikkat edilecekler:**
- Ana thread'i (Event Loop) asla bloklamayın! Yoğun matematiksel hesaplamalar ana thread'i durdurur ve tüm sunucuyu kilitler.
- `package.json` dosyasında `"type": "module"` ekleyerek ESM moduna geçebilirsiniz.

**Faydalı kaynaklar:**
- [Node.js Docs: The Node.js Event Loop](https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick)
- [V8 Engine Guide](https://v8.dev/)
- [JavaScript.info: Async/Await](https://javascript.info/async-await)

---

### 💻 Ödev

Artık markdown dosyalarından çıkıp gerçek Node.js koduna geçiyoruz.

**Yapılacaklar:**
- [ ] `project/backend/` klasöründe `npm init -y` ile bir proje başlatın.
- [ ] `package.json` dosyanıza `"type": "module"` ekleyin.
- [ ] `index.js` dosyası oluşturun.
- [ ] `fs/promises` modülünü kullanarak bir dosyayı asenkron okuyan ve içeriğini konsola yazan bir fonksiyon yazın.
- [ ] Event loop davranışını anlamak için; bir `setTimeout`, bir `Promise` ve normal bir `console.log` içeren bir kod bloğu yazıp çıktı sırasını tahmin edin.

**Beklenen çıktı:**
Node.js ortamında asenkron işlemlerin sırasını ve dosya sistemine nasıl erişildiğini anlamış olmak.

**İskelet kod (`project/backend/index.js`):**
```javascript
import fs from 'node:fs/promises';

console.log('1. Program başladı');

// TODO: fs.readFile ile bir dosyayı oku (await kullanmayı unutma)
// TODO: setTimeout(..., 0) ekle
// TODO: Promise.resolve().then(...) ekle

console.log('2. Program bitti (mi?)');
```

---

### 🎤 Mülakat Sorusu

**Soru:** Node.js tek thread (Single-threaded) ise nasıl aynı anda binlerce isteğe cevap verebiliyor?

<details>
<summary>Cevap için tıkla</summary>

Node.js'in kendisi tek thread olsa da, giriş/çıkış (I/O) işlemleri için işletim sisteminin sunduğu imkanları (epoll, kqueue, IOCP) veya arka plandaki `libuv` thread pool'u kullanır. Ağır işleri sunucu işletim sistemine "sipariş" verir ve kendisi boşa çıkar. Sipariş hazır olduğunda haber alır ve sonucu döner. Bu sayede ana thread asla bir işlemin bitmesini bekleyerek boş durmaz (non-blocking).

</details>

---

## 🔁 Tekrar: Geçmiş Konular

| # | Soru | Konu |
|---|------|------|
| 1 | Client Component içine yazılan bir `console.log` nerede görünür? | Server/Client Components |
| 2 | Dockerfile'da `COPY . .` satırı neden genelde `npm install`dan sonra gelir? | Dockerfile |

<details>
<summary>Cevaplar</summary>

1. Hem sunucu tarafında (ilk render sırasında terminalde) hem de tarayıcı tarafında (konsolda) görünür. Ancak "use client" olsa bile ilk render sunucuda yapıldığı için terminale de log düşer.
2. Docker'ın "layer caching" mekanizmasından yararlanmak için. `package.json` değişmediği sürece `npm install` katmanı cache'ten okunur, böylece her kod değişikliğinde gereksiz yere paketler tekrar indirilmez.

</details>

---

*Sonraki gün: Next.js: Server Actions (Devam) | Dockerfile (Devam)* 📖

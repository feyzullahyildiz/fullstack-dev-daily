# Day 4 — Next.js Server & Client Composition | Dockerfile Temelleri

📅 Tarih: 11 Haziran 2026
⏱️ Tahmini süre: 3 saat

---

## 🖥️ Frontend: Next.js — Server Components vs Client Components (Bölüm 2)

### 📖 Okuma

Dün, Next.js'in varsayılan olarak her şeyi sunucuda (Server Component) render ettiğini ve interaktivite gerektiğinde `"use client"` direktifiyle istemci tarafına (Client Component) geçtiğimizi öğrendik. Bugün bu iki dünya arasındaki **"Network Boundary" (Ağ Sınırı)** ve veri iletimi konusuna odaklanacağız.

#### Serialization (Serileştirme) Nedir?
Sunucu bileşeni (RSC) bir Client Component'i render ettiğinde, aslında sunucudan tarayıcıya bir JSON benzeri veri yapısı gönderilir. Bu yapı, Client Component'in hangi prop'ları aldığını içerir. Ancak bir kısıtlama vardır: **Prop'lar serileştirilebilir (serializable) olmalıdır.**

**Neler gönderilebilir?**
- String, Number, Boolean, Null
- Plain Objects ( `{ name: "John" }` gibi)
- Arrays
- Bazı özel tipler (örneğin Server Action fonksiyonları - bunu sonra göreceğiz)

**Neler gönderilemez?**
- **Fonksiyonlar:** Sunucuda tanımlanan bir `onClick` handler'ını istemciye gönderemezsiniz. Çünkü fonksiyonlar "çalıştırılabilir kod"dur ve bir ağ üzerinden kolayca transfer edilemezler.
- **Class Instance'ları:** Sadece datayı tutan düz objeler (POJO) geçmelidir.

#### Composition (Bileşim) Pattern
Büyük bir hata: "Eğer üstteki bileşen Client ise, altındakiler de mecburen Client olur." **Yanlış!**
Eğer bir Server Component'i bir Client Component'e `children` olarak geçerseniz, o Server Component hala sunucuda render edilmeye devam eder. Bu, performans için kritik bir "composition" tekniğidir.

**Dikkat edilecekler:**
- `"use client"` sadece o dosyanın ve onun import ettiği alt dosyaların "Client Boundary" içine girdiğini söyler.
- Veri çekerken (Fetching), veriyi en üstteki Server Component'te çekip alt bileşenlere dağıtmak (Prop Drilling yerine Composition ile) en sağlıklı yoldur.
- Client Component'leri ağacın (component tree) mümkün olduğunca en uç noktalarına (leaf nodes) yerleştirin.

**Faydalı kaynaklar:**
- [Next.js Docs: Server and Client Composition Patterns](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns)
- [React Docs: Passing props to a component](https://react.dev/learn/passing-props-to-a-component)

---

### 💻 Ödev

Task Management projemizde, görev detay sayfasını daha karmaşık bir yapıya kavuşturacağız.

**Yapılacaklar:**
- [ ] `app/dashboard/tasks/[id]/page.tsx` dosyasında mock veriye "subtasks" (alt görevler) dizisi ekle.
- [ ] Her bir alt görev için `components/SubtaskItem.tsx` adında yeni bir **Client Component** oluştur.
- [ ] `SubtaskItem` bileşeni, bir "Check" butonu içermeli ve tıklandığında yerel state (`useState`) ile "tamamlandı/tamamlanmadı" durumunu değiştirmeli.
- [ ] **Deney:** Sunucu bileşeninden (`page.tsx`), `SubtaskItem`'a bir fonksiyon (callback) geçmeyi dene ve tarayıcı konsolundaki hatayı incele.

**Beklenen çıktı:**
Görev detay sayfasında alt görevler listelenmeli, her birinin yanındaki kutucuğa tıklandığında durumu (UI üzerinde) değişmeli.

**İskelet kod (`project/frontend/components/SubtaskItem.tsx`):**
```tsx
"use client";

import { useState } from "react";

interface Subtask {
  id: number;
  title: string;
}

export default function SubtaskItem({ subtask }: { subtask: Subtask }) {
  const [done, setDone] = useState(false);

  return (
    <div className="flex items-center gap-2 p-2 border-b">
      <input 
        type="checkbox" 
        checked={done} 
        onChange={() => setDone(!done)} 
      />
      <span className={done ? "line-through text-gray-400" : ""}>
        {subtask.title}
      </span>
    </div>
  );
}
```

---

### 🎤 Mülakat Sorusu

**Soru:** "Bir Server Component içinden bir Client Component'e veri geçerken neden bir fonksiyon (callback) gönderemeyiz?"

<details>
<summary>Cevap için tıkla</summary>

Çünkü Server Component sunucuda çalışır ve HTML/RSC Payload üretir. Bu payload istemciye (tarayıcıya) bir ağ üzerinden gönderilir. Fonksiyonlar, bellekteki bir referansı temsil eder ve bu referans sunucu belleğindedir. JSON formatına dönüştürülemezler (non-serializable). İstemci tarafında bu fonksiyonu çalıştırmak demek, istemcinin sunucudaki o bellek adresine erişmesi demektir ki bu imkansızdır. Bu sınırı aşmak için "Server Actions" kullanılır.

</details>

---

## ⚙️ DevOps: Dockerfile Temelleri

### 📖 Okuma

Docker dünyasına "Merhaba" demenin en somut yolu bir **Dockerfile** yazmaktır. Dockerfile, bir uygulamanın nasıl paketleneceğini (image haline getirileceğini) belirten bir reçetedir.

#### Temel Komutlar (Instruction)
1. **FROM**: Hangi temel imajı (base image) kullanacağımızı belirler. Örneğin: `node:20-alpine`. (Alpine, çok küçük boyutlu bir Linux dağıtımıdır).
2. **WORKDIR**: Container içindeki çalışma dizinini ayarlar. `cd` komutu gibi düşünebilirsiniz.
3. **COPY**: Kendi bilgisayarımızdaki dosyaları container içine kopyalar. `COPY <kaynak> <hedef>`.
4. **RUN**: Image build edilirken çalıştırılacak komutlardır. Örneğin: `npm install`.
5. **EXPOSE**: Container'ın hangi porttan yayın yapacağını belirtir (belgesel amaçlıdır).
6. **CMD**: Container ayağa kalktığında (çalıştırıldığında) yürütülecek ana komuttur.

#### Katmanlı Yapı (Layers)
Dockerfile'daki her satır bir "katman" (layer) oluşturur. Docker, değişmeyen katmanları cache'ler. Örneğin, `package.json` değişmediyse `npm install` adımı tekrar çalıştırılmaz, cache'den alınır. Bu yüzden `COPY . .` komutundan önce sadece `package.json` dosyalarını kopyalamak bir best practice'dir.

**Faydalı kaynaklar:**
- [Docker Docs: Dockerfile reference](https://docs.docker.com/engine/reference/builder/)
- [Node.js Docker Best Practices](https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md)

---

### 💻 Ödev

Next.js frontend uygulamamız için basit bir Dockerfile hazırlayacağız.

**Yapılacaklar:**
- [ ] `project/frontend/` klasörü içinde bir `Dockerfile` (uzantısız) oluştur.
- [ ] Node.js 20 imajını baz al.
- [ ] Bağımlılıkları yükle ve uygulamayı kopyala.
- [ ] Uygulamayı geliştirme modunda (`npm run dev`) başlatacak şekilde ayarla.

**Beklenen çıktı:**
`frontend/Dockerfile` dosyası hazır olmalı. (Şimdilik build almanız zorunlu değil, sadece dosyayı doğru yazın).

**İskelet kod (`project/frontend/Dockerfile`):**
```dockerfile
# 1. Base image seçimi (node:20-alpine kullanabilirsin)
FROM ...

# 2. Uygulama klasörünü oluştur
WORKDIR /app

# 3. Bağımlılıkları kopyala ve yükle
COPY package*.json ./
RUN ...

# 4. Tüm kodları kopyala
COPY . .

# 5. Portu belirt (Next.js default 3000)
EXPOSE 3000

# 6. Uygulamayı başlat
CMD ["npm", "run", "dev"]
```

---

### 🎤 Mülakat Sorusu

**Soru:** "Dockerfile'da `COPY . .` komutunu `npm install`'dan hemen önce mi yoksa sonra mı yazmalıyız? Neden?"

<details>
<summary>Cevap için tıkla</summary>

`npm install` komutundan **sonra** yazmalıyız. Çünkü Docker katmanları cache'ler. Eğer önce `COPY . .` derseniz, projedeki herhangi bir dosya (örn: bir CSS dosyası) değiştiğinde Docker "tüm dosyalar değişti" diye algılar ve sonraki `npm install` adımını cache'den kullanmak yerine baştan çalıştırır. Önce sadece `package.json` kopyalayıp `npm install` yaparsak, sadece bağımlılıklar değiştiğinde bu ağır işlem tekrar yapılır.

</details>

---

## 🔁 Tekrar: Geçmiş Konular

| # | Soru | Konu |
|---|------|------|
| 1 | URL'de `id` gibi değişkenleri yakalamak için klasör ismi nasıl olmalı? | Next.js Routing |
| 2 | HTTP 201 kodu ne anlama gelir? | HTTP Temelleri |

<details>
<summary>Cevaplar</summary>

1. Köşeli parantez içinde olmalı: `[id]`.
2. Created (Yeni bir kaynak başarıyla oluşturuldu).

</details>

---

*Sonraki gün: Next.js — Server Actions | Node.js Temelleri* 📖

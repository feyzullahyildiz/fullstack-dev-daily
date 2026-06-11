# Day 3 — Next.js: Server Components vs Client Components | REST API Principles

📅 Tarih: 11 Haziran 2026
⏱️ Tahmini süre: 3 saat

---

## 🖥️ Frontend: Server Components vs Client Components (F02)

### 📖 Okuma

Next.js App Router ile gelen en köklü değişiklik, bileşenlerin varsayılan olarak **Server Component** olmasıdır. Bu, React dünyasında zihinsel bir devrimdir. Eskiden her bileşen tarayıcıda çalışırken (CSR), artık bileşenlerin nerede çalışacağına biz karar veriyoruz.

**Server Components (RSC):**
- **Nerede çalışır?** Sadece sunucuda.
- **Avantajı:** Veritabanına doğrudan erişebilir, API anahtarlarını güvenle saklayabilir, istemciye gönderilen JavaScript boyutunu sıfıra indirir (Zero Bundle Size).
- **Kısıtlamalar:** `useState`, `useEffect` gibi hook'lar kullanılamaz. Event listener'lar (onClick, onChange) eklenemez. Tarayıcı API'larına (window, localStorage) erişilemez.

**Client Components:**
- **Nerede çalışır?** Sunucuda ön-render (Prerender) edilir ve tarayıcıda "hidrasyon" sonrası interaktif hale gelir.
- **Nasıl tanımlanır?** Dosyanın en üstüne `"use client"` yazarak.
- **Avantajı:** İnteraktivite sağlar, state tutabilir, tarayıcı API'larını kullanabilir.

**Altın Kural:** Mümkün olduğunca Server Component kullanın. Sadece interaktivite (formlar, buton tıklamaları, state) gerektiğinde en küçük yapraklara (leaf components) `"use client"` ekleyerek Client Component'e geçiş yapın. Veri çekme işlemleri her zaman Server Component içinde yapılmalıdır.

**Dikkat edilecekler:**
- Server Component'ten Client Component'e veri (props) gönderebilirsiniz, ancak fonksiyon gönderemezsiniz (çünkü sunucudan tarayıcıya fonksiyon serialize edilemez).
- Client Component içinde bir Server Component'i "import" edip kullanamazsınız; ancak `children` olarak geçebilirsiniz.
- Veri çekme (fetching) işlemini en üstteki Server Component'te yapıp, sonucu Client bileşenlerine dağıtmak en iyi pratiktir.

**Faydalı kaynaklar:**
- [Next.js Docs: Server and Client Components](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns)
- [Josh W. Comeau: Making Sense of React Server Components](https://www.joshwcomeau.com/react/server-components/)

---

### 💻 Ödev

Task Management projesinde, görev detay sayfasını gerçekçi bir yapıya dönüştüreceğiz. Sayfanın kendisi veriyi çeken bir Server Component olacak, ancak görevin tamamlanıp tamamlanmadığını değiştiren buton bir Client Component olacak.

**Yapılacaklar:**
- [ ] `frontend/app/dashboard/tasks/[id]/page.tsx` dosyasını bir Server Component olarak düzenle.
- [ ] İçerisinde sahte bir veri (mock data) döndüren async bir fonksiyon kullan.
- [ ] `frontend/components/TaskToggle.tsx` adında yeni bir bileşen oluştur ve üzerine `"use client"` ekle.
- [ ] Bu bileşende `useState` kullanarak görevin "Tamamlandı" durumunu yönet.
- [ ] Client bileşenini Server bileşeni içinde çağır ve başlangıç durumunu (initial state) prop olarak geç.

**Beklenen çıktı:**
`/dashboard/tasks/1` sayfasına gidildiğinde "Görev #1" başlığı ve detayları sunucudan gelmeli. Altındaki "Tamamlandı olarak işaretle" butonuna tıklandığında sayfa yenilenmeden butonun metni/rengi değişmeli (client-side state).

**İskelet kod (`project/frontend/app/dashboard/tasks/[id]/page.tsx`):**
```tsx
// Bu bir Server Component'tir (varsayılan)
import TaskToggle from "@/components/TaskToggle";

async function getTask(id: string) {
  // Gerçek bir API varmış gibi simüle ediyoruz
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    id,
    title: `Görev #${id}`,
    description: "Bu görev sunucu tarafında oluşturuldu.",
    isCompleted: false,
  };
}

export default async function TaskDetailPage({ params }: { params: { id: string } }) {
  const task = await getTask(params.id);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">{task.title}</h1>
      <p className="text-gray-600 my-4">{task.description}</p>
      
      {/* İstemci tarafında çalışacak interaktif bileşen */}
      <TaskToggle initialStatus={task.isCompleted} />
    </div>
  );
}
```

---

### 🎤 Mülakat Sorusu

**Soru:** "use client" direktifi kullanılan bir bileşenin içindeki tüm alt bileşenler (children hariç) otomatik olarak Client Component mi olur?

<details>
<summary>Cevap için tıkla</summary>

Evet. Bir dosyanın başına `"use client"` yazdığınızda, o dosyanın render ağacındaki tüm alt bileşenler (import edilenler) de istemci tarafında çalıştırılmak üzere paketlenir. Bu yüzden `"use client"` direktifini ağacın olabildiğince aşağısına, sadece interaktivite gereken küçük parçalara koymak performans açısından kritiktir. Eğer bir Server Component'i bir Client Component'in içinde kullanmak isterseniz, onu `children` prop'u üzerinden geçmeniz gerekir.

</details>

---

## ⚙️ Backend: REST API Principles (B02)

### 📖 Okuma

REST (Representational State Transfer), web servisleri tasarlamak için kullanılan mimari bir stildir. Bir API'ın RESTful olması için uyması gereken temel kurallar vardır:

1.  **Resource-Based (Kaynak Odaklı):** URL'ler eylemleri (fiilleri) değil, kaynakları (isimleri) temsil etmelidir.
    - ❌ Yanlış: `/getAllTasks`, `/deleteTask/5`
    - ✅ Doğru: `/tasks` (tüm görevler), `/tasks/5` (belirli bir görev)
2.  **HTTP Methodları:** Kaynaklar üzerindeki işlemler standart metodlarla yapılır:
    - `GET`: Kaynak okuma
    - `POST`: Yeni kaynak oluşturma
    - `PUT`: Kaynağı tamamen güncelleme
    - `PATCH`: Kaynağın bir kısmını güncelleme
    - `DELETE`: Kaynağı silme
3.  **Stateless (Durumsuz):** Sunucu, her isteği birbirinden bağımsız ele almalıdır. İstemcinin durumu (session vb.) sunucuda tutulmamalı, her istek gerekli tüm bilgileri (token vb.) içermelidir.
4.  **Uniform Interface:** Hata kodları (`404`, `200`, `201`, `500`) ve veri formatı (genellikle `JSON`) standartlara uygun olmalıdır.

**Dikkat edilecekler:**
- Koleksiyon isimleri her zaman çoğul (`/users`) olmalıdır.
- Hiyerarşi URL'de belirtilmelidir: `/tasks/5/comments` (5 nolu görevin yorumları).
- Filtreleme ve sıralama için Query Params kullanılmalıdır: `/tasks?status=completed&sort=date`.

**Faydalı kaynaklar:**
- [RESTful API Tutorial](https://restfulapi.net/)
- [Microsoft REST API Guidelines](https://github.com/microsoft/api-guidelines)

---

### 💻 Ödev

Task Management uygulamamız için ideal bir REST API tasarımı yapacağız. Henüz kod yazmayacağız, ancak mimariyi dokümante edeceğiz.

**Yapılacaklar:**
- [ ] `backend/api-design.md` dosyasını oluştur.
- [ ] Uygulamadaki şu kaynaklar için endpoint'leri belirle: `Tasks`, `Users`, `Categories`.
- [ ] Her endpoint için hangi HTTP metodunun kullanılacağını ve beklenen JSON yapısını (request/response) yaz.
- [ ] Hata durumlarında hangi status code'ların dönüleceğini belirt (Örn: Yetkisiz erişimde 401).

**Beklenen çıktı:**
Geliştiricilerin bakıp "Hangi endpoint ne işe yarıyor ve ne gönderip ne alıyorum?" sorusuna net cevap bulabileceği bir Markdown dosyası.

**İskelet kod (`project/backend/api-design.md`):**
```markdown
# Task Management API Design

## Endpoints

### Tasks
- `GET /tasks`: Tüm görevleri listele.
  - Query Params: `status` (todo, in-progress, done), `search`.
- `POST /tasks`: Yeni bir görev oluştur.
  - Body: `{ "title": string, "description": string }`
- `GET /tasks/:id`: Tek bir görev detayı.
- ...

## Hata Kodları
- `400 Bad Request`: Eksik veya hatalı veri gönderildiğinde.
- `404 Not Found`: ...
```

---

### 🎤 Mülakat Sorusu

**Soru:** `PUT` ve `PATCH` metodları arasındaki temel fark nedir? Hangisini ne zaman tercih etmelisiniz?

<details>
<summary>Cevap için tıkla</summary>

`PUT`, kaynağın tamamını değiştirmek için kullanılır. İstek gövdesinde (body) kaynağın tüm alanlarını göndermeniz beklenir; gönderilmeyen alanlar genellikle `null` veya varsayılan değerine döner. `PATCH` ise "kısmi güncelleme" (partial update) içindir. Sadece değişmesini istediğiniz alanı gönderirsiniz. Pratikte, veritabanı performansını artırmak ve ağ trafiğini azaltmak için genellikle `PATCH` tercih edilir.

</details>

---

## 🔁 Tekrar: Geçmiş Konular

| # | Soru | Konu |
|---|------|------|
| 1 | Bir klasörün `Layout` olabilmesi için `page.tsx`'ten farkı nedir? | F01 |
| 2 | Docker'da `Image` ve `Container` arasındaki farkı birer cümleyle açıkla. | D01 |

<details>
<summary>Cevaplar</summary>

1. Layout'lar alt sayfalar arasında paylaşılan yapıyı (navigasyon, footer vb.) tutar ve sayfa geçişlerinde yeniden render edilmez (state korunur). Page ise o rotanın benzersiz içeriğidir.
2. Image, uygulamanın çalışması için gereken her şeyi içeren dondurulmuş bir pakettir (tarif). Container ise bu Image'ın çalışan canlı örneğidir (yemek).

</details>

---

*Sonraki gün: Next.js — Server Actions | Dockerfile — İlk image* 📖

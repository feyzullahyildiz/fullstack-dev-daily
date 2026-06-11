# Day 3 — Project Notes

## Bu Gün Ne Yapıldı

**Frontend (Next.js — Server Components vs Client Components):**
- `/dashboard/tasks/[id]` sayfası Server Component'e dönüştürüldü.
- Sunucu tarafında veri çekme (mock fetching) yapısı kuruldu.
- İlk Client Component olan `TaskToggle.tsx` oluşturuldu.
- Server ve Client bileşenleri arasındaki veri iletimi (props) simüle edildi.

**Backend (REST API Principles):**
- Projenin API mimarisi için `api-design.md` dökümanı oluşturuldu.
- Kaynak bazlı (Resource-based) URL yapısı belirlendi.
- HTTP metodlarının (GET, POST, PATCH, DELETE) kullanım senaryoları dökümante edildi.

## Klasör Yapısı

```text
project/
├── frontend/
│   ├── app/
│   │   ├── dashboard/
│   │   │   ├── tasks/
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx (Güncellendi - RSC)
│   │   │   ├── settings/
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   └── TaskToggle.tsx (Yeni - Client Component)
│   ├── public/
│   ├── next.config.js
│   ├── package.json
│   ├── tailwind.config.ts
│   └── tsconfig.json
└── backend/
    ├── api-design.md (Yeni)
    └── notes.md
```

## Önceki Günden Farkı

- Statik rotalardan interaktif ve veri odaklı bileşen yapısına geçildi.
- "Her şey tarayıcıda çalışır" mantığı, "Sunucu öncelikli" (Server-First) yaklaşıma evrildi.
- Backend tarafında teorik Docker bilgisinden, somut uygulama mimarisine (API Design) adım atıldı.

## Nasıl Çalıştırılır

**Frontend:**
```bash
cd frontend
npm run dev
```
Ardından tarayıcıda `http://localhost:3000/dashboard/tasks/1` adresini ziyaret edin.

## Notlar

- `TaskToggle.tsx` içindeki `"use client"` direktifinin neden en üstte olması gerektiğini unutmayın.
- Server Component içindeki `async` fonksiyonların sadece sunucuda çalıştığını, `console.log` çıktılarının tarayıcıda değil terminalde görüneceğini fark edin.
- REST API tasarımında endpoint isimlendirmelerinin "isim" (noun) olmasına özen gösterin.

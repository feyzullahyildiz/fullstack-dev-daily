# Day 2 — Project Notes

## Bu Gün Ne Yapıldı

**Frontend (Next.js App Router — Routing, Layouts, Pages):**
- Dinamik rotalar (Dynamic Routes) için `/dashboard/tasks/[id]` yapısı kuruldu.
- Sayfa geçişleri için `next/link` kullanımı planlandı.
- Sidebar'da aktif sayfa takibi için `usePathname` entegrasyonu hedeflendi.

**DevOps (Docker Nedir?):**
- Docker kurulumu yapıldı.
- `hello-world` konteyneri çalıştırılarak Docker Engine testi yapıldı.
- Temel Docker kavramları (Image, Container, Registry) öğrenildi.

## Klasör Yapısı

```text
project/
├── frontend/
│   ├── app/
│   │   ├── dashboard/
│   │   │   ├── tasks/
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx (Yeni)
│   │   │   ├── settings/
│   │   │   │   └── page.tsx
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── public/
│   ├── next.config.js
│   ├── package.json
│   ├── tailwind.config.ts
│   └── tsconfig.json
└── backend/
    └── notes.md (Güncellendi)
```

## Önceki Günden Farkı

- Statik sayfalardan dinamik sayfalara (Task Details) geçiş yapıldı.
- Sadece teorik olan backend klasörüne ilk DevOps notları ve Docker denemeleri eklendi.

## Nasıl Çalıştırılır

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

**Docker Test:**
```bash
docker run hello-world
```

## Notlar

- Dinamik rotalarda `params` objesinin tip tanımlamalarına (TypeScript) dikkat edilmelidir.
- Docker Desktop'ın arka planda çalıştığından emin olunmalıdır.

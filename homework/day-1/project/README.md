# Day 1 — Project Notes

## Bu Gün Ne Yapıldı

**Frontend (Next.js App Router — Routing, Layouts, Pages):**
- `npx create-next-app` iskeleti kuruldu.
- Root layout yapılandırıldı.
- `/dashboard` ve `/dashboard/settings` rotaları oluşturuldu.
- Dashboard için özel bir yan menü (sidebar) içeren layout eklendi.

**Backend (HTTP Fundamentals):**
- HTTP protokolü ve hata kodları üzerine araştırma yapıldı.
- `backend/notes.md` dosyası oluşturuldu.

## Klasör Yapısı

```text
project/
├── frontend/
│   ├── app/
│   │   ├── dashboard/
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
    └── notes.md
```

## Önceki Günden Farkı

İlk kurulum.

## Nasıl Çalıştırılır

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## Notlar

- Frontend tarafında henüz gerçek bir state yönetimi veya veri çekme işlemi yok.
- Tasarım için Tailwind CSS varsayılan olarak kullanılıyor.
- `backend/` klasörü şimdilik sadece teorik notlar içeriyor.

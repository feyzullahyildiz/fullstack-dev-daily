# Day 4 — Project Notes

## Bu Gün Ne Yapıldı

**Frontend (Next.js Server & Client Composition):**
- `/dashboard/tasks/[id]` sayfası alt görevleri (subtasks) destekleyecek şekilde genişletildi.
- `SubtaskItem.tsx` adında yeni bir Client Component iskeleti oluşturuldu.
- Server ve Client bileşenleri arasındaki veri iletimi (serialization) konusu ele alındı.

**DevOps (Dockerfile Temelleri):**
- Frontend uygulaması için `Dockerfile` iskeleti oluşturuldu.
- Docker imajı oluşturma süreci (build steps) dökümante edildi.

## Klasör Yapısı

```text
project/
├── frontend/
│   ├── app/
│   │   ├── dashboard/
│   │   │   ├── tasks/
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx (Güncellendi)
│   │   │   ├── settings/
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── TaskToggle.tsx
│   │   └── SubtaskItem.tsx (Yeni)
│   ├── Dockerfile (Yeni)
│   ├── package.json
│   ├── tailwind.config.ts
│   └── tsconfig.json
└── backend/
    ├── api-design.md
    └── notes.md
```

## Önceki Günden Farkı

- Tek bir interaktif buton yerine, liste tabanlı ve state yönetimi içeren alt bileşen yapısına geçildi.
- Uygulamanın sadece kod olarak değil, bir "paket" (container) olarak nasıl dağıtılacağı (DevOps) kurgulanmaya başlandı.

## Nasıl Çalıştırılır

**Frontend (Yerel):**
```bash
cd frontend
npm run dev
```

**Docker (İpucu):**
```bash
# Frontend klasörü içindeyken imajı build etmek için:
docker build -t task-app-frontend .
```

## Notlar

- `SubtaskItem.tsx` içinde `useState` kullanıldığı için `"use client"` zorunludur.
- `page.tsx` içinden `SubtaskItem`'a fonksiyon geçmeye çalıştığınızda alacağınız hata, Next.js'in "Network Boundary" güvenliğinden kaynaklanır.
- Dockerfile içindeki `WORKDIR /app` komutu, container içindeki tüm işlemlerin bu klasör altında yapılacağını garanti eder.

# Day 7 — Project Notes

## Bu Gün Ne Yapıldı

**Frontend (Next.js — Caching):**
- `app/dashboard/tasks/[id]/page.tsx` sayfasına render zamanını gösteren bir timestamp eklendi.
- Statik ve dinamik rendering arasındaki farkı gözlemlemek için caching denemeleri yapıldı.
- Build time vs Request time kavramları uygulamalı olarak test edildi.

**Backend (Node.js Core Modules):**
- `task-logger.js` oluşturuldu. `EventEmitter` ile olay tabanlı bir yapı kuruldu.
- `fs` ve `path` modülleri kullanılarak dosya sistemine log yazma (append) işlemleri yapıldı.
- Backend projelerinde core modüllerin nasıl entegre edileceği öğrenildi.

## Klasör Yapısı

```text
project/
├── frontend/
│   ├── app/
│   │   └── dashboard/
│   │       └── tasks/
│   │           └── [id]/
│   │               └── page.tsx (Güncellendi)
│   ├── ... (diğer frontend dosyaları)
└── backend/
    ├── task-logger.js (Yeni)
    ├── logs/
    │   └── activity.log (Yeni - otomatik oluşacak)
    ├── package.json
    ├── index.js (Güncellendi)
    └── api-design.md
```

## Önceki Günden Farkı

- Frontend tarafında verinin ne zaman ve nasıl tazelendiği (caching) kontrol altına alındı.
- Backend tarafında sadece Event Loop değil, Node.js'in gerçek gücü olan Core Modüllerle işlevsel bir özellik (logger) eklendi.

## Nasıl Çalıştırılır

**Frontend (Caching Testi):**
```bash
cd frontend
npm run build
npm run start
# Sayfayı yenileyip render zamanını kontrol edin.
```

**Backend (Logger Testi):**
```bash
cd backend
node index.js
# logs/activity.log dosyasını kontrol edin.
```

## Notlar

- `path.join()` kullanımı Windows ve Linux arasındaki yol ayırıcı farklarını (`\` vs `/`) otomatik çözer.
- Next.js'de `revalidatePath` çağrıldığında sunucu tarafındaki Data Cache temizlenir ve bir sonraki istekte yeni veri çekilir.

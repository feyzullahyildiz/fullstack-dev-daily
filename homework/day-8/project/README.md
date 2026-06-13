# Day 8 — Project Notes

## Bu Gün Ne Yapıldı

**Frontend (Middleware & Route Handlers):**
- `frontend/middleware.ts` dosyası oluşturuldu. `/dashboard` rotaları için basit bir cookie kontrolü eklendi.
- `app/api/health/route.ts` oluşturularak uygulamanın içinden JSON veri dönen ilk API endpoint'i yazıldı.
- Edge Runtime kısıtlamaları ve Route Handler metodları (GET, POST vb.) öğrenildi.

**DevOps (Docker Build & Run):**
- `backend/Dockerfile` oluşturuldu.
- Backend uygulaması image haline getirildi (`docker build`).
- Image, container olarak port mapping yapılarak çalıştırıldı (`docker run -p 4000:3000`).
- Container yönetimi için `ps`, `logs` ve `stop` komutları pratik edildi.

## Klasör Yapısı

```text
project/
├── frontend/
│   ├── middleware.ts (Yeni)
│   ├── app/
│   │   ├── api/
│   │   │   └── health/
│   │   │       └── route.ts (Yeni)
│   │   └── ...
│   └── ...
└── backend/
    ├── Dockerfile (Yeni)
    ├── index.js
    ├── task-logger.js
    └── ...
```

## Önceki Günden Farkı

- Uygulama artık sadece sayfalardan değil, programlanabilir API uçlarından (Route Handlers) oluşuyor.
- Middleware ile uygulama genelinde (cross-cutting concerns) mantık yürütme yeteneği kazanıldı.
- Backend uygulaması artık "her makinede çalışabilir" (Dockerized) hale getirildi ve dış dünyaya port mapping ile açıldı.

## Nasıl Çalıştırılır

**Frontend (Middleware Testi):**
1. `npm run dev` ile başlatın.
2. Tarayıcıdan `/dashboard` adresine gitmeyi deneyin (Yönlendirme gerçekleşmeli).
3. Konsoldan veya Application tabinden `auth-token` cookiesi ekleyip tekrar deneyin.

**Backend (Docker Testi):**
```bash
cd backend
docker build -t task-backend .
docker run -d -p 4000:3000 --name task-container task-backend
# Tarayıcıdan veya curl ile kontrol:
# (Backend henüz HTTP sunucusu değil, logları kontrol edin)
docker logs task-container
```

## Notlar

- Middleware'de `NextResponse.redirect` kullanırken tam URL (absolute URL) vermek zorunludur. `request.nextUrl.clone()` bu konuda yardımcı olur.
- Docker image'ı oluştururken `.dockerignore` kullanarak `node_modules` klasörünü hariç tutmak image boyutunu ciddi oranda düşürür.

# Day 6 — Project Notes

## Bu Gün Ne Yapıldı

**Frontend (Next.js Server Actions & Validation):**
- `subtask-actions.ts` içine **Zod** entegre edildi. Artık gelen veriler sunucu tarafında doğrulanıyor.
- `AddSubtaskForm.tsx` bileşeni **useActionState** (React 19) kullanacak şekilde refaktör edildi.
- Hata yönetimi eklendi: Geçersiz girişlerde kullanıcıya anlık geri bildirim veriliyor.
- `useFormStatus` ile butonun yüklenme durumu (pending) yönetilmeye başlandı.

**DevOps (Dockerfile Optimization):**
- **.dockerignore** dosyası eklendi. Build context boyutu küçültüldü.
- `Dockerfile` katman önbellekleme (layer caching) için optimize edildi (`package.json` önce kopyalanıyor).
- **Multi-stage build** yapısına geçiş yapıldı: Build araçları ile final image birbirinden ayrıldı.

## Klasör Yapısı

```text
project/
├── frontend/
│   ├── app/
│   │   └── dashboard/
│   │       └── tasks/
│   │           └── [id]/
│   │               └── page.tsx
│   ├── actions/
│   │   └── subtask-actions.ts (Güncellendi)
│   ├── components/
│   │   ├── AddSubtaskForm.tsx (Güncellendi)
│   │   └── PendingButton.tsx (Yeni - useFormStatus için)
│   ├── Dockerfile (Güncellendi)
│   ├── .dockerignore (Yeni)
│   └── package.json
└── backend/
    ├── package.json
    ├── index.js
    └── api-design.md
```

## Önceki Günden Farkı

- Formlar artık sadece "çalışan" değil, "güvenli" ve "kullanıcı dostu".
- Docker imajı build süresi, bağımlılıklar değişmediği sürece saniyelere düştü.
- Image boyutu multi-stage build sayesinde önemli ölçüde azaldı.

## Nasıl Çalıştırılır

**Frontend (Docker Build Deneyi):**
1. Bir kod değişikliği yapın (component içinde bir metin değiştirin).
2. `docker build -t task-app .` komutunu çalıştırın.
3. `Step: RUN npm install` aşamasının `CACHED` olduğunu gözlemleyin.

## Notlar

- `useActionState` kullanımı sırasında action fonksiyonunun imzası `(prevState, formData)` şeklinde değişmiştir.
- Multi-stage build'da `AS base`, `AS deps`, `AS builder` gibi isimlendirmeler okunabilirliği artırır.

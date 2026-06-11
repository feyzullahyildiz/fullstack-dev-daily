# Day 5 — Project Notes

## Bu Gün Ne Yapıldı

**Frontend (Next.js — Server Actions):**
- `actions/subtask-actions.ts` oluşturuldu. Form verilerini sunucu tarafında işlemek için ilk Server Action yazıldı.
- `AddSubtaskForm.tsx` bileşeni eklendi. Geleneksel `fetch` yerine doğrudan Server Action kullanarak veri gönderimi sağlandı.
- `dashboard/tasks/[id]` sayfası yeni form bileşenini içerecek şekilde güncellendi.

**Backend (Node.js Temelleri):**
- Backend klasörü gerçek bir Node.js projesine dönüştürüldü (`npm init`).
- `index.js` ile Event Loop ve asenkron dosya okuma işlemleri simüle edildi.
- ESM (`import/export`) modül yapısına geçildi.

## Klasör Yapısı

```text
project/
├── frontend/
│   ├── app/
│   │   ├── dashboard/
│   │   │   └── tasks/
│   │   │       └── [id]/
│   │   │           └── page.tsx (Güncellendi)
│   ├── actions/
│   │   └── subtask-actions.ts (Yeni)
│   ├── components/
│   │   └── AddSubtaskForm.tsx (Yeni)
│   ├── Dockerfile
│   └── package.json
└── backend/
    ├── package.json (Yeni)
    ├── index.js (Yeni)
    └── api-design.md
```

## Önceki Günden Farkı

- Frontend tarafında veri mutasyonu (data mutation) için API Route yazma zorunluluğu ortadan kalktı, Server Actions ile süreç hızlandı.
- Backend tarafında sadece dökümantasyon değil, çalışan bir Node.js iskeleti oluşturuldu.

## Nasıl Çalıştırılır

**Frontend:**
```bash
cd frontend
npm run dev
```

**Backend:**
```bash
cd backend
node index.js
```

## Notlar

- Server Action içindeki `revalidatePath` kullanımı, sayfanın sunucu tarafındaki cache'ini temizleyerek yeni verinin anında görünmesini sağlar.
- Backend'de `package.json` içindeki `"type": "module"` satırı, modern JS özelliklerini (`import`) kullanabilmemiz için kritiktir.

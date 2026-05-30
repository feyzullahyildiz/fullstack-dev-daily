# 🚀 Fullstack Development — Günlük Çalışma Sistemi

React/Next.js bilgisini güncellemek, backend ve DevOps temellerini oturtmak
ve mülakat hazırlığı yapmak için yapılandırılmış günlük ödev reposu.

---

## 🧭 Nasıl Çalışır

Her günün ödevi **2 konudan** oluşur:

- **Frontend Konusu** → Her gün, kesintisiz
- **Backend veya DevOps Konusu** → Dönüşümlü (backend bittikten sonra devops, devops bittikten sonra backend)

Ödevler `homework/day-XX/` klasöründe tutulur.
Agent her çalıştırıldığında bu klasöre bakarak nerede olduğunu anlar — harici state yoktur.

---

## 🏗️ Proje

Ödevlerin büyük bölümü tek bir proje üzerine inşa edilir: **bir Task Management uygulaması.**

Konu ilerledikçe proje büyür:
- Next.js App Router ile başlar
- TypeScript, Tailwind, shadcn/ui ile şekillenir
- React Query + Zustand ile state yönetimi eklenir
- Express/Prisma ile backend oturur
- Docker ile containerize edilir

Ödev cevapların bu projenin gerçek bir reposu olur.

---

## 📚 Konu Başlıkları

Detaylı müfredat ve gün sayıları için → `CURRICULUM.md`

### Frontend (her gün)
Next.js App Router · Server/Client Components · Server Actions · React ileri hooklar ·
use() hook · Suspense · TypeScript Generics · Utility Types · Tailwind CSS ·
Radix UI · shadcn/ui · React Query · Zustand · Jotai · Immer ·
Design Patterns · TanStack Start · Astro

### Backend (dönüşümlü)
HTTP & REST · Node.js · Express.js · Zod validation · SQL tekrar ·
Prisma ORM · Auth.js · SSO / OAuth · Hono · Elysia.js · tRPC

### DevOps (dönüşümlü)
Docker temelleri · Dockerfile · docker-compose · Volume & Network ·
Next.js containerize · PostgreSQL container · GitHub Actions CI/CD

---

## 📁 Klasör Yapısı

```
README.md
CURRICULUM.md
AGENT_PROMPT.md
ADD_TOPICS.md
homework/
├── day-01/
│   └── homework.md
├── day-02/
│   └── homework.md
└── ...
```

---

## 🎯 Mülakat Hazırlığı

Her günün ödevi bir mülakat sorusu içerir.
Sorular hem teorik (ne, neden, nasıl) hem pratik (kod yaz, hata bul) formatında gelir.

---

*Kod her gün, proje her hafta büyür.* 💻

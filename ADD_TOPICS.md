# Yeni Konu Ekleme — ADD_TOPICS.md

Mevcut müfredat tamamlandığında bu dosyayı agent'a ver.
Agent `homework/` klasörüne bakarak tüm konuların bittiğini doğrular,
ardından aşağıdaki yeni konuları `CURRICULUM.md`'ye ekler.

---

## AGENT'A VERİLECEK PROMPT

`homework/` klasörüne bak. Tüm mevcut konuların tamamlandığını doğrula.
Ardından `CURRICULUM.md` dosyasını aşağıdaki yeni konularla güncelle — ilgili tablolara ekle.
`README.md`'yi de güncelle.
Başka hiçbir dosyaya dokunma.

---

## YENİ FRONTEND KONULARI

| Sıra | Konu | Gün |
|------|------|-----|
| F32 | Next.js — Partial Prerendering (PPR) | 1 |
| F33 | React 19 — Actions, useActionState | 2 |
| F34 | Accessibility — ARIA, keyboard navigation, focus management | 2 |
| F35 | Testing — Vitest + React Testing Library temelleri | 2 |
| F36 | Testing — MSW ile API mock, entegrasyon testi | 2 |
| F37 | Performance — Bundle analizi, lazy loading, code splitting | 2 |

---

## YENİ BACKEND KONULARI

| Sıra | Konu | Gün |
|------|------|-----|
| B16 | Consistency — Strong vs Weak Consistency | 1 |
| B17 | Optimistic Locking — Nedir, ne zaman kullanılır, Prisma ile uygulama | 2 |
| B18 | Rate Limiting ve API güvenliği | 1 |
| B19 | WebSocket temelleri — gerçek zamanlı özellikler | 2 |
| B20 | Background Jobs — Queue sistemi temelleri (BullMQ) | 2 |

---

## YENİ DEVOPS KONULARI

| Sıra | Konu | Gün |
|------|------|-----|
| D09 | Docker — Multi-stage build | 1 |
| D10 | Kubernetes — Temel kavramlar (pod, deployment, service) | 2 |
| D11 | Monitoring — Logs, health check, basit alerting | 1 |

---

## NASIL KULLANILIR

1. Tüm konular tamamlandığında bu dosyayı aç
2. Yukarıdaki **AGENT'A VERİLECEK PROMPT** bölümünü kopyala
3. Yeni konuları da altına yapıştır
4. Agent'a ver
5. Bir sonraki günden itibaren yeni konular işlenmeye başlar

---

*Daha fazla konu eklemek istersen bu dosyayı düzenle, aynı tablo formatını kullan.*

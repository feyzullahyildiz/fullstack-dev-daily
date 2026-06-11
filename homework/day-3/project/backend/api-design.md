# Task Management API Design

Bu dosya, uygulamanın backend servisleri için RESTful API standartlarını belirler.

## Kaynaklar (Resources)

### 1. Tasks (Görevler)

| Method | Endpoint | Açıklama |
|---|---|---|
| GET | `/tasks` | Tüm görevleri döndürür. |
| POST | `/tasks` | Yeni bir görev oluşturur. |
| GET | `/tasks/:id` | Belirli bir görevin detayını döndürür. |
| PATCH | `/tasks/:id` | Görevin bir kısmını (örn: durumunu) günceller. |
| DELETE | `/tasks/:id` | Görevi siler. |

**Örnek Request Body (POST /tasks):**
```json
{
  "title": "Backend API Tasarımı",
  "description": "REST prensiplerine uygun endpoint'lerin dökümante edilmesi.",
  "categoryId": 1
}
```

### 2. Users (Kullanıcılar)
- `GET /users/me`: Oturum açmış kullanıcının bilgilerini getirir.
- ... (Ödev: Burayı tamamla)

### 3. Categories (Kategoriler)
- ... (Ödev: Burayı tamamla)

## Ortak Hata Yapısı

Tüm hata yanıtları şu formatta olmalıdır:
```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "Aranan görev bulunamadı."
  }
}
```

## HTTP Durum Kodları
- `200 OK`: Başarılı istek.
- `201 Created`: Başarılı kayıt oluşturma.
- `400 Bad Request`: ... (Ödev: Açıklamayı ekle)
- `401 Unauthorized`: ...
- `404 Not Found`: ...

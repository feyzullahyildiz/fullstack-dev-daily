# HTTP Hata Senaryoları

Bu dosyada, öğrendiğimiz HTTP hata kodlarının gerçek hayatta hangi senaryolarda karşımıza çıkacağını açıklıyoruz.

- **401 Unauthorized:** 
  _Senaryo:_ Kullanıcı giriş yapmamışken sadece üyelere özel bir sayfaya erişmeye çalışması.
  _Örnek:_ Bir banka uygulamasında "Hesaplarım" sayfasına login olmadan girmeye çalışmak.

- **403 Forbidden:** 
  _Senaryo:_ Kullanıcı giriş yapmış ama o kaynağa erişme yetkisi yok (Role-based access).
  _Örnek:_ Normal bir kullanıcının admin paneline girmeye çalışması.

- **404 Not Found:** 
  _Senaryo:_ İstenen URL sunucuda bulunamadığında.
  _Örnek:_ `example.com/olmayan-sayfa` adresine gitmek.

- **500 Internal Server Error:** 
  _Senaryo:_ Sunucu tarafında beklenmedik bir hata (crash) oluştuğunda.
  _Örnek:_ Veritabanı bağlantısının kopması veya kodda bir exception fırlatılması.

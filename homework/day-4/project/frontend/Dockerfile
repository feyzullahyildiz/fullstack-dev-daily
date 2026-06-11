# 1. Base image seçimi
# İpucu: node:20-alpine hem güncel hem de hafiftir.
FROM ...

# 2. Çalışma dizini ayarı
WORKDIR /app

# 3. Bağımlılık dosyalarını kopyala
# Neden sadece package.json'ları önce kopyalıyoruz? (Bkz: homework.md Mülakat Sorusu)
COPY package*.json ./

# 4. Bağımlılıkları yükle
RUN ...

# 5. Proje dosyalarını kopyala
COPY . .

# 6. Uygulamanın çalışacağı port
EXPOSE 3000

# 7. Uygulamayı başlat
# Geliştirme modu için: npm run dev
CMD ["...", "...", "..."]

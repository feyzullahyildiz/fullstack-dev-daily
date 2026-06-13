# 1. Base image seçimi (Node.js 20 ve Alpine Linux - hafif bir versiyon)
FROM node:20-alpine

# 2. Çalışma dizini oluştur
WORKDIR /app

# 3. Bağımlılık dosyalarını kopyala
COPY package*.json ./

# 4. Bağımlılıkları yükle
RUN npm install

# 5. Tüm proje dosyalarını kopyala
COPY . .

# 6. Uygulamanın dinleyeceği port (Dökümantasyon amaçlı)
EXPOSE 3000

# 7. Uygulamayı başlat
CMD ["node", "index.js"]

# 1. Base Image
FROM node:20-alpine AS base

# 2. Bağımlılıkları Yükle
# Bu aşama sadece package.json değiştiğinde tekrar çalışır.
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# 3. Build Aşaması
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js telemetri verilerini kapat (Opsiyonel)
ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# 4. Production Runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Sadece gerekli dosyaları kopyalayarak imaj boyutunu küçültüyoruz
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]

FROM node:22-alpine AS builder
WORKDIR /app

# native build deps (bcrypt etc)
RUN apk add --no-cache python3 make g++

# ---- backend build ----
COPY backend/package*.json ./backend/
WORKDIR /app/backend
RUN npm ci
COPY backend ./
RUN npm run build

# ---- frontend build ----
WORKDIR /app
COPY frontend/package*.json ./frontend/
WORKDIR /app/frontend
RUN npm ci
COPY frontend ./

ARG NEXT_PUBLIC_API_URL=
ARG NEXT_PUBLIC_SITE_URL=http://localhost:3000
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
RUN npm run build


FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# nginx + supervisor
RUN apk add --no-cache nginx supervisor \
  && mkdir -p /run/nginx \
  && rm -f /etc/nginx/http.d/default.conf

# ---- backend runtime ----
COPY backend/package*.json /app/backend/
WORKDIR /app/backend
RUN npm ci --omit=dev

COPY --from=builder /app/backend/dist /app/backend/dist
COPY --from=builder /app/backend/config /app/backend/config
COPY --from=builder /app/backend/models /app/backend/models
COPY --from=builder /app/backend/routes /app/backend/routes
COPY --from=builder /app/backend/middleware /app/backend/middleware
COPY --from=builder /app/backend/utils /app/backend/utils

# ---- frontend runtime ----
COPY frontend/package*.json /app/frontend/
WORKDIR /app/frontend
RUN npm ci --omit=dev

COPY --from=builder /app/frontend/.next /app/frontend/.next
COPY --from=builder /app/frontend/public /app/frontend/public

# nginx + supervisor configs
WORKDIR /app
COPY deploy/single/nginx.conf /etc/nginx/http.d/default.conf
COPY deploy/single/supervisord.conf /etc/supervisord.conf

EXPOSE 8080
CMD ["supervisord","-c","/etc/supervisord.conf"]
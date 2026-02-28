FROM node:22-alpine AS builder

WORKDIR /app

# Install build tools untuk dependency native (bcrypt dll)
RUN apk add --no-cache python3 make g++

# Copy backend
COPY backend ./backend

WORKDIR /app/backend
RUN npm install
RUN npm run build

# Copy frontend
WORKDIR /app
COPY frontend ./frontend

WORKDIR /app/frontend
RUN npm install

# Build arg untuk Next (WAJIB karena build-time env)
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

RUN if [ -z "$NEXT_PUBLIC_API_URL" ]; then \
      echo "ERROR: NEXT_PUBLIC_API_URL is required" && exit 1; \
    fi

RUN npm run build


# ========================
# Stage 2 - Production
# ========================
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy backend
COPY --from=builder /app/backend /app/backend

# Copy frontend build
COPY --from=builder /app/frontend/.next /app/frontend/.next
COPY --from=builder /app/frontend/public /app/frontend/public
COPY --from=builder /app/frontend/package.json /app/frontend/package.json

WORKDIR /app/backend

EXPOSE 5000

CMD ["node", "dist/index.js"]
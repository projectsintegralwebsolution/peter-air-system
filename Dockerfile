# 1. Base image
FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

# 2. Dependencies installation
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
COPY prisma ./prisma/
RUN npm ci

# 3. Build the Next.js application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV DATABASE_URL="file:./prisma/dev.db"

RUN npx prisma generate
RUN npm run build

# 4. Production Runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
ENV DATABASE_URL="file:./prisma/dev.db"

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy static assets, prisma db, and data
COPY --from=builder /app/public ./public
COPY --from=builder /app/data ./data
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma

# Setup proper permissions for Next.js cache, database, and uploads
RUN mkdir -p .next public/uploads
RUN chown -R nextjs:nodejs /app

# Copy standalone build output
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
RUN mkdir -p /app/public/uploads && chown -R nextjs:nodejs /app/public /app/prisma

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]


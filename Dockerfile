FROM node:23-alpine AS builder
WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

FROM node:23-alpine AS runner
WORKDIR /app

COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules
COPY package.json .

EXPOSE 3000

CMD ["node", "build"]
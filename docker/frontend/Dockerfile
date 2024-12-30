# stage1
FROM node:20.10.0-slim AS builder
WORKDIR /frontend

COPY ./package*.json ./

RUN npm ci
COPY . .

# stage2
FROM node:20.10.0-slim
EXPOSE 3000
WORKDIR /frontend

COPY --from=builder /frontend /frontend
CMD ["npm", "run", "dev"]

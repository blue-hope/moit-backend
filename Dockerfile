# Stage 1 : install dependencies and build
FROM node:14 AS builder
WORKDIR /app
COPY . .
RUN npm install --only=prod
RUN npm run build

# Stage 2 : run
FROM node:14-alpine
WORKDIR /app
EXPOSE 3000
COPY --from=builder /app .

CMD ["npm", "run", "start:prod"]
FROM node:20-alpine
 
WORKDIR /app
 
COPY package*.json ./
COPY prisma ./prisma
RUN npm ci --omit=dev
 
COPY . .
ENV DATABASE_URL="postgresql://placeholder:placeholder@localhost:5432/placeholder"
RUN npx prisma generate
EXPOSE 4000
 
CMD ["npx", "ts-node", "src/index.ts"]

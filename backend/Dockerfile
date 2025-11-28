FROM node:20

WORKDIR /app

# Install PostgreSQL client (psql) and netcat (nc)
RUN apt-get update && apt-get install -y postgresql-client netcat-openbsd

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate

COPY start.sh ./
RUN chmod +x ./start.sh

EXPOSE 4000

CMD ["./start.sh"]

#!/bin/bash

echo "Waiting for PostgreSQL to be ready..."
until nc -z postgres 5432; do
  echo "Waiting..."
  sleep 1
done

echo "PostgreSQL is ready. Running migrations..."
npx prisma migrate deploy

echo "Checking if tables have data..."
row_count=$(PGPASSWORD=password psql -U postgres -h postgres -d mydb -t -c "SELECT COUNT(*) FROM \"User\";" | tr -d '[:space:]')

if [ "$row_count" = "" ]; then
  echo "Error checking database. Skipping seed."
elif [ "$row_count" -eq 0 ]; then
  echo "table are empty. Running seed..."
  npx prisma db seed
else
  echo "tables have data. Skipping seed."
fi

echo "Starting the application..."
npm run dev

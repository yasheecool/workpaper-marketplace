#!/bin/bash
echo "Resetting DB via Prisma..."
docker exec -it cimplico_backend npx prisma migrate reset --force

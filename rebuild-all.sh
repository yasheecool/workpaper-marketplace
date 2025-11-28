#!/bin/bash
echo "Rebuilding all Docker services..."
docker-compose down -v
docker-compose build
docker-compose up

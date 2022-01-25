#!/bin/bash

docker-compose build
echo "Remove Access Containers"
docker container prune -f
echo "Start App"
docker-compose up -d
echo "Generating Migration"
sleep 5s
docker-compose exec api npm run migration:generate init
echo "Rebuilding Container"
docker-compose exec api npm run build
echo "Running Migration"
sleep 5s
docker-compose exec api npm run migration:run
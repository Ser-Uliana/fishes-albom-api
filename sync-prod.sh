#!/usr/bin/env bash
set -euo pipefail

LOCAL="postgresql://ulianaserbina@localhost:5432/fishes_album"
: "${PROD_URL:?Задайте PROD_URL (direct-рядок з Prisma Console)}"

pg_dump --data-only --no-owner --column-inserts \
  -t '"FishType"' -t '"Fish"' "$LOCAL" > /tmp/fish-data.sql

{
  echo 'BEGIN;'
  echo 'TRUNCATE "Fish","FishType" RESTART IDENTITY CASCADE;'
  cat /tmp/fish-data.sql
  echo 'COMMIT;'
} | psql "$PROD_URL" -v ON_ERROR_STOP=1

echo "Готово"
# fishes-album-api

A minimal nest app with Prisma 8 and Prisma Composer.

## Run locally

```bash
npm run dev:composer
```

This builds the app and starts it with Composer. PostgreSQL projects get a local Prisma Postgres database and apply the committed migrations automatically.

## Deploy

```bash
npm run deploy
```

The deploy script builds the framework output, provisions Prisma Postgres when selected, applies migrations, and deploys the app to Prisma Compute.

The starter users are inserted idempotently from `src/prisma/seed.ts` on the first database query through the Composer service binding.


## Prisma

For update local db

```bash
npx prisma contract emit       
npx prisma db update
```


inset to prod db
```bash
pg_dump "postgresql://ulianaserbina@localhost:5432/fishes_album" --data-only --table='"<tableName>"' --column-inserts > {tableName}.sql
psql "postgres://d1407fc4680a8586f4d3f8cd564fa432cc5c084ef32e8b01fd0e8bbd2dbba11d:sk_kUWEsqdvpUf1sQMvQgM8S@db.prisma.io:5432/postgres?sslmode=require" -f {tableName}.sql
```
deploy
```bash
npm run deploy                                                              
```
migration
```bash
npm run contract:emit                                                       
npm run migration:plan
npm run migrate
```

sync prod and local db (not sure it work)
```bash
chmod +x sync-prod.sh
PROD_URL="postgres://d1407fc4680a8586f4d3f8cd564fa432cc5c084ef32e8b01fd0e8bbd2dbba11d:sk_kUWEsqdvpUf1sQMvQgM8S@db.prisma.io:5432/postgres?sslmode=require" ./sync-prod.sh
```

After changing the contract, run:

```bash
npm run contract:emit
```

To use the framework's development server directly, run `npm run dev`. This direct mode requires `DATABASE_URL`.

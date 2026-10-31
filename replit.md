# Framecase

Framecase is a curated phone case storefront that syncs live designs from PhoneVilla collections and helps shoppers browse by mood, category, and search.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/framecase/` — customer-facing storefront and responsive visual system
- `artifacts/api-server/src/routes/catalog.ts` — live PhoneVilla Shopify collection sync and catalog filtering
- `lib/api-spec/openapi.yaml` — source of truth for the catalog API contract

## Architecture decisions

- The storefront reads products through the API server rather than calling PhoneVilla directly, so the client stays resilient to CORS and source changes.
- PhoneVilla exposes Shopify `products.json` collection endpoints; the API normalizes that response into the Framecase catalog shape.
- Catalog responses are cached in memory for five minutes to keep the storefront fast while still refreshing designs automatically.

## Product

Shoppers can browse curated case collections, search live designs, save favorites in the current session, and open a product on the source store. The catalog calls out live sync status and supports responsive desktop/mobile browsing.

## User preferences

- Keep the brand clean, confident, editorial, and professional; avoid generic storefront patterns.

## Gotchas

- Run `pnpm --filter @workspace/api-spec run codegen` after changing the API contract.
- The storefront and API should be restarted through their managed workflows so `PORT` and `BASE_PATH` are supplied.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details

# Changelog

## 2026-07-02 — Trust & security pass

### Fixed — numbers / trust (CEO-facing)
- **Governorate mapping overhauled** (`common.js`): new `normCity()` normalizes
  Arabic diacritics, alef/ya/hamza/ta-marbuta, Persian letters, and location
  prefixes; `govOf()` now matches normalized forms, governorate names, and tokens
  inside compound strings. Far fewer cities fall into "Unknown". 13 unit cases pass.
- **"Unmapped cities" banner** on `regions.html`: shows the count/value/% of
  orders that couldn't be classified, so "Unknown" is transparent, not silent.
- **Basis note** on `regions.html`: states the numbers are confirmed orders,
  tax-inclusive, by create_date — and may differ from Odoo Invoice Analysis.
- **Client-side de-duplication** (`common.js`): `loadOrders`/`loadPayments`/alerts
  now de-dupe by `order_id`/`payment_id`, so duplicate sync rows no longer inflate
  counts (defense against the "606 orders" symptom).

### Fixed — security
- **Stored XSS closed:** added `DASH.esc()` and wrapped every database-derived
  string rendered via `innerHTML` across `index/alerts/debt/regions/collections/
  salespeople` and `order-modal.js`. The anonymously-written alert `note` was the
  critical vector.

### Fixed — hygiene
- Removed stale `N8N_BASE`/n8n references from error messages and comments
  (`common.js`, `config.js`, `order-modal.js`); the app reads Supabase directly.
- Clarified the placeholder-target warning in `config.js`.

### Added — documentation
- `README.md`, `CLAUDE.md`, `docs/ARCHITECTURE.md`, `docs/METRICS.md`,
  `docs/KNOWN_ISSUES.md`.

### Not changed (tracked in docs/KNOWN_ISSUES.md)
- RLS verification + committing `supabase/schema.sql` (#2) — needs Supabase access.
- Access gate in front of the dashboard (#3) — hosting config.
- Polling bandwidth (#5), Chart.js SRI (#7), real revenue target (#9).
- The real governorate fix (Odoo `state_id`) and n8n upsert — backend/n8n work.

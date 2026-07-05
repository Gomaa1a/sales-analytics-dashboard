# Changelog

## 2026-07-05 — Kill the "Unknown" governorate bucket (data-driven)

- Audited every live `city` value (2,629 orders): 780 orders / 303M IQD were
  "Unknown". Root cause split: **701 orders (239M) have an empty city in Odoo**;
  only 79 were genuinely unrecognized strings.
- **New `nocity` bucket** ("بدون مدينة / No city"): empty city is now reported
  separately from unrecognized city, each with its own fix instruction. Regions
  page shows two banners (red = fill City field in Odoo; amber = add to
  dictionary).
- **+26 dictionary entries** — every remaining real string, assigned by
  cross-checking geography against the owning rep's territory (68–100%
  agreement): Basra districts (الحيانية، الطويسة، المدينة، الجزائر، الدير…),
  Mosul (الفيصلية، الساحل الأيسر، المهندسين…), Baghdad (حي اور، اعلام، الجاردية),
  Babil (الحصوة، ناحية الامام), plus typo fixes (كؤكوك→Kirkuk، ارييل→Erbil).
- Result: true "Unknown" is now **2 orders / ~3M IQD** (garbage strings `٩٩`,
  `داكير` — clean at the source in Odoo). 23/23 regression cases pass.
- Cache-bust v=24.

## 2026-07-05 — Match Odoo: count sales by order date (date_order)

- All order date-bucketing (Overview, Regions, Collections period sales,
  Salespeople) switched from `create_date` to `date_order` — the same basis as
  Odoo's Sales screens, so "today's orders" now matches Odoo (the 117 vs 148 gap).
- Pairs with the Site_Orders_Sync workflow v2 (fetch by `write_date` = anything
  created/confirmed/cancelled/edited today; snapshots bucketed by `date_order`).
  Stale rows (orders confirmed or cancelled days after creation) now self-heal.
- Cache-bust v=23.

## 2026-07-05 — Executive overview redesign (audit-driven)

### Changed — Overview (`index.html`)
- **New "Today" strip** (always anchored to today, respects rep/customer filters):
  sales today, cash collected today, and cash in process (held by reps).
- **4th hero card: "Confirmed, not invoiced"** (from the `collections` snapshot) —
  ~263M IQD / 578 orders of sold-but-uninvoiced revenue is now impossible to miss.
- **Two action tables replace two low-value charts:** Top-10 overdue debtors
  (who to call today) and a rep leaderboard (sales vs collected MTD with a
  color-coded collection ratio).
- **Removed:** order-status doughnut (97% one state — told nothing), conversion %
  mini (~18 quotations/month), avg-order-value mini, DSO approximation, and the
  top-governorates chart (lives on the Regions page; the mini stat remains).
- Minis are now: confirmed orders, customers, cancelled orders, top governorate.

### Fixed — numbers
- **`loadPayments()` now excludes `canceled` payments** (`state=neq.canceled`).
  This closes the on-screen mismatch where Collections KPIs read 226,000 IQD
  higher than the 14-day grid (the snapshot already skipped canceled rows).
- **~30 new city→governorate dictionary entries** (Baghdad districts, Anbar,
  Karbala, Basra, Nineveh towns…) verified against live order data — reduces
  "Unknown" governorate orders further on top of the normalizer.
- Added the missing `.ok` CSS class (green) used by ratio cells.

### Notes
- Asset cache-bust bumped to `?v=22`.
- Hero band is now 4 columns (2×2 below 1280px).

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

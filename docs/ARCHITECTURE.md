# Architecture

## Data flow
```
┌────────┐     ┌──────┐     ┌────────────────────┐     ┌───────────────┐
│  Odoo  │ ──▶ │ n8n  │ ──▶ │ Supabase (Postgres)│ ──▶ │  Dashboard    │
│ (ERP)  │     │ sync │     │  tables + snapshots │     │  (browser JS) │
└────────┘     └──────┘     └────────────────────┘     └───────────────┘
```
- **Odoo** is the source of truth (sales orders, invoices, payments, partners).
- **n8n** runs the sync/ETL: it reads Odoo and writes into Supabase. n8n may run
  on localhost; only Supabase needs to be reachable by the browser.
- **Supabase** stores the synced data and serves it over its auto-generated REST
  API (PostgREST). The dashboard authenticates with the **anon** key and reads
  under Row-Level Security.
- **Dashboard** is static files. Each page polls Supabase every `POLL_MS`
  (default 60s) and re-renders.

## Supabase objects the dashboard reads
Names are configured in `config.js` (`TABLES`) and referenced in `common.js`.

### Raw tables (row-level, date-filterable)
- **`dashboard_orders`** — one row per sales order. Key fields used:
  `order_id` (PK), `order_name`, `partner_name`, `salesperson`, `user_id`,
  `city`, `state` (`draft|sent|sale|done|cancel`), `type_name`, `amount_total`
  (tax-inclusive), `invoice_count`, `level` (risk: `critical|warning`),
  `reasons` (JSON array of `{severity, ar, en}`), `date_order`, `create_date`,
  `customer` (embedded JSON profile), plus `total_quantity`, `total_product`,
  `partner_credit_warning`.
- **`dashboard_payments`** — one row per payment. Fields: `payment_id` (PK),
  `date`, `amount`, `state`, `salesperson`, `user_id`, `partner_name`,
  `partner_id`, `journal`.

Both are read via `loadOrders()` / `loadPayments()`, which paginate past
PostgREST's 1000-row cap and **de-duplicate by primary key**.

### Snapshot table (pre-aggregated by n8n)
- **`dashboard_snapshots`** — `key` → `data` (JSON). Known keys:
  - `rep_debt` — receivables/overdue per rep → per customer.
  - `rep_collections` — 14-day per-rep collection grid.
  - `collections` — order-based collection metrics (new risk, uninvoiced).
  Fetched via `DASH.api("<key>")` / `snapshot("<key>")`.

### Write target
- **`alert_acks`** — acknowledgment log. The dashboard **INSERTs** here
  anonymously via `ackAlert()` when a user marks an alert reviewed
  (`order_id, order_name, level, amount_total, note`). It also SELECTs recent
  acks for the notes feed. This is the only write path in the app.

## Client library (`window.DASH`)
`common.js` wraps everything in one IIFE and exposes `window.DASH`:
- **i18n:** `t(key)`, `isAR()`, `lang()`, dual `I18N.ar` / `I18N.en` tables.
- **format:** `fmtNum`, `fmtMoney` (compact K/M), `fmtMoneyFull`, `fmtDate`, `fmtTime`.
- **security:** `esc(s)` — HTML-escape before `innerHTML`.
- **API:** `api(key, params)`, `loadOrders`, `loadPayments`, `sbGetAll`,
  `ackAlert`, `nextDay`.
- **geo:** `govOf(city)`, `govLabel(code)`, `GOV`.
- **UI:** `buildChrome`, `filterBar`, `setUpdated`, `toast`, `notify`, `beep`,
  `stateLabel`, `trustLabel`, `renderSoundBtn`.
- **config:** `cfg` (the whole `DASH_CONFIG`).

## Rendering model
Each page's inline `<script>`:
1. `D.buildChrome(activeId)` draws the header + nav.
2. Sets up a `filterBar` (date / rep / customer).
3. `loadWindow(from, to)` fetches the raw rows for the needed window.
4. `render()` filters client-side and (re)draws KPIs, tables, and Chart.js charts.
5. A `setInterval` re-loads + re-renders every `POLL_MS`.

Client-side aggregation is deliberate: it lets a date filter genuinely recompute
every KPI/chart from raw rows, instead of relying on fixed-window snapshots.
The trade-off is bandwidth — see `docs/KNOWN_ISSUES.md` #5.

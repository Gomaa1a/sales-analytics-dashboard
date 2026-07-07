# Metric definitions & trust notes

This file is the contract for what every number means. A CEO dashboard lives or
dies on trust — if two numbers use different bases without saying so, the whole
tool loses credibility. **Read this before changing any calculation.**

## The three axes that MUST be stated for every money figure
1. **Orders vs. Invoices.** This dashboard counts **sales orders**, not invoices.
   "Confirmed sales" = orders in state `sale` or `done`. An order can be
   confirmed but not yet invoiced (see the "uninvoiced" metric on the debt page).
2. **Tax-inclusive vs. untaxed.** All amounts use Odoo's `amount_total`, which is
   **tax-inclusive**. Odoo's *Invoice Analysis* report defaults to **Untaxed
   Total**. Same transactions, different number.
3. **Which date.** Order aggregation is by **`date_order`** (Odoo's "Order
   Date" — the same basis as Odoo's Sales screens; it moves to the confirmation
   time when a quotation is confirmed), not `create_date` or `invoice_date`.
   Days are bucketed in the **Asia/Baghdad** calendar (Odoo stores UTC but
   displays/groups in the user's timezone) — see `D.bagDay()` in `common.js`.
   The Overview uses this everywhere (`dayOf`); a UTC slice would put
   late-evening orders on the wrong day vs the Odoo screen.

### ⚠️ Reconciling with Odoo "Invoice Analysis"
The regions numbers will **not** match Odoo's Invoice Analysis by default,
because they measure different things. To compare fairly:
- Dashboard = confirmed **orders**, **tax-inclusive**, by **create_date**.
- Invoice Analysis = posted **invoices**, **untaxed**, by **invoice date**.

They only converge if you align all three axes. This is a **definitional
difference, not necessarily a bug.** If after aligning them the counts still
diverge wildly, check for duplicate rows (see `KNOWN_ISSUES.md` #4):
```sql
select count(*), count(distinct order_id) from dashboard_orders;
-- if these differ, duplicate sync rows are inflating counts
```
The regions page now shows the confirmed-orders/tax/create_date basis inline,
and surfaces an "Unmapped cities" banner so unclassified value is visible.

## Confirmed sales
`state ∈ {sale, done}`, summing `amount_total`. Quotations (`draft`, `sent`) and
`cancel` are excluded. Used on Overview, Regions, Salespeople.

## Orders per day (Overview chart)
Stacked bar per Baghdad day: **blue = confirmed** (`sale`/`done`, the only
segment any KPI counts) + **grey = cancelled/unconfirmed**. The bar TOTAL
therefore matches Odoo's grouped Orders list, which counts every record
including cancelled — verified 2026-07-07 against Odoo for Jul 1–7 (913 = 913,
zero missing/duplicate rows; the visible per-day "gap" was exactly the 36
cancelled/draft orders Odoo includes and the dashboard excludes by policy).

## Conversion rate
`confirmed / (confirmed + quotations)` by order **count** within the filter
range. Note it's count-based, not value-based.

## Average order value (AOV)
`confirmed value / confirmed count` within the range.

## Governorate (Regions page)
Derived from the free-text `city` field via `govOf()`. `govOf` normalizes the
string (diacritics, alef/ya/hamza/ta-marbuta, Persian letters, prefixes like
`محافظة`/`حي`) and matches it against a dictionary of known cities and
governorate names; unmatched values fall into **"Unknown" (غير محدد)**.
- "Unknown" means *"the city text didn't match our dictionary,"* not *"Odoo has
  no data."* The Regions page now shows how many orders/how much value are
  unmapped so this is transparent.
- **Correct long-term fix:** sync a real governorate field from Odoo
  (`res.partner.state_id`) so classification doesn't depend on parsing free text.
  See `KNOWN_ISSUES.md` #1.

## Cash collected
Sum of `dashboard_payments.amount` in the period. "Collected ÷ sales" divides
period collections by period **confirmed order value** (tax-inclusive) — a
rough liquidity signal, not an accounting figure.

## Overdue / Receivable (Debt page)
Point-in-time balances from the `rep_debt` snapshot (`receivable`, `overdue`
per customer). **The date filter does not apply** — it's "as of now." "Debt
concentration" = top-10 debtors' share of total overdue.

## DSO (Days Sales Outstanding)
`receivable / thisMonthConfirmedSales × 30`. A **rough proxy** only: it mixes a
point-in-time balance with a single month of order value. Do not quote as a
precise finance metric.

## Month pace / attainment (Overview)
- `attain = revMonth / MONTHLY_REVENUE_TARGET`.
- `pace = revMonth / dayOfMonth × daysInMonth` — naive **linear** extrapolation;
  ignores weekends and seasonality.
- ⚠️ `MONTHLY_REVENUE_TARGET` in `config.js` is a **placeholder**. Until it's the
  real company goal, attainment/pace are meaningless. Set it, or set it to `0`
  to hide the target bar (the code falls back to showing order count).

## WoW / MoM (Salespeople, Collections)
Week starts **Saturday** (Iraq). MoM compares this calendar month to last.
Percent change = `(current − previous) / previous`, or `100%` when previous is 0.

## Value at risk (Overview)
Sum of `amount_total` for orders whose alert `level = critical` in the last
45 days. Sourced from the `alerts` query, not the date-filtered window.

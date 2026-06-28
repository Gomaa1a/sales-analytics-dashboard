/* ============================================================
   Dabboos Sales Command Center — shared library
   i18n + formatting + API + sound + toast + navigation
   ============================================================ */
(function () {
  const CFG = window.DASH_CONFIG;

  /* ---------------- i18n ---------------- */
  const I18N = {
    ar: {
      brand: "مركز قيادة المبيعات",
      sub: "دبوس — لوحة حية",
      nav_overview: "النظرة العامة",
      nav_alerts: "مركز التنبيهات",
      nav_sales: "المندوبون (مقارنة أسبوعية)",
      nav_regions: "المدن الأكثر طلباً",
      nav_collections: "التحصيل اليومي",
      nav_acks: "متابعة التنبيهات",
      lang_btn: "EN",
      live: "مباشر",
      locked_hint: "مقفل مؤقتاً — قيد التطوير",
      updated: "آخر تحديث",
      loading: "جارٍ التحميل…",
      error_load: "تعذّر الاتصال بمحرك n8n. تحقّق من N8N_BASE في config.js.",
      // overview
      kpi_today: "طلبات مؤكدة اليوم",
      kpi_week: "طلبات مؤكدة هذا الأسبوع",
      kpi_month: "طلبات مؤكدة هذا الشهر",
      kpi_quotes: "عروض أسعار هذا الشهر",
      conversion: "نسبة التحويل",
      kpi_avg: "متوسط قيمة الطلب",
      kpi_pending: "تنبيهات تحتاج مراجعة",
      kpi_value: "القيمة",
      orders: "طلب",
      status_title: "حالة طلبات اليوم",
      st_confirmed: "مؤكدة",
      st_drafts: "عروض أسعار",
      st_cancelled: "ملغاة",
      st_total: "الإجمالي",
      latest_alerts: "أحدث التنبيهات",
      view_all: "عرض الكل",
      no_alerts: "لا توجد تنبيهات حالياً ✅",
      // alerts
      alerts_title: "مركز التنبيهات",
      alerts_sub: "طلبات تحتاج مراجعة بشرية — مرتبة حسب الخطورة",
      filter_all: "الكل",
      filter_critical: "حرجة",
      filter_warning: "تحذيرات",
      col_order: "الطلب",
      col_customer: "العميل",
      col_rep: "المندوب",
      col_city: "المدينة",
      col_amount: "القيمة",
      col_reasons: "أسباب المراجعة",
      critical: "حرج",
      warning: "تحذير",
      // sales
      sales_title: "أداء المندوبين",
      sales_sub: "مبيعات هذا الأسبوع مقارنةً بالأسبوع الماضي",
      this_month: "الشهر الحالي",
      last_year: "نفس الفترة العام الماضي",
      this_week: "هذا الأسبوع",
      last_week: "الأسبوع الماضي",
      yoy: "سنوي",
      wow: "أسبوعي",
      mom: "شهري",
      weekly_trend: "الطلبات المؤكدة أسبوعياً (آخر ١٢ أسبوع)",
      monthly_trend: "المبيعات المؤكدة شهرياً — مقارنة بالعام الماضي",
      daily_week: "توزيع الطلبات المؤكدة هذا الأسبوع — لكل يوم",
      funnel_title: "مسار المبيعات هذا الشهر — من عرض السعر إلى التأكيد",
      top_customers: "أكبر العملاء — آخر 30 يوم (مؤكد)",
      risk_mix: "توزيع المخاطر — آخر 30 يوم",
      aov_trend: "متوسط قيمة الطلب أسبوعياً (مؤكد)",
      collections_title: "الائتمان والتحصيل",
      overdue_exposure: "إجمالي المتأخرات",
      over_limit: "تجاوزوا حد الائتمان",
      new_risk: "مخاطر جديدة (هذا الشهر)",
      uninvoiced: "مؤكد بلا فاتورة",
      dso_title: "توزيع أيام التحصيل (DSO)",
      top_overdue: "أعلى العملاء تأخراً",
      rep_leaderboard: "ترتيب المندوبين — هذا الشهر (مؤكد)",
      risky_orders: "بمخاطر",
      customers_no: "عميل",
      no_data: "لا توجد بيانات بعد",
      top_areas_title: "أكثر 5 مدن شراءً — آخر 30 يوم",
      this_year: "هذا العام",
      last_year_short: "العام الماضي",
      last_month: "الشهر الماضي",
      orders_count: "عدد الطلبات",
      rep: "المندوب",
      // regions
      regions_title: "المدن الأكثر طلباً",
      regions_sub: "توزيع الطلبات حسب المدينة — آخر 30 يوم",
      region: "المدينة",
      share: "الحصة",
      crit_orders: "طلبات حرجة",
      // daily collections page (تحصيل)
      coll_title: "تحصيل المندوبين — يومي",
      coll_sub: "المبالغ المُحصَّلة لكل مندوب لكل يوم",
      coll_today: "محصّل اليوم",
      coll_today_paid: "مؤكد (مسدّد)",
      coll_today_pending: "قيد التحصيل",
      coll_paid: "مسدّد",
      coll_pending: "قيد التحصيل",
      coll_total: "الإجمالي",
      coll_payments_no: "عدد السندات",
      coll_leaderboard: "ترتيب التحصيل اليوم",
      coll_grid: "التحصيل لكل مندوب — آخر ١٤ يوم",
      coll_day: "اليوم",
      coll_grand_total: "إجمالي التحصيل",
      // customer debt by salesperson (مديونية العملاء)
      debt_title: "مديونية العملاء المستحقة",
      debt_receivable: "إجمالي المديونية",
      debt_overdue: "منها متأخّر",
      debt_customers_no: "عدد العملاء المستحقين",
      debt_pick: "فلترة حسب المندوب",
      debt_total_all: "إجمالي المديونية",
      debt_due_all: "إجمالي المستحق",
      debt_due_pct: "نسبة المستحق من المديونية",
      debt_all_reps_sub: "كل المندوبين",
      debt_due_sub: "المتأخّر عن السداد",
      debt_due_pct_sub: "المستحق ÷ الإجمالي",
      col_debit: "المديونية",
      col_overdue: "المتأخّر",
      // shared filter bar
      f_from: "من تاريخ",
      f_to: "إلى تاريخ",
      f_rep_all: "كل المندوبين",
      f_customer_ph: "بحث بالعميل…",
      f_clear: "مسح",
      f_results: "نتيجة",
      // order modal
      order_details: "تفاصيل الطلب",
      customer_profile: "ملف العميل المالي",
      risk_assessment: "تقييم المخاطر",
      no_risk: "لا توجد مخاطر على هذا الطلب ✅",
      f_state: "الحالة", f_type: "النوع", f_date: "تاريخ الطلب",
      f_total: "الإجمالي",
      f_qty: "الكمية", f_products: "عدد المنتجات", f_invoices: "الفواتير",
      f_credit: "الرصيد الدائن", f_credit_limit: "حد الائتمان", f_balance: "الرصيد",
      f_overdue: "المتأخرات", f_avg3m: "متوسط 3 أشهر", f_pay6m: "متوسط المدفوعات 6 أشهر",
      f_curmonth: "مبيعات الشهر", f_dso: "أيام التحصيل", f_trust: "الثقة",
      f_rank: "تصنيف العميل", f_ontime: "الالتزام بالموعد", f_invoiced: "إجمالي الفوترة",
      f_payment: "طريقة الدفع", f_best: "الأكثر مبيعاً",
      close: "إغلاق",
      // acknowledgments
      mark_reviewed: "تمّت المراجعة ✓",
      add_note: "إضافة ملاحظة (اختياري)…",
      reviewed_ok: "تم تسجيل المراجعة",
      acks_title: "متابعة التنبيهات",
      acks_sub: "مَن راجع التنبيهات وما الملاحظات — وكم تنبيه لم يفتحه أحد",
      ack_total: "إجمالي التنبيهات",
      ack_seen: "تمت مراجعتها",
      ack_ignored: "لم يراجعها أحد",
      ack_rate: "نسبة المراجعة",
      ack_reviews: "مرات المراجعة",
      ack_notes: "الملاحظات",
      ack_status: "الحالة",
      ack_when: "وقت المراجعة",
      st_seen: "تمت المراجعة",
      st_ignored: "بانتظار المراجعة",
      no_notes: "لا توجد ملاحظات",
      filter_ignored: "غير مُراجَعة",
      filter_seen: "مُراجَعة",
      not_found: "لم يتم العثور على الطلب",
      search_ph: "بحث: طلب، عميل، مندوب، مدينة…",
      export_pdf: "تصدير PDF",
      sound_on: "الصوت مفعّل", sound_off: "الصوت متوقف",
      states: { draft: "عرض سعر", sent: "مُرسل", sale: "طلب مؤكد", done: "مكتمل", cancel: "ملغي" },
      trust: { good: "جيد", normal: "عادي", bad: "سيء" }
    },
    en: {
      brand: "Sales Command Center",
      sub: "Dabboos — Live",
      nav_overview: "Overview",
      nav_alerts: "Alert Center",
      nav_sales: "Salespeople (WoW)",
      nav_regions: "Top Cities",
      nav_collections: "Daily Collections",
      lang_btn: "ع",
      live: "LIVE",
      locked_hint: "Locked — coming soon",
      updated: "Updated",
      loading: "Loading…",
      error_load: "Cannot reach the n8n engine. Check N8N_BASE in config.js.",
      kpi_today: "Confirmed today",
      kpi_week: "Confirmed this week",
      kpi_month: "Confirmed this month",
      kpi_quotes: "Quotations this month",
      conversion: "Conversion",
      kpi_avg: "Avg order value",
      kpi_pending: "Alerts to review",
      kpi_value: "Value",
      orders: "orders",
      status_title: "Today's orders by status",
      st_confirmed: "Confirmed",
      st_drafts: "Quotations",
      st_cancelled: "Cancelled",
      st_total: "Total",
      latest_alerts: "Latest alerts",
      view_all: "View all",
      no_alerts: "No alerts right now ✅",
      alerts_title: "Alert Center",
      alerts_sub: "Orders needing human review — sorted by severity",
      filter_all: "All",
      filter_critical: "Critical",
      filter_warning: "Warnings",
      col_order: "Order",
      col_customer: "Customer",
      col_rep: "Rep",
      col_city: "City",
      col_amount: "Amount",
      col_reasons: "Review reasons",
      critical: "Critical",
      warning: "Warning",
      sales_title: "Salesperson performance",
      sales_sub: "This week vs. last week",
      this_month: "This month",
      last_year: "Same period last year",
      this_week: "This week",
      last_week: "Last week",
      yoy: "YoY",
      wow: "WoW",
      mom: "MoM",
      weekly_trend: "Weekly confirmed orders (last 12 weeks)",
      monthly_trend: "Monthly confirmed sales — vs last year",
      daily_week: "This week — confirmed orders by day",
      funnel_title: "This month's pipeline — quotation to confirmed",
      top_customers: "Top customers — last 30 days (confirmed)",
      risk_mix: "Risk mix — last 30 days",
      aov_trend: "Avg order value per week (confirmed)",
      collections_title: "Credit & collections",
      overdue_exposure: "Overdue exposure",
      over_limit: "Over credit limit",
      new_risk: "New risk (this month)",
      uninvoiced: "Confirmed, not invoiced",
      dso_title: "Collection days (DSO)",
      top_overdue: "Top overdue customers",
      rep_leaderboard: "Rep leaderboard — this month (confirmed)",
      risky_orders: "risky",
      customers_no: "customers",
      no_data: "No data yet",
      top_areas_title: "Top 5 cities by purchases — last 30 days",
      this_year: "This year",
      last_year_short: "Last year",
      last_month: "Last month",
      orders_count: "Orders",
      rep: "Rep",
      regions_title: "Top cities by demand",
      regions_sub: "Orders by city — last 30 days",
      region: "City",
      share: "Share",
      crit_orders: "Critical orders",
      // daily collections page
      coll_title: "Salesperson collections — daily",
      coll_sub: "Money collected per salesperson, per day",
      coll_today: "Collected today",
      coll_today_paid: "Cleared (paid)",
      coll_today_pending: "Pending",
      coll_paid: "Paid",
      coll_pending: "Pending",
      coll_total: "Total",
      coll_payments_no: "Payments",
      coll_leaderboard: "Today's collection leaderboard",
      coll_grid: "Collection per rep — last 14 days",
      coll_day: "Day",
      coll_grand_total: "Total collected",
      // customer debt by salesperson
      debt_title: "Outstanding customer debt",
      debt_receivable: "Total receivable",
      debt_overdue: "of which overdue",
      debt_customers_no: "Customers due",
      debt_pick: "Filter by salesperson",
      debt_total_all: "Total receivable",
      debt_due_all: "Total due",
      debt_due_pct: "Due ratio",
      debt_all_reps_sub: "All salespeople",
      debt_due_sub: "Overdue",
      debt_due_pct_sub: "Due ÷ total",
      col_debit: "Receivable",
      col_overdue: "Overdue",
      // shared filter bar
      f_from: "From",
      f_to: "To",
      f_rep_all: "All reps",
      f_customer_ph: "Search customer…",
      f_clear: "Clear",
      f_results: "results",
      order_details: "Order details",
      customer_profile: "Customer financial profile",
      risk_assessment: "Risk assessment",
      no_risk: "No risks on this order ✅",
      f_state: "State", f_type: "Type", f_date: "Order date",
      f_total: "Total",
      f_qty: "Quantity", f_products: "Products", f_invoices: "Invoices",
      f_credit: "Credit", f_credit_limit: "Credit limit", f_balance: "Balance",
      f_overdue: "Overdue", f_avg3m: "3-month avg", f_pay6m: "6-month avg payments",
      f_curmonth: "Month sales", f_dso: "DSO (days)", f_trust: "Trust",
      f_rank: "Customer rank", f_ontime: "On-time rate", f_invoiced: "Total invoiced",
      f_payment: "Payment method", f_best: "Best sellers",
      close: "Close",
      // acknowledgments
      mark_reviewed: "Mark reviewed ✓",
      add_note: "Add a note (optional)…",
      reviewed_ok: "Review recorded",
      acks_title: "Alert follow-up",
      acks_sub: "Who reviewed alerts and their notes — and how many no one opened",
      ack_total: "Total alerts",
      ack_seen: "Reviewed",
      ack_ignored: "Not reviewed by anyone",
      ack_rate: "Review rate",
      ack_reviews: "Reviews",
      ack_notes: "Notes",
      ack_status: "Status",
      ack_when: "Reviewed at",
      st_seen: "Reviewed",
      st_ignored: "Awaiting review",
      no_notes: "No notes",
      filter_ignored: "Not reviewed",
      filter_seen: "Reviewed",
      not_found: "Order not found",
      search_ph: "Search: order, customer, rep, city…",
      export_pdf: "Export PDF",
      sound_on: "Sound on", sound_off: "Sound off",
      states: { draft: "Quotation", sent: "Sent", sale: "Confirmed", done: "Done", cancel: "Cancelled" },
      trust: { good: "Good", normal: "Normal", bad: "Bad" }
    }
  };

  let LANG = localStorage.getItem("dash_lang") || CFG.DEFAULT_LANG || "ar";
  const t = (k) => I18N[LANG][k] !== undefined ? I18N[LANG][k] : k;
  const isAR = () => LANG === "ar";

  /* ---------------- formatting ---------------- */
  function fmtNum(n) {
    if (n === null || n === undefined || n === false || isNaN(n)) return "—";
    return Number(n).toLocaleString("en-US", { maximumFractionDigits: 0 });
  }
  function fmtMoney(n) {
    const cur = isAR() ? CFG.CURRENCY_AR : CFG.CURRENCY;
    if (n === null || n === undefined || n === false || isNaN(n)) return "—";
    // compact for large numbers
    const abs = Math.abs(Number(n));
    let s;
    if (abs >= 1e6) s = (n / 1e6).toLocaleString("en-US", { maximumFractionDigits: 2 }) + "M";
    else if (abs >= 1e3) s = (n / 1e3).toLocaleString("en-US", { maximumFractionDigits: 1 }) + "K";
    else s = Number(n).toLocaleString("en-US", { maximumFractionDigits: 0 });
    return s + " " + cur;
  }
  function fmtMoneyFull(n) {
    const cur = isAR() ? CFG.CURRENCY_AR : CFG.CURRENCY;
    if (n === null || n === undefined || n === false || isNaN(n)) return "—";
    return Number(n).toLocaleString("en-US", { maximumFractionDigits: 0 }) + " " + cur;
  }
  function fmtDate(s) {
    if (!s) return "—";
    const d = new Date(String(s).replace(" ", "T"));
    if (isNaN(d)) return s;
    return d.toLocaleDateString(isAR() ? "ar-EG" : "en-GB", { year: "numeric", month: "short", day: "numeric" });
  }
  function fmtTime(s) {
    const d = s ? new Date(s) : new Date();
    return d.toLocaleTimeString(isAR() ? "ar-EG" : "en-GB", { hour: "2-digit", minute: "2-digit" });
  }

  /* ---------------- API (reads Supabase REST directly) ---------------- */
  // Demo/mock data fully disabled — the dashboard shows ONLY real Supabase data.
  const DEMO = false;

  async function sbGet(pathAndQuery) {
    const base = CFG.SUPABASE_URL.replace(/\/$/, "");
    const res = await fetch(base + "/rest/v1/" + pathAndQuery, {
      method: "GET",
      cache: "no-store",
      headers: { apikey: CFG.SUPABASE_ANON_KEY, Authorization: "Bearer " + CFG.SUPABASE_ANON_KEY }
    });
    if (!res.ok) throw new Error("Supabase HTTP " + res.status);
    return res.json();
  }

  async function snapshot(key) {
    const rows = await sbGet(`${CFG.TABLES.snapshots}?select=data&key=eq.${key}`);
    if (!rows || !rows.length) throw new Error("snapshot missing: " + key);
    return rows[0].data;
  }

  async function api(endpointKey, params) {
    // Demo mode: while SUPABASE_ANON_KEY is unconfigured, serve realistic mock data.
    if (DEMO && window.DASH_MOCK && window.DASH_MOCK[endpointKey]) {
      await new Promise(r => setTimeout(r, 150));
      return window.DASH_MOCK[endpointKey](params);
    }

    if (endpointKey === "summary" || endpointKey === "regions" || endpointKey === "salespeople" || endpointKey === "trends" || endpointKey === "collections" || endpointKey === "reps" || endpointKey === "rep_collections" || endpointKey === "rep_debt") {
      return snapshot(endpointKey);
    }

    if (endpointKey === "today_status") {
      // Live status breakdown of TODAY's orders, straight from dashboard_orders.
      // "Today" uses the same Asia/Baghdad day boundary the n8n summary uses, so the
      // "confirmed" count here matches the "Confirmed today" KPI exactly.
      const bag = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Baghdad" }));
      const pad = n => String(n).padStart(2, "0");
      const dstr = d => d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
      const today = dstr(bag);
      const tmr = new Date(bag); tmr.setDate(bag.getDate() + 1);
      const rows = await sbGet(
        `${CFG.TABLES.orders}?select=state&create_date=gte.${today}&create_date=lt.${dstr(tmr)}&limit=5000`);
      const c = { sale: 0, done: 0, draft: 0, sent: 0, cancel: 0 };
      (rows || []).forEach(r => { if (c[r.state] != null) c[r.state]++; });
      const confirmed = c.sale + c.done;
      const drafts = c.draft + c.sent;
      const cancelled = c.cancel;
      return {
        generated_at: new Date().toISOString(),
        confirmed, drafts, cancelled,
        total: confirmed + drafts + cancelled,
        by_state: c
      };
    }

    if (endpointKey === "acks") {
      if (DEMO) return { acks: JSON.parse(localStorage.getItem("demo_acks") || "[]") };
      const rows = await sbGet(`alert_acks?select=order_id,order_name,level,amount_total,note,created_at&order=created_at.desc&limit=2000`);
      return { acks: rows || [] };
    }

    if (endpointKey === "alerts") {
      const since = new Date(Date.now() - 45 * 864e5).toISOString().slice(0, 10);
      const sel = "order_id,order_name,partner_name,salesperson,city,amount_total,state,level,reasons,date_order,create_date";
      const rows = await sbGet(
        `${CFG.TABLES.orders}?select=${sel}&level=in.(critical,warning)&create_date=gte.${since}` +
        `&order=date_order.desc,create_date.desc&limit=300`);
      const alerts = (rows || []).map(r => ({ ...r, amount_total: Number(r.amount_total) || 0 }));
      const critical = alerts.filter(a => a.level === "critical").length;
      return { generated_at: new Date().toISOString(), currency: CFG.CURRENCY, count: alerts.length,
        critical, warning: alerts.length - critical, alerts };
    }

    if (endpointKey === "order") {
      const rows = await sbGet(`${CFG.TABLES.orders}?order_id=eq.${encodeURIComponent(params.id)}&limit=1`);
      if (!rows || !rows.length) return { found: false };
      const o = rows[0];
      return {
        found: true, currency: CFG.CURRENCY,
        order: {
          id: o.order_id, name: o.order_name, partner_name: o.partner_name, salesperson: o.salesperson,
          state: o.state, type_name: o.type_name, date_order: o.date_order, create_date: o.create_date,
          amount_total: o.amount_total,
          total_quantity: o.total_quantity, total_product: o.total_product,
          invoice_count: o.invoice_count,
          partner_credit_warning: o.partner_credit_warning
        },
        customer: o.customer || null,
        risk: { level: o.level, reasons: o.reasons || [] }
      };
    }

    throw new Error("unknown endpoint: " + endpointKey);
  }

  /* ---------------- write: acknowledge an alert (anonymous) ---------------- */
  async function ackAlert(order, note) {
    const row = {
      order_id: order.order_id != null ? order.order_id : order.id,
      order_name: order.order_name || order.name || "",
      level: order.level || (order.risk && order.risk.level) || "",
      amount_total: Number(order.amount_total) || 0,
      note: note || null
    };
    if (DEMO) {
      const arr = JSON.parse(localStorage.getItem("demo_acks") || "[]");
      arr.unshift({ ...row, created_at: new Date().toISOString() });
      localStorage.setItem("demo_acks", JSON.stringify(arr.slice(0, 500)));
      return { ok: true };
    }
    const base = CFG.SUPABASE_URL.replace(/\/$/, "");
    const res = await fetch(base + "/rest/v1/alert_acks", {
      method: "POST",
      headers: {
        apikey: CFG.SUPABASE_ANON_KEY, Authorization: "Bearer " + CFG.SUPABASE_ANON_KEY,
        "Content-Type": "application/json", Prefer: "return=minimal"
      },
      body: JSON.stringify(row)
    });
    if (!res.ok) throw new Error("ack failed HTTP " + res.status);
    return { ok: true };
  }

  /* ---------------- sound + notifications ---------------- */
  let audioCtx = null;
  function beep() {
    if (!CFG.SOUND_ENABLED || !soundOn) return;
    try {
      audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
      const now = audioCtx.currentTime;
      [880, 1320].forEach((freq, i) => {
        const o = audioCtx.createOscillator();
        const g = audioCtx.createGain();
        o.type = "sine"; o.frequency.value = freq;
        g.gain.setValueAtTime(0.0001, now + i * 0.18);
        g.gain.exponentialRampToValueAtTime(0.25, now + i * 0.18 + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.18 + 0.16);
        o.connect(g); g.connect(audioCtx.destination);
        o.start(now + i * 0.18); o.stop(now + i * 0.18 + 0.18);
      });
    } catch (e) { /* ignore */ }
  }
  let soundOn = CFG.SOUND_ENABLED;
  function toggleSound() {
    soundOn = !soundOn;
    localStorage.setItem("dash_sound", soundOn ? "1" : "0");
    if (audioCtx && audioCtx.state === "suspended") audioCtx.resume();
    renderSoundBtn();
    if (soundOn) beep();
  }
  (function initSound() {
    const saved = localStorage.getItem("dash_sound");
    if (saved !== null) soundOn = saved === "1";
  })();

  function notify(title, body) {
    if (!("Notification" in window)) return;
    if (Notification.permission === "granted") new Notification(title, { body });
    else if (Notification.permission !== "denied") Notification.requestPermission();
  }

  function toast(msg, level) {
    let host = document.getElementById("toastHost");
    if (!host) { host = document.createElement("div"); host.id = "toastHost"; host.className = "toast-host"; document.body.appendChild(host); }
    const el = document.createElement("div");
    el.className = "toast toast-" + (level || "info");
    el.innerHTML = msg;
    host.appendChild(el);
    setTimeout(() => { el.classList.add("show"); }, 10);
    setTimeout(() => { el.classList.remove("show"); setTimeout(() => el.remove(), 300); }, 6000);
  }

  /* ---------------- chrome (header + nav) ---------------- */
  const PAGES = [
    { key: "nav_overview", href: "index.html", id: "overview" },
    { key: "nav_alerts", href: "alerts.html", id: "alerts" },
    { key: "nav_sales", href: "salespeople.html", id: "sales" },
    { key: "nav_collections", href: "collections.html", id: "collections" },
    { key: "nav_regions", href: "regions.html", id: "regions" },
    { key: "nav_acks", href: "acknowledgments.html", id: "acks" }
  ];

  // Focus mode: while we build out the Overview, every other page is locked
  // (shown in the nav but not clickable). Set to [] to unlock everything.
  const LOCKED_IDS = [];

  function renderSoundBtn() {
    const b = document.getElementById("soundBtn");
    if (!b) return;
    b.classList.toggle("on", soundOn);
    b.title = soundOn ? t("sound_on") : t("sound_off");
    b.textContent = soundOn ? "🔔" : "🔕";
  }

  function buildChrome(activeId) {
    document.documentElement.lang = LANG;
    document.documentElement.dir = isAR() ? "rtl" : "ltr";

    const header = document.getElementById("appHeader");
    if (header) {
      header.innerHTML = `
        <div class="hd-brand">
          <div class="hd-logo">DB</div>
          <div>
            <div class="hd-title">${t("brand")}</div>
            <div class="hd-sub">${t("sub")}</div>
          </div>
        </div>
        <nav class="hd-nav">
          ${PAGES.map(p => LOCKED_IDS.includes(p.id)
            ? `<span class="nav-locked" title="${t("locked_hint")}">🔒 ${t(p.key)}</span>`
            : `<a href="${p.href}" class="${p.id === activeId ? "active" : ""}">${t(p.key)}</a>`).join("")}
        </nav>
        <div class="hd-tools">
          <span class="live-dot"><i></i>${t("live")}</span>
          <button id="soundBtn" class="icon-btn" type="button"></button>
          <button id="pdfBtn" class="icon-btn" type="button" title="${t("export_pdf")}">🖨️</button>
          <button id="langBtn" class="icon-btn lang" type="button">${t("lang_btn")}</button>
          <span id="updatedAt" class="updated"></span>
        </div>`;
      document.getElementById("langBtn").addEventListener("click", () => {
        LANG = isAR() ? "en" : "ar";
        localStorage.setItem("dash_lang", LANG);
        location.reload();
      });
      document.getElementById("soundBtn").addEventListener("click", toggleSound);
      // Export PDF = browser print dialog → "Save as PDF" (print stylesheet cleans the page)
      document.getElementById("pdfBtn").addEventListener("click", () => window.print());
      renderSoundBtn();
    }
  }

  function setUpdated(ts) {
    const el = document.getElementById("updatedAt");
    if (el) el.textContent = t("updated") + ": " + fmtTime(ts);
  }

  function stateLabel(s) { return (I18N[LANG].states[s]) || s || "—"; }
  function trustLabel(s) { return (I18N[LANG].trust[s]) || s || "—"; }

  /* ---------------- shared filter bar (date + salesperson + customer) ----------------
     Renders structured filter controls into `host` and calls onChange() on any change.
     opts: { date, rep, customer } booleans (default all true).
     Returns a controller: .setReps(names) to fill the dropdown from loaded rows,
     .values(), .setCount(n), and .match(row, {date,rep,cust}) where each value is the
     row's property name for that dimension (omit a key to skip that filter). */
  function filterBar(host, opts, onChange) {
    opts = opts || {};
    const showDate = opts.date !== false, showRep = opts.rep !== false, showCust = opts.customer !== false;
    const parts = [];
    if (showDate) parts.push(
      `<label class="fb-field"><span>${t("f_from")}</span><input id="fbFrom" class="fb-date" type="date"></label>`,
      `<label class="fb-field"><span>${t("f_to")}</span><input id="fbTo" class="fb-date" type="date"></label>`);
    if (showRep)  parts.push(`<select id="fbRep" class="fb-sel"><option value="">${t("f_rep_all")}</option></select>`);
    if (showCust) parts.push(`<input id="fbCust" class="search-box" type="search" placeholder="${t("f_customer_ph")}">`);
    parts.push(`<button id="fbClear" class="fb-clear" type="button">${t("f_clear")}</button>`);
    parts.push(`<span id="fbCount" class="fb-count"></span>`);
    host.innerHTML = parts.join("");
    const $ = id => document.getElementById(id);
    const fire = () => { onChange && onChange(); };
    ["fbFrom", "fbTo", "fbRep", "fbCust"].forEach(id => { const el = $(id); if (el) el.addEventListener("input", fire); });
    $("fbClear").addEventListener("click", () => {
      ["fbFrom", "fbTo", "fbCust"].forEach(id => { const el = $(id); if (el) el.value = ""; });
      const r = $("fbRep"); if (r) r.value = "";
      fire();
    });
    return {
      setReps(names) {
        const sel = $("fbRep"); if (!sel) return;
        const cur = sel.value;
        const uniq = [...new Set((names || []).filter(Boolean))].sort((a, b) => String(a).localeCompare(String(b)));
        sel.innerHTML = `<option value="">${t("f_rep_all")}</option>` +
          uniq.map(n => `<option${String(n) === cur ? " selected" : ""}>${n}</option>`).join("");
      },
      values() {
        return {
          from: ($("fbFrom") && $("fbFrom").value) || "", to: ($("fbTo") && $("fbTo").value) || "",
          rep: ($("fbRep") && $("fbRep").value) || "", cust: (($("fbCust") && $("fbCust").value) || "").trim().toLowerCase()
        };
      },
      setCount(n) { const c = $("fbCount"); if (c) c.textContent = (n != null ? n : "") + " " + t("f_results"); },
      match(row, fields) {
        fields = fields || {};
        const v = this.values();
        if (showDate && (v.from || v.to) && fields.date) {
          const d = String(row[fields.date] || "").slice(0, 10);
          if (!d) return false;
          if (v.from && d < v.from) return false;
          if (v.to && d > v.to) return false;
        }
        if (showRep && v.rep && fields.rep && String(row[fields.rep] || "") !== v.rep) return false;
        if (showCust && v.cust && fields.cust && !String(row[fields.cust] || "").toLowerCase().includes(v.cust)) return false;
        return true;
      }
    };
  }

  /* ---------------- expose ---------------- */
  window.DASH = {
    t, isAR, lang: () => LANG,
    fmtNum, fmtMoney, fmtMoneyFull, fmtDate, fmtTime,
    api, ackAlert, beep, toast, notify, buildChrome, setUpdated, renderSoundBtn,
    stateLabel, trustLabel, filterBar,
    cfg: CFG
  };
})();

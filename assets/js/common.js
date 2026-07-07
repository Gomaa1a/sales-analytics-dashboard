/* ============================================================
   Dabboos Sales Command Center — shared library
   i18n + formatting + API + sound + toast + navigation
   ============================================================ */
(function () {
  const CFG = window.DASH_CONFIG;

  // Disable Chart.js animations globally. On a live dashboard that re-renders
  // every poll, animations add CPU/GPU churn, make the page feel busy, and keep
  // the renderer from ever going idle (which breaks embedded previews and screen
  // capture). Charts still redraw instantly on data change. common.js always
  // loads AFTER chart.umd.min.js on the pages that use charts.
  if (window.Chart && window.Chart.defaults) {
    window.Chart.defaults.animation = false;
    window.Chart.defaults.animations = false;
  }

  /* ---------------- i18n ---------------- */
  const I18N = {
    ar: {
      brand: "مركز قيادة المبيعات",
      sub: "دبوس — لوحة حية",
      nav_overview: "النظرة العامة",
      nav_alerts: "مركز التنبيهات",
      nav_sales: "المندوبون (مقارنة أسبوعية)",
      nav_regions: "المدن والمحافظات",
      nav_collections: "التحصيل اليومي",
      nav_debt: "مديونية العملاء",
      lang_btn: "EN",
      live: "مباشر",
      updated: "آخر تحديث",
      loading: "جارٍ التحميل…",
      error_load: "تعذّر تحميل البيانات من Supabase. تحقّق من الاتصال أو من إعدادات config.js.",
      // overview
      kpi_quotes: "عروض أسعار هذا الشهر",
      conversion: "نسبة التحويل",
      kpi_avg: "متوسط قيمة الطلب",
      kpi_value: "القيمة",
      orders: "طلب",
      ov_sub: "ملخص عالي المستوى — استخدم البحث لتحديث كل البيانات",
      ov_confirmed: "الطلبات المؤكدة",
      ov_orders_day: "الطلبات المؤكدة لكل يوم",
      ov_top_govs: "أعلى المحافظات (قيمة)",
      ov_customers: "عدد العملاء",
      ov_status_mix: "توزيع حالات الطلبات",
      no_alerts: "لا توجد تنبيهات حالياً ✅",
      // overview: today strip + action tables
      ov_today_sales: "مبيعات اليوم (مؤكدة)",
      ov_pending_cash: "نقد قيد التحصيل (بذمة المندوبين)",
      ov_cancelled: "طلبات ملغاة هذا الشهر",
      ov_orders_month: "طلبات مؤكدة هذا الشهر",
      ov_top_debtors: "أكبر المتأخرين — عملاء للمتابعة اليوم",
      ov_leaderboard: "المندوبون — مبيعات مقابل تحصيل (هذا الشهر)",
      col_collected: "المُحصَّل",
      col_sales: "المبيعات",
      payments_count: "دفعة",
      // executive summary band (merged into the overview)
      exec_title: "النظرة التنفيذية",
      ex_revenue: "المبيعات المؤكدة — هذا الشهر",
      ex_target: "الهدف",
      ex_of_target: "من الهدف",
      ex_pace: "على المسار لتحقيق",
      ex_cash: "النقد المُحصّل — هذا الشهر",
      ex_dso: "متوسط أيام التحصيل",
      ex_overdue: "المتأخرات المستحقة",
      ex_conc_sub: "حصة أعلى ١٠ عملاء",
      ex_top_rep: "أفضل مندوب",
      ex_top_gov: "أعلى محافظة",
      ex_var: "قيمة معرّضة للخطر",
      ex_var_sub: "تنبيهات حرجة",
      ex_story: "القصة في سطر",
      ex_proj: "المتوقّع بنهاية الشهر",
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
      sales_sub: "المبيعات المؤكدة لكل مندوب — أسبوعي وشهري",
      last_week: "الأسبوع الماضي",
      wow: "أسبوعي",
      mom: "شهري",
      sp_week: "هذا الأسبوع",
      sp_month: "هذا الشهر",
      sp_reps: "المندوبون النشطون",
      top_customers: "أكبر العملاء — آخر 30 يوم (مؤكد)",
      new_risk: "مخاطر جديدة (هذا الشهر)",
      uninvoiced: "مؤكد بلا فاتورة",
      no_data: "لا توجد بيانات بعد",
      orders_count: "عدد الطلبات",
      // regions
      regions_title: "المدن والمحافظات",
      regions_sub: "الطلبات المؤكدة حسب المحافظة ثم المدينة",
      region_basis: "الأساس: الطلبات المؤكدة (sale/done) بقيمة شاملة الضريبة، حسب تاريخ إنشاء الطلب. قد تختلف عن «تحليل الفواتير» في أودو الذي يعتمد على الفواتير والقيمة غير الشاملة للضريبة.",
      unmapped: "مدن غير مصنّفة",
      unmapped_note: "طلبات لم نستطع ربط مدينتها بمحافظة (اسم المدينة غير معروف في القاموس). راجع أسماء المدن في أودو أو أضِفها للقاموس.",
      nocity: "بدون مدينة",
      nocity_note: "طلبات لا تحتوي على مدينة أصلاً في أودو — يجب تعبئة حقل «المدينة» في ملف العميل داخل أودو حتى تُحتسب ضمن محافظتها.",
      govs_title: "المحافظات",
      cities_title: "المدن",
      gov_all: "كل المحافظات",
      cities_count: "عدد المدن",
      region: "المدينة",
      share: "الحصة",
      // daily collections page (تحصيل)
      coll_title: "تحصيل المندوبين — يومي",
      coll_sub: "المبالغ المُحصَّلة لكل مندوب لكل يوم",
      coll_today: "محصّل اليوم",
      coll_pending: "قيد التحصيل",
      coll_total: "الإجمالي",
      coll_grid: "التحصيل لكل مندوب — آخر ١٤ يوم",
      coll_grand_total: "إجمالي التحصيل",
      coll_14d: "تحصيل آخر ١٤ يوم",
      coll_period: "تحصيل الفترة المحددة",
      coll_mtd: "الشهر حتى الآن",
      coll_last_month: "الشهر الماضي",
      coll_mom: "التغير الشهري",
      coll_sales_month: "مبيعات الفترة",
      coll_vs_sales: "التحصيل ÷ المبيعات",
      coll_rep_perf: "أداء المندوبين في التحصيل",
      // customer debt by salesperson (مديونية العملاء)
      debt_title: "مديونية العملاء المستحقة",
      debt_customers_no: "عدد العملاء المستحقين",
      debt_total_all: "إجمالي المديونية",
      debt_due_all: "إجمالي المستحق",
      debt_due_pct: "نسبة المستحق من المديونية",
      debt_due_sub: "المتأخّر عن السداد",
      debt_due_pct_sub: "المستحق ÷ الإجمالي",
      col_debit: "المديونية",
      col_overdue: "المتأخّر",
      col_gov: "المحافظة",
      debt_by_gov: "المتأخرات حسب المحافظة",
      debt_by_rep: "المتأخرات حسب المندوب",
      debt_concentration: "تركّز المديونية",
      debt_top10_sub: "حصة أعلى ١٠ عملاء من إجمالي المتأخرات",
      debt_page_sub: "أرصدة العملاء المستحقة الحالية — حسب المندوب",
      debt_table_title: "العملاء المدينون — تفصيل",
      debt_note_live: "المديونية رصيد لحظي (الوضع الآن)، لذا لا ينطبق فلتر التاريخ عليها.",
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
      // acknowledgments
      mark_reviewed: "تمّت المراجعة ✓",
      add_note: "إضافة ملاحظة (اختياري)…",
      reviewed_ok: "تم تسجيل المراجعة",
      ack_total: "إجمالي التنبيهات",
      ack_seen: "تمت مراجعتها",
      ack_ignored: "لم يراجعها أحد",
      ack_rate: "نسبة المراجعة",
      ack_reviews: "مرات المراجعة",
      ack_notes: "الملاحظات",
      ack_status: "الحالة",
      st_seen: "تمت المراجعة",
      st_ignored: "بانتظار المراجعة",
      no_notes: "لا توجد ملاحظات",
      filter_ignored: "غير مُراجَعة",
      filter_seen: "مُراجَعة",
      not_found: "لم يتم العثور على الطلب",
      search_ph: "بحث: طلب، عميل، مندوب، مدينة…",
      export_pdf: "تصدير PDF",
      sound_on: "الصوت مفعّل", sound_off: "الصوت متوقف",
      // auth + admin panel
      nav_admin: "لوحة التحكم",
      logout: "تسجيل الخروج",
      login_title: "تسجيل الدخول",
      login_sub: "أدخل اسم المستخدم وكلمة المرور للمتابعة",
      login_user: "اسم المستخدم",
      login_pass: "كلمة المرور",
      login_btn: "دخول",
      login_wait: "جارٍ الدخول…",
      login_err: "اسم المستخدم أو كلمة المرور غير صحيحة",
      login_inactive: "الحساب غير مفعّل — راجع مسؤول النظام",
      login_noprofile: "لا يوجد ملف لهذا المستخدم — راجع مسؤول النظام",
      admin_title: "لوحة التحكم",
      admin_sub: "إدارة المستخدمين والصلاحيات ومتابعة حركة الاستخدام",
      admin_users: "المستخدمون",
      admin_traffic: "حركة الاستخدام",
      admin_create: "إضافة مستخدم جديد",
      admin_create_btn: "إنشاء المستخدم",
      admin_created: "تم إنشاء المستخدم وتفعيله ✓",
      admin_saved: "تم حفظ التغييرات ✓",
      admin_save: "حفظ",
      admin_active: "مفعّل",
      admin_suspended: "موقوف",
      admin_role: "الدور",
      role_admin: "مسؤول",
      role_management: "إدارة",
      role_alerts: "تنبيهات فقط",
      admin_pages: "الصفحات المسموح بها",
      admin_user_col: "المستخدم",
      admin_fullname: "الاسم الكامل",
      admin_password: "كلمة المرور (٦ أحرف على الأقل)",
      admin_username_ph: "اسم المستخدم (إنجليزي بدون مسافات)",
      admin_err: "فشلت العملية — حاول مرة أخرى",
      admin_user_exists: "اسم المستخدم مستخدم مسبقاً",
      admin_you: "هذا حسابك",
      admin_pw_note: "لإعادة تعيين كلمة مرور مستخدم: من لوحة Supabase → Authentication → Users، أو أوقف الحساب وأنشئ حساباً جديداً.",
      tr_views_today: "زيارات اليوم",
      tr_views_7: "زيارات آخر ٧ أيام",
      tr_users_7: "مستخدمون نشطون (٧ أيام)",
      tr_per_day: "الزيارات حسب اليوم (آخر ٣٠ يوماً)",
      tr_by_page: "حسب الصفحة (٧ أيام)",
      tr_by_user: "حسب المستخدم (٧ أيام)",
      tr_recent: "آخر النشاطات",
      tr_page: "الصفحة",
      tr_views: "الزيارات",
      tr_when: "الوقت",
      tr_empty: "لا توجد بيانات بعد",
      states: { draft: "عرض سعر", sent: "مُرسل", sale: "طلب مؤكد", done: "مكتمل", cancel: "ملغي" },
      trust: { good: "جيد", normal: "عادي", bad: "سيء" }
    },
    en: {
      brand: "Sales Command Center",
      sub: "Dabboos — Live",
      nav_overview: "Overview",
      nav_alerts: "Alert Center",
      nav_sales: "Salespeople (WoW)",
      nav_regions: "Cities & Governorates",
      nav_collections: "Daily Collections",
      nav_debt: "Customer Debt",
      lang_btn: "ع",
      live: "LIVE",
      updated: "Updated",
      loading: "Loading…",
      error_load: "Could not load data from Supabase. Check your connection or config.js.",
      kpi_quotes: "Quotations this month",
      conversion: "Conversion",
      kpi_avg: "Avg order value",
      kpi_value: "Value",
      orders: "orders",
      ov_sub: "High-level summary — use search to update all data",
      ov_confirmed: "Confirmed orders",
      ov_orders_day: "Confirmed orders per day",
      ov_top_govs: "Top governorates (value)",
      ov_customers: "Customers",
      ov_status_mix: "Order status mix",
      no_alerts: "No alerts right now ✅",
      // overview: today strip + action tables
      ov_today_sales: "Sales today (confirmed)",
      ov_pending_cash: "Cash in process (held by reps)",
      ov_cancelled: "Cancelled this month",
      ov_orders_month: "Confirmed orders this month",
      ov_top_debtors: "Top overdue customers — follow up today",
      ov_leaderboard: "Reps — sales vs collected (this month)",
      col_collected: "Collected",
      col_sales: "Sales",
      payments_count: "payments",
      // executive summary band (merged into the overview)
      exec_title: "Executive summary",
      ex_revenue: "Confirmed sales — this month",
      ex_target: "Target",
      ex_of_target: "of target",
      ex_pace: "On pace for",
      ex_cash: "Cash collected — this month",
      ex_dso: "DSO (days)",
      ex_overdue: "Outstanding overdue",
      ex_conc_sub: "Top 10 customers' share",
      ex_top_rep: "Top rep",
      ex_top_gov: "Top governorate",
      ex_var: "Value at risk",
      ex_var_sub: "critical alerts",
      ex_story: "The story in one line",
      ex_proj: "Projected month-end",
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
      sales_sub: "Confirmed sales per rep — weekly & monthly",
      last_week: "Last week",
      wow: "WoW",
      mom: "MoM",
      sp_week: "This week",
      sp_month: "This month",
      sp_reps: "Active reps",
      top_customers: "Top customers — last 30 days (confirmed)",
      new_risk: "New risk (this month)",
      uninvoiced: "Confirmed, not invoiced",
      no_data: "No data yet",
      orders_count: "Orders",
      regions_title: "Cities & Governorates",
      regions_sub: "Confirmed orders by governorate, then city",
      region_basis: "Basis: confirmed orders (sale/done), tax-inclusive value, by order creation date. This can differ from Odoo's Invoice Analysis, which is invoice-based and untaxed.",
      unmapped: "Unmapped cities",
      unmapped_note: "Orders whose city could not be matched to a governorate (city name not in the dictionary). Review the city names in Odoo or add them to the dictionary.",
      nocity: "No city recorded",
      nocity_note: "Orders with no city at all in Odoo — fill the customer's City field in Odoo so they count under their governorate.",
      govs_title: "Governorates",
      cities_title: "Cities",
      gov_all: "All governorates",
      cities_count: "Cities",
      region: "City",
      share: "Share",
      // daily collections page
      coll_title: "Salesperson collections — daily",
      coll_sub: "Money collected per salesperson, per day",
      coll_today: "Collected today",
      coll_pending: "Pending",
      coll_total: "Total",
      coll_grid: "Collection per rep — last 14 days",
      coll_grand_total: "Total collected",
      coll_14d: "Last 14 days collected",
      coll_period: "Selected period collected",
      coll_mtd: "Month-to-date",
      coll_last_month: "Last month",
      coll_mom: "MoM change",
      coll_sales_month: "Period sales",
      coll_vs_sales: "Collected ÷ sales",
      coll_rep_perf: "Rep collection performance",
      // customer debt by salesperson
      debt_title: "Outstanding customer debt",
      debt_customers_no: "Customers due",
      debt_total_all: "Total receivable",
      debt_due_all: "Total due",
      debt_due_pct: "Due ratio",
      debt_due_sub: "Overdue",
      debt_due_pct_sub: "Due ÷ total",
      col_debit: "Receivable",
      col_overdue: "Overdue",
      col_gov: "Governorate",
      debt_by_gov: "Overdue by governorate",
      debt_by_rep: "Overdue by salesperson",
      debt_concentration: "Debt concentration",
      debt_top10_sub: "Top 10 customers' share of total overdue",
      debt_page_sub: "Current outstanding customer balances — by salesperson",
      debt_table_title: "Debtor customers — detail",
      debt_note_live: "Debt is a live balance (as of now), so the date filter does not apply to it.",
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
      // acknowledgments
      mark_reviewed: "Mark reviewed ✓",
      add_note: "Add a note (optional)…",
      reviewed_ok: "Review recorded",
      ack_total: "Total alerts",
      ack_seen: "Reviewed",
      ack_ignored: "Not reviewed by anyone",
      ack_rate: "Review rate",
      ack_reviews: "Reviews",
      ack_notes: "Notes",
      ack_status: "Status",
      st_seen: "Reviewed",
      st_ignored: "Awaiting review",
      no_notes: "No notes",
      filter_ignored: "Not reviewed",
      filter_seen: "Reviewed",
      not_found: "Order not found",
      search_ph: "Search: order, customer, rep, city…",
      export_pdf: "Export PDF",
      sound_on: "Sound on", sound_off: "Sound off",
      // auth + admin panel
      nav_admin: "Admin Panel",
      logout: "Log out",
      login_title: "Sign in",
      login_sub: "Enter your username and password to continue",
      login_user: "Username",
      login_pass: "Password",
      login_btn: "Sign in",
      login_wait: "Signing in…",
      login_err: "Wrong username or password",
      login_inactive: "This account is not active — contact the administrator",
      login_noprofile: "No profile for this user — contact the administrator",
      admin_title: "Admin Panel",
      admin_sub: "Manage users, permissions and usage traffic",
      admin_users: "Users",
      admin_traffic: "Traffic",
      admin_create: "Add a new user",
      admin_create_btn: "Create user",
      admin_created: "User created and activated ✓",
      admin_saved: "Changes saved ✓",
      admin_save: "Save",
      admin_active: "Active",
      admin_suspended: "Suspended",
      admin_role: "Role",
      role_admin: "Admin",
      role_management: "Management",
      role_alerts: "Alerts only",
      admin_pages: "Allowed pages",
      admin_user_col: "User",
      admin_fullname: "Full name",
      admin_password: "Password (min 6 characters)",
      admin_username_ph: "username (english, no spaces)",
      admin_err: "Operation failed — try again",
      admin_user_exists: "Username already taken",
      admin_you: "This is your account",
      admin_pw_note: "To reset a user's password: Supabase dashboard → Authentication → Users, or suspend the account and create a new one.",
      tr_views_today: "Views today",
      tr_views_7: "Views last 7 days",
      tr_users_7: "Active users (7 days)",
      tr_per_day: "Views per day (last 30 days)",
      tr_by_page: "By page (7 days)",
      tr_by_user: "By user (7 days)",
      tr_recent: "Recent activity",
      tr_page: "Page",
      tr_views: "Views",
      tr_when: "When",
      tr_empty: "No data yet",
      states: { draft: "Quotation", sent: "Sent", sale: "Confirmed", done: "Done", cancel: "Cancelled" },
      trust: { good: "Good", normal: "Normal", bad: "Bad" }
    }
  };

  let LANG = localStorage.getItem("dash_lang") || CFG.DEFAULT_LANG || "ar";
  const t = (k) => I18N[LANG][k] !== undefined ? I18N[LANG][k] : k;
  const isAR = () => LANG === "ar";

  /* ---------------- security: HTML escaping ----------------
     Every value that originates in the database (customer/rep/city names,
     order names, alert notes, risk reasons) is user-controlled free text and
     MUST be escaped before it is placed into innerHTML. The alert "note" field
     in particular is written anonymously via ackAlert(), so an unescaped render
     is a stored-XSS hole. Use D.esc() around ANY DB string in a template. */
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, c =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

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

  /* ---------------- API (reads Supabase REST directly) ----------------
     Every request carries the logged-in user's JWT (auth.js) so Row-Level
     Security in Supabase decides what the caller may see. The anon key by
     itself reads nothing once supabase/auth-setup.sql has been applied. */
  async function authHeaders(extra) {
    const A = window.DASH_AUTH;
    if (A) { await A.ensureToken(); return A.headers(extra); }
    return Object.assign(
      { apikey: CFG.SUPABASE_ANON_KEY, Authorization: "Bearer " + CFG.SUPABASE_ANON_KEY },
      extra || {});
  }
  function authFail(res) {
    // 401 = the JWT is expired/revoked → back to the login page.
    if (res.status === 401 && window.DASH_AUTH) { window.DASH_AUTH.signOut(); return true; }
    return false;
  }

  async function sbGet(pathAndQuery) {
    const base = CFG.SUPABASE_URL.replace(/\/$/, "");
    const res = await fetch(base + "/rest/v1/" + pathAndQuery, { headers: await authHeaders() });
    if (!res.ok) { authFail(res); throw new Error("Supabase HTTP " + res.status); }
    return res.json();
  }

  // Generic authorized write (used by the admin panel: PATCH dash_users …).
  async function sbWrite(method, pathAndQuery, body) {
    const base = CFG.SUPABASE_URL.replace(/\/$/, "");
    const res = await fetch(base + "/rest/v1/" + pathAndQuery, {
      method: method,
      headers: await authHeaders({ "Content-Type": "application/json", Prefer: "return=representation" }),
      body: JSON.stringify(body)
    });
    if (!res.ok) { authFail(res); throw new Error("Supabase HTTP " + res.status); }
    return res.status === 204 ? null : res.json();
  }

  async function snapshot(key) {
    const rows = await sbGet(`${CFG.TABLES.snapshots}?select=data&key=eq.${key}`);
    if (!rows || !rows.length) throw new Error("snapshot missing: " + key);
    return rows[0].data;
  }

  async function api(endpointKey, params) {
    // Snapshot-backed endpoints (n8n writes these to dashboard_snapshots).
    if (endpointKey === "collections" || endpointKey === "rep_collections" || endpointKey === "rep_debt") {
      return snapshot(endpointKey);
    }

    if (endpointKey === "acks") {
      const rows = await sbGet(`alert_acks?select=order_id,order_name,level,amount_total,note,created_at&order=created_at.desc&limit=2000`);
      return { acks: rows || [] };
    }

    if (endpointKey === "alerts") {
      const since = new Date(Date.now() - 45 * 864e5).toISOString().slice(0, 10);
      const sel = "order_id,order_name,partner_name,salesperson,city,amount_total,state,level,reasons,date_order,create_date";
      const rows = await sbGet(
        `${CFG.TABLES.orders}?select=${sel}&level=in.(critical,warning)&create_date=gte.${since}` +
        `&order=date_order.desc,create_date.desc&limit=300`);
      const alerts = dedupeBy(rows || [], "order_id").map(r => ({ ...r, amount_total: Number(r.amount_total) || 0 }));
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

  /* ---------------- write: acknowledge an alert ---------------- */
  async function ackAlert(order, note) {
    const prof = window.DASH_AUTH ? window.DASH_AUTH.profile() : null;
    const row = {
      order_id: order.order_id != null ? order.order_id : order.id,
      order_name: order.order_name || order.name || "",
      level: order.level || (order.risk && order.risk.level) || "",
      amount_total: Number(order.amount_total) || 0,
      note: note || null,
      acked_by: prof ? prof.user_id : null,
      acked_by_name: prof ? (prof.full_name || prof.username) : null
    };
    const base = CFG.SUPABASE_URL.replace(/\/$/, "");
    const res = await fetch(base + "/rest/v1/alert_acks", {
      method: "POST",
      headers: await authHeaders({ "Content-Type": "application/json", Prefer: "return=minimal" }),
      body: JSON.stringify(row)
    });
    if (!res.ok) { authFail(res); throw new Error("ack failed HTTP " + res.status); }
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

  /* ---------------- chrome (header + nav) ----------------
     Pages are grouped by purpose; the nav draws a subtle divider between groups:
     main · sales (geography + people) · money (cash in + owed) · risk (alerts). */
  const PAGES = [
    { key: "nav_overview", href: "index.html", id: "overview", group: "main" },
    { key: "nav_regions", href: "regions.html", id: "regions", group: "sales" },
    { key: "nav_sales", href: "salespeople.html", id: "sales", group: "sales" },
    { key: "nav_collections", href: "collections.html", id: "collections", group: "money" },
    { key: "nav_debt", href: "debt.html", id: "debt", group: "money" },
    { key: "nav_alerts", href: "alerts.html", id: "alerts", group: "risk" },
    { key: "nav_admin", href: "admin.html", id: "admin", group: "admin" }
  ];

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
      // Only show the pages this user may open (auth.js). The nav is UX —
      // the real enforcement is auth.js's guard + Row-Level Security.
      const A = window.DASH_AUTH;
      const prof = A ? A.profile() : null;
      const visible = A ? PAGES.filter(p => A.canView(p.id)) : PAGES;
      header.innerHTML = `
        <div class="hd-brand">
          <div class="hd-logo">DB</div>
          <div>
            <div class="hd-title">${t("brand")}</div>
            <div class="hd-sub">${t("sub")}</div>
          </div>
        </div>
        <nav class="hd-nav">
          ${visible.map((p, i) => {
            const sep = (i > 0 && visible[i - 1].group !== p.group) ? `<span class="nav-sep"></span>` : "";
            return sep + `<a href="${p.href}" class="${p.id === activeId ? "active" : ""}">${t(p.key)}</a>`;
          }).join("")}
        </nav>
        <div class="hd-tools">
          <span class="live-dot"><i></i>${t("live")}</span>
          <button id="soundBtn" class="icon-btn" type="button"></button>
          <button id="pdfBtn" class="icon-btn" type="button" title="${t("export_pdf")}">🖨️</button>
          <button id="langBtn" class="icon-btn lang" type="button">${t("lang_btn")}</button>
          ${prof ? `<span class="user-chip" title="${esc(prof.username)}">👤 ${esc(prof.full_name || prof.username)}</span>
          <button id="logoutBtn" class="icon-btn" type="button" title="${t("logout")}">⏻</button>` : ""}
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
      const lo = document.getElementById("logoutBtn");
      if (lo) lo.addEventListener("click", () => window.DASH_AUTH.signOut());
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

  /* ---------------- governorate map (city -> Iraqi governorate) ----------------
     The Odoo `city` field is messy free-text mixing real governorates with
     districts/neighbourhoods. This dictionary buckets the known values into the
     18 governorates. Unrecognised cities fall back to "غير محدد / Unknown".
     To fix a misfiled city: add it to CITY2GOV with the right gov code. */
  const GOV = {
    baghdad:  { ar: "بغداد",       en: "Baghdad" },
    basra:    { ar: "البصرة",      en: "Basra" },
    nineveh:  { ar: "نينوى",       en: "Nineveh" },
    erbil:    { ar: "أربيل",       en: "Erbil" },
    kirkuk:   { ar: "كركوك",       en: "Kirkuk" },
    najaf:    { ar: "النجف",       en: "Najaf" },
    karbala:  { ar: "كربلاء",      en: "Karbala" },
    anbar:    { ar: "الأنبار",     en: "Anbar" },
    dhiqar:   { ar: "ذي قار",      en: "Dhi Qar" },
    babil:    { ar: "بابل",        en: "Babil" },
    diyala:   { ar: "ديالى",       en: "Diyala" },
    wasit:    { ar: "واسط",        en: "Wasit" },
    saladin:  { ar: "صلاح الدين",  en: "Saladin" },
    sulaymaniyah: { ar: "السليمانية", en: "Sulaymaniyah" },
    dohuk:    { ar: "دهوك",        en: "Dohuk" },
    muthanna: { ar: "المثنى",      en: "Muthanna" },
    qadisiyah:{ ar: "القادسية",    en: "Qadisiyah" },
    maysan:   { ar: "ميسان",       en: "Maysan" },
    // "nocity" = the order has NO city text at all (fix in Odoo, not here);
    // "unknown" = there IS a city text but the dictionary doesn't know it.
    nocity:   { ar: "بدون مدينة",  en: "No city" },
    unknown:  { ar: "غير محدد",    en: "Unknown" }
  };
  const CITY2GOV = {
    // Baghdad + its districts
    "بغداد": "baghdad", "الكرخ": "baghdad", "رصافة": "baghdad", "الرصافة": "baghdad",
    "المنصور": "baghdad", "الدوره": "baghdad", "الدورة": "baghdad", "الدوره حي دجلة": "baghdad",
    "ابو غريب": "baghdad", "كاظمية": "baghdad", "الكاظمية": "baghdad", "غزالية": "baghdad",
    "الغزالية": "baghdad", "شارع فلسطين": "baghdad", "رسالة": "baghdad", "الرسالة": "baghdad",
    "المدائن": "baghdad", "كرادة": "baghdad", "كراده": "baghdad", "طوبجي": "baghdad",
    "الجادرية": "baghdad", "حي الجامعه": "baghdad", "المأمون": "baghdad", "الخضراء": "baghdad",
    "الشرطة الخامسة": "baghdad", "الزعفرانية": "baghdad", "زعفرانيه": "baghdad", "الحسينية": "baghdad",
    // Nineveh (Mosul)
    "الموصل": "nineveh", "الحمدانية": "nineveh", "المشراق": "nineveh", "باب السراي": "nineveh",
    // Erbil
    "اربيل": "erbil", "أربيل": "erbil", "عينكاوة": "erbil", "شقلاوة": "erbil",
    // Kirkuk
    "كركوك": "kirkuk", "الحويجة": "kirkuk", "داقوق": "kirkuk", "الدبس": "kirkuk",
    // Najaf
    "النجف": "najaf", "المشخاب": "najaf", "الكوفة": "najaf",
    // Karbala
    "كربلاء": "karbala", "عين التمر": "karbala", "الهندية": "karbala",
    // Anbar
    "رمادي": "anbar", "الرمادي": "anbar", "هيت": "anbar", "فلوجة": "anbar", "الفلوجة": "anbar",
    "فلوجه": "anbar", "عامرية الفلوجة": "anbar", "الخالديه": "anbar", "خالدية": "anbar",
    "الخالدية": "anbar", "حديثة": "anbar", "راوه": "anbar", "الكرمة": "anbar", "البغدادي": "anbar",
    "حقلانية": "anbar", "عنه": "anbar", "القائم": "anbar", "الحبانية": "anbar", "المقام": "anbar",
    // Dhi Qar
    "الناصرية": "dhiqar", "الناصريه": "dhiqar", "الرفاعي": "dhiqar", "الشطرة": "dhiqar", "سوق الشيوخ": "dhiqar",
    // Babil
    "الحلة": "babil", "حلة": "babil", "المسيب": "babil", "مسيب": "babil", "الهاشمية": "babil",
    "المحاويل": "babil", "القاسم": "babil", "بابل": "babil",
    // Diyala
    "ديالى": "diyala", "بعقوبة": "diyala", "المقدادية": "diyala", "الخالص": "diyala", "بلدروز": "diyala",
    // Wasit
    "كوت": "wasit", "الكوت": "wasit", "الصويرة": "wasit", "صويرة": "wasit", "النعمانية": "wasit",
    "الحي": "wasit", "العزيزية": "wasit", "بدرة": "wasit",
    // Saladin
    "تكريت": "saladin", "سامراء": "saladin", "بلد": "saladin", "بيجي": "saladin", "العلم": "saladin",
    "الشرقاط": "saladin", "الدجيل": "saladin", "الضلوعية": "saladin", "بلد روز": "saladin",
    // Basra
    "البصرة": "basra", "الجبيلة": "basra", "الزبير": "basra", "ابو الخصيب": "basra", "القرنة": "basra", "المعقل": "basra",
    // Qadisiyah
    "الديوانية": "qadisiyah", "ديوانية": "qadisiyah", "عفك": "qadisiyah", "الشامية": "qadisiyah",
    // Muthanna
    "السماوة": "muthanna", "السماوه": "muthanna", "الرميثة": "muthanna", "الخضر": "muthanna",
    // Dohuk
    "دهوك": "dohuk", "زاخو": "dohuk", "زاويته": "dohuk",
    // Maysan
    "العمارة": "maysan", "ميسان": "maysan", "المجر": "maysan", "قلعة صالح": "maysan",
    // Sulaymaniyah
    "السليمانية": "sulaymaniyah", "السليمانيه": "sulaymaniyah",
    // ---- 2026-07 audit additions (high-confidence districts seen in live data) ----
    // Baghdad districts
    "اليوسفية": "baghdad", "الطارمية": "baghdad", "النهروان": "baghdad", "اليرموك": "baghdad",
    "الشعلة": "baghdad", "السيدية": "baghdad", "بسماية": "baghdad", "مدينة الصدر": "baghdad",
    "الوزيرية": "baghdad", "الحرية": "baghdad", "الشعب": "baghdad", "الصالحية": "baghdad",
    "العطيفية": "baghdad", "البياع": "baghdad", "الاعظمية": "baghdad", "الجهاد": "baghdad",
    // Anbar
    "عانة": "anbar", "الرطبة": "anbar",
    // Karbala (طويريج = local name of الهندية)
    "طويريج": "karbala",
    // Basra districts / towns
    "الهارثة": "basra", "القبلة": "basra", "ام قصر": "basra", "سفوان": "basra",
    "الفاو": "basra", "التنومة": "basra",
    // Nineveh districts / towns
    "القيارة": "nineveh", "بعشيقة": "nineveh", "برطلة": "nineveh", "تلعفر": "nineveh",
    "سنجار": "nineveh", "تلكيف": "nineveh",
    // Babil
    "الاسكندرية": "babil",
    // Dhi Qar
    "البطحة": "dhiqar",
    // Maysan
    "علي الغربي": "maysan",
    // ---- 2026-07-05 additions: every remaining unmapped string in live data,
    // assigned by cross-checking geography against the owning rep's territory
    // (each rep's OTHER orders are 68–100% one governorate) ----
    // Basra districts / variants
    "المدينة": "basra", "الطويسة": "basra", "الجمعيات": "basra", "الجزائر": "basra",
    "الحيانية": "basra", "الدير": "basra", "الخور": "basra", "الجنينة": "basra",
    "الجزيرة": "basra", "ابي الخصيب": "basra", "الامن الداخلي": "basra",
    // Nineveh (Mosul) districts
    "الفيصلية": "nineveh", "الساحل الأيسر": "nineveh", "المهندسين": "nineveh",
    "حي سومر": "nineveh", "الحود": "nineveh", "الزوية": "nineveh",
    // Baghdad ("الجاردية" = typo of الجادرية, "اعلام" = حي الإعلام)
    "الجاردية": "baghdad", "حي اور": "baghdad", "اعلام": "baghdad",
    // Babil
    "الحصوة": "babil", "ناحية الامام": "babil",
    // Karbala
    "المركزيه": "karbala",
    // Typos: كؤكوك = كركوك (Kirkuk) · ارييل = اربيل (Erbil)
    "كؤكوك": "kirkuk", "ارييل": "erbil",
    // Anbar (free-text landmark; rep territory is 100% Anbar)
    "قرب جامع الزبير ابن العوام": "anbar"
  };
  // Normalize a messy free-text Arabic city string so more values match:
  // strip diacritics/tatweel, unify alef/ya/hamza/ta-marbuta spellings, collapse
  // whitespace, then drop a leading "ال" and common location-type prefixes.
  function normCity(s) {
    let n = String(s == null ? "" : s)
      .replace(/[ً-ْـ]/g, "")                   // tashkeel + tatweel
      .replace(/[أإآٱ]/g, "ا")                   // alef variants -> ا
      .replace(/[ىیۍ]/g, "ي")                    // alef maqsura + Persian yeh -> ي
      .replace(/ک/g, "ك")                        // Persian kaf -> Arabic kaf
      .replace(/ؤ/g, "و").replace(/ئ/g, "ي")     // hamza carriers
      .replace(/ة/g, "ه")                        // ta marbuta -> ha
      .replace(/\s+/g, " ")
      .trim();
    // Strip location-type prefixes. Written in NORMALIZED form (ة already -> ه)
    // so the match still works after the character folding above.
    n = n.replace(/^(محافظه|قضاء|ناحيه|مدينه|مركز|منطقه|حي)\s+/, "");
    n = n.replace(/^ال/, "");
    return n.trim();
  }
  // Build a normalized lookup ONCE: known city spellings + the governorate
  // names themselves (so a city value that is actually a governorate maps too).
  const CITY2GOV_N = {};
  Object.keys(CITY2GOV).forEach(k => { const nk = normCity(k); if (nk) CITY2GOV_N[nk] = CITY2GOV[k]; });
  Object.keys(GOV).forEach(code => { if (code === "unknown" || code === "nocity") return; const nk = normCity(GOV[code].ar); if (nk && !CITY2GOV_N[nk]) CITY2GOV_N[nk] = code; });
  function govResult(code) { return { key: code, ar: GOV[code].ar, en: GOV[code].en }; }
  function govOf(city) {
    const raw = (city == null ? "" : String(city)).trim();
    if (!raw || raw === "—") return govResult("nocity");
    if (CITY2GOV[raw]) return govResult(CITY2GOV[raw]);        // exact original (fast path)
    const n = normCity(raw);
    if (n && CITY2GOV_N[n]) return govResult(CITY2GOV_N[n]);   // normalized match
    // token match: a known place name appearing inside a longer free-text value
    // (e.g. "بغداد - الكرخ"). Require length >= 3 to avoid accidental hits.
    if (n) {
      const padded = " " + n + " ";
      for (const key in CITY2GOV_N) {
        if (key.length < 3) continue;
        if (n === key || padded.includes(" " + key + " ")) return govResult(CITY2GOV_N[key]);
      }
    }
    return govResult("unknown");
  }
  function govLabel(code) { const g = GOV[code] || GOV.unknown; return isAR() ? g.ar : g.en; }

  /* ---------------- raw-table loaders (for date-aware, client-side aggregation) ----
     Read dashboard_orders / dashboard_payments directly (anon key + RLS) with an
     optional date window, paginating past PostgREST's 1000-row cap. Pages use these
     so a date filter genuinely recomputes every KPI/chart instead of relying on the
     fixed-window snapshots. */
  function nextDay(ymd) { const d = new Date(ymd + "T00:00:00Z"); d.setUTCDate(d.getUTCDate() + 1); return d.toISOString().slice(0, 10); }
  // Defensive de-duplication: if the n8n sync ever appends instead of upserting,
  // the same order/payment can appear more than once and inflate every count and
  // total. Rows arrive newest-first, so we keep the FIRST occurrence per id.
  // NOTE: this only masks duplicates in the UI — the real fix is an upsert on the
  // primary key in the n8n pipeline (see docs/KNOWN_ISSUES.md).
  function dedupeBy(rows, idField) {
    const seen = new Set(); const out = [];
    for (const r of rows) {
      const id = r ? r[idField] : null;
      if (id == null) { out.push(r); continue; }
      if (seen.has(id)) continue;
      seen.add(id); out.push(r);
    }
    return out;
  }
  async function sbGetAll(pathAndQuery) {
    const base = CFG.SUPABASE_URL.replace(/\/$/, "");
    const PAGE = 1000; let offset = 0; const out = [];
    for (;;) {
      const sep = pathAndQuery.includes("?") ? "&" : "?";
      const res = await fetch(base + "/rest/v1/" + pathAndQuery + `${sep}limit=${PAGE}&offset=${offset}`, {
        method: "GET", cache: "no-store",
        headers: await authHeaders()
      });
      if (!res.ok) { authFail(res); throw new Error("Supabase HTTP " + res.status); }
      const rows = await res.json();
      out.push(...rows);
      if (rows.length < PAGE) break;
      offset += PAGE;
      if (offset > 100000) break;
    }
    return out;
  }
  async function loadOrders(o) {
    o = o || {};
    const sel = o.select || "order_id,order_name,partner_name,salesperson,user_id,city,state,type_name,amount_total,level,invoice_count,date_order,create_date,customer";
    const f = o.dateField || "create_date";
    let q = `${CFG.TABLES.orders}?select=${sel}&order=${f}.desc`;
    if (o.from) q += `&${f}=gte.${o.from}`;
    if (o.to)   q += `&${f}=lt.${nextDay(o.to)}`;
    const rows = dedupeBy(await sbGetAll(q), "order_id");
    return rows.map(r => ({ ...r, amount_total: Number(r.amount_total) || 0 }));
  }
  async function loadPayments(o) {
    o = o || {};
    const sel = o.select || "payment_id,date,amount,state,salesperson,user_id,partner_name,partner_id,journal";
    // Canceled payments are not money — excluding them here keeps every page's
    // KPIs consistent with the rep_collections snapshot (which also skips them).
    let q = `dashboard_payments?select=${sel}&order=date.desc&state=neq.canceled`;
    if (o.from) q += `&date=gte.${o.from}`;
    if (o.to)   q += `&date=lt.${nextDay(o.to)}`;
    const rows = dedupeBy(await sbGetAll(q), "payment_id");
    return rows.map(r => ({ ...r, amount: Number(r.amount) || 0 }));
  }

  /* ---------------- PWA: service worker ----------------
     Registered from the shared library so every page (including login)
     keeps the app installable. Requires HTTPS (or localhost). */
  if ("serviceWorker" in navigator &&
      (location.protocol === "https:" || ["localhost", "127.0.0.1"].includes(location.hostname))) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("service-worker.js").catch(() => { /* non-fatal */ });
    });
  }

  /* ---------------- expose ---------------- */
  window.DASH = {
    t, isAR, lang: () => LANG, esc,
    fmtNum, fmtMoney, fmtMoneyFull, fmtDate, fmtTime,
    api, ackAlert, beep, toast, notify, buildChrome, setUpdated, renderSoundBtn,
    stateLabel, trustLabel, filterBar,
    govOf, govLabel, GOV, loadOrders, loadPayments, sbGetAll, sbWrite, nextDay,
    cfg: CFG
  };
})();

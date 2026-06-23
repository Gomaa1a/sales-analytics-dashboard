/* ============================================================
   Dabboos Sales Command Center — configuration
   The dashboard reads data DIRECTLY from Supabase (cloud),
   which n8n keeps fresh. n8n itself can stay on localhost.
   ============================================================ */
window.DASH_CONFIG = {
  // Your Supabase project URL (no trailing slash).
  SUPABASE_URL: "https://puqfldltipedlodwfyex.supabase.co",

  // Supabase ANON (public) key — SAFE to expose in the browser because the
  // tables are read-only via Row-Level Security (see supabase/schema.sql).
  // Get it from: Supabase → Project Settings → API → Project API keys → "anon public".
  // ⚠️ NEVER put the service_role key here — that one stays inside n8n only.
  SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1cWZsZGx0aXBlZGxvZHdmeWV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA5NDExODUsImV4cCI6MjA5NjUxNzE4NX0.4vUPTMBBDkHMQTfAr8R0hU7vwKxc969ORVhiO_VhVCc",

  // Table / snapshot names (must match supabase/schema.sql).
  TABLES: {
    orders: "dashboard_orders",
    snapshots: "dashboard_snapshots"
  },

  // Live refresh interval in milliseconds (default 60s).
  POLL_MS: 60000,

  // Currency label shown next to amounts.
  CURRENCY: "IQD",
  CURRENCY_AR: "د.ع",

  // Default UI language: "ar" or "en".
  DEFAULT_LANG: "ar",

  // Play a sound + toast when a NEW critical alert appears.
  SOUND_ENABLED: true,

  // Treat "warning" alerts as sound-worthy too (false = critical only).
  SOUND_ON_WARNING: false
};

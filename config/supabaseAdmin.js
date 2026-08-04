let supabaseAdmin = null;

try {
  const { createClient } = require("@supabase/supabase-js");

  if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    supabaseAdmin = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );
  }
} catch (error) {
  console.warn("Supabase client unavailable; running in local fallback mode.", error.message);
}

module.exports = supabaseAdmin;
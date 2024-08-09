const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL, // URL Supabase
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY // Kunci Anonim (Anonymous Key)
);

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL, // URL Supabase
  process.env.SUPABASE_SERVICE_ROLE_KEY // Kunci Layanan (Service Role Key), tanpa NEXT_PUBLIC_
);

module.exports = { supabase, supabaseAdmin };

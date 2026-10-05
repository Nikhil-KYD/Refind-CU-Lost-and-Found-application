const SUPABASE_URL = "https://rksfpuohbfczxxziivcz.supabase.co";

const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_mONvCser-FuDa2W5U75_5A_rsfpaMfU";

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);

console.log("Supabase connected:", supabaseClient);
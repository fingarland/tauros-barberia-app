import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL =
  "https://hcijplmrvpwcmqrtfurv.supabase.co";

const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhjaWpwbG1ydnB3Y21xcnRmdXJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkyMTQ2NjUsImV4cCI6MjA5NDc5MDY2NX0.rGeqe885TJeolrh7Yb83EFhOSwF0evs_mJexFZkLPqY";

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

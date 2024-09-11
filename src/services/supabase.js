import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://eocxikbigkevsvybwwii.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVvY3hpa2JpZ2tldnN2eWJ3d2lpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUzNzAyNDgsImV4cCI6MjA0MDk0NjI0OH0.l9FnbIt6QpE7IrXPNfkFl2u5olSeR11dNKQxGg_MMq4";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

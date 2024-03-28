import { SupabaseClient } from "@supabase/supabase-js";
import { Database as DB } from "../lib/supabase";
declare global {
  type TODO = any;
  type Database = DB;
  type Data = DB["public"]["Tables"]["data"]["Row"];
  type Load = DB["public"]["Tables"]["loads"]["Row"];
  type Submission = DB["public"]["Tables"]["submissions"]["Row"];
}

import { SupabaseClient } from "@supabase/supabase-js";

export async function getLoads(
  supabase: SupabaseClient,
  method: string,
  render: string,
  complexity: string,
) {
  const { data, error } = await supabase
    .from("loads")
    .select("*")
    .eq("method", method)
    .eq("render", render)
    .eq("complexity", complexity);
  if (error) throw error;
  return data;
}

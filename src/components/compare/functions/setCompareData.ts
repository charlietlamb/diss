import { SupabaseClient } from "@supabase/supabase-js";
import { Dispatch, SetStateAction } from "react";

export async function setCompareData(
  supabase: SupabaseClient,
  value: string,
  setData: Dispatch<SetStateAction<Load[]>>,
  cached: boolean | null,
) {
  const [method, render, complexity] = value.split("/");
  let query = supabase
    .from("loads")
    .select("*")
    .eq("method", method)
    .eq("render", render)
    .eq("complexity", complexity);
  if (cached !== null) query = query.eq("cached", cached);
  const { data, error } = await query;
  if (error) throw error;
  setData(data);
}

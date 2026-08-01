import { SiteContent } from "./content-types";
import { DEFAULT_CONTENT } from "./default-content";
import { getSupabaseAdmin } from "./supabase";

const TABLE = "site_content";
const ROW_ID = 1;

export async function getContent(): Promise<SiteContent> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return DEFAULT_CONTENT;

  const { data, error } = await supabase
    .from(TABLE)
    .select("data")
    .eq("id", ROW_ID)
    .maybeSingle();

  if (error || !data) return DEFAULT_CONTENT;
  return data.data as SiteContent;
}

export async function saveContent(content: SiteContent): Promise<void> {
  const supabase = getSupabaseAdmin();
  if (!supabase) throw new Error("Supabase n'est pas configuré (variables d'environnement manquantes).");

  const { error } = await supabase
    .from(TABLE)
    .upsert({ id: ROW_ID, data: content, updated_at: new Date().toISOString() });

  if (error) throw new Error(error.message);
}

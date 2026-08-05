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
  const stored = data.data as SiteContent;

  // Backfill fields added after this row was last saved from /admin, so a
  // schema change never crashes the live site before the row is updated.
  return {
    fr: { ...DEFAULT_CONTENT.fr, ...stored.fr, hero: { ...DEFAULT_CONTENT.fr.hero, ...stored.fr.hero } },
    en: { ...DEFAULT_CONTENT.en, ...stored.en, hero: { ...DEFAULT_CONTENT.en.hero, ...stored.en.hero } },
  };
}

export async function saveContent(content: SiteContent): Promise<void> {
  const supabase = getSupabaseAdmin();
  if (!supabase) throw new Error("Supabase n'est pas configuré (variables d'environnement manquantes).");

  const { error } = await supabase
    .from(TABLE)
    .upsert({ id: ROW_ID, data: content, updated_at: new Date().toISOString() });

  if (error) throw new Error(error.message);
}

import { createClient } from '@supabase/supabase-js';

// Public read path over public league data (intel_public_leagues RPC). The key is
// the project's publishable/anon key - safe to ship, same one that's in every Megs
// app build. Used at BUILD time to generate the static league pages.
const SUPABASE_URL = 'https://yubehpykiemlaiezomlr.supabase.co';
const SUPABASE_KEY = 'sb_publishable_O73QCPGgMS6VupIR2gHa2g_flWfmVr-';

export interface Team {
  name: string;
  external_id: string;
  position: number;
  p: number; w: number; d: number; l: number; f: number; a: number; gd: number; pts: number;
  claimed: boolean;
}
export interface League {
  provider: string;
  slug: string;
  name: string;
  venue: string;
  division: string;
  teams: Team[];
}

// 'scunthorpe-thursday' -> { town: 'scunthorpe', day: 'thursday' }
export function townDay(slug: string): { town: string; day: string } {
  const parts = slug.split('-');
  return { day: parts[parts.length - 1], town: parts.slice(0, -1).join('-') || parts[0] };
}
export const providerSlug = (p: string) => p.replace(/_/g, '-');
export const titleCase = (s: string) => s.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
export const slugifyName = (s: string) =>
  s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

// Canonical paths - shared by the league page and every team page so internal
// links (league <-> teams <-> opponents) stay consistent.
export function leaguePath(l: League): string {
  const { town, day } = townDay(l.slug);
  return `/leagues/${providerSlug(l.provider)}/${town}/${day}`;
}
export function teamPath(l: League, teamName: string): string {
  return `${leaguePath(l)}/${slugifyName(teamName)}`;
}

export async function getLeagues(): Promise<League[]> {
  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
    const { data, error } = await supabase.rpc('intel_public_leagues');
    if (error) { console.error('[leagues] rpc error:', error.message); return []; }
    return (data as League[]) ?? [];
  } catch (e) {
    console.error('[leagues] fetch failed:', e);
    return [];
  }
}

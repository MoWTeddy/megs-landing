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
export interface Fixture {
  home: string; // external_id
  away: string; // external_id
  hs: number;
  as: number;
  date: string; // YYYY-MM-DD
}
export interface League {
  provider: string;
  slug: string;
  name: string;
  venue: string;
  division: string;
  teams: Team[];
  fixtures: Fixture[];
}

export interface Result {
  date: string;
  opponent: string;
  opponentId: string;
  gf: number;
  ga: number;
  home: boolean;
  res: 'W' | 'D' | 'L';
}

// Every played fixture for one team, oldest first, resolved to opponent + outcome.
export function teamResults(l: League, externalId: string): Result[] {
  const nameOf = (id: string) => l.teams.find((t) => t.external_id === id)?.name ?? 'Opponent';
  return (l.fixtures ?? [])
    .filter((f) => f.home === externalId || f.away === externalId)
    .map((f) => {
      const home = f.home === externalId;
      const gf = home ? f.hs : f.as;
      const ga = home ? f.as : f.hs;
      const opponentId = home ? f.away : f.home;
      const res: Result['res'] = gf > ga ? 'W' : gf < ga ? 'L' : 'D';
      return { date: f.date, opponent: nameOf(opponentId), opponentId, gf, ga, home, res };
    })
    .sort((a, b) => a.date.localeCompare(b.date));
}

// Head-to-head record between two teams from their shared played fixtures.
export interface H2H {
  opponent: string;
  opponentId: string;
  played: number;
  w: number; d: number; l: number;
  gf: number; ga: number;
  last: Result | null;
}
export function headToHead(l: League, teamId: string, oppId: string): H2H {
  const meetings = teamResults(l, teamId).filter((r) => r.opponentId === oppId);
  const agg = meetings.reduce(
    (acc, r) => {
      acc.played++;
      acc.gf += r.gf; acc.ga += r.ga;
      acc[r.res === 'W' ? 'w' : r.res === 'D' ? 'd' : 'l']++;
      return acc;
    },
    { w: 0, d: 0, l: 0, gf: 0, ga: 0, played: 0 },
  );
  return {
    opponent: l.teams.find((t) => t.external_id === oppId)?.name ?? 'Opponent',
    opponentId: oppId,
    ...agg,
    last: meetings.length ? meetings[meetings.length - 1] : null,
  };
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

// Deep link into the app's claim flow, carrying the discovered team.
export function claimUrl(l: League, teamName?: string, externalId?: string): string {
  const p = new URLSearchParams({ provider: l.provider, league: l.name });
  if (l.venue) p.set('venue', l.venue);
  if (teamName) p.set('name', teamName);
  if (externalId) p.set('team', externalId);
  return `https://app.megs.club/claim?${p.toString()}`;
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

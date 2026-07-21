// Everything we can honestly derive from a team's played fixtures - no invented
// metrics, just what the results actually tell us. Pure functions, run at build
// time by the team pages. As seasons fill out (and richer leagues import) these
// deepen automatically.
import type { League, Team, Result } from './leagues';
import { teamResults } from './leagues';

export type Res = 'W' | 'D' | 'L';
const r1 = (n: number) => Math.round(n * 10) / 10;

export interface Split { p: number; w: number; d: number; l: number; gf: number; ga: number; }
const emptySplit = (): Split => ({ p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0 });
function addToSplit(s: Split, r: Result) {
  s.p++; s.gf += r.gf; s.ga += r.ga;
  s[r.res === 'W' ? 'w' : r.res === 'D' ? 'd' : 'l']++;
}

function longestRun(form: Res[], pred: (x: Res) => boolean): number {
  let max = 0, cur = 0;
  for (const x of form) { if (pred(x)) { cur++; max = Math.max(max, cur); } else cur = 0; }
  return max;
}
function currentStreak(form: Res[]): { type: Res; n: number } | null {
  if (!form.length) return null;
  const type = form[form.length - 1];
  let n = 0;
  for (let i = form.length - 1; i >= 0 && form[i] === type; i--) n++;
  return { type, n };
}

export interface SeasonProfile {
  hasGames: boolean;
  p: number; w: number; d: number; l: number; pts: number; ppg: number;
  gf: number; ga: number; gd: number;
  scoredAvg: number; concededAvg: number; totalAvg: number;
  winPct: number;
  form: Res[];                       // last 6, oldest -> newest
  current: { type: Res; n: number } | null;
  longestWin: number; longestUnbeaten: number; longestWinless: number;
  home: Split; away: Split;
  cleanSheets: number; cleanSheetPct: number;
  failedToScore: number;
  scoredEvery: boolean;
  btts: number; bttsPct: number;
  biggestWin: Result | null;
  biggestDefeat: Result | null;
  highestScoring: Result | null;
  avgGoalsScoredPer: number;
}

export function seasonProfile(league: League, externalId: string): SeasonProfile {
  const results = teamResults(league, externalId);
  const p = results.length;
  const home = emptySplit(), away = emptySplit();
  let w = 0, d = 0, l = 0, gf = 0, ga = 0, cleanSheets = 0, failedToScore = 0, btts = 0;
  for (const r of results) {
    addToSplit(r.home ? home : away, r);
    if (r.res === 'W') w++; else if (r.res === 'D') d++; else l++;
    gf += r.gf; ga += r.ga;
    if (r.ga === 0) cleanSheets++;
    if (r.gf === 0) failedToScore++;
    if (r.gf > 0 && r.ga > 0) btts++;
  }
  const wins = results.filter((r) => r.res === 'W');
  const losses = results.filter((r) => r.res === 'L');
  const byMargin = (arr: Result[], f: (r: Result) => number) =>
    arr.length ? arr.slice().sort((a, b) => f(b) - f(a) || b.gf - a.gf)[0] : null;
  const form = results.map((r) => r.res);
  const pts = w * 3 + d;

  return {
    hasGames: p > 0,
    p, w, d, l, pts, ppg: p ? r1(pts / p) : 0,
    gf, ga, gd: gf - ga,
    scoredAvg: p ? r1(gf / p) : 0, concededAvg: p ? r1(ga / p) : 0, totalAvg: p ? r1((gf + ga) / p) : 0,
    winPct: p ? Math.round((w / p) * 100) : 0,
    form: form.slice(-6),
    current: currentStreak(form),
    longestWin: longestRun(form, (x) => x === 'W'),
    longestUnbeaten: longestRun(form, (x) => x !== 'L'),
    longestWinless: longestRun(form, (x) => x !== 'W'),
    home, away,
    cleanSheets, cleanSheetPct: p ? Math.round((cleanSheets / p) * 100) : 0,
    failedToScore,
    scoredEvery: p > 0 && failedToScore === 0,
    btts, bttsPct: p ? Math.round((btts / p) * 100) : 0,
    biggestWin: byMargin(wins, (r) => r.gf - r.ga),
    biggestDefeat: byMargin(losses, (r) => r.ga - r.gf),
    highestScoring: byMargin(results, (r) => r.gf + r.ga),
    avgGoalsScoredPer: p ? r1(gf / p) : 0,
  };
}

// Where this team ranks in its own league on the metrics we can compute from the
// standings (authoritative, already aggregated by the provider).
export interface LeagueRanks {
  teams: number;
  attackRank: number; bestAttack: boolean;
  defenceRank: number; bestDefence: boolean;
  ppgRank: number;
}
function rankOf(values: number[], mine: number, dir: 'desc' | 'asc'): number {
  const sorted = values.slice().sort((a, b) => (dir === 'desc' ? b - a : a - b));
  return sorted.indexOf(mine) + 1;
}
export function leagueRanks(league: League, team: Team): LeagueRanks {
  const ts = league.teams;
  const ppg = (t: Team) => (t.p ? t.pts / t.p : 0);
  const attackRank = rankOf(ts.map((t) => t.f), team.f, 'desc');
  const defenceRank = rankOf(ts.map((t) => t.a), team.a, 'asc');
  return {
    teams: ts.length,
    attackRank, bestAttack: attackRank === 1,
    defenceRank, bestDefence: defenceRank === 1,
    ppgRank: rankOf(ts.map(ppg), ppg(team), 'desc'),
  };
}

// Per-opponent head-to-head, most-played first.
export interface OpponentH2H {
  opponent: string; opponentId: string;
  p: number; w: number; d: number; l: number; gf: number; ga: number;
  last: Result | null;
  edge: 'ahead' | 'level' | 'behind';
}
export function headToHeadAll(league: League, externalId: string): OpponentH2H[] {
  const results = teamResults(league, externalId);
  const byOpp = new Map<string, Result[]>();
  for (const r of results) {
    if (!byOpp.has(r.opponentId)) byOpp.set(r.opponentId, []);
    byOpp.get(r.opponentId)!.push(r);
  }
  const out: OpponentH2H[] = [];
  for (const [opponentId, rs] of byOpp) {
    let w = 0, d = 0, l = 0, gf = 0, ga = 0;
    for (const r of rs) { gf += r.gf; ga += r.ga; if (r.res === 'W') w++; else if (r.res === 'D') d++; else l++; }
    out.push({
      opponent: rs[0].opponent, opponentId,
      p: rs.length, w, d, l, gf, ga,
      last: rs[rs.length - 1],
      edge: w > l ? 'ahead' : w < l ? 'behind' : 'level',
    });
  }
  return out.sort((a, b) => b.p - a.p || b.w - a.w);
}

export const ordinal = (n: number) => {
  const s = ['th', 'st', 'nd', 'rd'], v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};

#!/usr/bin/env node
/* =========================================================================
   ingest-persona-details.mjs — transforms the aqiu384/megaten-fusion-tool
   Royal dataset (roy-demon-data.json, Unlicense/public domain) into the
   approved Phase 1 schema and regenerates src/data/personaDetailData.js.

   ⚠ USE IS GATED: the designated stat authority is the JP allchart
   (wikiwiki.jp/persona5r/allchart), which blocks automated access. Running
   this ingest requires the owner-approved source amendment recorded in
   PROJECT_HANDOFF.md (Batch F). The allchart remains the arbiter — every
   batch ships with a spot-check list for manual verification against it.

   Usage:
     node scripts/ingest-persona-details.mjs <path-to-roy-demon-data.json> \
          [--arcana Fool,Magician] [--all] [--dry]

     --arcana  comma-separated arcana filter (batch mode)
     --all     ingest every registry persona
     --dry     print the transformed entries, write nothing

   Transform rules (validated 2026-07-04):
     • name mapping: exact → accent-normalized → ALIASES table; anything
       unmapped is a hard error (never guess)
     • resists string, position i = AFFINITY_ORDER[i] (verified against the
       tool's comp-config resistElems); letters w/s/n/r/d/- → wk/rs/nu/rp/dr/-
     • skills: source value 0.x = innate → lvl becomes the persona's base
       level; integer values pass through; sorted by source value so innates
       keep their 0.1/0.2 order ahead of leveled skills
     • stats [St,Ma,En,Ag,Lu] → { st, ma, en, ag, lu }; trait passthrough
     • merge-by-regeneration: existing PERSONA_DETAILS are kept, the batch is
       merged over them, and the whole module is rewritten in registry order
       for stable, reviewable diffs
   ========================================================================= */
import { readFileSync, writeFileSync } from 'fs';
import { PERSONA_DATA } from '../src/data/personaData.js';
import { PERSONA_DETAILS, AFFINITY_ORDER } from '../src/data/personaDetailData.js';

// App registry name → dataset name, for divergences beyond accents.
// "Mitra" (registry spelling; also the p_Mitra check key) ↔ dataset "Mithra"
// (P5R's official English spelling). Flagged to owner 2026-07-04; the
// registry name is never altered (hard rule + saved-tick keys).
const ALIASES = { 'Mitra': 'Mithra' };

const TOKEN = { w: 'wk', s: 'rs', n: 'nu', r: 'rp', d: 'dr', '-': '-' };
const norm = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

// ---- args ----
const args = process.argv.slice(2);
const dataPath = args.find(a => !a.startsWith('--'));
const dry = args.includes('--dry');
const all = args.includes('--all');
const arcanaArg = args.find(a => a.startsWith('--arcana'));
const arcanaFilter = arcanaArg
  ? new Set((arcanaArg.split('=')[1] ?? args[args.indexOf(arcanaArg) + 1]).split(',').map(s => s.trim()))
  : null;
if (!dataPath || (!all && !arcanaFilter)) {
  console.error('usage: ingest-persona-details.mjs <roy-demon-data.json> --arcana A,B | --all [--dry]');
  process.exit(2);
}

const ds = JSON.parse(readFileSync(dataPath, 'utf8'));
const dsNorm = new Map(Object.keys(ds).map(n => [norm(n), n]));

const resolveSource = (regName) => {
  if (ds[regName]) return ds[regName];
  if (ALIASES[regName] && ds[ALIASES[regName]]) return ds[ALIASES[regName]];
  const byNorm = dsNorm.get(norm(regName));
  if (byNorm) return ds[byNorm];
  return null;
};

const transform = (reg, src) => {
  // cross-guards: never ingest a mismatched persona
  if (src.race !== reg.arcana) throw new Error(`${reg.name}: arcana mismatch (${src.race} vs ${reg.arcana})`);
  if (src.lvl !== reg.level) throw new Error(`${reg.name}: level mismatch (${src.lvl} vs ${reg.level})`);
  if (src.resists.length !== 10) throw new Error(`${reg.name}: resists length ${src.resists.length}`);

  const [st, ma, en, ag, lu] = src.stats;
  const affinities = {};
  AFFINITY_ORDER.forEach((k, i) => {
    const t = TOKEN[src.resists[i]];
    if (!t) throw new Error(`${reg.name}: unknown resist letter "${src.resists[i]}"`);
    affinities[k] = t;
  });
  // Innate detection: the source encodes innates as an ordering counter
  // 0.1, 0.2, … which OVERFLOWS PAST 1 when a persona has ten or more
  // innates (treasure demons: … 0.9, 1.0, 1.1). JSON `1.0` parses to the
  // JS integer 1, so "integer ⇒ leveled" misreads innates #10+. A genuine
  // learn level of 1 is impossible (learning starts at base+1; min base is
  // 1) and the dataset's smallest leveled value is 2 (swept 2026-07-04),
  // so: innate ⟺ fractional OR value < 2. Sorting by the raw value keeps
  // the innate counter order ahead of leveled skills.
  const isInnate = (v) => !(Number.isInteger(v) && v >= 2);
  const skills = Object.entries(src.skills)
    .sort((a, b) => a[1] - b[1])
    .map(([name, v]) => ({ name, lvl: isInnate(v) ? reg.level : v }));
  return { stats: { st, ma, en, ag, lu }, affinities, skills, trait: src.trait };
};

// ---- run ----
const batch = PERSONA_DATA.registry.filter(p => all || arcanaFilter.has(p.arcana));
const merged = { ...PERSONA_DETAILS };
const report = [];
for (const reg of batch) {
  const src = resolveSource(reg.name);
  if (!src) { console.error(`✗ no dataset entry for "${reg.name}" — add an alias or stop`); process.exit(1); }
  merged[reg.name] = transform(reg, src);
  report.push(reg.name);
}

if (dry) {
  for (const n of report) console.log(`— ${n}\n${JSON.stringify(merged[n], null, 1)}`);
  console.log(`\n(dry) would write ${report.length} entr${report.length === 1 ? 'y' : 'ies'}, total ${Object.keys(merged).length}`);
  process.exit(0);
}

// regenerate the module in registry order for stable diffs
const ordered = PERSONA_DATA.registry.filter(p => merged[p.name]);
const scaffold = readFileSync(new URL('../src/data/personaDetailData.js', import.meta.url), 'utf8');
const head = scaffold.slice(0, scaffold.indexOf('export const PERSONA_DETAILS'));
const body = ordered
  .map(p => `  ${JSON.stringify(p.name)}: ${JSON.stringify(merged[p.name])},`)
  .join('\n');
writeFileSync(new URL('../src/data/personaDetailData.js', import.meta.url),
  `${head}export const PERSONA_DETAILS = {\n${body}\n};\n`);
console.log(`✓ wrote ${report.length} entr${report.length === 1 ? 'y' : 'ies'} (${Object.keys(merged).length} total). Run npm run check:details.`);

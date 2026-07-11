#!/usr/bin/env node
/* =========================================================================
   check-persona-details.mjs — integrity gate for the compendium data track.
   Run via `npm run check:details` (also wired into CI after check:version).

   Validates src/data/personaDetailData.js against src/data/personaData.js:
     • every detail key is an EXACT registry name (accents included)
     • stats: exactly { st, ma, en, ag, lu }, integers 1–99
     • affinities: exactly the 10 AFFINITY_ORDER keys, tokens in
       { wk, rs, nu, rp, dr, - }
     • skills: non-empty; unique names; integer lvl ≥ the persona's base
       level; at least one innate (lvl === base); sorted by lvl
     • trait: non-empty string
   Exits 1 on any error; prints coverage progress either way.
   ========================================================================= */
import { PERSONA_DATA } from '../src/data/personaData.js';
import { PERSONA_DETAILS, AFFINITY_ORDER, AFFINITY_TOKENS } from '../src/data/personaDetailData.js';

const registry = new Map(PERSONA_DATA.registry.map(p => [p.name, p]));
const validTokens = new Set(Object.keys(AFFINITY_TOKENS));
const affinityKeys = new Set(AFFINITY_ORDER);
const errors = [];
const err = (name, msg) => errors.push(`  ✗ ${name}: ${msg}`);

for (const [name, d] of Object.entries(PERSONA_DETAILS)) {
  const reg = registry.get(name);
  if (!reg) { err(name, 'not an exact registry name (check accents/aliases)'); continue; }

  // stats
  const statKeys = ['st', 'ma', 'en', 'ag', 'lu'];
  if (!d.stats || Object.keys(d.stats).length !== 5 || !statKeys.every(k => k in d.stats)) {
    err(name, `stats must be exactly { ${statKeys.join(', ')} }`);
  } else {
    for (const k of statKeys) {
      const v = d.stats[k];
      if (!Number.isInteger(v) || v < 1 || v > 99) err(name, `stats.${k} out of range: ${v}`);
    }
  }

  // affinities
  const aff = d.affinities ?? {};
  const affKeys = Object.keys(aff);
  if (affKeys.length !== 10 || !affKeys.every(k => affinityKeys.has(k))) {
    err(name, `affinities must have exactly the 10 keys: ${AFFINITY_ORDER.join(' ')}`);
  } else {
    for (const [k, v] of Object.entries(aff)) {
      if (!validTokens.has(v)) err(name, `affinities.${k} invalid token: "${v}"`);
    }
  }

  // skills
  if (!Array.isArray(d.skills) || d.skills.length === 0) {
    err(name, 'skills must be a non-empty array');
  } else {
    const seen = new Set();
    let prev = 0;
    let hasInnate = false;
    for (const s of d.skills) {
      if (!s || typeof s.name !== 'string' || !s.name.trim()) { err(name, 'skill with empty name'); continue; }
      if (seen.has(s.name)) err(name, `duplicate skill "${s.name}"`);
      seen.add(s.name);
      if (!Number.isInteger(s.lvl)) err(name, `skill "${s.name}" lvl not an integer: ${s.lvl}`);
      else {
        if (s.lvl < reg.level) err(name, `skill "${s.name}" lvl ${s.lvl} below base level ${reg.level} — mapping error?`);
        if (s.lvl === reg.level) hasInnate = true;
        if (s.lvl < prev) err(name, `skills not sorted by lvl at "${s.name}"`);
        prev = s.lvl;
      }
    }
    if (!hasInnate) err(name, `no innate skill (none at base level ${reg.level}) — mapping error?`);
  }

  // trait
  if (typeof d.trait !== 'string' || !d.trait.trim()) err(name, 'trait missing or empty');

  // Phase 2 fields must not appear yet
  if ('itemization' in d) err(name, 'itemization is Phase 2 — not yet approved for entry');
}

const total = registry.size;
const covered = Object.keys(PERSONA_DETAILS).filter(n => registry.has(n)).length;
console.log(`Compendium details: ${covered}/${total} personas (${Math.round((covered / total) * 100)}%)`);

if (errors.length) {
  console.error(`✗ ${errors.length} integrity error(s):`);
  console.error(errors.slice(0, 40).join('\n'));
  if (errors.length > 40) console.error(`  … and ${errors.length - 40} more`);
  process.exit(1);
}
console.log('✓ Persona detail integrity OK.');

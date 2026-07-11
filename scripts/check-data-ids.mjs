#!/usr/bin/env node
/* =========================================================================
   check-data-ids.mjs — guards every stable check-state key source.

   Born from the 2026-07-11 incident: the live deploy ran a newer
   CommandSuite (keys on `d:<id>` / `t:<id>`) against pre-v3.5.2 data files
   that had no `id` fields, so every award computed the key `t:undefined`
   and checking one checked all of them. CI never saw it because nothing
   asserted the ids exist. Now something does:

     • DEADLINES         — every entry has a unique non-empty string `id`
     • THIEVES_DEN       — every award in every category, same rule
     • registry          — persona `name`s unique (they are the p_ keys)
     • treasureDemons    — demon `name`s unique (they are the td_ keys)

   Exit 1 on any violation. Wired into `npm run check:ids` and deploy.yml.
   ========================================================================= */
import { DEADLINES } from '../src/data/deadlineData.js';
import { THIEVES_DEN } from '../src/data/thievesDenData.js';
import { PERSONA_DATA } from '../src/data/personaData.js';

const errors = [];

function assertUnique(list, label) {
  const seen = new Map();
  list.forEach((v, i) => {
    if (typeof v !== 'string' || v.trim() === '') {
      errors.push(`${label}[${i}] is missing/empty (got ${JSON.stringify(v)})`);
      return;
    }
    if (seen.has(v)) errors.push(`${label} duplicate "${v}" (indexes ${seen.get(v)} and ${i})`);
    else seen.set(v, i);
  });
  return list.length;
}

const nDeadlines = assertUnique(DEADLINES.map((d) => d.id), 'deadline id');
const awards = THIEVES_DEN.flatMap((cat) => cat.awards.map((a) => a.id));
const nAwards = assertUnique(awards, 'award id');
const nPersonas = assertUnique(PERSONA_DATA.registry.map((p) => p.name), 'registry name');
const nDemons = assertUnique(PERSONA_DATA.treasureDemons.map((d) => d.name), 'treasure demon name');

console.log(`Check-state key sources: ${nDeadlines} deadlines · ${nAwards} awards · ${nPersonas} personas · ${nDemons} demons`);

if (errors.length) {
  console.error('\n✗ Stable-id integrity FAILED:');
  errors.forEach((e) => console.error('  - ' + e));
  process.exit(1);
}
console.log('✓ All check-state ids/names present and unique.');

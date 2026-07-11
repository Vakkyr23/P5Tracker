# Vendored dataset — provenance

**File:** `roy-demon-data.json` (232 entries, 106,435 bytes)
**Source:** `aqiu384/megaten-fusion-tool` → `src/app/p5/data/roy-demon-data.json` (branch `master`)
**Retrieved:** 2026-07-11 via raw.githubusercontent.com
**SHA-256:** `b0d3eb3a1e48e5d04fb9b38b665ac14514e5b6f4f7758df2efa318b187b2cd76`
**License:** Unlicense (public domain) — the upstream repository is dedicated to the
public domain, so vendoring an unmodified copy is unrestricted.
*(Commit pinning via the GitHub API was rate-limited from the build sandbox at
retrieval time; the content hash above is the integrity anchor. If the upstream
file ever changes, re-vendor deliberately and re-run the ingest + spot-check.)*

## Why this file exists in the repo

This is the **transcription source** for `src/data/personaDetailData.js`
(owner-approved source amendment, 2026-07-11; groundwork Batch F, 2026-07-04).
The designated stat **authority** remains the JP allchart
(wikiwiki.jp/persona5r/allchart), which blocks automated access — the allchart
is the arbiter via manual spot-checks (see `SPOT_CHECK_SHEET.md` shipped with
the 4.1.0 session deliverables).

**Validation evidence (Batch F, in-session):** 232↔232 entries against the app
registry; 230 exact name matches + 1 accent (Arsène) + 1 alias (Mitra↔Mithra);
arcana **and** level agree on all mapped personas — transitive agreement with
the allchart, since the registry's arcana/levels descend from it; resist-string
element order verified against the tool's own `comp-config.json`.

## Regenerating persona details

```
node scripts/ingest-persona-details.mjs scripts/vendor/roy-demon-data.json --all
npm run check:details
```

Never hand-edit `personaDetailData.js` — change the ingest rules or re-vendor,
then regenerate (merge-by-regeneration keeps diffs stable, in registry order).

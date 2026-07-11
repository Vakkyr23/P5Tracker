// Version-lineage guard (v3.6.2): fails when src/data/version.js, package.json and
// the top CHANGELOG entry disagree. Runs in CI before every deploy so a stale or
// forked checkpoint can't ship silently (this bit us once: 3.4.4 → 3.5.0 with a
// lost remediation pass in between). Run locally with `npm run check:version`.
import { readFileSync } from 'fs';

const appVer = readFileSync('src/data/version.js', 'utf8').match(/APP_VERSION\s*=\s*'([^']+)'/)?.[1];
const pkgVer = JSON.parse(readFileSync('package.json', 'utf8')).version;
const logVer = readFileSync('CHANGELOG.md', 'utf8').match(/^## \[(\d+\.\d+\.\d+)\]/m)?.[1];

console.log(`version.js=${appVer}  package.json=${pkgVer}  CHANGELOG=${logVer}`);
if (!appVer || appVer !== pkgVer || appVer !== logVer) {
  console.error('✖ Version mismatch — the checkpoint lineage is broken or docs were not bumped.');
  process.exit(1);
}
console.log('✓ Version lineage consistent.');

/* Legacy crossword-key migration (pre-3.x formats → cw_slot_N / cw_ans_N).
   Shared by App (one-time mount migration of checkedItems) and the Sync
   Terminal (normalizing legacy flat .txt saves on import). Pure function:
   takes a checkedItems map, returns a (possibly new) map. */
export function migrateCrosswords(items) {
  const allKeys = Object.keys(items);

  // Count different types of legacy indicators
  const legacyDateCount = allKeys.filter(k => k.includes('_cw') && !k.startsWith('cw_')).length;
  const failedMigrationCount = allKeys.filter(k => k.match(/^cw\d+$/)).length;
  const oldAttemptCount = allKeys.filter(k => k.startsWith('cw_') && !k.startsWith('cw_ans_') && !k.startsWith('cw_slot_')).length;
  const oldAugCount = allKeys.filter(k => k.startsWith('aug_q')).length;

  // We take the HIGHEST count found to determine progress
  const maxProgress = Math.max(legacyDateCount + oldAugCount, failedMigrationCount, oldAttemptCount);

  // Check if we already have the new format
  const hasNewFormat = allKeys.some(k => k.startsWith('cw_slot_') || k.startsWith('cw_ans_'));

  if (maxProgress > 0 && !hasNewFormat) {
    const next = { ...items };

    // 1. Enforce the correct sequence for BOTH slots and answers
    for (let i = 1; i <= maxProgress; i++) {
      next[`cw_slot_${i}`] = true; // Calendar checkboxes
      next[`cw_ans_${i}`] = true;  // Briefing checkboxes
    }

    // 2. Nuke all non-standard keys
    allKeys.forEach(k => {
      if (
        (k.includes('_cw') && !k.startsWith('cw_slot_') && !k.startsWith('cw_ans_')) ||
        k.startsWith('aug_q') ||
        k.match(/^cw\d+$/) ||
        (k.startsWith('cw_') && !k.startsWith('cw_slot_') && !k.startsWith('cw_ans_'))
      ) {
        delete next[k];
      }
    });

    return next;
  }
  return items;
}

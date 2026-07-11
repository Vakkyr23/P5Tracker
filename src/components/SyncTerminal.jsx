import { useState, useEffect, useRef } from 'react';
import { Download, Upload, Copy, ClipboardCheck } from 'lucide-react';
import Modal from './Modal';
import { APP_VERSION } from '../data/version';
import { migrateCrosswords } from '../utils/migrateCrosswords';

/* =========================================================================
   Sync Terminal — the full backup system (extracted from App.jsx in v3.7.0,
   behavior unchanged). App owns only the open/close flag; everything else —
   the save envelope, import pipeline, export-age stamp, file drop — lives
   here. checkedItems stays owned by App: restore works by rewriting the
   whole p5r_ namespace and reloading, so no state has to flow back up.
   ========================================================================= */

// The whole app persists under the `p5r_` prefix (App shell + each tab's own
// checklists). We back up that entire namespace as raw strings so the save is
// opaque to value encoding and stays complete even as keys are added later —
// no hand-maintained key list to drift out of sync.
const SAVE_PREFIX = 'p5r_';
const SAVE_FORMAT = 'p5r-tactician-save';

const listSaveKeys = () => {
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k && k.startsWith(SAVE_PREFIX)) keys.push(k);
  }
  return keys;
};

const collectSave = () => {
  const keys = {};
  listSaveKeys().forEach(k => { keys[k] = localStorage.getItem(k); });
  return { format: SAVE_FORMAT, schema: 2, version: APP_VERSION, exportedAt: new Date().toISOString(), keys };
};

// Returns the key/value map to write, or null if `parsed` isn't a save.
const normalizeSave = (parsed) => {
  if (parsed && parsed.format === SAVE_FORMAT && parsed.keys && typeof parsed.keys === 'object') {
    return parsed.keys; // schema 2 — full namespace
  }
  // Legacy flat format ({ checkedItems, confidantRanks, anchoredMonth, socialStats }).
  if (parsed && (parsed.checkedItems || parsed.confidantRanks || parsed.socialStats || parsed.anchoredMonth)) {
    const keys = {};
    if (parsed.checkedItems) keys.p5r_checkedItems = JSON.stringify(migrateCrosswords(parsed.checkedItems));
    if (parsed.confidantRanks) keys.p5r_confidantRanks = JSON.stringify(parsed.confidantRanks);
    if (parsed.socialStats) keys.p5r_socialStats = JSON.stringify(parsed.socialStats);
    if (parsed.anchoredMonth) keys.p5r_anchoredMonth = parsed.anchoredMonth;
    return keys;
  }
  return null;
};

export default function SyncTerminal({ isOpen, onClose }) {
  const [importText, setImportText] = useState('');
  const [copied, setCopied] = useState(false);
  const [syncStatus, setSyncStatus] = useState(null);
  // "Last exported" indicator (v3.6.2): stamped by Download/Copy. Belt-and-
  // braces for the clear-on-close browser — the PWA keeps the app alive, this
  // reminds you the *save file* has an age too.
  const [lastExport, setLastExport] = useState(() => {
    try { return Number(localStorage.getItem('p5r_lastExport')) || null; } catch { return null; }
  });
  const stampExport = () => {
    const now = Date.now();
    setLastExport(now);
    try { localStorage.setItem('p5r_lastExport', String(now)); } catch { /* best-effort */ }
  };
  // Rendered label is precomputed here (react-hooks/purity: no Date.now() in render).
  const [exportAge, setExportAge] = useState(null);
  useEffect(() => {
    if (!isOpen) return;
    if (!lastExport) { setExportAge({ stale: true, label: 'No save file exported yet' }); return; }
    const days = Math.floor((Date.now() - lastExport) / 86400000);
    setExportAge({
      stale: days >= 7,
      label: days === 0 ? 'Last export: today' : days === 1 ? 'Last export: yesterday' : `Last export: ${days} days ago`,
    });
  }, [isOpen, lastExport]);
  const [fileName, setFileName] = useState('');
  const [dragging, setDragging] = useState(false);
  const hiddenInputRef = useRef(null);
  const fileInputRef = useRef(null);

  // Closing the terminal (any path) clears its transient state — same reset
  // App performed inline before the extraction.
  const closeTerminal = () => {
    setSyncStatus(null);
    setImportText('');
    setFileName('');
    onClose();
  };

  const handleCopy = async () => {
    const text = JSON.stringify(collectSave());
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else if (hiddenInputRef.current) {
        hiddenInputRef.current.value = text;
        hiddenInputRef.current.select();
        document.execCommand('copy');
      }
      setCopied(true);
      stampExport();
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setSyncStatus({ ok: false, msg: 'Copy blocked — use Download Save instead.' });
    }
  };

  const exportFile = () => {
    const blob = new Blob([JSON.stringify(collectSave(), null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `p5r-save-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    stampExport();
    setSyncStatus({ ok: true, msg: 'Full save downloaded — keep this file safe.' });
  };

  // Core import: parse → normalize → confirm (destructive) → write → reload.
  // Shared by the paste box and the file loader.
  const runImport = (text) => {
    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      setSyncStatus({ ok: false, msg: 'Invalid format — that text is not readable save data.' });
      return;
    }
    const keys = normalizeSave(parsed);
    if (!keys) {
      setSyncStatus({ ok: false, msg: 'Invalid format — no recognizable save data found.' });
      return;
    }
    // Destructive replace — guard it.
    if (!window.confirm('Restore this save? Your current in-browser progress will be replaced.')) return;
    listSaveKeys().forEach(k => localStorage.removeItem(k));
    Object.entries(keys).forEach(([k, v]) => { if (typeof v === 'string') localStorage.setItem(k, v); });
    // Reload so every tab and component rehydrates from the restored storage.
    window.location.reload();
  };

  const handleImport = () => {
    if (!importText.trim()) {
      setSyncStatus({ ok: false, msg: 'Nothing to import — load a save file or paste save data first.' });
      return;
    }
    runImport(importText);
  };

  // Read a chosen/dropped save file into the import box + show its name.
  const loadSaveFile = (file) => {
    if (!file) return;
    const name = (file.name || '').toLowerCase();
    if (!/\.(json|txt)$/.test(name)) {
      setSyncStatus({ ok: false, msg: 'Unsupported file — choose a .json or .txt save.' });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImportText(String(reader.result || ''));
      setFileName(file.name);
      setSyncStatus({ ok: true, msg: `Loaded "${file.name}" — review, then Apply Import.` });
    };
    reader.onerror = () => setSyncStatus({ ok: false, msg: 'Could not read that file — try again.' });
    reader.readAsText(file);
  };

  const onDropFile = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer?.files?.[0];
    loadSaveFile(file);
  };

  return (
    <Modal isOpen={isOpen} onClose={closeTerminal} className="max-w-2xl border-red-600 shadow-[0_0_50px_rgba(220,38,38,0.2)] rounded-[3rem]">
         <div className="p-10">
            <h2 className="text-4xl font-black text-red-600 italic uppercase mb-2 tracking-tighter">Sync Terminal</h2>
            <p className="text-neutral-400 text-sm mb-4 font-mono">Full backup — all progress, every checklist, route &amp; theme. If your browser clears on exit, keep this file: importing it restores everything.</p>
            {exportAge && (
              <div className={`pc-slot inline-flex items-center bg-neutral-900/70 border border-neutral-800 py-2 pr-4 mb-6 ${exportAge.stale ? 'text-amber-400' : 'text-neutral-500'}`}>
                <p className="text-[11px] font-bold tracking-widest uppercase">
                  {exportAge.stale ? '⚠ ' : ''}{exportAge.label}
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
               <button onClick={exportFile} className="p-8 bg-red-600 hover:bg-white text-black font-black rounded-xl transition-all flex flex-col items-center gap-3 shadow-xl group">
                  <Download className="w-10 h-10" />
                  <span className="text-xs tracking-widest font-bold">Download Save</span>
               </button>
               <div className="flex flex-col gap-3">
                  <button onClick={handleCopy} className="p-4 bg-neutral-800 hover:bg-neutral-700 text-white font-black rounded-xl transition-all flex items-center justify-center gap-3 text-xs tracking-widest font-bold">
                     {copied ? <ClipboardCheck className="text-green-500" /> : <Copy />}
                     {copied ? "Memory Synced!" : "Copy Data String"}
                  </button>
                  <div
                    onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={onDropFile}
                    onClick={() => fileInputRef.current?.click()}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && fileInputRef.current?.click()}
                    className={`w-full rounded-xl border-2 border-dashed p-4 mb-2 cursor-pointer transition-colors flex flex-col items-center justify-center gap-2 text-center ${dragging ? 'border-red-600 bg-red-600/10' : 'border-neutral-700 hover:border-red-600 bg-black/40'}`}
                  >
                    <Upload className="w-6 h-6 text-red-500" />
                    <span className="text-xs font-bold tracking-widest text-white">Load Save File</span>
                    <span className="text-[10px] text-neutral-500 font-mono">{dragging ? 'Drop to load' : 'Click or drag a .json / .txt save here'}</span>
                    {fileName && <span className="text-[10px] text-green-500 font-mono break-all">✓ {fileName}</span>}
                  </div>
                  <input ref={fileInputRef} type="file" accept=".json,.txt,application/json,text/plain"
                    onChange={(e) => { loadSaveFile(e.target.files?.[0]); e.target.value = ''; }}
                    className="hidden" />
                  <textarea placeholder="…or paste save data here" value={importText} onChange={(e) => { setImportText(e.target.value); if (fileName) setFileName(''); }} className="w-full h-24 bg-black border border-neutral-800 rounded-xl p-4 font-mono text-[10px] text-red-500 outline-none focus:border-red-600 mb-2" />
                  <button onClick={handleImport} className="w-full bg-white text-black p-4 rounded-xl text-xs font-bold tracking-widest">Apply Import</button>
               </div>
            </div>
            {syncStatus && (
              <p className={`text-center text-[11px] font-bold tracking-widest mb-4 ${syncStatus.ok ? 'text-green-500' : 'text-red-500'}`}>{syncStatus.msg}</p>
            )}
            <input type="text" ref={hiddenInputRef} className="opacity-0 absolute pointer-events-none" />
            <button onClick={closeTerminal} className="w-full text-neutral-600 hover:text-red-500 text-[10px] font-black tracking-[0.5em] transition-colors uppercase">Close Terminal</button>
         </div>
    </Modal>
  );
}

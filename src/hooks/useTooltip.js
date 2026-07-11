import { useState, useMemo, useRef } from "react";

// Floating tooltip system, shared by the scoped tabs (.p5x / .p5s / .p5m).
//
// Perf note (2026-07-02): the original version called setTip on every
// `mousemove`, re-rendering the entire tab per pixel while hovering (the
// "hover storm" — 297 DayCards on the Calendar). Now the only state change
// is one setTip on enter/focus and one on leave/blur; cursor-following is
// done by mutating the bubble's style directly through a ref, throttled to
// one update per animation frame. Zero React re-renders while the pointer moves.
//
// Usage in a component:
//   const { tip, tipApi, bubbleRef } = useTooltip();
//   <span {...tipHandlers("some text", tipApi)}>…</span>
//   {tip && <div ref={bubbleRef} className="tipbubble" style={{ left: tip.x, top: tip.y }}>{tip.text}</div>}
//   …and append tipCss(".p5s") to the component's <style> string.
export function useTooltip() {
  const [tip, setTip] = useState(null);
  const bubbleRef = useRef(null);
  const rafRef = useRef(0);
  const tipApi = useMemo(() => ({
    show: (text, e) => {
      if (!text) return;
      let x, y;
      if (e && typeof e.clientX === "number" && e.type !== "focus") { x = e.clientX; y = e.clientY; }
      else if (e && e.currentTarget) { const r = e.currentTarget.getBoundingClientRect(); x = r.left + r.width / 2; y = r.top; }
      setTip({ text, x, y });
    },
    // Follow the cursor without touching React state.
    move: (e) => {
      if (typeof e.clientX !== "number") return;
      const x = e.clientX, y = e.clientY;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const el = bubbleRef.current;
        if (el) { el.style.left = x + "px"; el.style.top = y + "px"; }
      });
    },
    hide: () => { cancelAnimationFrame(rafRef.current); setTip(null); },
  }), []);
  return { tip, tipApi, bubbleRef };
}

// Hover/focus handlers for any element that should show `text`. Returns no
// handlers when there's no text, so it's safe to spread unconditionally.
export const tipHandlers = (text, tipApi) => text
  ? {
      tabIndex: 0,
      onMouseEnter: (e) => tipApi.show(text, e),
      onMouseMove: tipApi.move,
      onMouseLeave: tipApi.hide,
      onFocus: (e) => tipApi.show(text, e),
      onBlur: tipApi.hide,
    }
  : {};

// Scoped CSS for the tooltip bubble. `scope` is the component root class.
export const tipCss = (scope) => `
${scope} .tipbubble{ position:fixed; z-index:9999; transform:translate(-50%, calc(-100% - 12px)); background:var(--surf2); color:var(--ink);
  border:1px solid var(--line); border-radius:8px; padding:7px 10px; font-size:11.5px; line-height:1.4; max-width:260px; box-shadow:var(--shadow); pointer-events:none; }
${scope} .hastip{ cursor:help; }
`;

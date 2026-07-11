import { useEffect, useRef } from 'react';

/* Shared dialog shell (extracted from App.jsx in v3.7.0, behavior unchanged).
   a11y (v3.6.2): role="dialog" aria-modal, Escape closes, focus moves into the
   panel on open and returns to the opener on close; background scroll locked. */
export default function Modal({ isOpen, onClose, children, className = "max-w-lg" }) {
  const panelRef = useRef(null);
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
      // a11y (v3.6.2): move focus into the dialog on open, hand it back on close.
      const prev = document.activeElement;
      panelRef.current?.focus();
      return () => {
        window.removeEventListener('keydown', handleEsc);
        document.body.style.overflow = 'unset';
        if (prev && typeof prev.focus === 'function') prev.focus();
      };
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-md flex items-center justify-center p-2 md:p-4 z-[100] animate-in fade-in duration-200">
      <div
        className="absolute inset-0 cursor-pointer"
        onClick={onClose}
        aria-label="Close modal"
      />
      <div ref={panelRef} role="dialog" aria-modal="true" tabIndex={-1} className={`relative bg-neutral-900 border-2 border-neutral-800 rounded-[2.5rem] md:rounded-[3rem] w-full ${className} shadow-2xl z-10 flex flex-col max-h-[95vh] md:max-h-[90vh] overflow-hidden outline-none`}>
        <div className="overflow-y-auto custom-scrollbar flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}

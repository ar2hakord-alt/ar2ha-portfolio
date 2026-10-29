import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Copy } from 'lucide-react';

interface ToastData {
  id: string;
  title: string;
  detail?: string;
}

interface ToastContextType {
  showToast: (title: string, detail?: string) => void;
  copyToClipboard: (text: string, label?: string) => Promise<boolean>;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toast, setToast] = useState<ToastData | null>(null);

  const showToast = useCallback((title: string, detail?: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToast({ id, title, detail });

    setTimeout(() => {
      setToast((current) => (current?.id === id ? null : current));
    }, 2800);
  }, []);

  const copyToClipboard = useCallback(
    async (text: string, label?: string): Promise<boolean> => {
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(text);
        } else {
          // Fallback for non-https or older browser environments
          const textArea = document.createElement('textarea');
          textArea.value = text;
          textArea.style.position = 'fixed';
          textArea.style.left = '-999999px';
          textArea.style.top = '-999999px';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          document.execCommand('copy');
          textArea.remove();
        }

        const title = label ? `${label} کپی شد!` : 'در کلیپ‌بورد کپی شد!';
        showToast(title, text);
        return true;
      } catch (err) {
        console.error('Clipboard copy error:', err);
        showToast('خطا در کپی', 'امکان دسترسی به کلیپ‌بورد فراهم نشد');
        return false;
      }
    },
    [showToast]
  );

  return (
    <ToastContext.Provider value={{ showToast, copyToClipboard }}>
      {children}

      {/* Low-profile obsidian toast notification */}
      <div
        className="fixed bottom-6 left-6 z-50 pointer-events-none select-none max-w-sm"
        dir="rtl"
        aria-live="polite"
      >
        <AnimatePresence mode="wait">
          {toast && (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 16, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.96 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-auto flex items-center gap-3.5 px-4 py-3 rounded-xl bg-[#090b10]/95 backdrop-blur-2xl border border-amber-400/30 text-white shadow-[0_12px_36px_rgba(0,0,0,0.85),0_0_18px_rgba(251,191,36,0.15)] ring-1 ring-white/10"
            >
              {/* Subtle pulsing status icon */}
              <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0 text-emerald-400">
                <Check className="w-4 h-4 stroke-[2.5]" />
              </div>

              <div className="flex flex-col text-right min-w-0 pr-0.5">
                <span className="text-xs font-bold text-white tracking-wide">
                  {toast.title}
                </span>
                {toast.detail && (
                  <span className="text-[11px] font-mono text-zinc-400 truncate max-w-[210px] dir-ltr text-right">
                    {toast.detail}
                  </span>
                )}
              </div>

              {/* Obsidian brand accent dot */}
              <div className="mr-auto pl-1">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

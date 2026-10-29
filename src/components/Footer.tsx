import React from 'react';
import { Lock } from 'lucide-react';

interface FooterProps {
  onOpenOwnerModal: () => void;
  isAuthenticated: boolean;
}

export const Footer: React.FC<FooterProps> = ({ onOpenOwnerModal, isAuthenticated }) => {
  return (
    <footer className="border-t border-white/5 py-12 bg-[#060608]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand Lockup */}
        <div className="flex flex-col items-center md:items-start space-y-1">
          <div className="flex items-center gap-2">
            <span className="brand-fractured text-xl font-bold tracking-widest text-white">
              ar2Ha
            </span>
            <span className="text-zinc-600">|</span>
            <span className="text-xs text-zinc-400 font-medium">آرشا محمدی</span>
          </div>
          <p className="text-xs text-zinc-500">
            توسعه پایدار، امنیت نفوذناپذیر، اتوماسیون داده
          </p>
        </div>

        {/* Quiet links & copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-xs text-zinc-500">
          <span>کلیه حقوق محفوظ است © 1404 ar2Ha</span>
          <span className="hidden sm:inline" aria-hidden="true">·</span>
          <span>هماهنگ با شبکه ملی اطلاعات</span>
          <span className="hidden sm:inline" aria-hidden="true">·</span>
          <button
            onClick={onOpenOwnerModal}
            className="text-zinc-400 hover:text-amber-300 transition-colors inline-flex items-center gap-1 cursor-pointer"
          >
            <Lock className="w-3 h-3" />
            <span>{isAuthenticated ? 'پنل مالک (وارد شده)' : 'دسترسی مالک'}</span>
          </button>
        </div>

      </div>
    </footer>
  );
};

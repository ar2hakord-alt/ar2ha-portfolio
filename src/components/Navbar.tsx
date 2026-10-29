import React from 'react';
import { ShieldCheck, UserCheck, Lock } from 'lucide-react';

interface NavbarProps {
  onOpenOwnerModal: () => void;
  isAuthenticated: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenOwnerModal, isAuthenticated }) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-[#070709]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single Text Element in Fractured Display Face) */}
        <a href="#" className="flex items-center gap-3 shrink-0 group">
          <div className="flex flex-col">
            <span className="brand-fractured text-2xl font-bold tracking-widest text-zinc-100 group-hover:opacity-90 transition-opacity">
              ar2Ha
            </span>
            <span className="text-[11px] text-zinc-400 font-medium tracking-normal -mt-0.5">
              آرشا محمدی
            </span>
          </div>
        </a>

        {/* Zone 2: Navigation Links (Single-line, unboxed, subtle hover) */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-300">
          <a href="#domains" className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0">
            حوزه‌های تخصصی
          </a>
          <a href="#philosophy" className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0">
            دیدگاه و هویت
          </a>
          <a href="#projects" className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0">
            کارنامه مستند
          </a>
          <a href="#contact" className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0">
            ارتباط و ثبت سفارش
          </a>
        </nav>

        {/* Zone 3: 1 Primary Action (Owner Panel Entry) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenOwnerModal}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg transition-all duration-200 whitespace-nowrap shrink-0 ${
              isAuthenticated
                ? 'bg-amber-400/10 text-amber-300 border border-amber-400/30 hover:bg-amber-400/20'
                : 'bg-zinc-900 text-zinc-200 border border-zinc-700/60 hover:bg-zinc-800 hover:text-white'
            }`}
          >
            {isAuthenticated ? (
              <>
                <UserCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>داشبورد مالک (فعال)</span>
              </>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5 text-zinc-400" />
                <span>ورود مالک سایت</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

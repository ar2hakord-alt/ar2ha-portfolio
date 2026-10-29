import React, { useState } from 'react';
import { Home, ShieldAlert, Briefcase, FileCode2, PhoneCall, Lock, UserCheck } from 'lucide-react';

export type NavView = 'overview' | 'domains' | 'projects' | 'philosophy' | 'contact' | 'owner';

interface RightSidebarNavProps {
  currentView: NavView;
  onSelectView: (view: NavView) => void;
  isAuthenticated: boolean;
  projectsCount: number;
}

export const RightSidebarNav: React.FC<RightSidebarNavProps> = ({
  currentView,
  onSelectView,
  isAuthenticated,
  projectsCount
}) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const navItems = [
    {
      id: 'overview' as NavView,
      label: 'صفحه اصلی و هویت',
      icon: Home,
      badge: null,
      angle: -62
    },
    {
      id: 'domains' as NavView,
      label: 'حوزه‌های تخصصی و عملیاتی',
      icon: ShieldAlert,
      badge: '5 حوزه',
      angle: -37
    },
    {
      id: 'projects' as NavView,
      label: 'کارنامه و دستاوردها',
      icon: Briefcase,
      badge: projectsCount > 0 ? `${projectsCount}` : 'خام',
      angle: -12
    },
    {
      id: 'philosophy' as NavView,
      label: 'دیدگاه و منشور عملیاتی',
      icon: FileCode2,
      badge: null,
      angle: 12
    },
    {
      id: 'contact' as NavView,
      label: 'ارتباط مستقیم و ثبت پروژه',
      icon: PhoneCall,
      badge: 'فعال',
      angle: 37
    },
    {
      id: 'owner' as NavView,
      label: isAuthenticated ? 'داشبورد مالک (فعال)' : 'ورود مالک سایت',
      icon: isAuthenticated ? UserCheck : Lock,
      badge: isAuthenticated ? 'آنلاین' : null,
      angle: 62,
      isOwner: true
    }
  ];

  // Ultra-compact radius so it hugs the right border and NEVER intrudes on text
  // Mobile: 58px radius, Desktop: 68px radius
  const getRadius = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 640) {
      return 56;
    }
    return 66;
  };

  const arcRadius = getRadius();

  return (
    <aside
      className="fixed right-0 top-1/2 -translate-y-1/2 z-50 select-none pointer-events-auto"
      dir="rtl"
      style={{ height: '240px', width: '92px' }}
    >
      {/* Semicircular glass pod background - tightly bound to right edge */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 h-[230px] w-[86px] sm:w-[92px] rounded-l-full bg-black/55 backdrop-blur-2xl border-l border-y border-white/[0.08] shadow-[-6px_0_25px_rgba(0,0,0,0.8)] pointer-events-none overflow-hidden">
        {/* Subtle radial ambient glow inside crescent */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-20 h-20 bg-emerald-500/10 rounded-full blur-md" />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 w-16 h-16 bg-amber-500/10 rounded-full blur-sm" />
        {/* Subtle curved track */}
        <svg className="absolute inset-0 w-full h-full opacity-35" viewBox="0 0 92 230" fill="none">
          <path
            d="M 92 15 C 25 40, 25 190, 92 215"
            stroke="url(#semicircleGradientCompact)"
            strokeWidth="1.2"
            strokeDasharray="3 3"
          />
          <defs>
            <linearGradient id="semicircleGradientCompact" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#d4af37" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#10b981" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#d4af37" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Central Hacker Avatar: Pinned in the center of the semicircle at the right edge */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 z-20 translate-x-3 sm:translate-x-2">
        <button
          onClick={() => onSelectView('overview')}
          className="relative group cursor-pointer block"
          title="ar2Ha | اتاق نفوذ و تست امنیت"
        >
          {/* Centered Avatar */}
          <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-full overflow-hidden border-2 border-emerald-500/60 p-0.5 bg-black/90 shadow-[0_0_18px_rgba(16,185,129,0.5)] group-hover:border-amber-400 group-hover:shadow-[0_0_22px_rgba(251,191,36,0.65)] transition-all">
            <img
              src="/src/assets/images/hacker_back_to_camera_hoodie_1793258705291.jpg"
              alt="Hacker back to camera in black hoodie"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover rounded-full group-hover:scale-115 transition-transform duration-500"
            />
          </div>
          {/* Subtle live indicator pulse */}
          <span className="absolute top-0.5 right-1.5 w-2 h-2 bg-emerald-400 border border-black rounded-full shadow-[0_0_6px_#10b981] animate-pulse" />
        </button>
      </div>

      {/* 6 Orbital Navigation Icons along the compact semicircular curve */}
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentView === item.id;

        // Polar coordinates around avatar center
        const angleRad = (item.angle * Math.PI) / 180;
        // x distance from right edge (compact, strictly <= 72px)
        const xPos = 16 + arcRadius * Math.cos(angleRad);
        // y distance from vertical center
        const yPos = arcRadius * Math.sin(angleRad);

        return (
          <div
            key={item.id}
            className="absolute top-1/2 z-30"
            style={{
              right: `${xPos}px`,
              transform: `translate(50%, calc(-50% + ${yPos}px))`
            }}
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <button
              onClick={() => onSelectView(item.id)}
              className={`relative flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'bg-amber-400/30 text-amber-300 border border-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.6)] scale-115'
                  : item.isOwner && isAuthenticated
                  ? 'bg-emerald-500/25 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/35 scale-105'
                  : 'bg-zinc-950/90 text-zinc-400 hover:text-white hover:bg-zinc-900 border border-white/10 hover:border-amber-400/40 shadow-sm'
              }`}
              aria-label={item.label}
            >
              <Icon className={`w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform ${isActive ? 'text-amber-300 scale-110' : ''}`} />

              {/* Active Indicator dot */}
              {isActive && (
                <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-amber-400 rounded-full shadow-[0_0_5px_rgba(251,191,36,0.9)]" />
              )}
            </button>

            {/* Floating Tooltip to the Left (Hidden on small touch, smooth on desktop) */}
            <div
              className={`hidden sm:block absolute right-full mr-2.5 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-zinc-950/95 border border-white/15 text-[11px] font-medium text-white whitespace-nowrap shadow-2xl transition-all duration-200 z-50 pointer-events-none ${
                hoveredItem === item.id
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-2 pointer-events-none'
              }`}
            >
              <div className="flex items-center gap-1.5">
                {item.badge && (
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30 font-mono">
                    {item.badge}
                  </span>
                )}
                <span>{item.label}</span>
              </div>
            </div>
          </div>
        );
      })}
    </aside>
  );
};

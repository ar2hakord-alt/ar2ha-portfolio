import React from 'react';

interface BrandLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  className?: string;
  showSubtitle?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  className = '',
  showSubtitle = false
}) => {
  // Size-specific font scaling map
  const sizeClasses = {
    xs: 'text-base',
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl sm:text-4xl',
    xl: 'text-4xl sm:text-5xl',
    hero: 'text-4xl sm:text-5xl lg:text-6xl'
  };

  return (
    <div className={`inline-flex flex-col select-none ${className}`}>
      <span
        className={`brand-fractured font-black tracking-wider inline-flex items-baseline ${sizeClasses[size]}`}
        style={{
          direction: 'ltr',
          fontVariantNumeric: 'lining-nums',
          fontFeatureSettings: '"locl" 0, "ss01" 0'
        }}
      >
        {/* Lowercase 'ar' */}
        <span className="opacity-95 font-black tracking-tight" style={{ fontFamily: "var(--font-code)" }}>
          ar
        </span>

        {/* Numeral '2' strictly English Latin digit, leveled and sized identically to uppercase 'H' */}
        <span
          className="inline-block font-black text-amber-300 drop-shadow-[0_0_10px_rgba(212,175,55,0.4)]"
          style={{
            fontFamily: "var(--font-code)",
            fontSize: '1.08em',
            lineHeight: 1,
            verticalAlign: 'baseline',
            fontWeight: 900
          }}
        >
          2
        </span>

        {/* Uppercase 'H' strictly leveled and sized identically to numeral '2' */}
        <span
          className="inline-block font-black text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]"
          style={{
            fontFamily: "var(--font-code)",
            fontSize: '1.08em',
            lineHeight: 1,
            verticalAlign: 'baseline',
            fontWeight: 900
          }}
        >
          H
        </span>

        {/* Lowercase 'a' */}
        <span className="opacity-95 font-black tracking-tight" style={{ fontFamily: "var(--font-code)" }}>
          a
        </span>
      </span>

      {showSubtitle && (
        <span className="text-[11px] text-zinc-400 font-medium tracking-normal -mt-0.5">
          آرشا محمدی
        </span>
      )}
    </div>
  );
};

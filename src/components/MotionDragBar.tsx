import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronRight, ChevronLeft, MoveHorizontal } from 'lucide-react';

interface MotionDragBarProps {
  children: React.ReactNode;
  hintText?: string;
  className?: string;
  containerClassName?: string;
  showSideIndicators?: boolean;
}

export const MotionDragBar: React.FC<MotionDragBarProps> = ({
  children,
  hintText = 'با کشیدن به راست یا چپ همه بخش‌ها را مشاهده کنید',
  className = '',
  containerClassName = '',
  showSideIndicators = true
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [, setIsDragging] = useState(false);

  const checkScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 6) {
      setHasOverflow(false);
      setCanScrollLeft(false);
      setCanScrollRight(false);
      return;
    }
    setHasOverflow(true);
    const absScroll = Math.abs(el.scrollLeft);
    // In RTL, 0 is far right in standard Chrome/Safari; scrolling left increases absolute value
    const atRight = absScroll <= 6;
    const atLeft = absScroll >= maxScroll - 6;

    setCanScrollRight(!atRight);
    setCanScrollLeft(!atLeft);
  }, []);

  useEffect(() => {
    checkScroll();
    const handleResize = () => checkScroll();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [children, checkScroll]);

  // Mouse Drag Events
  const handleMouseDown = (e: React.MouseEvent) => {
    const el = containerRef.current;
    if (!el) return;
    setIsMouseDown(true);
    setIsDragging(false);
    setStartX(e.pageX - el.offsetLeft);
    setScrollLeft(el.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown) return;
    const el = containerRef.current;
    if (!el) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX) * 1.5; // Drag sensitivity
    if (Math.abs(walk) > 4) {
      setIsDragging(true);
    }
    el.scrollLeft = scrollLeft - walk;
    checkScroll();
  };

  const handleMouseUpOrLeave = () => {
    setIsMouseDown(false);
    setTimeout(() => setIsDragging(false), 50);
  };

  const scrollByAmount = (amount: number) => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollBy({ left: amount, behavior: 'smooth' });
    setTimeout(checkScroll, 350);
  };

  return (
    <div className={`relative w-full group/dragbar ${className}`}>
      {/* Top micro hint with interactive indicator */}
      {hintText && (
        <div className="flex items-center justify-between text-[11px] text-zinc-500 mb-2 px-1 select-none">
          <div className="flex items-center gap-1.5 text-zinc-400">
            <MoveHorizontal className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>{hintText}</span>
          </div>

          {/* Quick arrow controls for desktop/laptop click navigation */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => scrollByAmount(220)}
              className="p-1 rounded-lg bg-zinc-900 border border-white/5 hover:border-amber-400/30 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              title="حرکت به راست"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => scrollByAmount(-220)}
              className="p-1 rounded-lg bg-zinc-900 border border-white/5 hover:border-amber-400/30 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              title="حرکت به چپ"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Main Track Frame with Side Indicators */}
      <div className="relative w-full overflow-hidden rounded-xl">
        
        {/* RIGHT SIDE INDICATOR (Glow gradient + directional arrow) */}
        {showSideIndicators && hasOverflow && canScrollRight && (
          <div className="absolute right-0 top-0 bottom-0 z-20 flex items-center pr-1 pointer-events-none transition-opacity duration-300">
            {/* Subtle natural-toned edge glow gradient */}
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#080a0e] via-[#080a0e]/85 to-transparent pointer-events-none" />
            
            {/* Ambient natural accent line */}
            <div className="absolute right-0 top-1/4 bottom-1/4 w-[2px] bg-gradient-to-b from-transparent via-amber-400/60 to-transparent blur-[1px] shadow-[0_0_12px_rgba(245,158,11,0.4)] pointer-events-none" />

            {/* Small directional arrow button */}
            <button
              type="button"
              onClick={() => scrollByAmount(240)}
              aria-label="پیمایش به راست"
              title="پیمایش به راست"
              className="relative pointer-events-auto w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-stone-900/90 border border-amber-500/35 text-amber-300 flex items-center justify-center shadow-lg shadow-black/80 hover:bg-stone-800 hover:border-amber-400 hover:scale-105 active:scale-95 transition-all cursor-pointer backdrop-blur-md"
            >
              <ChevronRight className="w-4 h-4 text-amber-300" />
            </button>
          </div>
        )}

        {/* LEFT SIDE INDICATOR (Glow gradient + directional arrow) */}
        {showSideIndicators && hasOverflow && canScrollLeft && (
          <div className="absolute left-0 top-0 bottom-0 z-20 flex items-center pl-1 pointer-events-none transition-opacity duration-300">
            {/* Subtle natural-toned edge glow gradient */}
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#080a0e] via-[#080a0e]/85 to-transparent pointer-events-none" />
            
            {/* Ambient natural accent line */}
            <div className="absolute left-0 top-1/4 bottom-1/4 w-[2px] bg-gradient-to-b from-transparent via-amber-400/60 to-transparent blur-[1px] shadow-[0_0_12px_rgba(245,158,11,0.4)] pointer-events-none" />

            {/* Small directional arrow button */}
            <button
              type="button"
              onClick={() => scrollByAmount(-240)}
              aria-label="پیمایش به چپ"
              title="پیمایش به چپ"
              className="relative pointer-events-auto w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-stone-900/90 border border-amber-500/35 text-amber-300 flex items-center justify-center shadow-lg shadow-black/80 hover:bg-stone-800 hover:border-amber-400 hover:scale-105 active:scale-95 transition-all cursor-pointer backdrop-blur-md"
            >
              <ChevronLeft className="w-4 h-4 text-amber-300" />
            </button>
          </div>
        )}

        {/* Draggable container with native momentum + mouse gesture sensor */}
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          onScroll={checkScroll}
          className={`flex items-center gap-3 overflow-x-auto pb-3 pt-1 px-1 scrollbar-none select-none transition-colors ${
            isMouseDown ? 'cursor-grabbing' : 'cursor-grab'
          } ${containerClassName}`}
          style={{
            scrollBehavior: isMouseDown ? 'auto' : 'smooth',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

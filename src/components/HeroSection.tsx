import React from 'react';
import { Bot, Phone, ShieldAlert, ArrowUpRight, Copy, Check } from 'lucide-react';

interface HeroSectionProps {
  onOpenOwnerModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenOwnerModal }) => {
  const [copiedPhone, setCopiedPhone] = React.useState(false);

  const handleCopyPhone = () => {
    navigator.clipboard.writeText('09189330810');
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <section className="relative pt-12 pb-20 overflow-hidden border-b border-white/5">
      {/* Subtle background ambient gradients */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Split Screen 2-Column Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-stretch mb-16">
          
          {/* Typography Column */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-7">
            {/* Clean Unboxed Metadata Kicker (Anti-Pill Rule) */}
            <div className="flex items-center gap-3 text-xs tracking-wider text-zinc-400">
              <span className="text-amber-400/90 font-medium">پلتفرم مستقل مهندسی</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span>هماهنگ با شبکه ملی اطلاعات</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span className="text-emerald-400/90 font-medium">۱۰۰٪ عملیاتی، صفر٪ فیک</span>
            </div>

            {/* Main Title & Brand Pillar */}
            <div className="space-y-3">
              <div className="flex items-baseline gap-4 flex-wrap">
                <span className="brand-fractured text-4xl sm:text-5xl lg:text-6xl font-black">
                  ar2Ha
                </span>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                  آرشا محمدی
                </h1>
              </div>
              <p className="text-base sm:text-lg text-zinc-300 font-medium leading-relaxed">
                تست نفوذ و امنیت سایبری · معماری وب مدرن · ربات‌سازی و دیمون‌ها · اپلیکیشن‌های اندروید
              </p>
            </div>

            {/* Bitter-Witty Bio & Authentic Philosophy */}
            <div className="space-y-4 text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl text-justify">
              <p>
                در دنیایی که رزومه‌ها پر شده از مهارت‌های تئوری و شرکت‌های خیالی، من وقتم رو پای پروژه‌های واقعی، شکستن سدهای دفاعی و نوشتن کدهایی می‌ذارم که زیر بار ترافیک زانو نزنن.
              </p>
              <p className="text-zinc-300 bg-white/[0.02] p-4 rounded-xl border border-white/5">
                «من اینجام تا قبل از اینکه باج‌افزارها یا نفوذگران سرور شما رو اسیر کنن، بهتون نشون بدم امنیت شوخی‌بردار نیست. ربات‌هایی می‌سازم که کار چند نیرو رو بی‌وقفه انجام بدن و برنامه‌هایی تحویل میدم که روی بستر نت ملی هم مثل ساعت سوئیسی کار کنن.»
              </p>
            </div>

            {/* Direct Action Hub */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="https://t.me/ar2HaAgentBot"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-5 py-3 text-sm font-semibold text-black bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 rounded-lg hover:from-amber-200 hover:to-amber-400 transition-all shadow-lg shadow-amber-500/15 whitespace-nowrap"
              >
                <Bot className="w-4 h-4 text-black" />
                <span>ربات منشی تلگرام (@ar2HaAgentBot)</span>
                <ArrowUpRight className="w-4 h-4 text-black" />
              </a>

              <a
                href="https://t.me/ar2Ha"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-zinc-200 bg-zinc-900 border border-zinc-700/60 rounded-lg hover:bg-zinc-800 hover:text-white transition-all whitespace-nowrap"
              >
                <span>چت مستقیم تلگرام</span>
              </a>

              <button
                onClick={handleCopyPhone}
                className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-zinc-300 bg-zinc-900/60 border border-zinc-800 rounded-lg hover:bg-zinc-800 hover:text-white transition-all whitespace-nowrap cursor-pointer"
                title="کلیک برای کپی شماره تماس"
              >
                <Phone className="w-4 h-4 text-zinc-400" />
                <span className="font-mono dir-ltr">09189330810</span>
                {copiedPhone ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-zinc-500" />
                )}
              </button>
            </div>
          </div>

          {/* Visual Container Column */}
          <div className="lg:col-span-5 flex items-stretch">
            <div className="relative w-full h-full min-h-[380px] lg:min-h-full rounded-2xl overflow-hidden obsidian-surface p-2 border border-white/10 shadow-2xl flex flex-col justify-between group">
              <div className="relative w-full h-full rounded-xl overflow-hidden min-h-[320px]">
                <img
                  src="/src/assets/images/hero_ar2ha_cyber_luxury_1793256821465.jpg"
                  alt="ar2Ha Monolith Cyber Luxury Visual"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                
                {/* Visual Label Overlay */}
                <div className="absolute bottom-4 right-4 left-4 p-4 rounded-lg bg-[#070709]/80 backdrop-blur-md border border-white/10">
                  <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
                    <span className="text-amber-400 font-semibold">ar2Ha Core Lab</span>
                    <span className="font-mono text-zinc-500">SYSTEM STATUS: OPTIMAL</span>
                  </div>
                  <p className="text-xs text-zinc-200">
                    تلفیق امنیت پیشگیرانه، معماری تمیز داده‌ها و دیمون‌های بلادرنگ
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Full-Width Principles Strip Below Split (Rule 13 & 2.B) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl obsidian-surface border border-white/5">
            <div className="text-xs text-zinc-400 mb-1">اصالت و اعتبار</div>
            <div className="text-base font-bold text-white mb-1">بدون رزومه فیک</div>
            <p className="text-xs text-zinc-400 leading-normal">
              هیچ پروژه ساختگی در این سایت نمایش داده نمی‌شود؛ دستاوردها تنها با مستندات قابل بررسی ثبت می‌شوند.
            </p>
          </div>

          <div className="p-4 rounded-xl obsidian-surface border border-white/5">
            <div className="text-xs text-zinc-400 mb-1">سازگاری و پایداری</div>
            <div className="text-base font-bold text-white mb-1">پشتیبانی کامل از نت ملی</div>
            <p className="text-xs text-zinc-400 leading-normal">
              معماری مستقل و بدون تکیه به سرویس‌ها یا سرورهای خارجی که در شرایط اختلال دچار از کارافتادگی شوند.
            </p>
          </div>

          <div className="p-4 rounded-xl obsidian-surface border border-white/5">
            <div className="text-xs text-zinc-400 mb-1">امنیت و نفوذگری</div>
            <div className="text-base font-bold text-white mb-1">تست نفوذ میدانی</div>
            <p className="text-xs text-zinc-400 leading-normal">
              بررسی آسیب‌پذیری‌های منطقی در لایه‌های وب و سرور به جای گزارش‌های رباتیک و تکراری.
            </p>
          </div>

          <div className="p-4 rounded-xl obsidian-surface border border-white/5">
            <div className="text-xs text-zinc-400 mb-1">ارتباط و اتوماسیون</div>
            <div className="text-base font-bold text-white mb-1">دسترسی 24/7 مستقیم</div>
            <p className="text-xs text-zinc-400 leading-normal">
              ربات منشی تلگرام و کانال‌های مستقیم بدون واسطه برای هماهنگی سریع پروژه‌های عملیاتی.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

import React from 'react';
import { ShieldCheck, Zap, Server, Lock, UserCheck } from 'lucide-react';

export const PhilosophySection: React.FC = () => {
  return (
    <section id="philosophy" className="py-24 border-b border-white/5 relative bg-[#070709]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="text-xs font-semibold tracking-widest text-amber-400/90 uppercase">
              منشور عملیاتی ar2Ha
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              چرا این پلتفرم از رزومه فیک و نمایشی خالی است؟
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-zinc-300 leading-relaxed text-justify">
              <p>
                خیلی از سایت‌های شخصی پر از اسامی دهان‌پرکن و لوگوهای شرکت‌هایی هستن که صاحب سایت حتی از جلوی درشون هم رد نشده! در حوزه امنیت سایبری و مهندسی سیستم، یک اشتباه کوچک مساوی با افشای کل دیتابیس یا سقوط سرور در ترافیک سنگین است.
              </p>
              <p className="text-zinc-400">
                من معتقدم کارنامه مهندس باید مبتنی بر حقیقت مستند باشه. پروژه‌هایی که اجازه انتشار عمومی دارن، دانه به دانه پس از تست عملیاتی در کارنامه قرار می‌گیرن و پروژه‌های محرمانه تحت توافق NDA محافظت میشن.
              </p>
              <p className="text-amber-300/90 bg-amber-950/20 p-4 rounded-xl border border-amber-500/20">
                «وقتی با من کار می‌کنید، با یک مدیر فروش کت‌شلواری یا یه شرکت واسطه‌ای صحبت نمی‌کنید؛ مستقیماً با کسی حرف می‌زنید که خودش معماری رو می‌چینه، سوراخ امنیتی رو کشف می‌کنه و باگ رو می‌بنده.»
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="p-6 rounded-2xl obsidian-surface border border-white/5 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 flex items-center justify-center border border-amber-400/20 text-amber-300">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">تست نفوذ بی‌پروایانه</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                کشف آسیب‌پذیری‌های وب و سرور بدون رویکرد سطحی اسکنرهای رایگان اینترنتی.
              </p>
            </div>

            <div className="p-6 rounded-2xl obsidian-surface border border-white/5 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-400/10 flex items-center justify-center border border-emerald-400/20 text-emerald-300">
                <Server className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">هماهنگی با نت ملی</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                طراحی مستقل با فونت‌ها و منابع داخلی، پایدار در سخت‌ترین شرایط فیلترینگ و قطعی شبکه بین‌الملل.
              </p>
            </div>

            <div className="p-6 rounded-2xl obsidian-surface border border-white/5 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-400/10 flex items-center justify-center border border-sky-400/20 text-sky-300">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">دیمون‌های پرسرعت</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                ربات‌ها و اسکریپت‌های اتوماسیون با تحمل بار کاری بالا و هندلینگ بدون قطعی ایونت‌ها.
              </p>
            </div>

            <div className="p-6 rounded-2xl obsidian-surface border border-white/5 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-400/10 flex items-center justify-center border border-purple-400/20 text-purple-300">
                <UserCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">پاسخگویی مستقیم</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                ارتباط بدون واسطه از طریق شماره اختصاصی ۰۹۱۸۹۳۳۰۸۱۰ و ربات دستیار تلگرام.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

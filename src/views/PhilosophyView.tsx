import React from 'react';
import { ShieldCheck, Server, Zap, UserCheck, Terminal } from 'lucide-react';
import { BrandLogo } from '../components/BrandLogo';

export const PhilosophyView: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="obsidian-card rounded-2xl p-6 sm:p-8 border border-amber-500/15 space-y-2">
        <div className="text-xs font-semibold tracking-widest text-amber-400/90 uppercase">
          منشور و اخلاق کاری
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          چرا اینجا خبری از رزومه ساختگی و القاب الکی نیست؟
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
          خیلی از افراد با چند تا اصطلاح انگلیسی مشتری رو گیج می‌کنن؛ در حالی که ارزش یک متخصص به اینه که کارش در عمل چقدر گره از کار مردم باز می‌کنه.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Main Philosophy Column */}
        <div className="lg:col-span-7 obsidian-card rounded-2xl p-6 sm:p-8 border border-amber-500/15 space-y-6 flex flex-col justify-between">
          <div className="space-y-4 text-xs sm:text-sm text-slate-200 leading-relaxed text-justify">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Terminal className="w-5 h-5 text-amber-400" />
              <span>پایان دوران ادعاهای توخالی در اینترنت</span>
            </h3>
            <p>
              امروزه با کمی کپی‌پیست و درست کردن چندتا عکس شیک، هر کسی می‌تونه خودش رو متخصص درجه یک جا بزنه! ادعا کردن توی فضای مجازی هیچ خرجی نداره؛ اما حقیقت در دنیای واقعی مشخص میشه: جایی که وسط ساعت شلوغی فروش، سایت قفل می‌کنه یا هکرها به حساب مشتریان دستبرد می‌زنن.
            </p>
            <p>
              من آرشا محمدی (ar2Ha)، ترجیح می‌دم به جای صد صفحه رزومه نمایشی، کاری تحویل بدم که خیالتون از بابتش راحت باشه. تا وقتی پروژه‌ای واقعاً اجرا نشده باشه، پاش به این کارنامه باز نمیشه. اطلاعات کارهای محرمانه مشتریان هم پیش من محفوظه و برای خودنمایی جایی پخش نمیشه.
            </p>
            <div className="p-4 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-200 leading-relaxed font-medium">
              «اعتبار یک سازنده به این نیست که چقدر خوب حرف می‌زنه؛ به اینه که وقتی مشکلی پیش اومد، چقدر بی‌صدا و سریع بلده حلش کنه.»
            </div>
          </div>

          <div className="border-t border-white/5 pt-4 text-xs text-slate-400 flex items-center gap-2">
            <span>امضا و تعهد کاری:</span>
            <BrandLogo size="xs" />
          </div>
        </div>

        {/* 4 Practical Rules in Everyday Terms */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
          
          <div className="p-5 rounded-xl obsidian-card border border-amber-500/10 space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-white">امنیت واقعی، نه قفل اسباب‌بازی</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed text-justify">
              به جای ابزارهای خودکار سطحی، مثل یک دزد باهوش تمام راه‌های نفوذ به سیستم شما رو پیدا و قفل می‌کنیم.
            </p>
          </div>

          <div className="p-5 rounded-xl obsidian-card border border-amber-500/10 space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/15 text-amber-400 border border-amber-500/25">
                <Server className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-white">پایدار روی اینترنت ایران</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed text-justify">
              برنامه‌ها جوری ساخته میشن که با هر بار اختلال یا کندی اینترنت بین‌الملل، کسب‌وکار شما لنگ نمونه.
            </p>
          </div>

          <div className="p-5 rounded-xl obsidian-card border border-amber-500/10 space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/15 text-amber-300 border border-amber-500/25">
                <Zap className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-white">ربات‌هایی که خستگی ندارن</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed text-justify">
              سپردن کارهای تکراری و خسته‌کننده به دستیارهای ماشینی که 24 ساعته بدون خطا انجامش میدن.
            </p>
          </div>

          <div className="p-5 rounded-xl obsidian-card border border-amber-500/10 space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-stone-800 text-stone-200 border border-amber-500/20">
                <UserCheck className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-white">حرف زدن مستقیم با خود سازنده</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed text-justify">
              بدون پاسکاری بین بازاریاب و پشتیبان؛ هر سوال یا سفارشی دارید، مستقیماً با خود من در میون می‌ذارید.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

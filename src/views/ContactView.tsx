import React, { useState } from 'react';
import { Phone, Mail, Bot, Copy, Check, ArrowUpRight, MessageSquare, ShieldAlert, Clock } from 'lucide-react';

export const ContactView: React.FC = () => {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(id);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="obsidian-card rounded-2xl p-6 sm:p-8 border border-amber-500/15 space-y-2">
        <div className="text-xs font-semibold tracking-widest text-amber-400/90 uppercase">
          ارتباط مستقیم و ثبت سفارش
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          راه‌های دسترسی مستقیم به آرشا محمدی (ar2Ha)
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
          بدون نیاز به معطل شدن پشت خط یا فرم‌های پیچیده اداری؛ هر سوال یا سفارشی دارید از طریق راه‌های زیر مستقیماً به گوش من می‌رسد.
        </p>
      </div>

      {/* 3 Main Contact Channels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Phone & Telegram */}
        <div className="obsidian-card obsidian-card-interactive rounded-2xl p-6 sm:p-8 border border-amber-500/15 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-400/15 border border-amber-400/30 text-amber-300 flex items-center justify-center">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-1">تماس تلفنی و تلگرام</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                برای صحبت مستقیم، هماهنگی کارها و چت راحت در پیام‌رسان تلگرام
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-black/75 border border-white/5 flex items-center justify-between">
              <span className="font-mono text-base font-bold text-amber-300 dir-ltr">
                09189330810
              </span>
              <button
                onClick={() => copyToClipboard('09189330810', 'phone')}
                className="p-1.5 rounded-md hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="کپی شماره"
              >
                {copiedItem === 'phone' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <a
              href="tel:09189330810"
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-stone-900 border border-white/10 text-xs font-semibold text-slate-200 hover:bg-stone-800 hover:text-white transition-colors"
            >
              <span>تماس تلفنی با من</span>
            </a>
            <a
              href="https://t.me/+989189330810"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-amber-400/15 border border-amber-400/30 text-xs font-semibold text-amber-300 hover:bg-amber-400/25 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>پیام در تلگرام (09189330810)</span>
            </a>
          </div>
        </div>

        {/* Telegram Assistant Bot */}
        <div className="obsidian-card obsidian-card-interactive rounded-2xl p-6 sm:p-8 border border-amber-500/15 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-1">ربات منشی تلگرام</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                هر ساعت از شبانه‌روز پیام بدید یا فایلی بفرستید، ربات فوراً به دست من می‌رسونه
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-black/75 border border-white/5 flex items-center justify-between">
              <span className="font-mono text-base font-bold text-emerald-300 dir-ltr">
                @ar2HaAgentBot
              </span>
              <button
                onClick={() => copyToClipboard('@ar2HaAgentBot', 'bot')}
                className="p-1.5 rounded-md hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="کپی آی‌دی ربات"
              >
                {copiedItem === 'bot' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="pt-2">
            <a
              href="https://t.me/ar2HaAgentBot"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-black text-xs font-bold hover:brightness-110 transition-all shadow-lg shadow-emerald-500/20"
            >
              <Bot className="w-4 h-4 text-black" />
              <span>ارسال پیام به ربات منشی تلگرام</span>
              <ArrowUpRight className="w-4 h-4 text-black" />
            </a>
          </div>
        </div>

        {/* Official Email */}
        <div className="obsidian-card obsidian-card-interactive rounded-2xl p-6 sm:p-8 border border-amber-500/15 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-stone-800 border border-amber-500/25 text-amber-300 flex items-center justify-center">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-1">ارسال ایمیل مستقیم</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                مناسب ارسال اسناد، فایل‌های توضیحات طولانی و قراردادهای رسمی
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-black/75 border border-white/5 flex items-center justify-between">
              <span className="font-mono text-sm font-bold text-amber-200 dir-ltr truncate max-w-[190px]">
                ar2HaKord@gmail.com
              </span>
              <button
                onClick={() => copyToClipboard('ar2HaKord@gmail.com', 'email')}
                className="p-1.5 rounded-md hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="کپی ایمیل"
              >
                {copiedItem === 'email' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="pt-2">
            <a
              href="mailto:ar2HaKord@gmail.com"
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-stone-900 border border-white/10 text-xs font-semibold text-slate-200 hover:bg-stone-800 hover:text-white transition-colors"
            >
              <Mail className="w-4 h-4 text-amber-400" />
              <span>نوشتن ایمیل به من</span>
            </a>
          </div>
        </div>

      </div>

      {/* Trust & Guarantee Box */}
      <div className="obsidian-card rounded-2xl p-6 border border-amber-500/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
        <div className="flex items-center gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0" />
          <p className="leading-relaxed">
            خیالتون راحت باشه؛ هر صحبتی یا فایلی که برای پروژه‌تون می‌فرستید پیش من امانت می‌مونه و هیچ اطلاعاتی جایی درز پیدا نمی‌کنه.
          </p>
        </div>
        <div className="flex items-center gap-2 text-slate-400 shrink-0 font-mono">
          <Clock className="w-4 h-4 text-emerald-400" />
          <span>پاسخگویی سریع</span>
        </div>
      </div>
    </div>
  );
};

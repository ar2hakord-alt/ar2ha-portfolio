import React, { useState } from 'react';
import { Phone, Mail, Bot, Copy, Check, ArrowUpRight, MessageSquare, ShieldAlert } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(id);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-14 space-y-3">
          <div className="text-xs font-semibold tracking-widest text-amber-400/90 uppercase">
            کانال‌های مستقیم و رسمی
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            ارتباط مستقیم و ثبت سفارش پروژه
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            بدون منشی تلفنی معطل‌کننده یا پیام‌های از پیش ضبط‌شده رباتیک. درخواست‌های جدی در سریع‌ترین زمان توسط آرشا محمدی بررسی و پاسخ داده می‌شوند.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Phone & Telegram Direct */}
          <div className="obsidian-surface rounded-2xl p-6 sm:p-8 border border-white/10 flex flex-col justify-between space-y-6 group hover:border-amber-400/30 transition-all">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">شماره تماس و تلگرام مستقیم</h3>
                <p className="text-xs text-zinc-400">
                  جهت تماس مستقیم، هماهنگی جلسات و پیام در پیام‌رسان تلگرام
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-white/5 flex items-center justify-between">
                <span className="font-mono text-base font-bold text-amber-300 dir-ltr">
                  09189330810
                </span>
                <button
                  onClick={() => copyToClipboard('09189330810', 'phone')}
                  className="p-1.5 rounded-md hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  title="کپی شماره"
                >
                  {copiedItem === 'phone' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <a
                href="tel:09189330810"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-lg bg-zinc-900 border border-zinc-700/60 text-xs font-semibold text-zinc-200 hover:bg-zinc-800 hover:text-white transition-colors"
              >
                <span>برقراری تماس تلفنی</span>
              </a>
              <a
                href="https://t.me/+989189330810"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-lg bg-amber-400/10 border border-amber-400/20 text-xs font-semibold text-amber-300 hover:bg-amber-400/20 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>پیام در تلگرام (09189330810)</span>
              </a>
            </div>
          </div>

          {/* Card 2: Dedicated Telegram Bot */}
          <div className="obsidian-surface rounded-2xl p-6 sm:p-8 border border-white/10 flex flex-col justify-between space-y-6 group hover:border-amber-400/30 transition-all">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 flex items-center justify-center">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">ربات منشی اختصاصی تلگرام</h3>
                <p className="text-xs text-zinc-400">
                  ثبت 24 ساعته شرح سفارش، دریافت فایل سناریو و فوروارد بی‌درنگ
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-white/5 flex items-center justify-between">
                <span className="font-mono text-base font-bold text-emerald-300 dir-ltr">
                  @ar2HaAgentBot
                </span>
                <button
                  onClick={() => copyToClipboard('@ar2HaAgentBot', 'bot')}
                  className="p-1.5 rounded-md hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
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
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-black text-xs font-bold hover:brightness-110 transition-all shadow-lg shadow-emerald-500/15"
              >
                <Bot className="w-4 h-4 text-black" />
                <span>شروع گفتگو با ربات منشی (@ar2HaAgentBot)</span>
                <ArrowUpRight className="w-4 h-4 text-black" />
              </a>
            </div>
          </div>

          {/* Card 3: Official Email */}
          <div className="obsidian-surface rounded-2xl p-6 sm:p-8 border border-white/10 flex flex-col justify-between space-y-6 group hover:border-amber-400/30 transition-all">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-sky-400/10 border border-sky-400/20 text-sky-400 flex items-center justify-center">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">مکاتبات رسمی و قرارداد</h3>
                <p className="text-xs text-zinc-400">
                  جهت ارسال RFP، مستندات محرمانه، قراردادها و جزئیات قرارداد NDA
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-white/5 flex items-center justify-between">
                <span className="font-mono text-sm font-bold text-sky-300 dir-ltr truncate max-w-[200px]">
                  ar2HaKord@gmail.com
                </span>
                <button
                  onClick={() => copyToClipboard('ar2HaKord@gmail.com', 'email')}
                  className="p-1.5 rounded-md hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  title="کپی ایمیل"
                >
                  {copiedItem === 'email' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="mailto:ar2HaKord@gmail.com"
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-lg bg-zinc-900 border border-zinc-700/60 text-xs font-semibold text-zinc-200 hover:bg-zinc-800 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-sky-400" />
                <span>ارسال مستقیم ایمیل</span>
              </a>
            </div>
          </div>

        </div>

        {/* Note on National Intranet & Confidentiality */}
        <div className="mt-8 p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <div className="flex items-center gap-2.5">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              تمام تعاملات فنی در صورت نیاز پروژه، تحت قرارداد عدم افشای اطلاعات (NDA) محرمانه باقی می‌مانند.
            </span>
          </div>
          <span className="font-mono text-zinc-500">IRAN NATIONAL NET READY</span>
        </div>

      </div>
    </section>
  );
};

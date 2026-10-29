import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, Phone, ShieldCheck, ArrowUpRight, Copy, Check, Terminal, Layers, ArrowLeft } from 'lucide-react';
import { NavView } from '../components/RightSidebarNav';
import { BrandLogo } from '../components/BrandLogo';

interface OverviewViewProps {
  onNavigate: (view: NavView) => void;
  projectsCount: number;
}

export const OverviewView: React.FC<OverviewViewProps> = ({ onNavigate, projectsCount }) => {
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopyPhone = () => {
    navigator.clipboard.writeText('09189330810');
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <div className="space-y-12">
      {/* Top Hero Monolith Container */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6, ease: [0.21, 1, 0.36, 1] }}
        className="obsidian-card rounded-2xl p-6 sm:p-10 border border-white/10 relative overflow-hidden shadow-2xl"
      >
        {/* Subtle interior lighting */}
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Main Typography Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Unboxed Metadata */}
            <div className="flex items-center gap-3 text-xs tracking-wider text-slate-400">
              <span className="text-amber-400 font-semibold">پایگاه تخصصی ar2Ha</span>
              <span aria-hidden="true" className="text-stone-600">/</span>
              <span>روان و پایدار روی اینترنت ایران</span>
              <span aria-hidden="true" className="text-stone-600">/</span>
              <span className="text-emerald-400 font-medium font-mono">100% واقعی و دست‌اول</span>
            </div>

            {/* Signature & Name */}
            <div className="space-y-2">
              <div className="flex items-center gap-4 flex-wrap">
                <BrandLogo size="hero" />
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                  آرشا محمدی
                </h1>
              </div>
              <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed">
                امنیت و ضد هک · ساخت وب‌سایت‌های کاری · ربات‌های هوشمند تلگرام · برنامه‌های موبایل
              </p>
            </div>

            {/* Everyday Understandable Bio with Subtle Wit */}
            <div className="p-4 sm:p-5 rounded-xl bg-black/60 border border-amber-500/25 text-slate-200 text-xs sm:text-sm leading-relaxed text-justify space-y-2">
              <p>
                «خیلی ساده بخوام بگم: من کارم اینه که مطمئن بشم سیستم شما سوراخی نداره که دزدها اطلاعاتتون رو ببرن، سایت‌هایی براتون بسازم که لنگ نمونن و وسط کار قفل نکنن، و ربات‌هایی بسازم که به جای نشستن چند ساعته پای گوشی، کارهای روزمره و پاسخ به مشتری رو بی‌وقفه و دقیق انجام بدن. اینجا خبری از اصطلاحات عجیب‌وغریب انگلیسی برای گیج کردن مشتری نیست؛ فقط کار واقعی، تمیز و تضمین‌شده.»
              </p>
            </div>

            {/* Actions Hub */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="https://t.me/ar2HaAgentBot"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-black text-xs sm:text-sm font-bold hover:brightness-105 transition-all shadow-lg shadow-amber-400/20 whitespace-nowrap cursor-pointer"
              >
                <Bot className="w-4 h-4 text-black" />
                <span>شروع گفتگو با ربات منشی (@ar2HaAgentBot)</span>
                <ArrowUpRight className="w-4 h-4 text-black" />
              </a>

              <button
                onClick={() => onNavigate('domains')}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-stone-900 border border-amber-500/20 text-xs sm:text-sm font-medium text-slate-200 hover:bg-stone-800 hover:text-white transition-all whitespace-nowrap cursor-pointer"
              >
                <Terminal className="w-4 h-4 text-amber-400" />
                <span>من چه کارهایی براتون انجام میدم؟</span>
              </button>

              <button
                onClick={handleCopyPhone}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-stone-900/80 border border-stone-800 text-xs sm:text-sm font-medium text-slate-300 hover:text-white transition-all whitespace-nowrap cursor-pointer"
                title="کلیک برای کپی شماره"
              >
                <Phone className="w-4 h-4 text-stone-400" />
                <span className="font-mono dir-ltr">09189330810</span>
                {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-stone-500" />}
              </button>
            </div>

          </div>

          {/* Visual Monolith Card: Pure Architectural Technology Core */}
          <div className="lg:col-span-5 flex items-stretch">
            <div className="relative w-full h-[340px] sm:h-[400px] lg:h-full rounded-2xl overflow-hidden border border-amber-500/20 group shadow-[0_0_35px_rgba(0,0,0,0.8)]">
              <img
                src="/ar2ha-portfolio/images/hero_ar2ha_cyber_luxury_1793256821465.jpg"
                alt="ar2Ha Digital Monolith"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080b09] via-black/30 to-transparent" />
              
              {/* Monolith infrastructure overlay */}
              <div className="absolute bottom-4 right-4 left-4 p-4 rounded-xl bg-black/85 backdrop-blur-md border border-amber-500/25 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-amber-400 font-bold font-mono tracking-wider">ar2Ha INFRASTRUCTURE</span>
                  <div className="flex items-center gap-1.5 font-mono text-[11px] text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]" />
                    <span>آماده خدمت</span>
                  </div>
                </div>
                <p className="text-xs text-slate-300">
                  معماری پایدار و امن؛ طراحی‌شده برای کارکرد همیشگی بدون افت سرعت
                </p>
              </div>
            </div>
          </div>

        </div>

      </motion.div>

      {/* Grid of Key Operating Pillars in Everyday Clear Terms */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Pillar 1 */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, delay: 0.05, ease: [0.21, 1, 0.36, 1] }}
          onClick={() => onNavigate('domains')}
          className="obsidian-card obsidian-card-interactive rounded-2xl p-6 border border-amber-500/15 cursor-pointer space-y-4 group"
        >
          <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors flex items-center justify-between">
              <span>جلوگیری از هک و سرقت اطلاعات</span>
              <ArrowLeft className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-amber-400" />
            </h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              قبل از اینکه کسی بیاد باج‌خواهی کنه یا اطلاعات مشتری‌ها لو بره، تمام قفل و بست‌های سیستم شما رو امتحان و نفوذناپذیر می‌کنیم.
            </p>
          </div>
        </motion.div>

        {/* Pillar 2 */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.21, 1, 0.36, 1] }}
          onClick={() => onNavigate('projects')}
          className="obsidian-card obsidian-card-interactive rounded-2xl p-6 border border-amber-500/15 cursor-pointer space-y-4 group"
        >
          <div className="w-12 h-12 rounded-xl bg-amber-400/15 border border-amber-400/30 text-amber-300 flex items-center justify-center">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors flex items-center justify-between">
              <span>کارنامه واقعی، بدون ادعای الکی</span>
              <ArrowLeft className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-amber-400" />
            </h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              توی اینترنت همه ادعای استادی دارن! من فقط کارهایی رو ثبت می‌کنم که خودم ساختم و روی زمین وجود واقعی دارن.
            </p>
          </div>
        </motion.div>

        {/* Pillar 3 */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, delay: 0.25, ease: [0.21, 1, 0.36, 1] }}
          onClick={() => onNavigate('contact')}
          className="obsidian-card obsidian-card-interactive rounded-2xl p-6 border border-amber-500/15 cursor-pointer space-y-4 group"
        >
          <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors flex items-center justify-between">
              <span>ارتباط مستقیم و بدون معطلی</span>
              <ArrowLeft className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-amber-400" />
            </h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              با کارمند منشی یا واسطه‌ها حرف نمی‌زنید؛ مستقیماً با خود من در ارتباطید تا کار دقیق و بدون سوءتفاهم پیش بره.
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

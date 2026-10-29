import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DOMAINS } from '../data/domains';
import { CategoryType } from '../types';
import { Shield, Globe, Bot, Smartphone, Sparkles, Quote, Terminal } from 'lucide-react';
import { MotionDragBar } from '../components/MotionDragBar';

export const DomainsView: React.FC = () => {
  const [selectedDomain, setSelectedDomain] = useState<CategoryType>('penetration_testing');

  const getDomainIcon = (id: CategoryType) => {
    switch (id) {
      case 'penetration_testing':
        return <Shield className="w-5 h-5 text-emerald-400" />;
      case 'web':
        return <Globe className="w-5 h-5 text-amber-400" />;
      case 'bots':
        return <Bot className="w-5 h-5 text-amber-500" />;
      case 'android':
        return <Smartphone className="w-5 h-5 text-sky-400" />;
      case 'other':
        return <Sparkles className="w-5 h-5 text-purple-400" />;
    }
  };

  const activeDomain = DOMAINS.find((d) => d.id === selectedDomain) || DOMAINS[0];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: [0.21, 1, 0.36, 1] }}
        className="obsidian-card rounded-2xl p-6 sm:p-8 border border-white/10 space-y-2"
      >
        <div className="text-xs font-semibold tracking-widest text-amber-400/90 uppercase">
          ارزیابی صریح و تحلیلی
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          حوزه‌های تخصصی و واقعیت میدانی کار
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-3xl">
          تعریف بی‌پرده از هر حوزه بدون اصطلاحات تبلیغاتی؛ توانمندی‌های واقعی در تست نفوذ، وب، بات، اندروید و پروژه‌های سفارشی.
        </p>
      </motion.div>

      {/* Motion Sensor Drag Bar for Domains (Drag to reveal Android & Other) */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45, delay: 0.1, ease: [0.21, 1, 0.36, 1] }}
      >
        <MotionDragBar hintText="با کشیدن به راست یا چپ به حوزه‌های اندروید و پروژه‌های آینده دسترسی پیدا کنید">
          {DOMAINS.map((domain) => {
            const isActive = domain.id === selectedDomain;
            return (
              <button
                key={domain.id}
                onClick={() => setSelectedDomain(domain.id)}
                className={`flex items-center gap-2.5 px-5 py-3 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40 shadow-lg'
                    : 'bg-zinc-900/70 text-zinc-400 border border-white/5 hover:bg-zinc-800 hover:text-white'
                }`}
              >
                {getDomainIcon(domain.id)}
                <span>{domain.title}</span>
              </button>
            );
          })}
        </MotionDragBar>
      </motion.div>

      {/* Main Selected Domain Showcase Bento */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left/Content Box with scroll-triggered entry */}
        <motion.div
          key={`content-${activeDomain.id}`}
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, ease: [0.21, 1, 0.36, 1] }}
          className="lg:col-span-7 obsidian-card rounded-2xl p-6 sm:p-8 border border-white/10 flex flex-col justify-between space-y-6"
        >
          <div className="space-y-6">
            
            <div className="flex items-center gap-3.5 border-b border-white/5 pb-4">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                {getDomainIcon(activeDomain.id)}
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {activeDomain.title}
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  {activeDomain.subtitle}
                </p>
              </div>
            </div>

            {/* Quote Box */}
            <div className="p-5 rounded-xl bg-zinc-950/80 border border-amber-500/25 relative space-y-2">
              <div className="flex items-start gap-3">
                <Quote className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <p className="text-sm text-amber-200/90 leading-relaxed font-medium text-justify">
                  {activeDomain.humorQuote}
                </p>
              </div>
            </div>

            {/* Reality Check */}
            <div className="space-y-2">
              <div className="text-xs font-semibold text-zinc-400 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span>رویکرد اجرایی و استاندارد فنی:</span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed text-justify">
                {activeDomain.realityCheck}
              </p>
            </div>

          </div>

          {/* Unboxed Competencies & Toolchain */}
          <div className="border-t border-white/5 pt-5 space-y-3">
            <div className="text-xs text-zinc-400 font-medium">
              تخصص‌ها و ابزارهای مرتبط:
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-zinc-300">
              {activeDomain.skills.map((skill, index) => (
                <React.Fragment key={skill}>
                  <span className="font-mono text-zinc-200 hover:text-amber-300 transition-colors">{skill}</span>
                  {index < activeDomain.skills.length - 1 && (
                    <span aria-hidden="true" className="text-zinc-600">·</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

        </motion.div>

        {/* Right/Visual Box with scroll-triggered entry */}
        <motion.div
          key={`visual-${activeDomain.id}`}
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, delay: 0.12, ease: [0.21, 1, 0.36, 1] }}
          className="lg:col-span-5 obsidian-card rounded-2xl p-2 border border-white/10 flex flex-col justify-between overflow-hidden group"
        >
          <div className="relative w-full h-[320px] lg:h-full rounded-xl overflow-hidden min-h-[300px]">
            <img
              src={activeDomain.image}
              alt={activeDomain.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080a0e] via-black/30 to-transparent" />
            
            <div className="absolute bottom-4 right-4 left-4 p-4 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 space-y-1">
              <div className="text-[11px] font-mono text-amber-400">
                FIELD PROTOCOL
              </div>
              <div className="text-sm font-bold text-white">
                {activeDomain.title}
              </div>
              <div className="text-xs text-zinc-400">
                پیاده‌سازی مستقیم بدون خطای انسانی
              </div>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Expertise Cards Track with Horizontal Scroll / Drag and Side Indicators */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between px-1">
          <div className="text-xs font-semibold text-zinc-400">
            مرور سریع و مقایسه‌ای ۵ حوزه تخصصی (با قابلیت درگ یا کلیک):
          </div>
        </div>

        <MotionDragBar
          hintText="کارت‌های تخصصی را به چپ و راست بکشید تا همه حوزه‌ها را مقایسه کنید"
          containerClassName="gap-4 pb-4"
        >
          {DOMAINS.map((d, index) => {
            const isSelected = selectedDomain === d.id;
            return (
              <motion.div
                key={d.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: [0.21, 1, 0.36, 1] }}
                onClick={() => setSelectedDomain(d.id)}
                className={`w-72 sm:w-80 shrink-0 p-5 rounded-2xl obsidian-card obsidian-card-interactive border cursor-pointer select-none transition-all ${
                  isSelected
                    ? 'border-amber-400/60 bg-amber-400/10 shadow-lg shadow-amber-400/10'
                    : 'border-white/10 hover:border-amber-400/30'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                      {getDomainIcon(d.id)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{d.title}</h4>
                      <span className="text-[10px] font-mono text-amber-400/80">حوزه {index + 1} از 5</span>
                    </div>
                  </div>
                  {isSelected && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">
                      انتخاب‌شده
                    </span>
                  )}
                </div>
                <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed">
                  {d.subtitle}
                </p>
              </motion.div>
            );
          })}
        </MotionDragBar>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DOMAINS } from '../data/domains';
import { CategoryType } from '../types';
import { Shield, Globe, Bot, Smartphone, Sparkles, Quote, Terminal } from 'lucide-react';
import { MotionDragBar } from './MotionDragBar';

export const DomainsSection: React.FC = () => {
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

  const activeDomainData = DOMAINS.find((d) => d.id === selectedDomain) || DOMAINS[0];

  return (
    <section id="domains" className="py-24 border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.21, 1, 0.36, 1] }}
          className="max-w-3xl mb-12 space-y-3"
        >
          <div className="text-xs font-semibold tracking-widest text-amber-400/90 uppercase">
            ستون‌های فنی و عملیاتی
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            حوزه‌های تخصصی بدون پرده‌پوشی
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            تعریف صریح، تجربی و صادقانه از کارهایی که در واقعیت انجام میدم؛ به دور از اصطلاحات توخالی مارکتینگ.
          </p>
        </motion.div>

        {/* Motion Sensor Drag Bar for Domains */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, delay: 0.1, ease: [0.21, 1, 0.36, 1] }}
          className="mb-8"
        >
          <MotionDragBar hintText="با کشیدن به راست یا چپ حوزه‌های مختلف را مشاهده کنید">
            {DOMAINS.map((domain) => {
              const isActive = domain.id === selectedDomain;
              return (
                <button
                  key={domain.id}
                  onClick={() => setSelectedDomain(domain.id)}
                  className={`flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold rounded-lg transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-amber-400/15 text-amber-300 border border-amber-400/30 shadow-md'
                      : 'bg-zinc-900/60 text-zinc-400 border border-white/5 hover:bg-zinc-800 hover:text-zinc-200'
                  }`}
                >
                  {getDomainIcon(domain.id)}
                  <span>{domain.title}</span>
                </button>
              );
            })}
          </MotionDragBar>
        </motion.div>

        {/* Dynamic Bento Box Showcase for Selected Domain */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Detailed Content Card */}
          <motion.div
            key={`section-content-${activeDomainData.id}`}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55, ease: [0.21, 1, 0.36, 1] }}
            className="lg:col-span-7 obsidian-surface rounded-2xl p-6 sm:p-8 border border-white/10 flex flex-col justify-between space-y-8"
          >
            <div className="space-y-6">
              
              <div className="flex items-center justify-between gap-4 border-b border-white/5 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                    {getDomainIcon(activeDomainData.id)}
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                      {activeDomainData.title}
                    </h3>
                    <p className="text-xs text-zinc-400">
                      {activeDomainData.subtitle}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bitter Witty Quote Box */}
              <div className="p-5 rounded-xl bg-zinc-950/70 border border-amber-500/20 relative">
                <div className="flex items-start gap-3">
                  <Quote className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-sm sm:text-base text-amber-200/90 leading-relaxed font-medium">
                    {activeDomainData.humorQuote}
                  </p>
                </div>
              </div>

              {/* Reality Check */}
              <div className="space-y-2">
                <div className="text-xs font-semibold text-zinc-400 flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-zinc-500" />
                  <span>واقعیت فنی و رویکرد اجرایی:</span>
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed text-justify">
                  {activeDomainData.realityCheck}
                </p>
              </div>

            </div>

            {/* Unboxed Competencies & Toolchain (Anti-Pill Rule) */}
            <div className="border-t border-white/5 pt-5 space-y-3">
              <div className="text-xs text-zinc-400 font-medium">
                تکنیک‌ها، استانداردها و ابزارها:
              </div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-zinc-300">
                {activeDomainData.skills.map((skill, index) => (
                  <React.Fragment key={skill}>
                    <span className="hover:text-amber-300 transition-colors font-mono">{skill}</span>
                    {index < activeDomainData.skills.length - 1 && (
                      <span aria-hidden="true" className="text-zinc-600">·</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

          {/* Detailed Content Card */}
          </motion.div>

          {/* Visual Showcase Card */}
          <motion.div
            key={`section-visual-${activeDomainData.id}`}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55, delay: 0.12, ease: [0.21, 1, 0.36, 1] }}
            className="lg:col-span-5 obsidian-surface rounded-2xl p-2 border border-white/10 overflow-hidden flex flex-col group"
          >
            <div className="relative w-full h-full min-h-[340px] rounded-xl overflow-hidden">
              <img
                src={activeDomainData.image}
                alt={activeDomainData.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              
              <div className="absolute bottom-4 right-4 left-4 p-4 rounded-xl bg-black/70 backdrop-blur-md border border-white/10">
                <div className="text-xs font-mono text-zinc-400 mb-1">
                  DOMAIN SPECIFICATION
                </div>
                <div className="text-sm font-bold text-white">
                  {activeDomainData.title}
                </div>
                <div className="text-xs text-zinc-400 mt-1">
                  رویکرد مستقیم بدون واسطه فنی
                </div>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

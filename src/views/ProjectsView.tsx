import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ProjectItem, CategoryType } from '../types';
import { CATEGORY_LABELS } from '../data/domains';
import { ExternalLink, ShieldCheck, Plus, Calendar, Award, Edit2, Trash2, LayoutGrid, Columns } from 'lucide-react';
import { NavView } from '../components/RightSidebarNav';
import { MotionDragBar } from '../components/MotionDragBar';

interface ProjectsViewProps {
  projects: ProjectItem[];
  isAuthenticated: boolean;
  onNavigate: (view: NavView) => void;
  onDeleteProject: (id: string) => void;
  onEditProject: (project: ProjectItem) => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  projects,
  isAuthenticated,
  onNavigate,
  onDeleteProject,
  onEditProject
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProjectModal, setSelectedProjectModal] = useState<ProjectItem | null>(null);
  const [layoutMode, setLayoutMode] = useState<'carousel' | 'grid'>('carousel');

  const filterCategories = [
    { id: 'all', label: 'همه کارهای انجام‌شده' },
    { id: 'penetration_testing', label: 'امنیت و ضد هک' },
    { id: 'web', label: 'سایت‌های کاری' },
    { id: 'bots', label: 'ربات‌های خودکار' },
    { id: 'android', label: 'برنامه‌های موبایل' },
    { id: 'other', label: 'کارهای خاص و متفرقه' }
  ];

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  const getCategoryBadgeClass = (cat: CategoryType) => {
    switch (cat) {
      case 'penetration_testing':
        return 'text-emerald-400 bg-emerald-500/15 border-emerald-500/25';
      case 'web':
        return 'text-amber-400 bg-amber-500/15 border-amber-500/25';
      case 'bots':
        return 'text-amber-300 bg-amber-400/15 border-amber-400/25';
      case 'android':
        return 'text-slate-300 bg-slate-500/15 border-slate-500/25';
      case 'other':
        return 'text-amber-200 bg-amber-600/15 border-amber-600/25';
    }
  };

  const renderProjectCard = (item: ProjectItem, index: number, isCarousel: boolean = false) => (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.21, 1, 0.36, 1] }}
      className={`obsidian-card obsidian-card-interactive rounded-2xl p-6 border border-white/10 flex flex-col justify-between group shadow-xl ${
        isCarousel ? 'w-80 sm:w-96 shrink-0 select-none' : 'w-full'
      }`}
    >
      <div className="space-y-4">
        {/* Category & Date Header */}
        <div className="flex items-center justify-between gap-3 text-xs">
          <span className={`px-2.5 py-1 rounded-md text-[11px] font-medium border ${getCategoryBadgeClass(item.category)}`}>
            {CATEGORY_LABELS[item.category]}
          </span>
          <div className="flex items-center gap-1.5 text-zinc-400 text-xs font-mono">
            <Calendar className="w-3.5 h-3.5 text-zinc-500" />
            <span>{item.date}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
          {item.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-zinc-300 leading-relaxed line-clamp-3">
          {item.description}
        </p>

        {/* Key Achievement */}
        {item.keyAchievement && (
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
            <div className="text-[11px] text-amber-400 font-semibold flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" />
              <span>دستاورد یا نتیجه کلیدی:</span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              {item.keyAchievement}
            </p>
          </div>
        )}

        {/* Technologies */}
        {item.technologies && item.technologies.length > 0 && (
          <div className="pt-2">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-zinc-400 font-mono">
              {item.technologies.map((t, idx) => (
                <React.Fragment key={idx}>
                  <span className="text-zinc-300">{t}</span>
                  {idx < item.technologies.length - 1 && (
                    <span aria-hidden="true" className="text-zinc-600">/</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Card Footer Controls */}
      <div className="border-t border-white/5 pt-4 mt-5 flex items-center justify-between gap-3">
        <button
          onClick={() => setSelectedProjectModal(item)}
          className="text-xs font-semibold text-zinc-300 hover:text-white transition-colors cursor-pointer"
        >
          مشاهده جزئیات کامل ←
        </button>

        <div className="flex items-center gap-2">
          {item.link && (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg bg-zinc-900 border border-white/10 text-zinc-300 hover:text-amber-300 transition-colors"
              title="لینک پروژه"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}

          {isAuthenticated && (
            <>
              <button
                onClick={() => onEditProject(item)}
                className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 hover:bg-amber-500/20 transition-colors cursor-pointer"
                title="ویرایش پروژه"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onDeleteProject(item.id)}
                className="p-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 hover:bg-rose-500/20 transition-colors cursor-pointer"
                title="حذف پروژه"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: [0.21, 1, 0.36, 1] }}
        className="obsidian-card rounded-2xl p-6 sm:p-8 border border-amber-500/15 flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <div className="space-y-2 max-w-2xl">
          <div className="text-xs font-semibold tracking-widest text-amber-400/90 uppercase">
            کارنامه واقعی و کارهای ثبت‌شده
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            کارهای واقعی، بدون رزومه دروغین
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            اینجا خبری از اسم بردن از شرکت‌های خیالی برای گول زدن مشتری نیست؛ پروژه‌ها مستقیماً توسط خودم در قالب منظم زیر ثبت میشن.
          </p>
        </div>

        <button
          onClick={() => onNavigate('owner')}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-400 text-black text-xs sm:text-sm font-semibold hover:bg-amber-300 transition-all shrink-0 shadow-lg shadow-amber-400/15 cursor-pointer self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{isAuthenticated ? 'ثبت کار جدید در کارنامه' : 'ورود مالک جهت ثبت کارنامه'}</span>
        </button>
      </motion.div>

      {/* Motion Sensor Drag Bar for Project Categories */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45, delay: 0.08, ease: [0.21, 1, 0.36, 1] }}
      >
        <MotionDragBar hintText="با کشیدن به راست یا چپ بین دسته‌بندی‌های کارنامه جابجا شوید">
          {filterCategories.map((item) => {
            const isActive = activeCategory === item.id;
            const count = item.id === 'all' 
              ? projects.length 
              : projects.filter(p => p.category === item.id).length;

            return (
              <button
                key={item.id}
                onClick={() => setActiveCategory(item.id)}
                className={`px-4 py-2.5 text-xs font-medium rounded-xl transition-all duration-200 whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-amber-400 text-black font-bold shadow-md'
                    : 'bg-black/60 text-slate-300 hover:text-white hover:bg-stone-900 border border-amber-500/10'
                }`}
              >
                <span>{item.label}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${isActive ? 'bg-black/20 text-black font-bold' : 'bg-stone-800 text-slate-400'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </MotionDragBar>
      </motion.div>

      {/* Structured Layout Container */}
      {filteredProjects.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.21, 1, 0.36, 1] }}
          className="obsidian-card rounded-2xl p-10 sm:p-14 text-center border border-amber-500/15 max-w-2xl mx-auto space-y-5 shadow-2xl"
        >
          <div className="w-14 h-14 rounded-2xl bg-amber-400/10 border border-amber-400/25 text-amber-400 flex items-center justify-center mx-auto">
            <ShieldCheck className="w-7 h-7" />
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white">
              اینجا خالی از رزومه فیک و دروغینه!
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed text-justify sm:text-center">
              برای اینکه به شعور مخاطب احترام گذاشته بشه، هیچ پروژه ساختگی اینجا پر نشده. به عنوان مالک سایت می‌تونید از طریق پنل مدیریت با نام و رمزتون وارد بشید و کارهای واقعی‌تون رو در قالب منظم زیر ثبت کنید.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={() => onNavigate('owner')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-stone-900 border border-amber-500/20 text-xs sm:text-sm font-semibold text-slate-200 hover:text-white hover:bg-stone-800 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4 text-amber-400" />
              <span>{isAuthenticated ? 'ورود به فرم ثبت کار جدید' : 'ورود مالک سایت جهت ثبت کارنامه'}</span>
            </button>
          </div>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {/* Controls Bar: Count and View Switcher */}
          <div className="flex items-center justify-between px-1">
            <div className="text-xs font-semibold text-zinc-400">
              نمایش {filteredProjects.length} پروژه ثبت‌شده
            </div>

            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/60 border border-white/5">
              <button
                type="button"
                onClick={() => setLayoutMode('carousel')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  layoutMode === 'carousel'
                    ? 'bg-amber-400 text-black font-semibold shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
                title="نمایش ردیفی با نشانگرهای کناری و قابلیت درگ"
              >
                <Columns className="w-3.5 h-3.5" />
                <span>ردیفی (درگ افقی)</span>
              </button>
              <button
                type="button"
                onClick={() => setLayoutMode('grid')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  layoutMode === 'grid'
                    ? 'bg-amber-400 text-black font-semibold shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
                title="نمایش شبکه‌ای"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>شبکه‌ای</span>
              </button>
            </div>
          </div>

          {layoutMode === 'carousel' ? (
            <MotionDragBar
              hintText="کارت‌های کارنامه را به چپ و راست بکشید تا همه پروژه‌ها را بررسی کنید"
              containerClassName="gap-6 pb-4"
            >
              {filteredProjects.map((item, index) => renderProjectCard(item, index, true))}
            </MotionDragBar>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((item, index) => renderProjectCard(item, index, false))}
            </div>
          )}
        </div>
      )}

      {/* Project Lightbox Modal */}
      {selectedProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="obsidian-card rounded-2xl max-w-2xl w-full p-6 sm:p-8 border border-white/15 max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <span className={`px-2.5 py-1 rounded text-xs font-medium border ${getCategoryBadgeClass(selectedProjectModal.category)}`}>
                  {CATEGORY_LABELS[selectedProjectModal.category]}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  {selectedProjectModal.title}
                </h3>
                <div className="text-xs text-zinc-400 mt-1 font-mono">
                  زمان اجرا: {selectedProjectModal.date}
                </div>
              </div>
              <button
                onClick={() => setSelectedProjectModal(null)}
                className="text-zinc-400 hover:text-white p-1 rounded-lg text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-bold text-zinc-400 mb-2">شرح کامل سناریو و عملکرد فنی:</h4>
                <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed whitespace-pre-line text-justify">
                  {selectedProjectModal.description}
                </p>
              </div>

              {selectedProjectModal.keyAchievement && (
                <div className="p-4 rounded-xl bg-amber-400/5 border border-amber-400/20">
                  <h4 className="text-xs font-bold text-amber-300 mb-1">دستاورد و خروجی کلیدی:</h4>
                  <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed">
                    {selectedProjectModal.keyAchievement}
                  </p>
                </div>
              )}

              {selectedProjectModal.technologies && selectedProjectModal.technologies.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-zinc-400 mb-2">ابزارها و تکنولوژی‌های مورد استفاده:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProjectModal.technologies.map((t, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded bg-zinc-900 border border-white/10 text-xs font-mono text-zinc-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedProjectModal.link && (
                <div className="pt-2">
                  <a
                    href={selectedProjectModal.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 text-black text-xs font-semibold hover:bg-amber-300 transition-all"
                  >
                    <span>مشاهده آدرس یا ریپازیتوری پروژه</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>

            <div className="border-t border-white/10 pt-4 flex justify-end">
              <button
                onClick={() => setSelectedProjectModal(null)}
                className="px-4 py-2 text-xs font-medium text-zinc-400 hover:text-white cursor-pointer"
              >
                بستن پنجره
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

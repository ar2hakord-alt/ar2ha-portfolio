import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ProjectItem, CategoryType } from '../types';
import { CATEGORY_LABELS } from '../data/domains';
import { ExternalLink, Shield, Plus, Lock, Calendar, Layers, Award, Edit2, Trash2 } from 'lucide-react';

interface ProjectsSectionProps {
  projects: ProjectItem[];
  isAuthenticated: boolean;
  onOpenOwnerModal: (initialTab?: 'add' | 'list') => void;
  onDeleteProject?: (id: string) => void;
  onEditProject?: (project: ProjectItem) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  isAuthenticated,
  onOpenOwnerModal,
  onDeleteProject,
  onEditProject
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProjectModal, setSelectedProjectModal] = useState<ProjectItem | null>(null);

  const filterCategories = [
    { id: 'all', label: 'همه دستاوردها' },
    { id: 'penetration_testing', label: 'تست نفوذ و امنیت' },
    { id: 'web', label: 'توسعه وب' },
    { id: 'bots', label: 'ربات‌سازی' },
    { id: 'android', label: 'اپلیکیشن اندروید' },
    { id: 'other', label: 'حوزه‌های ویژه و غیره' }
  ];

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  const getCategoryBadgeClass = (cat: CategoryType) => {
    switch (cat) {
      case 'penetration_testing':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'web':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case 'bots':
        return 'text-amber-300 bg-amber-400/10 border-amber-400/20';
      case 'android':
        return 'text-sky-400 bg-sky-500/10 border-sky-500/20';
      case 'other':
        return 'text-purple-400 bg-purple-500/10 border-purple-500/20';
    }
  };

  return (
    <section id="projects" className="py-24 border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.21, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div className="space-y-3 max-w-2xl">
            <div className="text-xs font-semibold tracking-widest text-amber-400/90 uppercase">
              کارنامه رسمی و مستند
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              پروژه‌ها و دستاوردهای ثبت‌شده
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
              این پلتفرم از نمونه‌کارهای نمایشی و فیک پاکسازی شده است. کلیه موارد ذیل صرفاً با احراز و تایید شخص آرشا محمدی در قالب ساختاریافته به نمایش درمی‌آیند.
            </p>
          </div>

          {isAuthenticated && (
            <button
              onClick={() => onOpenOwnerModal('add')}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-black bg-amber-400 rounded-lg hover:bg-amber-300 transition-all self-start md:self-auto shrink-0 shadow-lg shadow-amber-400/10"
            >
              <Plus className="w-4 h-4" />
              <span>افزودن دستاورد جدید به قالب</span>
            </button>
          )}
        </motion.div>

        {/* Filter Controls (Functional segmented buttons) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {filterCategories.map((item) => {
            const isActive = activeCategory === item.id;
            const count = item.id === 'all' 
              ? projects.length 
              : projects.filter(p => p.category === item.id).length;

            return (
              <button
                key={item.id}
                onClick={() => setActiveCategory(item.id)}
                className={`px-4 py-2 text-xs font-medium rounded-lg transition-all duration-200 whitespace-nowrap shrink-0 flex items-center gap-2 ${
                  isActive
                    ? 'bg-zinc-100 text-zinc-950 font-semibold shadow-sm'
                    : 'bg-zinc-900/60 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 border border-white/5'
                }`}
              >
                <span>{item.label}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${isActive ? 'bg-zinc-300 text-zinc-900' : 'bg-zinc-800 text-zinc-400'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Predefined Grid Template for Registered Projects */}
        {filteredProjects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.21, 1, 0.36, 1] }}
            className="obsidian-surface rounded-2xl p-10 sm:p-14 text-center border border-white/10 max-w-3xl mx-auto my-6 space-y-5"
          >
            <div className="w-14 h-14 rounded-2xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center mx-auto">
              <Shield className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">
                هیچ رزومه فیک یا ساختگی در این بخش وجود ندارد
              </h3>
              <p className="text-zinc-400 text-sm max-w-lg mx-auto leading-relaxed text-justify sm:text-center">
                همان‌طور که در مرامنامه ar2Ha مشخص شده، اطلاعات نمایشی حذف شده‌اند. به عنوان مالک سایت می‌توانید از طریق پنل مدیریت با نام کاربری و رمز اختصاصی وارد شده و پروژه‌های واقعی خود را در قالب از پیش‌تعیین‌شده ثبت کنید.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onOpenOwnerModal(isAuthenticated ? 'add' : 'list')}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-zinc-200 bg-zinc-900 border border-zinc-700 rounded-lg hover:bg-zinc-800 hover:text-white transition-all"
              >
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>{isAuthenticated ? 'ورود به فرم ثبت دستاورد جدید' : 'ورود مالک سایت جهت ثبت پروژه'}</span>
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.55, delay: index * 0.08, ease: [0.21, 1, 0.36, 1] }}
                className="obsidian-surface rounded-2xl p-6 border border-white/10 flex flex-col justify-between hover:border-amber-400/30 transition-all duration-300 group shadow-lg"
              >
                <div className="space-y-4">
                  
                  {/* Category Header & Meta */}
                  <div className="flex items-center justify-between gap-3 text-xs">
                    <span className={`px-2.5 py-1 rounded-md text-[11px] font-medium border ${getCategoryBadgeClass(item.category)}`}>
                      {CATEGORY_LABELS[item.category]}
                    </span>
                    <div className="flex items-center gap-1.5 text-zinc-400 text-xs font-mono">
                      <Calendar className="w-3 h-3 text-zinc-500" />
                      <span>{item.date}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed line-clamp-3">
                    {item.description}
                  </p>

                  {/* Key Achievement Box (Predefined Template Requirement) */}
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

                  {/* Tech Stack Unboxed Metadata */}
                  {item.technologies && item.technologies.length > 0 && (
                    <div className="pt-2">
                      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-zinc-400 font-mono">
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

                {/* Footer Controls of the Project Card */}
                <div className="border-t border-white/5 pt-4 mt-5 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setSelectedProjectModal(item)}
                    className="text-xs font-semibold text-zinc-300 hover:text-white transition-colors"
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
                        title="مشاهده لینک پروژه"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}

                    {/* Owner in-place controls */}
                    {isAuthenticated && (
                      <>
                        <button
                          onClick={() => onEditProject && onEditProject(item)}
                          className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 hover:bg-amber-500/20 transition-colors"
                          title="ویرایش پروژه"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onDeleteProject && onDeleteProject(item.id)}
                          className="p-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 hover:bg-rose-500/20 transition-colors"
                          title="حذف پروژه"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </>
                    )}
                  </div>
                </div>

              </motion.div>
            ))}
          </div>
        )}

      </div>

      {/* Lightbox / Details Modal */}
      {selectedProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="obsidian-surface rounded-2xl max-w-2xl w-full p-6 sm:p-8 border border-white/15 max-h-[90vh] overflow-y-auto space-y-6">
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
                className="text-zinc-400 hover:text-white p-1 rounded-lg text-lg"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-bold text-zinc-400 mb-2">شرح کامل سناریو و عملکرد فنی:</h4>
                <p className="text-sm text-zinc-200 leading-relaxed whitespace-pre-line text-justify">
                  {selectedProjectModal.description}
                </p>
              </div>

              {selectedProjectModal.keyAchievement && (
                <div className="p-4 rounded-xl bg-amber-400/5 border border-amber-400/20">
                  <h4 className="text-xs font-bold text-amber-300 mb-1">دستاورد و خروجی کلیدی:</h4>
                  <p className="text-sm text-zinc-200 leading-relaxed">
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
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-black bg-amber-400 rounded-lg hover:bg-amber-300 transition-all"
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
                className="px-4 py-2 text-xs font-medium text-zinc-400 hover:text-white"
              >
                بستن پنجره
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

import React, { useState, useEffect } from 'react';
import { ProjectItem, CategoryType } from '../types';
import { loginOwner, logoutOwner, addProject, updateProject, deleteProject, exportProjectsJSON, importProjectsJSON } from '../utils/storage';
import { CATEGORY_LABELS } from '../data/domains';
import { Lock, UserCheck, Plus, List, Download, Upload, LogOut, Check, AlertCircle, Save, Edit3, Trash2 } from 'lucide-react';
import { NavView } from '../components/RightSidebarNav';
import { BrandLogo } from '../components/BrandLogo';

interface OwnerViewProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (val: boolean) => void;
  projects: ProjectItem[];
  onProjectsUpdated: () => void;
  editingProject: ProjectItem | null;
  setEditingProject: (p: ProjectItem | null) => void;
  onNavigate: (view: NavView) => void;
}

export const OwnerView: React.FC<OwnerViewProps> = ({
  isAuthenticated,
  setIsAuthenticated,
  projects,
  onProjectsUpdated,
  editingProject,
  setEditingProject,
  onNavigate
}) => {
  const [activeTab, setActiveTab] = useState<'add' | 'list' | 'backup'>('add');

  // Login form state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Project form state
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<CategoryType>('penetration_testing');
  const [date, setDate] = useState('1404');
  const [description, setDescription] = useState('');
  const [keyAchievement, setKeyAchievement] = useState('');
  const [techInput, setTechInput] = useState('');
  const [link, setLink] = useState('');
  const [confidential, setConfidential] = useState(false);
  const [formSuccess, setFormSuccess] = useState('');
  const [backupNotice, setBackupNotice] = useState('');

  useEffect(() => {
    if (editingProject) {
      setTitle(editingProject.title);
      setCategory(editingProject.category);
      setDate(editingProject.date);
      setDescription(editingProject.description);
      setKeyAchievement(editingProject.keyAchievement || '');
      setTechInput(editingProject.technologies ? editingProject.technologies.join(', ') : '');
      setLink(editingProject.link || '');
      setConfidential(!!editingProject.confidential);
      setActiveTab('add');
    }
  }, [editingProject]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const success = loginOwner(username, password);
    if (success) {
      setIsAuthenticated(true);
      setUsername('');
      setPassword('');
    } else {
      setLoginError('اطلاعات ورود نامعتبر است. دسترسی فقط برای مالک سایت (ar2Haآرشا) مجاز است.');
    }
  };

  const handleLogout = () => {
    logoutOwner();
    setIsAuthenticated(false);
  };

  const resetForm = () => {
    setTitle('');
    setCategory('penetration_testing');
    setDate('1404');
    setDescription('');
    setKeyAchievement('');
    setTechInput('');
    setLink('');
    setConfidential(false);
    setEditingProject(null);
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert('لطفاً عنوان و شرح کامل پروژه را وارد نمایید.');
      return;
    }

    const technologies = techInput
      .split(/[,،]+/)
      .map((t) => t.trim())
      .filter(Boolean);

    if (editingProject) {
      updateProject({
        ...editingProject,
        title: title.trim(),
        category,
        date: date.trim(),
        description: description.trim(),
        keyAchievement: keyAchievement.trim(),
        technologies,
        link: link.trim() || undefined,
        confidential
      });
      setFormSuccess('پروژه با موفقیت ویرایش شد و در بخش کارنامه قرار گرفت.');
    } else {
      addProject({
        title: title.trim(),
        category,
        date: date.trim(),
        description: description.trim(),
        keyAchievement: keyAchievement.trim(),
        technologies,
        link: link.trim() || undefined,
        confidential
      });
      setFormSuccess('پروژه جدید با موفقیت در قالب منظم کارنامه ثبت شد.');
    }

    onProjectsUpdated();
    resetForm();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('آیا از حذف این پروژه از کارنامه سایت مطمئن هستید؟')) {
      deleteProject(id);
      onProjectsUpdated();
    }
  };

  const handleExportJSON = () => {
    const jsonStr = exportProjectsJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ar2Ha_portfolio_backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setBackupNotice('نسخه پشتیبان JSON با موفقیت ذخیره شد.');
    setTimeout(() => setBackupNotice(''), 3000);
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = importProjectsJSON(content);
      if (success) {
        onProjectsUpdated();
        setBackupNotice('اطلاعات پشتیبان با موفقیت بازگردانی شد و در سایت قرار گرفت.');
      } else {
        alert('فایل انتخاب شده معتبر نمی‌باشد.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl mx-auto">
      {/* Header */}
      <div className="obsidian-card rounded-2xl p-6 sm:p-8 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="text-xs font-semibold tracking-widest text-[#d4af37] uppercase">
            میز کار اختصاصی آرشا
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              مدیریت و ثبت دستاوردهای واقعی
            </h2>
            <BrandLogo size="sm" />
          </div>
          <p className="text-xs text-stone-300">
            هر پروژه‌ای که با موفقیت تحویل دادی رو اینجا بنویس تا خودکار و تمیز توی ویترین کارنامه سایت قرار بگیره؛ بدون دستکاری کد یا نیاز به هیچ سرور پولی.
          </p>
        </div>

        {isAuthenticated && (
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-900 border border-white/10 text-xs font-semibold text-stone-300 hover:text-rose-400 transition-colors self-start sm:self-auto cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>خروج از حساب</span>
          </button>
        )}
      </div>

      {!isAuthenticated ? (
        /* Login Form */
        <div className="obsidian-card rounded-2xl p-8 sm:p-12 border border-white/10 max-w-md mx-auto space-y-6 shadow-2xl">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-[#c5a059]/10 border border-[#c5a059]/30 text-[#d4af37] flex items-center justify-center mx-auto">
              <Lock className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white">ورود اختصاصی مالک سایت</h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              این بخش فقط مخصوص خود آرشاست تا کارنامه‌های واقعی‌اش را بنویسد؛ تماشاگران عادی نیازی به ورود ندارند.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-stone-200">نام کاربری اختصاصی:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="نام کاربری..."
                className="w-full px-4 py-3 rounded-xl bg-[#0d120e] border border-white/10 text-white text-sm focus:border-[#d4af37] outline-none transition-colors"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-stone-200">رمز عبور امنیتی:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="رمز عبور..."
                className="w-full px-4 py-3 rounded-xl bg-[#0d120e] border border-white/10 text-white text-sm focus:border-[#d4af37] outline-none transition-colors font-mono"
                required
              />
            </div>

            {loginError && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#c5a059] hover:bg-[#d4af37] text-black font-bold text-sm transition-colors shadow-lg shadow-[#c5a059]/20 cursor-pointer"
            >
              تأیید هویت و ورود به میز کار
            </button>
          </form>
        </div>
      ) : (
        /* Authenticated Management Panel */
        <div className="obsidian-card rounded-2xl p-6 sm:p-8 border border-white/10 space-y-6 shadow-2xl">
          
          {/* Tabs */}
          <div className="flex items-center gap-2 border-b border-white/10 pb-4 overflow-x-auto scrollbar-none">
            <button
              onClick={() => {
                resetForm();
                setActiveTab('add');
              }}
              className={`flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'add'
                  ? 'bg-[#c5a059] text-black shadow-md'
                  : 'text-stone-300 hover:text-white hover:bg-stone-900'
              }`}
            >
              <Plus className="w-4 h-4" />
              <span>{editingProject ? 'ویرایش پروژه انتخابی' : 'ثبت کار جدید'}</span>
            </button>

            <button
              onClick={() => setActiveTab('list')}
              className={`flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'list'
                  ? 'bg-[#c5a059] text-black shadow-md'
                  : 'text-stone-300 hover:text-white hover:bg-stone-900'
              }`}
            >
              <List className="w-4 h-4" />
              <span>کارهای ثبت‌شده در سایت ({projects.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('backup')}
              className={`flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'backup'
                  ? 'bg-[#c5a059] text-black shadow-md'
                  : 'text-stone-300 hover:text-white hover:bg-stone-900'
              }`}
            >
              <Download className="w-4 h-4" />
              <span>پشتیبان‌گیری و ذخیره آفلاین</span>
            </button>
          </div>

          {/* Form Tab */}
          {activeTab === 'add' && (
            <form onSubmit={handleSaveProject} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                {/* Category Selection */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-stone-200">این کار مربوط به کدام بخش است؟</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as CategoryType)}
                    className="w-full px-4 py-3 rounded-xl bg-[#0d120e] border border-white/10 text-white text-xs sm:text-sm focus:border-[#d4af37] outline-none"
                  >
                    <option value="penetration_testing">امنیت و ضد هک (یافتن و رفع سوراخ‌های نفوذ)</option>
                    <option value="web">ساخت وبسایت و برنامه‌های آنلاین (سریع، تمیز و پایدار)</option>
                    <option value="bots">ربات‌سازی و دستیارهای خودکار (تلگرام و وب)</option>
                    <option value="android">اپلیکیشن‌های موبایل اندروید</option>
                    <option value="other">کارهای پژوهشی نو و معماهای فنی سخت</option>
                  </select>
                </div>

                {/* Title */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-stone-200">عنوان کار یا پروژه:</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="مثلاً: ایمن‌سازی فروشگاه آنلاین، ربات سفارش‌گیر خودکار..."
                    className="w-full px-4 py-3 rounded-xl bg-[#0d120e] border border-white/10 text-white text-xs sm:text-sm focus:border-[#d4af37] outline-none"
                    required
                  />
                </div>

              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                {/* Date */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-stone-200">سال یا زمان انجام:</label>
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="مثلاً: پاییز 1403 یا سال 1404"
                    className="w-full px-4 py-3 rounded-xl bg-[#0d120e] border border-white/10 text-white text-xs sm:text-sm focus:border-[#d4af37] outline-none"
                    required
                  />
                </div>

                {/* Link */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-stone-200">لینک مشاهده یا سورس (اختیاری):</label>
                  <input
                    type="url"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-4 py-3 rounded-xl bg-[#0d120e] border border-white/10 text-white text-xs sm:text-sm focus:border-[#d4af37] outline-none dir-ltr font-mono"
                  />
                </div>

              </div>

              {/* Key Achievement */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-stone-200">نتیجه و فایده عینی کار برای مشتری (خیلی مهم):</label>
                <input
                  type="text"
                  value={keyAchievement}
                  onChange={(e) => setKeyAchievement(e.target.value)}
                  placeholder="مثلاً: جلوگیری از هک درگاه پرداخت، کاهش زمان سفارش‌گیری از ۳ ساعت به ۱۰ ثانیه..."
                  className="w-full px-4 py-3 rounded-xl bg-[#0d120e] border border-white/10 text-white text-xs sm:text-sm focus:border-[#d4af37] outline-none"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-stone-200">توضیح کار به زبان ساده و خودمانی:</label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="مشکل اولیه چی بود؟ با چه روشی حلش کردی؟ کارفرما از چی راضی بود؟ جوری بنویس که حتی فرد غیرفنی هم بخونه سریع ارزش واقعی کارت رو متوجه بشه..."
                  className="w-full px-4 py-3 rounded-xl bg-[#0d120e] border border-white/10 text-white text-xs sm:text-sm focus:border-[#d4af37] outline-none"
                  required
                />
              </div>

              {/* Technologies */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-stone-200">ابزارها یا زبان‌های استفاده‌شده (با ویرگول جدا کن):</label>
                <input
                  type="text"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  placeholder="Python, Burp Suite, Kotlin, Docker, Telegram Bot API"
                  className="w-full px-4 py-3 rounded-xl bg-[#0d120e] border border-white/10 text-white text-xs sm:text-sm focus:border-[#d4af37] outline-none font-mono dir-ltr"
                />
              </div>

              {/* NDA Toggle */}
              <div className="flex items-center gap-3 p-4 rounded-xl bg-[#0d120e]/80 border border-white/5">
                <input
                  type="checkbox"
                  id="confidentialCheck"
                  checked={confidential}
                  onChange={(e) => setConfidential(e.target.checked)}
                  className="w-4 h-4 rounded text-[#c5a059] focus:ring-0 bg-stone-900 border-stone-700 cursor-pointer"
                />
                <label htmlFor="confidentialCheck" className="text-xs text-stone-300 cursor-pointer">
                  این پروژه محرمانه است و نام کارفرما و اطلاعات حساس در صفحه عمومی پوشیده می‌ماند.
                </label>
              </div>

              {formSuccess && (
                <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 shrink-0 text-emerald-400" />
                    <span className="font-medium">{formSuccess}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onNavigate('projects')}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-500 text-black text-xs font-bold hover:bg-emerald-400 transition-colors cursor-pointer self-start sm:self-auto"
                  >
                    <span>مشاهده فوری در صفحه کارنامه‌ها ←</span>
                  </button>
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-2">
                {editingProject && (
                  <button
                    type="button"
                    onClick={() => {
                      resetForm();
                      setActiveTab('list');
                    }}
                    className="px-5 py-3 text-xs font-medium text-stone-400 hover:text-white cursor-pointer"
                  >
                    انصراف از ویرایش
                  </button>
                )}
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-[#c5a059] hover:bg-[#d4af37] text-black font-bold text-xs sm:text-sm transition-colors shadow-lg shadow-[#c5a059]/20 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingProject ? 'ذخیره تغییرات' : 'ثبت قطعی در کارنامه سایت'}</span>
                </button>
              </div>
            </form>
          )}

          {/* List Tab */}
          {activeTab === 'list' && (
            <div className="space-y-4">
              {projects.length === 0 ? (
                <div className="p-8 text-center border border-white/5 rounded-xl space-y-3">
                  <p className="text-stone-400 text-xs sm:text-sm">
                    هنوز هیچ پروژه‌ای ثبت نشده است (هیچ کار فیک یا تستی نمایش داده نمی‌شود). با زدن دکمه «ثبت کار جدید»، اولین دستاورد واقعی خودت را اضافه کن.
                  </p>
                  <button
                    onClick={() => setActiveTab('add')}
                    className="px-5 py-2.5 text-xs font-bold bg-[#c5a059] text-black rounded-lg hover:bg-[#d4af37] cursor-pointer"
                  >
                    ثبت اولین کار واقعی
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {projects.map((p) => (
                    <div
                      key={p.id}
                      className="p-4 sm:p-5 rounded-xl bg-[#0d120e] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-white/15 transition-colors"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] text-[#d4af37] font-medium">
                            {CATEGORY_LABELS[p.category]}
                          </span>
                          <span className="text-stone-600">·</span>
                          <span className="text-xs text-stone-400 font-mono">{p.date}</span>
                        </div>
                        <h4 className="text-sm sm:text-base font-bold text-white">{p.title}</h4>
                        <p className="text-xs text-stone-300 line-clamp-1">{p.description}</p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                        <button
                          onClick={() => {
                            setEditingProject(p);
                            setActiveTab('add');
                          }}
                          className="p-2.5 rounded-lg bg-stone-900 text-stone-300 hover:text-[#d4af37] hover:bg-stone-800 transition-colors cursor-pointer"
                          title="ویرایش"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="p-2.5 rounded-lg bg-stone-900 text-stone-300 hover:text-rose-400 hover:bg-stone-800 transition-colors cursor-pointer"
                          title="حذف"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Backup Tab */}
          {activeTab === 'backup' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                <h4 className="text-sm font-bold text-white">پشتیبان‌گیری کاملاً رایگان و بدون اینترنت خارجی</h4>
                <p className="text-xs text-stone-300 leading-relaxed text-justify">
                  تمام اطلاعات پروژه‌ها به صورت یک فایل متنی سبک (JSON) مستقیماً روی حافظه خود رایانه شما ذخیره می‌شود. هیچ دیتابیس خارجی یا اشتراک ماهانه‌ای در کار نیست و حتی در صورت قطعی اینترنت هم همه‌چیز دست خودت می‌ماند.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl obsidian-card border border-white/10 space-y-3">
                  <div className="text-xs font-bold text-[#d4af37]">خروجی گرفتن و دانلود (Export)</div>
                  <p className="text-xs text-stone-400 leading-normal">
                    دانلود فایل پشتیبان تا خیالت بابت نگهداری پروژه‌ها کاملاً راحت باشه.
                  </p>
                  <button
                    onClick={handleExportJSON}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#c5a059] text-black text-xs font-semibold hover:bg-[#d4af37] transition-colors w-full justify-center cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>دانلود فایل پشتیبان JSON</span>
                  </button>
                </div>

                <div className="p-5 rounded-xl obsidian-card border border-white/10 space-y-3">
                  <div className="text-xs font-bold text-emerald-300">بازگردانی اطلاعات از فایل (Import)</div>
                  <p className="text-xs text-stone-400 leading-normal">
                    اگر روی سیستم دیگری رفتی، فایل پشتیبانت را انتخاب کن تا فوراً در سایت چیده شود.
                  </p>
                  <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-900 border border-stone-700 text-stone-200 text-xs font-semibold hover:bg-stone-800 transition-colors w-full justify-center cursor-pointer">
                    <Upload className="w-4 h-4 text-emerald-400" />
                    <span>انتخاب و بازگردانی فایل</span>
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImportJSON}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {backupNotice && (
                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>{backupNotice}</span>
                </div>
              )}
            </div>
          )}

        </div>
      )}
    </div>
  );
};

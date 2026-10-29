import React, { useState, useEffect } from 'react';
import { ProjectItem, CategoryType } from '../types';
import { loginOwner, logoutOwner, addProject, updateProject, deleteProject, exportProjectsJSON, importProjectsJSON } from '../utils/storage';
import { CATEGORY_LABELS } from '../data/domains';
import { Lock, UserCheck, Plus, List, Download, Upload, LogOut, Check, AlertCircle, Save, X, Edit3, Trash2 } from 'lucide-react';

interface OwnerModalProps {
  isOpen: boolean;
  onClose: () => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (val: boolean) => void;
  projects: ProjectItem[];
  onProjectsUpdated: () => void;
  editingProject: ProjectItem | null;
  setEditingProject: (p: ProjectItem | null) => void;
  initialTab?: 'add' | 'list';
}

export const OwnerModal: React.FC<OwnerModalProps> = ({
  isOpen,
  onClose,
  isAuthenticated,
  setIsAuthenticated,
  projects,
  onProjectsUpdated,
  editingProject,
  setEditingProject,
  initialTab = 'add'
}) => {
  const [activeTab, setActiveTab] = useState<'add' | 'list' | 'backup'>(initialTab);

  // Login form state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Project form state
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<CategoryType>('penetration_testing');
  const [date, setDate] = useState('۱۴۰۴');
  const [description, setDescription] = useState('');
  const [keyAchievement, setKeyAchievement] = useState('');
  const [techInput, setTechInput] = useState('');
  const [link, setLink] = useState('');
  const [confidential, setConfidential] = useState(false);
  const [formSuccess, setFormSuccess] = useState('');

  // Backup state
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

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const success = loginOwner(username, password);
    if (success) {
      setIsAuthenticated(true);
      setUsername('');
      setPassword('');
    } else {
      setLoginError('اطلاعات ورود نامعتبر است. دسترسی فقط برای مالک سایت مجاز است.');
    }
  };

  const handleLogout = () => {
    logoutOwner();
    setIsAuthenticated(false);
    onClose();
  };

  const resetForm = () => {
    setTitle('');
    setCategory('penetration_testing');
    setDate('۱۴۰۴');
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
      alert('لطفاً عنوان و شرح پروژه را وارد کنید.');
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
      setFormSuccess('پروژه با موفقیت ویرایش و در سایت به‌روز شد.');
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
      setFormSuccess('پروژه جدید با موفقیت ثبت و بلافاصله در قالب کارنامه قرار گرفت.');
    }

    onProjectsUpdated();
    setTimeout(() => {
      setFormSuccess('');
      resetForm();
      setActiveTab('list');
    }, 1200);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('آیا از حذف این پروژه از کارنامه سایت اطمینان دارید؟')) {
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
    a.download = `ar2ha_projects_backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setBackupNotice('نسخه پشتیبان با موفقیت دانلود شد.');
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
        setBackupNotice('اطلاعات با موفقیت بازگردانی شد و در سایت قرار گرفت.');
      } else {
        alert('فایل انتخاب‌شده معتبر نمی‌باشد.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="obsidian-surface rounded-2xl max-w-3xl w-full p-6 sm:p-8 border border-white/15 max-h-[92vh] overflow-y-auto space-y-6 relative shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 left-6 text-zinc-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isAuthenticated ? (
          /* Authentication Screen */
          <div className="max-w-md mx-auto py-6 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-300 flex items-center justify-center mx-auto">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">ورود به پنل اختصاصی مالک سایت</h3>
              <p className="text-xs text-zinc-400">
                این بخش فقط مخصوص آرشا محمدی (ar2Ha) جهت درج و مدیریت کارنامه است.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-300">نام کاربری مالک:</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="نام کاربری اختصاصی..."
                  className="w-full px-4 py-2.5 rounded-lg bg-zinc-950 border border-white/10 text-white text-sm focus:border-amber-400 outline-none transition-colors"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-300">رمز عبور مالک:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="رمز عبور از پیش تعیین‌شده..."
                  className="w-full px-4 py-2.5 rounded-lg bg-zinc-950 border border-white/10 text-white text-sm focus:border-amber-400 outline-none transition-colors font-mono"
                  required
                />
              </div>

              {loginError && (
                <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-amber-400 text-black font-semibold text-sm hover:bg-amber-300 transition-colors shadow-lg shadow-amber-400/10 cursor-pointer"
              >
                تایید احراز هویت و ورود
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="space-y-6">
            
            {/* Header with user status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-300 flex items-center justify-center">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <span>پنل مدیریت مالک: آرشا محمدی (ar2Ha)</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono">
                      AUTHENTICATED
                    </span>
                  </h3>
                  <p className="text-xs text-zinc-400">
                    ثبت، دسته‌بندی و ساماندهی مستقیم پروژه‌ها در ساختار اصلی سایت
                  </p>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-xs text-zinc-300 hover:text-rose-400 transition-colors self-start sm:self-auto cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>خروج از پنل</span>
              </button>
            </div>

            {/* Dashboard Tabs */}
            <div className="flex items-center gap-2 border-b border-white/5 pb-2">
              <button
                onClick={() => {
                  resetForm();
                  setActiveTab('add');
                }}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'add'
                    ? 'bg-amber-400 text-black'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                <Plus className="w-4 h-4" />
                <span>{editingProject ? 'ویرایش پروژه انتخابی' : 'ثبت دستاورد جدید'}</span>
              </button>

              <button
                onClick={() => setActiveTab('list')}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'list'
                    ? 'bg-amber-400 text-black'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                <List className="w-4 h-4" />
                <span>لیست کارنامه‌ها ({projects.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('backup')}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'backup'
                    ? 'bg-amber-400 text-black'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                <Download className="w-4 h-4" />
                <span>پشتیبان‌گیری / بازیابی JSON</span>
              </button>
            </div>

            {/* Tab 1: Add or Edit Project Form */}
            {activeTab === 'add' && (
              <form onSubmit={handleSaveProject} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Category Selection */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-300">موضوع / دسته‌بندی کارنامه:</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as CategoryType)}
                      className="w-full px-3 py-2.5 rounded-lg bg-zinc-950 border border-white/10 text-white text-xs sm:text-sm focus:border-amber-400 outline-none"
                    >
                      <option value="penetration_testing">تست نفوذ و امنیت سایبری</option>
                      <option value="web">توسعه وب و سامانه‌ها</option>
                      <option value="bots">ربات‌سازی و اتوماسیون (تلگرام/وب)</option>
                      <option value="android">اپلیکیشن‌های اندروید</option>
                      <option value="other">تحقیقات آینده و حوزه‌های خاص</option>
                    </select>
                  </div>

                  {/* Title */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-300">عنوان پروژه یا دستاورد:</label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="مثال: تست نفوذ سامانه پرداخت، بات اتوماسیون تلگرام..."
                      className="w-full px-3 py-2.5 rounded-lg bg-zinc-950 border border-white/10 text-white text-xs sm:text-sm focus:border-amber-400 outline-none"
                      required
                    />
                  </div>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Date / Period */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-300">سال / بازه زمانی:</label>
                    <input
                      type="text"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      placeholder="مثال: ۱۴۰۴ یا زمستان ۱۴۰۳"
                      className="w-full px-3 py-2.5 rounded-lg bg-zinc-950 border border-white/10 text-white text-xs sm:text-sm focus:border-amber-400 outline-none"
                      required
                    />
                  </div>

                  {/* Link (Optional) */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-300">آدرس لینک یا ریپازیتوری (اختیاری):</label>
                    <input
                      type="url"
                      value={link}
                      onChange={(e) => setLink(e.target.value)}
                      placeholder="https://github.com/... یا لینک دمو"
                      className="w-full px-3 py-2.5 rounded-lg bg-zinc-950 border border-white/10 text-white text-xs sm:text-sm focus:border-amber-400 outline-none dir-ltr font-mono"
                    />
                  </div>

                </div>

                {/* Key Achievement */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-zinc-300">دستاورد یا نتیجه کلیدی (خروجی عینی):</label>
                  <input
                    type="text"
                    value={keyAchievement}
                    onChange={(e) => setKeyAchievement(e.target.value)}
                    placeholder="مثال: کشف باگ بحرانی احراز هویت و رفع آن، هندلینگ ۱۰۰ هزار ریکوئست در روز..."
                    className="w-full px-3 py-2.5 rounded-lg bg-zinc-950 border border-white/10 text-white text-xs sm:text-sm focus:border-amber-400 outline-none"
                  />
                </div>

                {/* Detailed Description */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-zinc-300">توضیحات تکمیلی و شرح فنی:</label>
                  <textarea
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="شرح دقیق معماری، متدهای به کار رفته، چالش‌های امنیتی یا فنی پشت پروژه..."
                    className="w-full px-3 py-2.5 rounded-lg bg-zinc-950 border border-white/10 text-white text-xs sm:text-sm focus:border-amber-400 outline-none"
                    required
                  />
                </div>

                {/* Technologies */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-zinc-300">ابزارها و تکنولوژی‌ها (با کاما جدا کنید):</label>
                  <input
                    type="text"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    placeholder="مثال: Python, Burp Suite, Kotlin, Docker, WebSockets"
                    className="w-full px-3 py-2.5 rounded-lg bg-zinc-950 border border-white/10 text-white text-xs sm:text-sm focus:border-amber-400 outline-none font-mono dir-ltr"
                  />
                </div>

                {/* Confidential / NDA toggle */}
                <div className="flex items-center gap-3 p-3 rounded-lg bg-zinc-950/60 border border-white/5">
                  <input
                    type="checkbox"
                    id="confidentialCheck"
                    checked={confidential}
                    onChange={(e) => setConfidential(e.target.checked)}
                    className="w-4 h-4 rounded text-amber-400 focus:ring-0 bg-zinc-900 border-zinc-700 cursor-pointer"
                  />
                  <label htmlFor="confidentialCheck" className="text-xs text-zinc-300 cursor-pointer">
                    این پروژه تحت توافق محرمانگی (NDA) است و جزئیات هویتی کارفرما منتشر نمی‌شود.
                  </label>
                </div>

                {formSuccess && (
                  <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    <span>{formSuccess}</span>
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
                      className="px-4 py-2.5 text-xs font-medium text-zinc-400 hover:text-white cursor-pointer"
                    >
                      انصراف از ویرایش
                    </button>
                  )}
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-amber-400 text-black font-semibold text-xs sm:text-sm hover:bg-amber-300 transition-colors shadow-lg shadow-amber-400/10 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>{editingProject ? 'ذخیره تغییرات در کارنامه' : 'ثبت رسمی در قالب کارنامه سایت'}</span>
                  </button>
                </div>
              </form>
            )}

            {/* Tab 2: Manage Projects List */}
            {activeTab === 'list' && (
              <div className="space-y-4">
                {projects.length === 0 ? (
                  <div className="p-8 text-center border border-white/5 rounded-xl space-y-3">
                    <p className="text-zinc-400 text-sm">
                      هنوز هیچ پروژه‌ای ثبت نکرده‌اید. با کلیک بر روی «ثبت دستاورد جدید» می‌توانید اولین کارنامه را در قالب سایت جایگذاری کنید.
                    </p>
                    <button
                      onClick={() => setActiveTab('add')}
                      className="px-4 py-2 text-xs font-semibold bg-amber-400 text-black rounded-lg hover:bg-amber-300"
                    >
                      ثبت اولین پروژه
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {projects.map((p) => (
                      <div
                        key={p.id}
                        className="p-4 rounded-xl bg-zinc-950/80 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-white/15 transition-colors"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] text-amber-400 font-medium">
                              {CATEGORY_LABELS[p.category]}
                            </span>
                            <span className="text-zinc-600">·</span>
                            <span className="text-xs text-zinc-400 font-mono">{p.date}</span>
                          </div>
                          <h4 className="text-sm font-bold text-white">{p.title}</h4>
                          <p className="text-xs text-zinc-400 line-clamp-1">{p.description}</p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                          <button
                            onClick={() => {
                              setEditingProject(p);
                              setActiveTab('add');
                            }}
                            className="p-2 rounded-lg bg-zinc-900 text-zinc-300 hover:text-amber-300 hover:bg-zinc-800 transition-colors"
                            title="ویرایش"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(p.id)}
                            className="p-2 rounded-lg bg-zinc-900 text-zinc-300 hover:text-rose-400 hover:bg-zinc-800 transition-colors"
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

            {/* Tab 3: Backup and Restore */}
            {activeTab === 'backup' && (
              <div className="space-y-6">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                  <h4 className="text-sm font-bold text-white">پشتیبان‌گیری رایگان و ۱۰۰٪ مستقل</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed text-justify">
                    برای اینکه هیچ هزینه‌ای برای دیتابیس‌های ابری نپردازید و در بستر نت ملی هیچ وابستگی خارجی وجود نداشته باشد، اطلاعات کارنامه شما به شکل یک فایل استاندارد JSON ذخیره می‌شود. می‌توانید هر زمان یک نسخه از آن دانلود کرده یا روی مرورگر و دستگاه دیگر بارگذاری کنید.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded-xl obsidian-surface border border-white/10 space-y-3">
                    <div className="text-xs font-bold text-amber-300">خروجی گرفتن (Export)</div>
                    <p className="text-xs text-zinc-400 leading-normal">
                      دانلود فایل JSON حاوی تمام دستاوردها و کارنامه‌های ثبت شده تا کنون.
                    </p>
                    <button
                      onClick={handleExportJSON}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-amber-400 text-black text-xs font-semibold hover:bg-amber-300 transition-colors w-full justify-center"
                    >
                      <Download className="w-4 h-4" />
                      <span>دانلود فایل نسخه پشتیبان JSON</span>
                    </button>
                  </div>

                  <div className="p-5 rounded-xl obsidian-surface border border-white/10 space-y-3">
                    <div className="text-xs font-bold text-emerald-300">بارگذاری و بازیابی (Import)</div>
                    <p className="text-xs text-zinc-400 leading-normal">
                      آپلود فایل JSON قبلی جهت بازیابی سریع اطلاعات در سایت.
                    </p>
                    <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-zinc-900 border border-zinc-700 text-zinc-200 text-xs font-semibold hover:bg-zinc-800 transition-colors w-full justify-center cursor-pointer">
                      <Upload className="w-4 h-4 text-emerald-400" />
                      <span>انتخاب فایل JSON پشتیبان</span>
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
                  <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    <span>{backupNotice}</span>
                  </div>
                )}
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};

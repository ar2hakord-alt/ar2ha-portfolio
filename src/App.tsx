/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AtmosphericBackground } from './components/AtmosphericBackground';
import { RightSidebarNav, NavView } from './components/RightSidebarNav';
import { OverviewView } from './views/OverviewView';
import { DomainsView } from './views/DomainsView';
import { ProjectsView } from './views/ProjectsView';
import { PhilosophyView } from './views/PhilosophyView';
import { ContactView } from './views/ContactView';
import { OwnerView } from './views/OwnerView';
import { ProjectItem } from './types';
import { getProjects, checkAuth, deleteProject } from './utils/storage';
import { Shield, Sparkles, UserCheck, Lock } from 'lucide-react';

import { BrandLogo } from './components/BrandLogo';

export default function App() {
  const [currentView, setCurrentView] = useState<NavView>('overview');
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);

  useEffect(() => {
    setProjects(getProjects());
    setIsAuthenticated(checkAuth());
  }, []);

  const handleRefreshProjects = () => {
    setProjects(getProjects());
  };

  const handleEditProject = (proj: ProjectItem) => {
    setEditingProject(proj);
    setCurrentView('owner');
  };

  const handleDeleteProject = (id: string) => {
    if (window.confirm('آیا از حذف این پروژه از کارنامه سایت مطمئن هستید؟')) {
      deleteProject(id);
      handleRefreshProjects();
    }
  };

  return (
    <div className="min-h-screen bg-[#080a0e] text-zinc-100 flex flex-col relative selection:bg-amber-400 selection:text-black">
      {/* Visual Textured & Animated Ambient Canvas Backdrop */}
      <AtmosphericBackground />

      {/* Right Sidebar Icon Navigation Dock (Distinctive Right-Hand Rail on ALL Screens) */}
      <RightSidebarNav
        currentView={currentView}
        onSelectView={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        isAuthenticated={isAuthenticated}
        projectsCount={projects.length}
      />

      {/* Main Content Area: Robust right margin guaranteeing zero overlap with the semicircle dock on any screen */}
      <div className="relative z-10 flex-1 flex flex-col mr-22 sm:mr-24 lg:mr-28 xl:mr-32 pb-8 transition-all">
        
        {/* Top Minimalist Luxury Bar */}
        <header className="sticky top-0 z-30 w-full bg-[#080a0e]/80 backdrop-blur-md border-b border-white/5 py-4 px-4 sm:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentView('overview')}
              className="flex items-center gap-3 text-right group cursor-pointer"
            >
              <BrandLogo size="md" />
              <span className="text-xs text-zinc-400 font-medium">
                | آرشا محمدی
              </span>
            </button>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="hidden sm:inline-block text-zinc-400 font-mono">
              STATUS: SECURE · NET.IR
            </span>
            <button
              onClick={() => setCurrentView('owner')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                isAuthenticated
                  ? 'bg-amber-400/10 text-amber-300 border border-amber-400/30 hover:bg-amber-400/20'
                  : 'bg-zinc-900 text-zinc-300 border border-white/10 hover:bg-zinc-800 hover:text-white'
              }`}
            >
              {isAuthenticated ? (
                <>
                  <UserCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>پنل مالک</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5 text-zinc-400" />
                  <span>ورود مالک</span>
                </>
              )}
            </button>
          </div>
        </header>

        {/* Dynamic View Viewport */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {currentView === 'overview' && (
            <OverviewView
              onNavigate={(view) => {
                setCurrentView(view);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              projectsCount={projects.length}
            />
          )}

          {currentView === 'domains' && <DomainsView />}

          {currentView === 'projects' && (
            <ProjectsView
              projects={projects}
              isAuthenticated={isAuthenticated}
              onNavigate={(view) => {
                setCurrentView(view);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onDeleteProject={handleDeleteProject}
              onEditProject={handleEditProject}
            />
          )}

          {currentView === 'philosophy' && <PhilosophyView />}

          {currentView === 'contact' && <ContactView />}

          {currentView === 'owner' && (
            <OwnerView
              isAuthenticated={isAuthenticated}
              setIsAuthenticated={setIsAuthenticated}
              projects={projects}
              onProjectsUpdated={handleRefreshProjects}
              editingProject={editingProject}
              setEditingProject={setEditingProject}
              onNavigate={(view) => {
                setCurrentView(view);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}
        </main>

        {/* Quiet Luxury Footer */}
        <footer className="mt-auto border-t border-white/5 py-8 px-4 sm:px-8 text-center text-xs text-zinc-500">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <BrandLogo size="xs" />
              <span>·</span>
              <span>پلتفرم تخصصی آرشا محمدی</span>
            </div>
            <div className="flex items-center gap-3 font-mono text-[11px] text-zinc-500">
              <span>کلیه حقوق محفوظ است © 1404</span>
              <span>·</span>
              <span>IRAN NATIONAL NET STABLE</span>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}

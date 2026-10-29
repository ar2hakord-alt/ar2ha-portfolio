import { ProjectItem } from '../types';

const STORAGE_KEY = 'ar2ha_portfolio_projects_v1';
const AUTH_KEY = 'ar2ha_owner_authenticated_session';

// The owner credentials requested by user
const OWNER_USERNAME = 'ar2Haآرشا';
const OWNER_PASSWORD = 'ar2Ha1389';

export const getProjects = (): ProjectItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return [];
  } catch (e) {
    console.error('Error loading projects:', e);
    return [];
  }
};

export const saveProjects = (projects: ProjectItem[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  } catch (e) {
    console.error('Error saving projects:', e);
  }
};

export const addProject = (projectData: Omit<ProjectItem, 'id' | 'createdAt'>): ProjectItem => {
  const current = getProjects();
  const newItem: ProjectItem = {
    ...projectData,
    id: 'proj_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    createdAt: Date.now()
  };
  const updated = [newItem, ...current];
  saveProjects(updated);
  return newItem;
};

export const updateProject = (updatedItem: ProjectItem): void => {
  const current = getProjects();
  const updated = current.map((p) => (p.id === updatedItem.id ? updatedItem : p));
  saveProjects(updated);
};

export const deleteProject = (id: string): void => {
  const current = getProjects();
  const updated = current.filter((p) => p.id !== id);
  saveProjects(updated);
};

export const exportProjectsJSON = (): string => {
  const projects = getProjects();
  return JSON.stringify(projects, null, 2);
};

export const importProjectsJSON = (jsonString: string): boolean => {
  try {
    const parsed = JSON.parse(jsonString);
    if (Array.isArray(parsed)) {
      saveProjects(parsed);
      return true;
    }
    return false;
  } catch (e) {
    console.error('Failed to parse imported JSON', e);
    return false;
  }
};

export const checkAuth = (): boolean => {
  return sessionStorage.getItem(AUTH_KEY) === 'true';
};

export const loginOwner = (user: string, pass: string): boolean => {
  if (user.trim() === OWNER_USERNAME && pass.trim() === OWNER_PASSWORD) {
    sessionStorage.setItem(AUTH_KEY, 'true');
    return true;
  }
  return false;
};

export const logoutOwner = (): void => {
  sessionStorage.removeItem(AUTH_KEY);
};

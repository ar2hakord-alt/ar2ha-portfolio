export type CategoryType = 
  | 'penetration_testing'
  | 'web'
  | 'bots'
  | 'android'
  | 'other';

export interface ProjectItem {
  id: string;
  title: string;
  category: CategoryType;
  date: string;
  description: string;
  keyAchievement: string;
  technologies: string[];
  link?: string;
  confidential?: boolean;
  createdAt: number;
}

export interface DomainItem {
  id: CategoryType;
  title: string;
  subtitle: string;
  humorQuote: string;
  realityCheck: string;
  skills: string[];
  image: string;
  accentColor: string;
}

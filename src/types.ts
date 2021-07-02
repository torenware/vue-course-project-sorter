export interface Dictionary {
  [index: string]: string | Object;
}

export interface Project extends Dictionary {
  id: string;
  title: string;
}

export interface User extends Dictionary {
  id: string;
  fullName: string;
  projects: Project[];
}

export type SortParam = 'asc' | 'desc' | null;

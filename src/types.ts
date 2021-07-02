import type {ComputedRef, Ref} from 'vue';

export interface Project {
  id: string;
  title: string;
}

export interface User {
  id: string;
  fullName: string;
  projects: Project[];
}

// For our sortable items.
export type SortableItemsArray<T> = ComputedRef<T[] | Ref<T[]>>;

import { create } from 'zustand';

export const useFormStore = create((set) => ({
  title: '',
  description: '',
  updateTitle: (newTitle) => set({ title: newTitle }),
  updateDescription: (newDescription) => set({ description: newDescription }),
}));

export const useBlogPostStore = create((set) => ({
  blogPostList: [],
  pending: false,
  updateBlogPostList: (newList) => set({ blogPostList: newList }),
  updatePending: () => set(() => true ? false : false)
}));

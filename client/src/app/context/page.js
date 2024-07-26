import { create } from 'zustand';

export const useFormStore = create((set) => ({
  title: '',
  description: '',
  updateTitle: (newTitle) => set({ title: newTitle }),
  updateDescription: (newDescription) => set({ description: newDescription }),
}));

export const useBlogPostStore = create((set) => ({
  currentBlogPost: {},
  blogPostList: [],
  pending: false,
  updateCurrentBlogPost: (newPost) => set({ currentBlogPost: newPost }),
  updateBlogPostList: (newList) => set({ blogPostList: newList }),
  updatePending: (newState) => set({ pending: newState }),
}));

export const useEditBlogPostStore = create((set) => ({
  isEdit: false,
  updateIsEdit: (newState) => set({ isEdit: newState }),
}))

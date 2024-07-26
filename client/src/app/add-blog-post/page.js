'use client'

import { useRouter } from 'next/navigation';
import { useEffect } from "react";
import {
  useFormStore,
  useBlogPostStore,
  useEditBlogPostStore
} from '../context/page';
import Header from '@/app/components/header/page';
import axios from 'axios';

export default function AddNewBlogPost() {
  const router = useRouter();

  const formTitle = useFormStore((state) => state.title);
  const updateTitle = useFormStore((state) => state.updateTitle);
  const formDescription = useFormStore((state) => state.description);
  const updateDescription = useFormStore((state) => state.updateDescription);

  const currentBlogPost = useBlogPostStore((state) => state.currentBlogPost);
  const updateCurrentBlogPost = useBlogPostStore((state) => state.updateCurrentBlogPost);

  const isEdit = useEditBlogPostStore((state) => state.isEdit);
  const updateIsEdit = useEditBlogPostStore((state) => state.updateIsEdit);

  const apiUrl = 'https://mern-blog-9fbb.onrender.com/api/blog'
  const apiUrlDev = 'http://localhost:5001/api/blog'

  async function handleSaveBlogPostToDatabase() {
    const response = isEdit
      ? await axios.put(`${apiUrl}/update/${currentBlogPost._id}`, {
        title: formTitle,
        description: formDescription
      })
      : await axios.post(`${apiUrl}/add`, {
        title: formTitle,
        description: formDescription
      })
    const result = await response.data;

    if (result) {
      updateIsEdit(false);
      updateTitle('');
      updateDescription('');
      updateCurrentBlogPost({});
      router.push('/');
    }
  }

  useEffect(() => {
    if (currentBlogPost._id) {
      updateIsEdit(true);
      updateTitle(currentBlogPost.title);
      updateDescription(currentBlogPost.description);
    } else {
      updateIsEdit(false);
    }
  }, [currentBlogPost]);

  return (
    <div>
      <Header />
      <div className="p-7">
        <h1 className="pb-5 text-xl font-semibold">
          {isEdit ? 'Edit Blog Post' : 'Add New Blog Post'}
        </h1>
        <div className="flex flex-col gap-2 w-96">
          <input
            className="border-solid border-2 rounded-sm"
            name="title"
            placeholder="Enter Blog Post Title"
            id="title"
            type="text"
            value={formTitle}
            onChange={(event) => updateTitle(event.target.value)}
          />
          <textarea
            className="border-solid border-2 rounded-sm"
            name="description"
            placeholder="Enter Blog Description"
            id="description"
            value={formDescription}
            onChange={(event) => updateDescription(event.target.value)}
          />
          <button
            className="p-2 rounded-md text-white bg-green-900 hover:bg-green-700"
            onClick={handleSaveBlogPostToDatabase}
          >
            {isEdit ? 'Edit Blog Post' : 'Add New Blog Post'}
          </button>
        </div>
      </div>
    </div>
  );
}
'use client'

import Header from "@/app/components/header/page";
import { useFormStore } from '../context/page';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function AddNewBlogPost() {
  const router = useRouter();
  const formTitle = useFormStore((state) => state.title);
  const formDescription = useFormStore((state) => state.description);
  const updateTitle = useFormStore((state) => state.updateTitle);
  const updateDescription = useFormStore((state) => state.updateDescription);

  async function handleSaveBlogPostToDatabase() {
    const response = await axios.post('http://localhost:5001/api/blogs/add', {
      title: formTitle,
      description: formDescription
    })
    const result = await response.data;

    if (result) {
      updateTitle('');
      updateDescription('');
      router.push('/');
    }
  }

  return (
    <div>
      <Header />
      <div className="p-7">
        <h1 className="pb-5 text-xl font-semibold">Add New Blog Post</h1>
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
            Add New Blog Post
          </button>
        </div>
      </div>
    </div>
  );
}
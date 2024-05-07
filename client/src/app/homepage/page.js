'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaTrash, FaEdit } from 'react-icons/fa';
import {
  useFormStore,
  useBlogPostStore,
  useEditBlogPostStore
} from '../context/page';
import axios from 'axios';

export default function BlogHome() {
  const router = useRouter();

  const updateTitle = useFormStore((state) => state.updateTitle);
  const updateDescription = useFormStore((state) => state.updateDescription);

  const currentBlogPost = useBlogPostStore((state) => state.currentBlogPost);
  const updateCurrentBlogPost = useBlogPostStore((state) => state.updateCurrentBlogPost);
  const blogPostList = useBlogPostStore((state) => state.blogPostList);
  const updateBlogPostList = useBlogPostStore((state) => state.updateBlogPostList);
  const pending = useBlogPostStore((state) => state.pending);
  const updatePending = useBlogPostStore((state) => state.updatePending);

  const isEdit = useEditBlogPostStore((state) => state.isEdit);
  const updateIsEdit = useEditBlogPostStore((state) => state.updateIsEdit);

  async function fetchListOfBlogPosts() {
    updatePending(true);
    updateTitle('');
    updateDescription('');
    updateCurrentBlogPost({});
    updateIsEdit(false);

    const response = await axios.get('http://localhost:5001/api/blog/posts');
    const result = await response.data;

    if (result && result.blogList && result.blogList.length) {
      updateBlogPostList(result.blogList);
      updatePending(false);
    } else {
      updatePending(false);
      updateBlogPostList([]);
    }
  }

  async function handleDeleteBlogPost(postId) {
    const response = await axios.delete(`http://localhost:5001/api/blog/delete/${postId}`);
    const result = await response.data;

    if (result?.message) {
      fetchListOfBlogPosts();
    }
  }

  async function handleEditBlogPost(blogPost) {
    updateCurrentBlogPost(blogPost);
    router.push('/add-blog-post');
  }

  useEffect(() => {
    fetchListOfBlogPosts()
  }, []);

  return (
    <div className="p-7">
      <h1 className="pb-5 text-xl font-semibold">All Blog Posts</h1>
      {pending ? (
        <h1>Loading Blog Posts!</h1>
      ) : (
        <div className="grid grid-cols-4 gap-2">
          {blogPostList && blogPostList.length ?
            blogPostList.map(post => (
              <div
                key={post._id}
                className="p-3 border-solid border-2 border-stone-500"
              >
                <p>{post.title}</p>
                <p>{post.description}</p>
                <FaEdit
                  size={30}
                  className="cursor-pointer"
                  onClick={() => handleEditBlogPost(post)}
                />
                <FaTrash
                  size={30}
                  className="cursor-pointer"
                  onClick={() => handleDeleteBlogPost(post._id)}
                />
              </div>
            )) : <h1>There are no blog posts to display.</h1>}
        </div>
      )}
    </div>
  );
}
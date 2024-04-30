const mongoose = require('mongoose');
const Blog = require('../model/Blog');

const fetchListOfBlogPosts = async (req, res) => {
  let blogList;

  try {
    blogList = await Blog.find();
  } catch (e) {
    console.log('An error occurred:', e);
  }
  if (!blogList) {
    return res.status(404).json({ message: 'No blog posts found!' });
  }

  return res.status(200).json({ blogList });
};

const addNewBlogPost = async (req, res) => {
  const { title, description } = req.body;
  const currentDate = new Date();
  const newBlogPost = new Blog({
    title, description, date: currentDate
  });

  try {
    await newBlogPost.save();
  } catch (e) {
    console.log('An error occurred when creating a new blog post:', e);
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await newBlogPost.save(session);
    session.commitTransaction();
  } catch (e) {
    return res.send(500).json({ message: e });
  }

  return res.status(200).json({ newBlogPost });
};

const deleteBlogPost = async (req, res) => {
  const id = req.params.id;

  try {
    const findCurrentBlogPost = await Blog.findByIdAndDelete(id);

    if (!findCurrentBlogPost) {
      return res.status(404).json({ message: 'Blog post cannot be found.' });
    }

    return res.status(200).json({ message: 'Successfully deleted the blog post.' });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: 'Unable to delete the blog post.' });
  }
};

const updateBlogPost = async (req, res) => {
  const id = req.params.id;
  const { title, description } = req.body;

  let currentBlogPostToUpdate;

  try {
    currentBlogPostToUpdate = await Blog.findByIdAndUpdate(id, {
      title, description
    });
  } catch (e) {
    console.log(e);
    return res.send(500).json({ message: 'Something went wrong while updating the blog post.' });
  }

  if (!currentBlogPostToUpdate) {
    return res.status(500).json({ message: 'Unable to update the blog post.' });
  }

  return res.send(200).json({ currentBlogPostToUpdate });
};

module.exports = { fetchListOfBlogPosts, deleteBlogPost, updateBlogPost, addNewBlogPost };
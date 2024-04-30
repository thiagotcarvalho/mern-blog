const express = require('express');
const blogRouter = express.Router();
const {
  fetchListOfBlogPosts,
  deleteBlogPost,
  updateBlogPost,
  addNewBlogPost
} = require('../controller/blog-controller');

blogRouter.get('/', fetchListOfBlogPosts);
blogRouter.post('/add', addNewBlogPost);
blogRouter.put('/update/:id', updateBlogPost);
blogRouter.delete('/delete/:id', deleteBlogPost);

module.exports = blogRouter;
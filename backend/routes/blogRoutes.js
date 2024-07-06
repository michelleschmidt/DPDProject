const express = require('express');
const blogRouter = express.Router();
const BlogController  = require('../controllers/blogController');

const { isLoggedIn } = require("../middleware/isLoggedIn");
const { roleCheck } = require("../middleware/roleCheck");


blogRouter.get('/', BlogController.getAllBlogs);

blogRouter.post('/new-blog', isLoggedIn, roleCheck('admin'), BlogController.createBlog);

blogRouter.get('/user-blogs', isLoggedIn, BlogController.getAllBlogsByUser);

blogRouter.get('/:id', isLoggedIn, BlogController.getBlogById);

blogRouter.put('/:id', isLoggedIn, roleCheck('admin'), BlogController.updateBlog);

blogRouter.delete('/:id', isLoggedIn, roleCheck('admin'), BlogController.deleteBlog);

module.exports = blogRouter;

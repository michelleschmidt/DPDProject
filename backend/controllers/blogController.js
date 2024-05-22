const BlogService  = require("../services/blogService");

class BlogController {
  async createBlog(req, res, next) {
    try {
      req.body.created_by = req.user.userId;
      const blog = await BlogService.createBlog(req.body);
      res.status(201).json(blog);
    } catch (error) {
      next(error);
    }
  }

  async getAllBlogs(req, res, next) {
    try {
      const blogs = await BlogService.getAllBlogs();
      res.status(200).json(blogs);
    } catch (error) {
      next(error);
    }
  }

  async getAllBlogsByUser(req, res, next) {
    try {
      const blogs = await BlogService.getAllBlogsByUser(req.user.userId);
      res.status(200).json(blogs);
    } catch (error) {
      next(error);
    }
  }

  async getBlogById(req, res, next) {
    try {
      const blog = await BlogService.getBlogById(req.params.id);
      res.status(201).json(blog);
    } catch (error) {
      next(error);
    }
  }

  async updateBlog(req, res, next) {
    try {
      const updatedBlog = await BlogService.updateBlog(req.params.id, req.body);
      res.status(201).json({ message: "Blog updated successfully!", updatedBlog });
    } catch (error) {
      next(error);
    }
  }

  async deleteBlog(req, res, next) {
    try {
      const result = await BlogService.deleteBlog(req.params.id);
      res.status(200).json({ message: result });
    } catch (error) {
      next(error);
    }
  }

}

module.exports = new BlogController();

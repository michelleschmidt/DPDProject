const BlogService  = require("../services/blogService");

class BlogController {
  async createBlog(req, res) {
    try {
      const blog = await BlogService.createBlog(req.body);
      res.status(201).json(blog);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getAllBlogs(req, res) {
    try {
      const blogs = await BlogService.getAllBlogs();
      if (blogs.length === 0) {
        return res.status(404).json({ message: "No Blog found" });
      }
      res.status(200).json(blogs);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getAllBlogsByUser(req, res) {
    try {
      const blogs = await BlogService.getAllBlogsByUser();
      if (blogs.length === 0) {
        return res.status(404).json({ message: "No Blog found" });
      }
      res.status(200).json(blogs);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getBlogById(req, res) {
    try {
      const blog = await BlogService.getBlogById(req.body.blog_id);
      if (blog.length === 0) {
        res.status(200).json(blog);
      } else {
        res.status(404).json({ message: "Blog not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateBlog(req, res) {
    try {
      const updatedBlog = await BlogService.updateBlog(
        req.body.blog_id,
        req.body
      );
      if (!updatedBlog) {
        return res.status(404).json({ message: "Update not successful" });
      }
      res
        .status(200)
        .json({ message: "Blog updated successfully!", updatedBlog });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteBlog(req, res) {
    const blogId = req.body.blog_id;
    try {
      await BlogService.deleteBlog(blogId);
      res.status(204).send("Blog deleted successfully");
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new BlogController();

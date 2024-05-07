const { Blog, User } = require("../models");

class BlogService {
  async createBlog(blogData) {
    const user = await User.findOne({
      where: {
        user_id: blogData.user_id,
      },
    });
    if (!user) {
      throw new Error("No user found");
    }
    return await Blog.create(blogData);
  }

  async getAllBlogs() {
    return await Blog.findAll();
  }

  async getAllBlogsByUser(userId) {
    return await Blog.findAll({
      where: {
        user_id: userId
      }
    });
  }

  
  async getBlogById(blogId) {
    return await Blog.findByPk(blogId);
  }

  async updateBlog(blogId, updates) {
    try {
      const blog = await getBlogById(blogId);
      if (!blog) {
        throw new Error("Blog not found");
      }
      return await blog.update(updates);
    } catch (error) {
      throw error;
    }
  }

  async deleteBlog(blogId) {
    try {
      const blog = await getBlogById(blogId);
      if (!blog) {
        throw new Error("Blog not found");
      }
      await blog.destroy();
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new BlogService();

db = require("../models");

const User = db.User;
const Blog = db.Blog;

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
    try {
      return await Blog.findAll();
    } catch (error) {
      throw error;
    }
  }

  async getAllBlogsByUser(userId) {
    try {
      return await Blog.findAll({
        where: {
          user_id: userId,
        },
        include: [
          {
            model: User,
            attributes: ["first_name", "last_name"],
          },
        ],
      });
    } catch (error) {
      throw error;
    }
  }

  async getBlogById(blogId) {
    try {
      return await Blog.findByPk(blogId);
    } catch (error) {
      throw error;
    }
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
      await blog.destroy({
        where: { blog_id: blogId },
      });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new BlogService();

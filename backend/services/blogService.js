db = require("../models");

const User = db.User;
const Blog = db.Blog;

class BlogService {
  async createBlog(blogData) {
    const blog = await Blog.create(blogData);
    return blog;
  }

  async getAllBlogs() {
    const blogs = await Blog.findAll();
    return blogs;
  }

  async getAllBlogsByUser(userId) {
    const userBlogs = await Blog.findAll({
      where: {
        created_by: userId,
      },
      include: [
        {
          model: User,
          attributes: ["first_name", "last_name"],
        },
      ],
    });
    return userBlogs;
  }

  async getBlogById(blogId) {
   const blog = await Blog.findByPk(blogId);
 return blog;
  }

  async updateBlog(blogId, updates) {
      const blog = await Blog.findByPk(blogId);
      if (!blog) {
        throw new Error("Blog not found");
      }
      await blog.update(updates);
      return blog;

  }

  async deleteBlog(blogId) {
      const result = await Blog.destroy({
        where: { id: blogId },
      });
      if (result === 0) {
        throw new Error("Blog not found or already deleted.");
      }
      return ("Blog deleted successfully.");
  }
}

module.exports = new BlogService();

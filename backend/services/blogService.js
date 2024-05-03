const { Blog } = require('../models');

// Create a new blog
async function createBlog(title, body, created_by) {
  return await Blog.create({ title, body, created_by });
}

// Get all blogs
async function getAllBlogs() {
  return await Blog.findAll();
}

// Get blog by ID
async function getBlogById(blogId) {
  return await Blog.findByPk(blogId);
}

// Update blog by ID
async function updateBlog(blogId, title, body) {
  const blog = await getBlogById(blogId);
  if (!blog) {
    throw new Error('Blog not found');
  }
  return await blog.update({ title, body });
}

// Delete blog by ID
async function deleteBlog(blogId) {
  const blog = await getBlogById(blogId);
  if (!blog) {
    throw new Error('Blog not found');
  }
  await blog.destroy();
}

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};

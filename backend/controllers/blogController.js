const { blogService } = require('../services/blogService');

// Create a new blog
async function createBlog(req, res) {
  const { title, body, created_by } = req.body;
  try {
    const blog = await blogService.createBlog(title, body, created_by);
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Get all blogs
async function getAllBlogs(req, res) {
  try {
    const blogs = await blogService.getAllBlogs();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Get blog by ID
async function getBlogById(req, res) {
  const blogId = req.params.id;
  try {
    const blog = await blogService.getBlogById(blogId);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Update blog by ID
async function updateBlog(req, res) {
  const blogId = req.params.id;
  const { title, body } = req.body;
  try {
    await blogService.updateBlog(blogId, title, body);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Delete blog by ID
async function deleteBlog(req, res) {
  const blogId = req.params.id;
  try {
    await blogService.deleteBlog(blogId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};

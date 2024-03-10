const mongoos = require("mongoose");
const Blog = require("../models/blogs.js");

const fetchListOfBlogs = async (req, res) => {
  let blogList;
  try {
    blogList = await Blog.find();
  } catch (e) {
    console.log(e);
  }
  if (!blogList) {
    return res.status(404).json({ message: "No Blog found" });
  }
  return res.status(200).json({ blogList });
};

const addNewBlog = async (req, res) => {
  const { title, description } = req.body;
  const currentDate = new Date();

  const newBlog = new Blog({ title, description, date: currentDate });
  try {
    await newBlog.save();
  } catch (e) {
    console.log(e);
  }
  try {
    const session = await mongoos.startSession();
    session.startTransaction();
    await newBlog.save();
    session.commitTransaction();
  } catch (e) {
    return res.status(500).json({ message: e });
  }
  return res.status(200).json({ newBlog });
};

const deeleteABlog = async (req, res) => {
  const id = req.params.id;
  try {
    const findCurrentBlog = await Blog.findByIdAndDelete(id);
    if (!findCurrentBlog) {
      return res.status(404).json({ message: "Blog not Found" });
    }
    return res.status(200).json({ message: "Successfully Deleted" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Unabel to delete try again" });
  }
};

const updateABlog = async (req, res) => {
  const id = req.params.id;
  const { title, description } = req.body;
  let currentBlogToUpdate;
  try {
    currentBlogToUpdate = await Blog.findByIdAndUpdate(id, {
      title,
      description,
    });
  } catch (e) {
    return res.status(500).json({
      message: "Something went wrong while updating ! Please try again",
    });
  }
  if (!currentBlogToUpdate) {
    return res.status(500).json({ message: "Unabel to update" });
  }
  return res.status(200).json({ currentBlogToUpdate });
};
module.exports = {
  fetchListOfBlogs,
  addNewBlog,
  deeleteABlog,
  updateABlog,
};

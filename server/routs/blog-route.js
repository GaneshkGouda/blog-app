const express = require("express");
const blogRouter = express.Router();
const {
  fetchListOfBlogs,
  addNewBlog,
  deeleteABlog,
  updateABlog,
} = require("../controls/blog-controller.js");

blogRouter.get("/", fetchListOfBlogs);
blogRouter.post("/add", addNewBlog);
blogRouter.put("/update/:id", updateABlog);
blogRouter.delete("/delete/:id", deeleteABlog);

module.exports = blogRouter;

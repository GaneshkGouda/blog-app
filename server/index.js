const express = require("express");
const cors = require("cors");
const blogRoute = require("./routs/blog-route.js");

require("./db");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/blogs", blogRoute);

app.use("/app", (req, res) => {
  res.send("hello worls");
});
app.listen(5000, () => console.log("runningr port 500"));

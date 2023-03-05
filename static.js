// serve static files from the docs directory
const express = require("express");
const app = express();
app.use(express.static("docs"));

// route everything to the index.html file
app.get("*", (req, res) => {
  res.sendFile("index.html", { root: "docs" });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

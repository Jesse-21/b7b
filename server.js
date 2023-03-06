////
// Note: this starts a server that serves the static files in the docs directory.
// It is not necessary to run server-side rendering for this project.
////

const express = require("express");
const app = express();
app.use(express.static("docs"));

// route everything to the index.html file
app.get("*", (req, res) => {
  res.sendFile("index.html", { root: "docs" });
});

const port = process.env.PORT || 3100;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

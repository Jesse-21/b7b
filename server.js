////
// Note: this starts a server that serves the static files in the docs directory.
// It is not necessary to run server-side rendering for this project.
////

const express = require("express");
const app = express();
app.use(express.static("docs"));
const fs = require("fs");

// route everything to the index.html file
app.get("*", (req, res) => {
  // read the index.html file from the docs directory as a string
  const index = fs.readFileSync("docs/index.html", "utf8");
  let html = index;

  console.log(req.originalUrl);

  if (req.originalUrl) {
    const title = "B7B, an open-source BEB dimension browser";

    const newTitle = req.originalUrl.split("/")[1] + " - " + title;
    // replace the string title with the req.query.url
    html = index.replace(
      `<title>${title}</title>`,
      `<title>${newTitle}</title>`
    );
  }

  // send the modified html file to the client
  res.send(html);
});

const port = process.env.PORT || 3100;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

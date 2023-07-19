////
// Note: this starts a server that serves the static files in the docs directory.
// It is not necessary to run server-side rendering for this project.
////

const express = require("express");
const app = express();
app.use(express.static("prod"));
const fs = require("fs");

app.get("*", (req, res) => {
  const index = fs.readFileSync("prod/index.html", "utf8");
  let html = index;

  if (req.originalUrl) {
    const title = "B7B, an open-source beb.quest browser";

    const newTitle = req.originalUrl.split("/")[1] + " - " + title;
    html = index.replace(
      `<title>${title}</title>`,
      `<title>${newTitle}</title>`
    );
  }

  res.send(html);
});

const port = process.env.PORT || 3100;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

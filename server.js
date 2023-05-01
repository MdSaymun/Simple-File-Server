const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  // Parse the requested URL and extract the file path
  const filePath = path.join(__dirname, "public", req.url === "/" ? "index.html" : req.url);

  // Check if the file exists
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === "ENOENT") {
        // File not found
        res.writeHead(404);
        res.end(`<h1 style='text-align:center;'>404 Not Found</h1>`);
      } else {
        // Server error
        res.writeHead(500);
        res.end("500 Internal Server Error");
      }
    } else {
      // Determine the content type based on the file extension
      let contentType = "text/html";
      switch (path.extname(filePath)) {
        case ".js":
          contentType = "text/javascript";
          break;
        case ".css":
          contentType = "text/css";
          break;
        case ".json":
          contentType = "application/json";
          break;
        case ".png":
          contentType = "image/png";
          break;
        case ".jpg":
          contentType = "image/jpg";
          break;
        case ".wav":
          contentType = "audio/wav";
          break;
      }

      // Send the file to the client
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf-8");
    }
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

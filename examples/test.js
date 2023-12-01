const http = require("http");
const express = require("express");
const app = express();
const PORT = 5000;

app.use("/", (req, res) => {
  res.json("ping");
});

// Start the Express server
const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

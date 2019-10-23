const express = require('express');

const server = express();

server.post("/android", (req, res) => {
  res.json({ success: true });
});

server.post("/ios", (req, res) => {
  res.json({ success: true });
});

server.listen(8000);

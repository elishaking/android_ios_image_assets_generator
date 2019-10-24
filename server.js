const express = require('express');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const archiver = require('archiver');

const archive = archiver('zip');

const server = express();
server.use(express.json({ limit: '50mb' }));
server.use(express.urlencoded({ limit: '50mb', extended: true }));

server.use((req, res, next) => {
  console.log(`${req.method} request: ${req.originalUrl}`);
  next();
});

server.post("/android", async (req, res) => {
  const files = req.body;

  for (let i = 0; i < files.length; i++) {
    const parts = files[0].split(';');
    const mimType = parts[0].split(':')[1];
    const imageData = parts[1].split(',')[1];

    const img = new Buffer(imageData, 'base64');
    const image = { name: Date.now().toString() };
    await sharp(img)
      .resize(64, 64)
      .toFile("./images/" + image.name + ".png");
  }

  const zipOutput = fs.createWriteStream('./zipped/zipOutput.zip');
  zipOutput.on('close', () => {
    console.log(`${archive.pointer()} total bytes`);
  });

  archive.on('error', (err) => {
    console.error(err);
  })

  archive.directory('./images', false)
    .on('error', (err) => console.error(err))
    .pipe(zipOutput);

  zipOutput.on('close', () => res.send("complete"));
  archive.finalize();

  // res.download(path.join(__dirname, "images", image.name + ".png"), (err) => {
  //   if (err) return console.error(err);

  //   console.log("downloaded");
  // });
});

server.post("/ios", (req, res) => {
  res.json({ success: true });
});

server.get("/download/:name", (req, res) => {
  res.sendFile(path.join(__dirname, "images", req.params.name));
});

server.listen(8000);

const express = require('express');
const sharp = require('sharp');

const server = express();
server.use(express.json({ limit: '50mb' }));
server.use(express.urlencoded({ limit: '50mb', extended: true }));

server.use((req, res, next) => {
  console.log(`${req.method} request: ${req.originalUrl}`);
  next();
});

server.post("/android", (req, res) => {
  const files = req.body;
  // for (let i = 0; i < files.length; i++) {
  const parts = files[0].split(';');
  const mimType = parts[0].split(':')[1];
  const imageData = parts[1].split(',')[1];

  const img = new Buffer(imageData, 'base64');
  sharp(img)
    .resize(64, 64)
    .toFile(Date.now().toString() + ".png")
    .then((val) => {
      res.send(val);
    });
  // .toBuffer()
  // .then((resizedImageBuffer) => {
  //   const resizedImageData = resizedImageBuffer.toString('base64');
  //   const resizedBase64 = `data:${mimType};base64,${resizedImageData}`;
  //   res.send(resizedBase64);
  // })
  // .catch((error) => {
  //   // error handeling
  //   res.send(error);
  // });
  // }
  // res.json({ success: true });
});

server.post("/ios", (req, res) => {
  res.json({ success: true });
});

server.listen(8000);

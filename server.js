//@ts-check
const express = require('express');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const archiver = require('archiver');

const { ACCEPTED_MIME_TYPES, ANDROID_SIZES, IOS_SIZES } = require('./constants');

const server = express();
server.use(express.json({ limit: '50mb' }));
server.use(express.urlencoded({ limit: '50mb', extended: true }));

server.use((req, res, next) => {
  console.log(`${req.method} request: ${req.originalUrl}`);
  next();
});

server.post("/android/:uniqueLink", async (req, res) => {
  const images = req.body;
  const dirName = req.params.uniqueLink;
  const dirPath = path.join(__dirname, "images", dirName);
  const assetsName = `assets_${dirName.substring(7, 13)}.zip`;

  if (fs.existsSync(dirPath)) {
    return res.download(path.join(__dirname, "zipped", dirName, assetsName), (err) => {
      if (err) return console.error(err);

      console.log("downloaded");
    });
  }

  fs.mkdirSync(dirPath);

  await resizeImages(images, dirName);
  archiveImages(res, dirName, assetsName);
});

server.post("/ios", async (req, res) => {
  const images = req.body;
  const dirName = req.params.uniqueLink;
  const dirPath = path.join(__dirname, "images", dirName);
  const assetsName = `assets_${dirName.substring(7, 13)}.zip`;

  if (fs.existsSync(dirPath)) {
    return res.download(path.join(__dirname, "zipped", dirName, assetsName), (err) => {
      if (err) return console.error(err);

      console.log("downloaded");
    });
  }

  fs.mkdirSync(dirPath);

  await resizeImages(images, dirName, false);
  archiveImages(res, dirName, assetsName);
});

server.get("/download/:name", (req, res) => {
  res.sendFile(path.join(__dirname, "images", req.params.name));
});

server.listen(8000);

/** 
 * @param {[{dataUrl: string, name: string, size: any}]} images
 * @param {string} dirName */
const resizeImages = async (images, dirName, android = true) => {
  for (let i = 0; i < images.length; i++) {
    const parts = images[i].dataUrl.split(';');
    const mimType = parts[0].split(':')[1];
    const imageData = parts[1].split(',')[1];

    const img = new Buffer(imageData, 'base64');
    const image = {
      name: images[i].name,
      size: images[i].size
    };

    const width = parseInt(image.size.width);
    const height = parseInt(image.size.height);

    if (ACCEPTED_MIME_TYPES.indexOf(mimType) != -1) {
      if (android) {
        const android_sizes = Object.keys(ANDROID_SIZES);
        for (let i = 0; i < android_sizes.length; i++) {
          await sharp(img)
            .resize(Math.round(width * ANDROID_SIZES[android_sizes[i]]), Math.round(height * ANDROID_SIZES[android_sizes[i]]))
            .toFile(`./images/${dirName}/${image.name}_${android_sizes[i]}.${mimType.replace("image/", "")}`);
        }
      }

      const ios_sizes = Object.keys(IOS_SIZES);
      for (let i = 0; i < ios_sizes.length; i++) {
        await sharp(img)
          .resize(Math.round(width * IOS_SIZES[ios_sizes[i]]), Math.round(height * IOS_SIZES[ios_sizes[i]]))
          .toFile(`./images/${dirName}/${image.name}${ios_sizes[i]}.${mimType.replace("image/", "")}`);
      }
    }
  }
};

/** 
 * @param {express.Response} res
 * @param {string} dirName
 * @param {string} assetsName */
const archiveImages = (res, dirName, assetsName) => {
  const archive = archiver('zip');

  fs.mkdirSync(path.join(__dirname, "zipped", dirName));
  const assets = fs.createWriteStream(`./zipped/${dirName}/${assetsName}`);
  assets.on('close', () => {
    console.log(`${archive.pointer()} total bytes`);
  });

  archive.on('error', (err) => {
    console.error(err);
  });

  archive.directory(`./images/${dirName}`, false)
    .on('error', (err) => console.error(err))
    .pipe(assets);

  assets.on('close', () => {
    res.download(path.join(__dirname, "zipped", dirName, assetsName), (err) => {
      if (err) return console.error(err);

      console.log("downloaded");
    });
  });
  archive.finalize();
};

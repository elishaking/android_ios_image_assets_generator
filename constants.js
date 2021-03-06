const ACCEPTED_MIME_TYPES = ['image/png', 'image/jpeg'];

// 36x36 (0.75x) for low-density (ldpi)
// 48x48 (1.0x baseline) for medium-density (mdpi)
// 72x72 (1.5x) for high-density (hdpi)
// 96x96 (2.0x) for extra-high-density (xhdpi)
// 144x144 (3.0x) for extra-extra-high-density (xxhdpi)
// 192x192 (4.0x) for extra-extra-extra-high-density (xxxhdpi)
const BASE = 4.0;
const ANDROID_SIZES = {
  ldpi: 0.75 / BASE,
  mdpi: 1.0 / BASE,
  hdpi: 1.5 / BASE,
  xhdpi: 2.0 / BASE,
  xxhdpi: 3.0 / BASE,
  xxxhdpi: 4.0 / BASE,
};

const IOS_BASE = 3.0
const IOS_SIZES = {
  "@1x": 1.0 / IOS_BASE,
  "@2x": 2.0 / IOS_BASE,
  "@3x": 3.0 / IOS_BASE
};

const FILE_STORAGE_DURATION = 1 * 60 * 1000; // generated files will be deleted from the server after 1 minute(s)

module.exports = { ACCEPTED_MIME_TYPES, ANDROID_SIZES, IOS_SIZES, FILE_STORAGE_DURATION };
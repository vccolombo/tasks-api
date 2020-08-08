const sharp = require('sharp');

exports.resizeImage = (image, width, height) => {
    return sharp(image).resize({ width, height }).png().toBuffer();
};
const multer = require('multer');
const path = require('path');

const Storage =  multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, '../src/Ads_image');
    },
    filename: function (req, file, callback) {
      callback(null, file.fieldname + '-' + Date.now());
    }
  });

Storage.upload = multer({ Storage : storage }).array('userPhoto',10);

module.exports = Storage;
  
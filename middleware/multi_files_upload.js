const multer = require("multer");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/user/ads/')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now().toString()}_${file.originalname}`)
    },
});
var upload = multer({ storage: storage });

exports.upload = upload.fields([{ name: 'files', maxCount: 30 }])
const multer = require("multer");

const Chat = function () { };

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/chat/')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    // fileFilter: (req, file, cb) => {
    //   const ext = path.extname(file.originalname)
    //   if (ext !== '.jpg' && ext !== '.png' && ext !== '.mp4') {
    //     return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
    //   }
    //   cb(null, true)
    // }
})

Chat.uploadSingleFile = multer({ storage: storage }).single("file")

module.exports = Chat;
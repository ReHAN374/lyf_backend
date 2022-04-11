const Chat = require('../model/Chat');

//!Send single image
exports.uploadSingleFile = (req, res) => {
    Chat.uploadSingleFile(req, res, err => {
        if (err) {
            return res.json({ success: false, err })
        }
        return res.json({ success: true, url: res.req.file.path });
    })
}
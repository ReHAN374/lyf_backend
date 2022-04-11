module.exports = app => {
    const chat = require("../controller/Chat.controller");

    var router = require("express").Router();

    router.post("/uploadSingleFile", chat.uploadSingleFile);

    app.use('/api/chat', router);
};
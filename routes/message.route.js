module.exports = app => {
    const Msg = require("../controller/Message.controller");
    //const checkAuthMiddleware = require("../middleware/check-auth");

    var router = require("express").Router();

    router.post("/get-all-chat-info", Msg.getAllChatinfo);
    router.post("/delete-chat", Msg.deleteCharRoom);
    //router.post("/get-all", checkAuthMiddleware.checkAuth, Area.getAllArea);

    app.use('/api/message', router);
};
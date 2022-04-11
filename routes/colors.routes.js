module.exports = app => {
    const Color = require("../controller/Colours.controller");
    const checkAuthMiddleware = require("../middleware/check-auth");

    var router = require("express").Router();

   // router.post("/create", checkAuthMiddleware.checkAuth, Area.create);
    router.post("/get-all",  Color.getAllColoursInfo);

    app.use('/api/colors', router);
};
module.exports = app => {
    const ST = require("../controller/Sport_Type.controller");
    const checkAuthMiddleware = require("../middleware/check-auth");

    var router = require("express").Router();

  //  router.post("/create", checkAuthMiddleware.checkAuth, Area.create);
    router.post("/get-all", ST.getAllSportType);

    app.use('/api/sport-type', router);
};
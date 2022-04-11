module.exports = app => {
    const Instrument = require("../controller/Instrument_Type.controller");
    const checkAuthMiddleware = require("../middleware/check-auth");

    var router = require("express").Router();

    router.post("/create", checkAuthMiddleware.checkAuth, Instrument.create);
   // router.post("/get-all", checkAuthMiddleware.checkAuth, Area.getAllArea);

    app.use('/api/area', router);
};
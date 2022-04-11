module.exports = app => {
    const MIT = require("../controller/Instrument_Type.controller");
    const checkAuthMiddleware = require("../middleware/check-auth");

    var router = require("express").Router();

  //  router.post("/create", checkAuthMiddleware.checkAuth, Area.create);
    router.post("/get-all", MIT.getAllInstrumentType);

    app.use('/api/instrument-type', router);
};
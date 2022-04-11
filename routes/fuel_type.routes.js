module.exports = app => {
    const FT = require("../controller/Fuel_Type.controller");
    const checkAuthMiddleware = require("../middleware/check-auth");

    var router = require("express").Router();

   // router.post("/create", checkAuthMiddleware.checkAuth, Area.create);
    router.post("/get-all", FT.getAllFuleInfo);

    app.use('/api/fuel-type', router);
};
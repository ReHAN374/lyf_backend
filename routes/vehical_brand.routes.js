module.exports = app => {
    const VB = require("../controller/Vehical_Brand.controller");
    const checkAuthMiddleware = require("../middleware/check-auth");

    var router = require("express").Router();

   // router.post("/create", checkAuthMiddleware.checkAuth, Area.create);
    router.post("/get-all", VB.getAllVehicalBrand);

    app.use('/api/vehical-brand', router);
};
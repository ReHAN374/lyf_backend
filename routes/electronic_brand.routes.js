module.exports = app => {
    const EB = require("../controller/Electroinc_Brand.controller");
    const checkAuthMiddleware = require("../middleware/check-auth");

    var router = require("express").Router();

  //  router.post("/create", checkAuthMiddleware.checkAuth, Area.create);
    router.post("/get-all", EB.getAllElectroincBrand);

    app.use('/api/electronic-brand', router);
};
module.exports = app => {
    const LT = require("../controller/Land_Type.controller");
    const checkAuthMiddleware = require("../middleware/check-auth");

    var router = require("express").Router();

  //  router.post("/create", checkAuthMiddleware.checkAuth, Area.create);
    router.post("/get-all", LT.getAllLandTypeInfo);

    app.use('/api/land-type', router);
};
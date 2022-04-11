module.exports = app => {
    const LC = require("../controller/Lands_Crops.controller");
    const checkAuthMiddleware = require("../middleware/check-auth");

    var router = require("express").Router();

   // router.post("/create", checkAuthMiddleware.checkAuth, LC.create);
    router.post("/get-all", LC.getAllLandsCrops);

    app.use('/api/land-crope', router);
};
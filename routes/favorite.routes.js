module.exports = app => {
    const Fav = require("../controller/favourite_Ads.controller");
    const checkAuthMiddleware = require("../middleware/check-auth");

    var router = require("express").Router();

    router.post("/change-state", checkAuthMiddleware.checkAuth, checkAuthMiddleware.checkAuth, Fav.create);
    router.post("/get-all-by-uid", checkAuthMiddleware.checkAuth, checkAuthMiddleware.checkAuth, Fav.getFavAdsByUsers);
    //router.post("/get-all", checkAuthMiddleware.checkAuth, Area.getAllArea);

    app.use('/api/favorite', router);
};
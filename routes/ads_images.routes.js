module.exports = app => {
    const AdsImage = require("../controller/Ads_Image.controller");
    const checkAuthMiddleware = require("../middleware/check-auth");

    const router = require("express").Router();

    router.delete("/delete", checkAuthMiddleware.checkAuth, AdsImage.deleteAdsImage);

    app.use('/api/ads-image', router);
};

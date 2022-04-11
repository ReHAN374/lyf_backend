module.exports = app => {
    const AdsHasFeatures = require("../controller/Ads_Has_Feature.controller");
    const checkAuthMiddleware = require("../middleware/check-auth");

    const router = require("express").Router();

    router.post("/getTopAds", AdsHasFeatures.getTopAds);
    router.post("/getTopAdsByCatId", AdsHasFeatures.getTopAdsByCatId);
    router.post("/getSponsoredAdsByCatId", AdsHasFeatures.getSponsoredAdsByCatId);
    router.post("/getSponsoredAds", AdsHasFeatures.getSponsoredAds);
    router.post("/get-recent-ads-by-id", AdsHasFeatures.getSponsoredAds);
    router.post("/create-feature-ad", AdsHasFeatures.createFeatureAds);


    app.use('/api/ads-has-feature', router);
};
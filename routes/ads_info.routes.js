module.exports = app => {
    const adsInfo = require("../controller/Ads_Info.controller");
    const uploadImageMiddleware = require('../middleware/multi_files_upload');
    const checkAuthMiddleware = require("../middleware/check-auth");

    var router = require("express").Router();

    router.post("/create-vehical-ads", checkAuthMiddleware.checkAuth, uploadImageMiddleware.upload, adsInfo.createVehicalAds);
    router.post("/create-electronic-ads", checkAuthMiddleware.checkAuth, uploadImageMiddleware.upload, adsInfo.createElectronicAds);
    router.post("/create-real-estate", checkAuthMiddleware.checkAuth, uploadImageMiddleware.upload, adsInfo.createRealEstateAds);
    router.post("/create-pet-ads", checkAuthMiddleware.checkAuth, uploadImageMiddleware.upload, adsInfo.createPetAds);
    router.post("/create-sport-ads", checkAuthMiddleware.checkAuth, uploadImageMiddleware.upload, adsInfo.createSportAds);
    router.post("/create-music-ads", checkAuthMiddleware.checkAuth, uploadImageMiddleware.upload, adsInfo.createMusicAds);
    router.post("/create-collectible-ads", checkAuthMiddleware.checkAuth, uploadImageMiddleware.upload, adsInfo.createCollectibleAds);
     router.post("/create-other-ads", checkAuthMiddleware.checkAuth, uploadImageMiddleware.upload, adsInfo.createOtherAds);
    router.put("/update-vehical-ads", checkAuthMiddleware.checkAuth, adsInfo.updateVehicalAds);
    router.put("/update-electronic-ads", checkAuthMiddleware.checkAuth, adsInfo.updateElectronicAds);
    router.put("/update-real-state-ads", checkAuthMiddleware.checkAuth, adsInfo.updateRealStateAds);
    router.put("/update-sport-ads", checkAuthMiddleware.checkAuth, adsInfo.updateSportAds);
    router.put("/update-pet-ads", checkAuthMiddleware.checkAuth, adsInfo.updatePetAds);
    router.put("/update-music-ads", checkAuthMiddleware.checkAuth, adsInfo.updateMusicAds);
    router.put("/update-collectable-ads", checkAuthMiddleware.checkAuth, adsInfo.updateCollectableAds);
    router.post("/approve", checkAuthMiddleware.checkAuth, uploadImageMiddleware.upload, adsInfo.approveAdsByAdmins);
    router.post("/reject", checkAuthMiddleware.checkAuth, uploadImageMiddleware.upload, adsInfo.reject);
    router.post("/delete-image", checkAuthMiddleware.checkAuth, adsInfo.deleteImageById);
    router.post("/pending", checkAuthMiddleware.checkAuth, uploadImageMiddleware.upload, adsInfo.getAllPendingAdsToAproveAdmin);
    router.post("/edit-ad-by-user", checkAuthMiddleware.checkAuth, adsInfo.editAdByUser);
    router.post("/recent-ads", adsInfo.recentAds);
    router.post("/search-ads", adsInfo.searchAds);
    router.post("/count-by-uid", adsInfo.getAdsCountByUid);
    router.post("/filter-ads", adsInfo.getFilterAds);
    router.post("/my-ads", adsInfo.getMyAds);
    router.post("/all-ads-count-info", adsInfo.getAllAdsCountInfo);
    router.post("/getAdsByMainCatId", adsInfo.getAdsByMainCatId);
    router.post("/getAdsByMainSubID", adsInfo.getAdsByMainSubID);
    router.post("/get-ads-by-adsId", adsInfo.getAdsInfoByAdsIdNew);
    router.post("/get-ads-by-uid", checkAuthMiddleware.checkAuth, adsInfo.getAdsByUserId);
    router.post("/get-all", adsInfo.getAll);
    router.post("/delete-ad", adsInfo.deleteAds);
    router.post("/get-bulk-data-ikman", adsInfo.getBulkDataFromIkman);
    router.post("/search-my-ads", adsInfo.searchAdByUser);

    app.use('/api/ads-info', router);
};
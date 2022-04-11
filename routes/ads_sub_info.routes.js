module.exports = app => {
    const adsInfo = require("../controller/Ads_sub_info.controller");

    var router = require("express").Router();

    router.post("/getMaxPrice", adsInfo.getMaxPrice);



    app.use('/api/ads-sub-info', router);
};
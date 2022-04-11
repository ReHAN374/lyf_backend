const AdsHasFeature = require('../model/Ads_Has_Feature');
const GetImg = require('../model/Ads_Image');
const AdsInfo = require('../model/Ads_Info');


//!Create top/sponsored ads

exports.createFeatureAds = (req, res) => {
    var data = {
        id_ads_info: req.body.id_ads_info,
        id_fetatures: req.body.id_fetatures,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        lan_code: req.body.lan_code
    }
    AdsHasFeature.createFeatureAd(data).then(success => {
        return res.status(200).json({
            status: 200,
            error: null,
            response: success
        });
    }).catch(e => {
        return res.status(400).json({
            status: 400,
            error: e,
            response: null
        });
    })
}

exports.create = (req, resp) => {
    if (!req.body) {
        resp.status(400).send({
            message: "Content can not be empty!"
        });
    }

    var createTime = new Date();

    const newAdsHasFeature = {
        "idAds_Info": req.body.idAds_Info,
        "idFetatures": req.body.idFetatures,
        "start_date": req.body.start_date,
        "end_date": req.body.end_date,
        "status": "1",
        "create_at": createTime,
        "update_at": null,
        "remove_at": null
    };

    AdsHasFeature.create(newAdsHasFeature, function (err, data) {
        if (err)
            resp.status(500).send({
                message:
                err.message || "Some error occurred while creating the User."
            });
        else resp.send(data);
    });
};

exports.getAllAdsFeaturesUsingId = (req, resp) => {
    if (!req.body) {
        resp.status(400).send({
            message: "Content can not be empty!"
        });
    }

    var addsIds = req.body.adsId;
    AdsHasFeature.getAllInfosByAdsId(addsIds, function (err, data) {
       
        if (err)
            resp.send(err);
        resp.send(data);
    });

};

exports.removeAdsFeaturesInAds = (req, resp) => {
    if (!req.body) {
        resp.status(400).send({
            message: "Content can not be empty!"
        });
    }

    //var addsIds = req.body.adsId;
    var featureId = req.body.AdsFeturesId;
    var removeTime = new Date();

    AdsHasFeature.removeById(featureId, removeTime, function (err, data) {
    
        if (err)
            resp.send(err);
        resp.send(data);
    });


};

exports.getAllAdsHasFeature = (req, resp) => {
    AdsHasFeature.getAllInfos(function (err, data) {
   
        if (err)
            resp.send(err);
        resp.send(data);
    });
};

//!Get all top ads
exports.getTopAds = (req, res) => {
    var data = {
        uid: req.body.uid,
        limit:req.body.limit,
        offset:req.body.offset,
        lan_code:req.body.lan_code
    }
    AdsHasFeature.getTopAds(data, async function (err1, result1) {
        if (err1) {
            res.status(400).json({
                status: 400,
                error: err1,
                response: null
            });
        } else {

            if (result1.length == 0) {
                res.status(200).json({
                    status: 200,
                    error: null,
                    response: []
                })
            }
            var adsInfo = [];
            for (let i = 0; i < result1.length; i++) {
                var data = {
                    "idAds_Sub_info": result1[i].IdAdsSubInfo,
                    "idAds_Category": result1[i].id_ads_category,
                    "idSub_Category": result1[i].id_sub_category
                }
                try {
                    var response2 = await AdsInfo.getAdsInfoByAdsIdNew(data);
                    var response1 = await GetImg.getAdsImgsByAdsId(result1[i].id_ads_info);
                } catch (error) {
                    return res.status(400).json({
                        status: 400,
                        error: error,
                        response: null
                    });
                }
                
                adsInfo.push({
                    ...result1[i],
                    "created_at": result1[i].AdsCreateTime.toLocaleDateString(),
                    "ad_price": result1[i].ad_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                    "ads_name": result1[i].ads_name.substring(0,30),
                    ...response2[0],
                    isFavorite: result1[i].isFavorite != null ? result1[i].isFavorite : 0,
                    imgList: response1
                })

            }
            return res.status(200).json({
                status: 200,
                error: null,
                response: adsInfo
            })

        }
    });
};

exports.getTopAdsByCatId = (req, res) => {

    var data = {
        uid: req.body.uid,
        idAds_Category: req.body.idAds_Category
    }

    AdsHasFeature.getTopAdsByCatId(data, function (err1, result1) {
        if (err1) {
            res.status(400).json({
                status: 400,
                error: err1,
                response: null
            });
        } else {
            if (result1.length == 0) {
                res.status(200).json({
                    status: 200,
                    error: null,
                    response: []
                })
            }
            var fullRes = [];
            result1.forEach(ads => GetImg.getAdsImgsByAdsId(ads.id_ads_info, function (err2, result2) {
          
                if (err2) {
                    res.status(400).json({
                        status: 400,
                        error: err2,
                        response: null
                    });
                } else {
                    var adsInfo = {
                        ...ads,
                        "isFavorite": ads.status ? ads.status : 0,
                        "imgList": result2
                    }
                    fullRes.push(adsInfo);
                    if (result1[result1.length - 1].idAds_Info == ads.idAds_Info) {
                        res.status(200).json({
                            status: 200,
                            error: null,
                            response: fullRes
                        })
                    }
                }
            }));
        }
    });
};

exports.getSponsoredAdsByCatId = (req, res) => {
    var data = {
        uid: req.body.uid,
        idAds_Category: req.body.idAds_Category
    }
    AdsHasFeature.getSponsoredAdsByCatId(data, function (err1, result1) {
        if (err1) {
            res.status(400).json({
                status: 400,
                error: err1,
                response: null
            });
        } else {
            if (result1.length == 0) {
                res.status(200).json({
                    status: 200,
                    error: null,
                    response: []
                })
            }
            var fullRes = [];
            result1.forEach(ads => GetImg.getAdsImgsByAdsId(ads.id_ads_info, function (err2, result2) {
                if (err2) {
                    res.status(400).json({
                        status: 400,
                        error: err2,
                        response: null
                    });
                } else {
                    var adsInfo = {
                        ...ads,
                        "isFavorite": ads.status ? ads.status : 0,
                        "imgList": result2
                    }

                    fullRes.push(adsInfo);
                    if (result1[result1.length - 1].id_ads_info == ads.id_ads_info) {
                        res.status(200).json({
                            status: 200,
                            error: null,
                            response: fullRes
                        })
                    }
                }
            }));
        }
    });
};

//!Get all sponsored ads
exports.getSponsoredAds = (req, res) => {
    var data = {
        uid: req.body.uid,
        limit:req.body.limit,
        offset:req.body.offset,
        lan_code:req.body.lan_code
    }
    AdsHasFeature.getSponsoredAds(data, async function (err1, result1) {
        if (err1) {
            res.status(400).json({
                status: 400,
                error: err1,
                response: null
            });
        } else {
            if (result1.length == 0) {
                return res.status(200).json({
                    status: 200,
                    error: null,
                    response: []
                })
            }
            var adsInfo = [];
            for (let i = 0; i < result1.length; i++) {
                var data = {
                    "idAds_Sub_info": result1[i].IdAdsSubInfo,
                    "idAds_Category": result1[i].id_ads_category,
                    "idSub_Category": result1[i].id_sub_category
                }
                try {
                    var response2 = await AdsInfo.getAdsInfoByAdsIdNew(data);
                    var response1 = await GetImg.getAdsImgsByAdsId(result1[i].id_ads_info);
                } catch (error) {
                    return res.status(400).json({
                        status: 400,
                        error: error,
                        response: null
                    });
                }
                adsInfo.push({
                    ...result1[i],
                    "created_at": result1[i].AdsCreateTime.toLocaleDateString(),
                    "ad_price": result1[i].ad_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                    "ads_name": result1[i].ads_name.substring(0,30),
                    ...response2[0],
                    isFavorite: result1[i].isFavorite != null ? result1[i].isFavorite : 0,
                    imgList: response1
                })
            }

          
            return res.status(200).json({
                status: 200,
                error: null,
                response: adsInfo
            })
        }
    });
};
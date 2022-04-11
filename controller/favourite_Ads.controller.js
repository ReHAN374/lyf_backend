//const { favAds } = require('../model');
const { favAds } = require('../model');
const FavAds = require('../model/favourite_Ads');
const Ads_Info = require('../model/Ads_Info');
const GetImg = require('../model/Ads_Image');

//!Create favorite or update
exports.create = (req, res) => {
    var data = {
        "uid": req.body.uid,
        "adsId": req.body.adsId,
    };
    FavAds.getFavByUidAndAdsId(data).then(success1 => {
        if (success1.length == 0) {
            var data = {
                "uid": req.body.uid,
                "adsId": req.body.adsId,
            };
            FavAds.create(data, (err, data) => {
                if (err) {
                    res.status(400).json({
                        status: 400,
                        response: null,
                        error: err
                    })
                } else {
                    var response = {
                        "uid": req.body.uid,
                        "adsId": req.body.adsId,
                        "status": 1
                    }
                    res.status(200).json({
                        status: 200,
                        response: response,
                        error: null
                    })
                }
            });
        } else {
            var data = {
                "uid": req.body.uid,
                "adsId": req.body.adsId,
                "status": success1[0].status == 0 ? 1 : 0,
                "updateTime": new Date()
            }
            console.log(data)
            return FavAds.update(data).then(success2 => {
                res.status(200).json({
                    status: 200,
                    response: data,
                    error: null
                })
            })
        }
    }).catch(e => {
        res.status(400).json({
            status: 400,
            response: null,
            error: e
        })
    })
};

//!Get Fav ads by uid
exports.getFavAdsByUsers = (req, res) => {
    var data = {
        uid: req.body.uid,
        limit: req.body.limit,
        offset: req.body.offset
    };
    FavAds.getFavAdsByUid(data).then(async (success1) => {
        if (success1.length == 0) {
            return res.status(200).json({
                status: 200,
                error: null,
                response: []
            })
        }
        var adsInfo = [];
        for (let i = 0; i < success1.length; i++) {
            var data = {
                "idAds_Sub_info": success1[i].IdAdsSubInfo,
                "idAds_Category": success1[i].id_ads_category,
                "idSub_Category": success1[i].id_sub_category
            }
            var response2 = await Ads_Info.getAdsInfoByAdsIdNew(data);
            var response1 = await GetImg.getAdsImgsByAdsId(success1[i].id_ads_info);
            adsInfo.push({
                ...success1[i],
                "created_at": success1[i].AdsCreateTime.toLocaleDateString(),
                "ad_price": success1[i].sell_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                ...response2[0],
                imgList: response1
            })
        }
        res.status(200).json({
            status: 200,
            error: null,
            response: adsInfo
        })
    }).catch(e => {
        res.status(400).json({
            status: 400,
            response: null,
            error: e
        })
    })
};

exports.changeFavState = (req, res) => {
    var data = {
        uid: req.body.uid,
        state: req.body.state,
        idAds_Info: req.body.idAds_Info
    }
    FavAds.changeFavState(data, function (err, result) {
        if (err) {
            res.status(400).json({
                error: err,
                response: null
            });
        } else {
            res.status(200).json({
                error: null,
                response: result
            })
        }
    });
}

exports.getAllAdsWithFav = (req, res) => {
    FavAds.getAllAdsWithFav(function (err1, result1) {
        if (err1) {
            res.status(400).json({
                error: err1,
                response: null
            });
        } else {
            var fullRes = [];
            result1.forEach(ads => FavAds.getAdsImgsByAdsId(ads.idAds_Info, function (err2, result2) {
                if (err2) {
                    res.status(400).json({
                        error: err2,
                        response: null
                    });
                } else {
                    var adsInfo = {
                        "idAds_Info": ads.idAds_Info,
                        "Ads_name": ads.Ads_name,
                        "Description": ads.Description,
                        "sell_price": ads.sell_price,
                        "location": ads.location,
                        "isFavorite": ads.status ? ads.status : 0,
                        "imgList": result2
                    }
                    fullRes.push(adsInfo);
                    if (result1[result1.length - 1].idAds_Info == ads.idAds_Info) {
                        res.status(200).json({
                            error: null,
                            response: fullRes
                        })
                    }
                }
            }));
        }
    });
}
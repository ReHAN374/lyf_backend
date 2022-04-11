const Notification_Ads = require('../model/Notification_Ads');
const GetImg = require('../model/Ads_Image');
const AdsInfo = require('../model/Ads_Info');

const admin = require("firebase-admin");
var serviceAccount = require("../lyf-ads-firebase-adminsdk-ehb1v-26aae6d54e.json");

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });

exports.create = (req, resp) => {
    if (!req.body) {
        resp.status(400).send({
            message: "Content can not be empty!"
        });
    }

    var createTime = new Date();

    var newNotification = {
        "idUser": req.body.idUser,
        "notification_name": req.body.notification_name,
        "price_start": req.body.price_start,
        "price_end": req.body.price_end,
        "idArea": req.body.idArea,
        "idAds_Category": req.body.idAds_Category,
        "idSub_Category": req.body.idSub_Category,
        "status": "1",
        "create_at": createTime,
        "update_at": null,
        "remove_at": null
    };

    Notification_Ads.create(newNotification, (err, data) => {
        if (err)
            resp.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        else resp.send(data);
    });
};

//!Create notify me
exports.createNotifyMe = (req, res) => {
    var data = {
        name: req.body.name,
        startPrice: req.body.startPrice,
        endPrice: req.body.endPrice,
        area: req.body.area,
        adsCategory: req.body.adsCategory,
        adsSubCategory: req.body.adsSubCategory,
        uid: req.body.uid
    }
    Notification_Ads.createNotifyMe(data).then(success => {
        return res.status(200).json({
            status: 200,
            error: null,
            response: {
                notifyme_id: success.insertId
            }
        })
    }).catch(e => {
        res.status(400).json({
            status: 400,
            error: e,
            response: null
        })
    })
}

//!Get all notifications by uid
exports.getAllNotification = (req, res) => {
    var data = {
        uid: req.body.uid
    };

    Notification_Ads.getAllNotification(data, async (err1, data1) => {
        console.log(data1)
        if (err1) {
            res.status(400).json({
                status: 400,
                error: err1,
                response: null
            });
        } else {
            var adsInfo = [];
            for (let i = 0; i < data1.length; i++) {
                var data = {
                    "idAds_Sub_info": data1[i].IdAdsSubInfo,
                    "idAds_Category": data1[i].id_ads_category,
                    "idSub_Category": data1[i].id_sub_category
                }
                try {
                    var response2 = await AdsInfo.getAdsInfoByAdsIdNew(data);
                    var response1 = await GetImg.getAdsImgsByAdsId(data1[i].id_ads_info);
                } catch (error) {
                    return res.status(400).json({
                        status: 400,
                        error: error,
                        response: null
                    });
                }
                adsInfo.push({
                    ...data1[i],
                    "create_at": data1[i].AdsCreateTime,
                    ...response2[0],
                    isFavorite: data1[i].isFavorite != null ? data1[i].isFavorite : 0,
                    imgList: response1
                })
            }
            res.status(200).json({
                status: 200,
                error: null,
                response: adsInfo
            })
        }
    });
};

//!Set push notifications
exports.setPushNotifications = (req, res) => {

    const payload = {
        notification: {
            title: req.body.title,
            body: req.body.body,
            click_action: 'FLUTTER_NOTIFICATION_CLICK',
            image: req.body.imgUrl
        },
        data: {
            adsId:req.body.adsId
        }
    }
    const option = {
        priority: 'high',
        timeToLive: 60 * 60 * 24
    }
    const firebaseDevideTokens = req.body.deviceTokens;
    admin.messaging().sendToDevice(firebaseDevideTokens, payload, option).then(response => {
        res.status(200).json({
            status: 200,
            error: null,
            response: 'Push notification send successfully.'
        })
    }).catch(e => {
        res.status(400).json({
            status: 400,
            error: e,
            response: null
        })
    });
}

exports.getAllNotificationByUserId = (req, resp) => {
    if (!req.body) {
        resp.status(400).send({
            message: "Content can not be empty!"
        });
    }

    var userId = req.body.userID;

    Notification_Ads.getAllNotificationByUserId(userId, (err, data) => {
        if (err)
            resp.send(err);
        resp.send(data);
    });
};

exports.createNotificationAdsInfo = (req, resp) => {
    if (!req.body) {
        resp.status(400).send({
            message: "Content can not be empty!"
        });
    }

    var idnotification = req.body.idnotification;
    var idAds_Info = req.body.idAds_Info

    // var userId = req.body.userID;

    Notification_Ads.createNotificationAdsInfo(idnotification, idAds_Info, (err, data) => {
        if (err)
            resp.send(err);
        resp.send(data);
    });
};


exports.getAllNotificationAdsInfo = (req, resp) => {
    // if (!req.body) {
    //     resp.status(400).send({
    //         message: "Content can not be empty!"
    //     });
    // }

    Notification_Ads.getAllNotificationAdsInfo((err, data) => {
        if (err)
            resp.send(err);
        resp.send(data);
    });
};


exports.deleteNoti = (req, res) => {
    var data = {
        "idnotification_has_Ads_Info": req.body.idnotification_has_Ads_Info
    }
    Notification_Ads.deleteNoti(data).then(result => {
        res.status(200).json({
            status: 200,
            error: null,
            response: result
        })
    }).catch(error => {
        res.status(400).json({
            status: 400,
            error: error,
            response: null
        });
    })
}


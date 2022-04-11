const sql = require('../utill/database');

const Notification_Ads = function (newNotification) {
    this.notification_name = newNotification.notification_name;
    this.price_start = newNotification.price_start;
    this.price_end = newNotification.price_end;
    this.idArea = newNotification.idArea;
    this.idAds_Category = newNotification.idAds_Category;
    this.idSub_Category = newNotification.idSub_Category;
    this.idUser = newNotification.idUser;
    this.status = newNotification.status;
    this.create_at = newNotification.create_at;
    this.update_at = newNotification.update_at;
    this.remove_at = newNotification.remove_at;
};

Notification_Ads.create = (newNotification, result) => {
    sql.query("INSERT INTO `notification` (`notification_name`, `price_start`, `price_end`, `idArea`, `idAds_Category`, `idSub_Category`, `status`, `idUser`, `create_at`, `update_at`, `remove_at`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);", [newNotification.notification_name, newNotification.price_start, newNotification.price_end, newNotification.idArea, newNotification.idAds_Category, newNotification.idSub_Category, newNotification.status, newNotification.idUser, newNotification.create_at, newNotification.update_at, newNotification.remove_at], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created notification: ", { id: res.insertId, ...newNotification });
        result(null, { id: res.insertId, ...newNotification });
    });
};

//!Create notify me
Notification_Ads.createNotifyMe = (data) => {
    return new Promise((resolve, reject) => {
        sql.query(`INSERT INTO notification (notification_name,price_start,price_end, area,id_ads_category,id_sub_category,id_user)
          VALUES (?,?,?,?,?,?,?)`,
            [data.name, data.startPrice, data.endPrice, data.area, data.adsCategory, data.adsSubCategory, data.uid],
            function (err, success) {
                if (err) {
                    reject(err);
                } else {
                    resolve(success);
                }
            }
        )
    })
}

//!Select related notify me 
Notification_Ads.selectRelatedNotifyMe = (data) => {
    return new Promise((resolve, reject) => {
        sql.query(`
           SELECT * FROM notification As n WHERE n.price_start < ${data.sell_price} < n.price_end AND n.area=? AND n.id_ads_category=? AND n.id_sub_category=?`,
            [data.area, data.id_ads_category, data.id_sub_category],
            function (err, success) {
                if (err) {
                    reject(err);
                } else {
                    resolve(success);
                }
            }
        )
    })
}

//!Create new notification
Notification_Ads.createNotification = (data) => {
    return new Promise((resolve, reject) => {
        sql.query(`INSERT INTO notification_has_ads_info (id_notification,id_ads_Info,id_user)
            VALUES (?,?,?)`,
            [data.id_notification,data.id_ads_Info,data.id_user],
            function (err, success) {
                if (err) {
                    reject(err);
                } else {
                    resolve(success);
                }
            }
        )
    })
}

//!Get all notification
Notification_Ads.getAllNotification = (data, result) => {
    sql.query(`select DISTINCT * , i.*, f.status AS isFavorite, s.id_ads_sub_info AS IdAdsSubInfo, i.create_at AS AdsCreateTime from notification_has_ads_info AS n
    INNER JOIN ads_info AS i ON i.id_ads_info=n.id_ads_info
    INNER JOIN user AS u ON u.id_user=n.id_user
    LEFT JOIN favorite_ads AS f ON f.id_ads_info=n.id_ads_info AND f.id_user=?
    LEFT JOIN ads_has_fetatures ON n.id_ads_info=ads_has_fetatures.id_ads_info 
    INNER JOIN ads_sub_info AS s ON n.id_ads_info=s.id_ads_info  
    INNER JOIN ads_category AS ac ON s.id_ads_category=ac.id_ads_category 
    INNER JOIN sub_category AS sc  ON s.id_sub_category=sc.id_sub_category
    LEFT JOIN conditions AS c ON s.id_conditions=c.id_conditions  
    WHERE n.status =1 AND n.id_user=? `, [data.uid, data.uid], function (err, res, fields) {
        if (err) {
            result(err, null)
        } else {
            result(null, res)
        }
    });
};

Notification_Ads.getAllNotificationByUserId = (userId, result) => {
    sql.query("select * from notification where `idUser`=?", [userId], function (err, res, fields) {
        if (err) {
            console.log("error happen when get data from notification " + err);
            result(null, JSON.stringify({ "status": 200, "error": err, "response": null }))
        } else {
            console.log(" data from notification " + res);
            result(null, JSON.stringify({ "status": 200, "error": null, "response": res }))
        }
    });
};

Notification_Ads.createNotificationAdsInfo = (idnotification, idAds_Info, result) => {
    sql.query("INSERT INTO `notification_has_ads_info` (`idnotification`, `idAds_Info`) VALUES (?,?);", [idnotification, idAds_Info], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        //  console.log("created notification: ", { id: res.insertId, ...newNotification });
        result(null, { id: res.insertId, response: idAds_Info });
    });
}

Notification_Ads.getAllNotificationAdsInfo = (result) => {
    sql.query("select * from notification_has_ads_info where status ='1'", [], function (err, res, fields) {
        if (err) {
            console.log("error happen when get data from notification " + err);
            result(null, JSON.stringify({ "status": 200, "error": err, "response": null }))
        } else {
            console.log(" data from notification " + res);
            result(null, JSON.stringify({ "status": 200, "error": null, "response": res }))
        }
    });
};

Notification_Ads.deleteNoti = (data) => {
    return new Promise((resolve, reject) => {
        sql.query(`UPDATE notification_has_ads_info As n SET status=0 WHERE n.idnotification_has_Ads_Info=?`, [data.idnotification_has_Ads_Info], function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    });
}

module.exports = Notification_Ads;
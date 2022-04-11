const sql = require('../utill/database');

const Ads_Has_Feature = function (newAdsHasFeature) {
    this.idAds_Info = newAdsHasFeature.idAds_Info;
    this.idFetatures = newAdsHasFeature.idFetatures;
    this.start_date = newAdsHasFeature.start_date;
    this.end_date = newAdsHasFeature.end_date;
    this.status = newAdsHasFeature.status;
    this.create_at = newAdsHasFeature.create_at;
    this.update_at = newAdsHasFeature.update_at;
    this.remove_at = newAdsHasFeature.remove_at;
};


//!Create top/sponsored ads
Ads_Has_Feature.createFeatureAd = (data) => {
    return new Promise((resolve, reject) => {
        sql.query(
            `INSERT INTO  ads_has_fetatures (id_ads_info, id_fetatures, start_date, end_date, lan_code)
            VALUES (?, ?, ?, ?, ?);`,
            [data.id_ads_info, data.id_fetatures, data.start_date, data.end_date, data.lan_code],
            function (err, res) {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            }
            );
    })
}


Ads_Has_Feature.create = (newAdsHasFeature, result) => {
    sql.query("INSERT INTO `Ads_has_Fetatures` (`idAds_Info`, `idFetatures`, `start_date`, `end_date`, `status`, `create_at`, `update_at`, `remove_at`) VALUES (?, ?, ?, ?, ?, ?, ?, ?);", [newAdsHasFeature.idAds_Info, newAdsHasFeature.idFetatures, newAdsHasFeature.start_date, newAdsHasFeature.end_date, newAdsHasFeature.status, newAdsHasFeature.create_at, newAdsHasFeature.update_at, newAdsHasFeature.remove_at], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created AdsHasFeature: ", { id: res.insertId, ...newAdsHasFeature });
        result(null, { id: res.insertId, ...newAdsHasFeature });
    });
};


Ads_Has_Feature.updateById = (adsHasFeature, idAdsHasFeature, result) => {

};

Ads_Has_Feature.removeById = (idAdsHasFeature, removeTime, result) => {
    sql.query("update Ads_has_Fetatures set status ='0', remove_at=? where idAdsFeatures =?;", [removeTime, idAdsHasFeature], function (err, res, fields) {
        if (err) {
            console.log("error happen when remove, ads has features info " + err);
            result(null, JSON.stringify({ "status": 200, "error": err, "response": null }))
        } else {
            console.log(" update from remove ads has features info  " + res);
            result(null, JSON.stringify({ "status": 200, "error": null, "response": res }))
        }
    });
};

Ads_Has_Feature.getInfoById = (idAdsHasFeature, result) => {

};

Ads_Has_Feature.getAllInfosByAdsId = (idAds, result) => {
    sql.query("select Ads_has_Fetatures.idAdsFeatures as idAdsFeature, Ads_has_Fetatures.idAds_Info as AdsId,  Ads_has_Fetatures.start_date as startDate, Ads_has_Fetatures.end_date as endDate, Ads_Fetatures.idAds_Fetatures as featureId, Ads_Fetatures.featureName as featureName, Ads_Fetatures.duration as duration from Ads_has_Fetatures inner join Ads_Fetatures on Ads_has_Fetatures.idFetatures = Ads_Fetatures.idAds_Fetatures  where Ads_has_Fetatures.idAds_Info =? and Ads_has_Fetatures.status='1';", [idAds], function (err, res, fields) {
        if (err) {
            console.log("error happen when get data from Ads_has_Fetatures " + err);
            result(null, JSON.stringify({ "status": 200, "error": err, "response": null }))
        } else {
            console.log(" data from Ads_has_Fetatures " + res);
            result(null, JSON.stringify({ "status": 200, "error": null, "response": res }))
        }
    });
};

Ads_Has_Feature.getAllInfos = result => {
    sql.query("select * from Ads_has_Fetatures where status ='1'", [], function (err, res, fields) {
        if (err) {
            console.log("error happen when get data from Ads_has_Fetatures " + err);
            result(null, JSON.stringify({ "status": 200, "error": err, "response": null }))
        } else {
            console.log(" data from Ads_has_Fetatures " + res);
            result(null, JSON.stringify({ "status": 200, "error": null, "response": res }))
        }
    });
};

//!Get all top ads
// Ads_Has_Feature.getTopAds = (data, result) => {
//     sql.query(`SELECT i.*, f.status AS isFavorite ,u.*, s.*,ac.*,c.*,sc.*, s.id_ads_sub_info AS IdAdsSubInfo, f.status, i.create_at AS AdsCreateTime FROM ads_info As i
//       LEFT JOIN user AS u ON i.id_user=u.id_user
//       LEFT JOIN favorite_ads AS f ON f.id_user=? and i.id_ads_info=f.id_ads_info 
//       INNER JOIN ads_has_fetatures ON i.id_ads_info=ads_has_fetatures.id_ads_info 
//       INNER JOIN ads_sub_info AS s ON i.id_ads_info=s.id_ads_info  
//       INNER JOIN ads_category AS ac ON s.id_ads_category=ac.id_ads_category
//       INNER JOIN sub_category AS sc  ON s.id_sub_category=sc.id_sub_category
//       LEFT JOIN conditions AS c ON s.id_conditions=c.id_conditions  
//       WHERE ads_has_fetatures.id_fetatures=2 AND (i.status=1 OR i.status=4) AND i.lan_code=? AND i.id_user !=? ORDER BY i.create_at DESC LIMIT ${data.limit} OFFSET ${data.offset}`, [data.uid, data.lan_code, data.uid], function (err, res) {
//         if (err) {
//             result(err, null);
//             return;
//         } else {
//             result(null, res)
//         }
//     })
// }


Ads_Has_Feature.getTopAds = (data, result) => {
    sql.query(`SELECT
        ads_info.id_ads_info,
        ads_info.ads_name,
        ads_info.date,
        ads_info.sell_price AS ad_price,
        ads_info.location,
        ads_info.status,
        ads_info.id_user,
        ads_info.create_at AS AdsCreateTime,
        ads_sub_info.id_ads_sub_info AS IdAdsSubInfo,
        ads_sub_info.id_ads_category,
        ads_sub_info.id_sub_category,
        ads_sub_info.id_conditions,
        favorite_ads.status AS isFavorite,
        ads_has_fetatures.id_fetatures,
        ads_has_fetatures.start_date,
        ads_has_fetatures.end_date
        FROM
        ads_info
        INNER JOIN ads_has_fetatures ON( ads_has_fetatures.id_ads_info = ads_info.id_ads_info)
        INNER JOIN ads_sub_info ON( ads_info.id_ads_info = ads_sub_info.id_ads_info)
        INNER JOIN user ON(ads_info.id_user = user.id_user)
        LEFT JOIN favorite_ads ON (ads_info.id_ads_info = favorite_ads.id_ads_info)
        WHERE ads_info.status = 1 AND ads_info.lan_code = '${data.lan_code}' AND (user.status = 1 OR user.status = 2) AND user.id_user != ${data.uid} 
        AND ads_has_fetatures.id_fetatures=2 ORDER BY ads_info.create_at DESC LIMIT ${data.limit} OFFSET ${data.offset}`,
        function (err, res) {
            if (err) {
                result(err, null);
                return;
            } else {
                result(null, res)
            }
        })
}

Ads_Has_Feature.getTopAdsByCatId = (data, result) => {
    sql.query("SELECT i.*, f.status, ads_sub_info.id_ads_Category, ads_sub_info.id_sub_category, ads_sub_info.id_conditions FROM ads_info As i LEFT JOIN favorite_ads AS f ON f.id_user=? and i.id_ads_info=f.id_ads_info INNER JOIN ads_has_fetatures ON i.id_ads_info=ads_has_fetatures.id_ads_info INNER JOIN ads_sub_info ON i.id_ads_info = ads_sub_info.id_ads_info WHERE ads_has_fetatures.id_fetatures=2 and ads_sub_info.id_ads_category=? AND i.status=1", [data.uid, data.idAds_Category], function (err, res) {
        if (err) {
            result(err, null);
            return;
        } else {
            result(null, res)
        }
    })
}

//!Get all sponsored ads
// Ads_Has_Feature.getSponsoredAds = (data, result) => {
//     sql.query(`SELECT i.*,i.description AS AdsDescription,s.id_ads_sub_info AS IdAdsSubInfo, f.status AS isFavorite, u.*,s.*,ac.*,sc.*,c.*, f.status, i.create_at AS AdsCreateTime FROM ads_info As i 
//      LEFT JOIN user AS u ON i.id_user=u.id_user 
//      LEFT JOIN favorite_ads AS f ON f.id_user=? and i.id_ads_info=f.id_ads_info 
//      INNER JOIN ads_has_fetatures ON i.id_ads_info=ads_has_fetatures.id_ads_info 
//      INNER JOIN ads_sub_info AS s ON i.id_ads_info = s.id_ads_info 
//      INNER JOIN ads_category AS ac ON s.id_ads_category=ac.id_ads_category
//      INNER JOIN sub_category AS sc  ON s.id_sub_category=sc.id_sub_category
//      LEFT JOIN conditions AS c ON s.id_conditions=c.id_conditions 
//      WHERE ads_has_fetatures.id_fetatures=1 AND i.status=1 AND i.lan_code=? AND i.id_user !=? ORDER BY i.create_at DESC LIMIT ${data.limit} OFFSET ${data.offset}`, [data.uid, data.lan_code, data.uid], function (err, res) {
//         if (err) {
//             result(err, null);
//             return;
//         } else {
//             result(null, res)
//         }
//     })
// }


Ads_Has_Feature.getSponsoredAds = (data, result) => {
    sql.query(`SELECT
        ads_info.id_ads_info,
        ads_info.ads_name,
        ads_info.date,
        ads_info.sell_price AS ad_price,
        ads_info.location,
        ads_info.status,
        ads_info.id_user,
        ads_info.create_at AS AdsCreateTime,
        ads_sub_info.id_ads_sub_info AS IdAdsSubInfo,
        ads_sub_info.id_ads_category,
        ads_sub_info.id_sub_category,
        ads_sub_info.id_conditions,
        favorite_ads.status AS isFavorite,
        ads_has_fetatures.id_fetatures,
        ads_has_fetatures.start_date,
        ads_has_fetatures.end_date
        FROM
        ads_info
        INNER JOIN ads_has_fetatures ON( ads_has_fetatures.id_ads_info = ads_info.id_ads_info)
        INNER JOIN ads_sub_info ON( ads_info.id_ads_info = ads_sub_info.id_ads_info)
        INNER JOIN user ON(ads_info.id_user = user.id_user)
        LEFT JOIN favorite_ads ON (ads_info.id_ads_info = favorite_ads.id_ads_info)
        WHERE ads_info.status = 1 AND ads_info.lan_code = '${data.lan_code}' AND (user.status = 1 OR user.status = 2) AND user.id_user != ${data.uid} 
        AND ads_has_fetatures.id_fetatures=1 ORDER BY ads_info.create_at DESC LIMIT ${data.limit} OFFSET ${data.offset}`,
        function (err, res) {
            if (err) {
                result(err, null);
                return;
            } else {
                result(null, res)
            }
        })
}


Ads_Has_Feature.getSponsoredAdsByCatId = (data, result) => {
    sql.query("SELECT i.*, f.status , ads_sub_info.id_ads_category, ads_sub_info.id_sub_category, ads_sub_info.id_conditions FROM ads_info As i LEFT JOIN favorite_ads AS f ON f.id_user=? and i.id_ads_info=f.id_ads_info INNER JOIN ads_has_fetatures ON i.id_ads_info=ads_has_fetatures.id_ads_Info INNER JOIN ads_sub_info ON i.id_ads_info = ads_sub_info.id_ads_info WHERE ads_has_fetatures.id_fetatures=1 and ads_sub_info.id_ads_category=?", [data.uid, data.idAds_Category], function (err, res) {
        if (err) {
            result(err, null);
            return;
        } else {
            result(null, res)
        }
    })
}

module.exports = Ads_Has_Feature;
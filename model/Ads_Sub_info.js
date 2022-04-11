const sql = require('../utill/database');

const Ads_Sub_Info = function (newAdsSubInfo) {
    this.idAds_Info = newAdsSubInfo.idAds_Info;
    this.idAds_Category = newAdsSubInfo.idAds_Category;
    this.idSub_Category = newAdsSubInfo.idSub_Category;
    this.idConditions = newAdsSubInfo.idConditions;
    this.create_at = newAdsSubInfo.create_at;
    this.update_at = newAdsSubInfo.update_at;
    this.remove_at = newAdsSubInfo.remove_at;
};

//!Create ads sub info
Ads_Sub_Info.create = (newAdsSubInfo) => {
    return new Promise((resolve, reject) => {
        sql.query(`INSERT INTO ads_sub_info (id_ads_info, id_ads_category, id_sub_category, id_conditions) 
        VALUES (?, ?, ?, ?);`, [newAdsSubInfo.id_ads, newAdsSubInfo.id_ads_category, newAdsSubInfo.id_sub_category, newAdsSubInfo.id_conditions],
            (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            })
    });
};

//!Update ads sub info
Ads_Sub_Info.update = (updateAdsSubInfo) => {
    return new Promise((resolve, reject) => {
        sql.query(`UPDATE ads_sub_info SET id_ads_category=?, id_sub_category=?, id_conditions=? WHERE id_ads_info=?`, [updateAdsSubInfo.id_ads_category, updateAdsSubInfo.id_sub_category, updateAdsSubInfo.id_conditions, updateAdsSubInfo.adsId],
            (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            })
    });
};



// Ads_Sub_Info.create = (newAdsSubInfo, result) => {
//     sql.query("INSERT INTO `Ads_Sub_info` (`idAds_Info`, `idAds_Category`, `idSub_Category`, `idConditions`) VALUES (?, ?, ?, ?);", [newAdsSubInfo.idAds_Info, newAdsSubInfo.idAds_Category, newAdsSubInfo.idSub_Category, newAdsSubInfo.idConditions], (err, res) => {
//         if (err) {
//             console.log("error: ", err);
//             result(err, null);
//             return;
//         }
//         console.log("created new ads sub info : ", { id: res.insertId, ...newAdsSubInfo });
//         result(null, { id: res.insertId, ...newAdsSubInfo });
//     });
// };

Ads_Sub_Info.updateById = (updateAdsSubInfo, idAdsSub, result) => {
    sql.query("update set Ads_Sub_info idAds_Category =?, idSub_Category=?, idConditions=? where idAds_Sub_info=?", [updateAdsSubInfo.idAds_Category, updateAdsSubInfo.idSub_Category, updateAdsSubInfo.idConditions, idAdsSub], function (err, res, fields) {
        if (err) {
            console.log("error happen when update ads sub info " + err);
            result(null, JSON.stringify({ "status": 200, "error": err, "response": null }))
        } else {
            console.log(" update from update ads sub info  " + res);
            result(null, JSON.stringify({ "status": 200, "error": null, "response": res }))
        }
    });
};

Ads_Sub_Info.getAllAdsInfoByAdsId = (idAds, result) => {

};

Ads_Sub_Info.getMaxPrice = (data, result) => {
    sql.query("SELECT MAX(ads_info.sell_price) FROM ads_info INNER JOIN ads_sub_info ON ads_info.id=ads_sub_info.idAds_Info WHERE ads_sub_info.idSub_Category=?", [data.idSub_Category], function (err, res) {
        if (err) {
            result(err, null);
            return;
        } else {
            result(null, res[0]["MAX(ads_info.sell_price)"])
        }
    })
}


module.exports = Ads_Sub_Info;
const sql = require('../utill/database');

const Sport_Ads = function(){
};

//!Create sport ads
Sport_Ads.create = (newSportAds) => {
    return new Promise((resolve, reject) => {
        sql.query("INSERT INTO `sports_ads` (`id_sport_type`, `id_ads_sub_info`) VALUES (?, ?);", [newSportAds.id_sport_type, newSportAds.id_ads_sub_info],
            (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res)
                }
            });
    })
};

//!update sport ads
Sport_Ads.update = (updatedSportAds) => {
    return new Promise((resolve, reject) => {
        sql.query("UPDATE `sports_ads` SET `id_sport_type`=? WHERE id_ads_sub_info=?;", [updatedSportAds.id_sport_type, updatedSportAds.id_ads_sub_info],
            (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res)
                }
            });
    })
};

module.exports = Sport_Ads;
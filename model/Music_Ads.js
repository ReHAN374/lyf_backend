const sql = require('../utill/database');

const Music_Ads = function () { };

//!Create music ads
Music_Ads.create = (newMusicAds) => {
    return new Promise((resolve, reject) => {
        sql.query("INSERT INTO `music_ads` (`id_instrument_type`, `title`, `id_ads_sub_info`) VALUES (?, ?, ?);", [newMusicAds.idinstrument_type, newMusicAds.title, newMusicAds.idAds_Sub_info], (err, res) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(res)
        });
    });
};

//!update 
Music_Ads.update = (updatedMusicAds) => {
    return new Promise((resolve, reject) => {
        sql.query("UPDATE `music_ads` SET `id_instrument_type`=?, `title`=? WHERE id_ads_sub_info=?;", [updatedMusicAds.idinstrument_type, updatedMusicAds.title, updatedMusicAds.id_ads_sub_info], (err, res) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(res)
        });
    });
};

module.exports = Music_Ads;

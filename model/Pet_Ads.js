const sql = require('../utill/database');

const Pet_Ads = function(newPetAds){
    this.titel = newPetAds.titel;
    this.idpet_type = newPetAds.idpet_type;
    this.idAds_Sub_info = newPetAds.idAds_Sub_info;
    this.status = newPetAds.status;
    this.create_at = newPetAds.create_at;
    this.update_at = newPetAds.update_at;
    this.remove_at = newPetAds.remove_at;
};

//!Create pet ads
Pet_Ads.create = (newPetAds) => {
    return new Promise((resolve, reject) => {
        sql.query("INSERT INTO `pet_ads` (`id_pet_type`, `id_ads_sub_info`) VALUES (?, ?);",
            [newPetAds.idpet_type, newPetAds.idAds_Sub_info], (err, res) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(res);
            });
    })
};

//!update pet ads
Pet_Ads.update = (updatedPetAds) => {
    return new Promise((resolve, reject) => {
        sql.query("UPDATE `pet_ads` SET `id_pet_type`=? WHERE id_ads_sub_info=?;",
            [updatedPetAds.idpet_type, updatedPetAds.id_ads_sub_info], (err, res) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(res);
            });
    })
};



// Pet_Ads.create = (newPetAds, result) => {
//     sql.query("INSERT INTO `pet_Ads` (`titel`, `idpet_type`, `idAds_Sub_info`, `status`) VALUES (?, ?, ?, ?);", [newPetAds.titel,newPetAds.idpet_type,newPetAds.idAds_Sub_info,newPetAds.status], (err, res) => {
//         if (err) {
//             console.log("error: ", err);
//             result(err, null);
//             return;
//         }
//         console.log("created new ads pet info : ", { id: res.insertId, ...newPetAds });
//         result(null, { id: res.insertId, ...newPetAds });
//     });
// };

Pet_Ads.getAllPetAdsInfo = result => {

};

module.exports = Pet_Ads;
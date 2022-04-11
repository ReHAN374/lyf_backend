const sql = require('../utill/database');

const Electronics_Ads = function(){
};

//!Create electronic ads
Electronics_Ads.create = (newElectronicAds) => {
  return new Promise((resolve, reject) => {
    sql.query("INSERT INTO `electronics_ads` (`id_electroinc_brand`, `id_ads_sub_info`) VALUES (?, ?);",
      [newElectronicAds.id_electroinc_brand, newElectronicAds.id_ads_sub_info],
      (err, res) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(res);
      });
  })
};

//!update electronic ads
Electronics_Ads.update = (updatedElectronicAds) => {
  return new Promise((resolve, reject) => {
    sql.query("UPDATE `electronics_ads` SET `id_electroinc_brand`=? WHERE id_ads_sub_info=?;",
      [updatedElectronicAds.id_electroinc_brand, updatedElectronicAds.id_ads_sub_info],
      (err, res) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(res);
      });
  })
};







// Electronics_Ads.create = (newElectronicAds, result) => {
//     sql.query("INSERT INTO `electronics_Ads` (`idelectroinc_brand`, `titel`, `idAds_Sub_info`, `status`) VALUES (?, ?, ?, ?);", [newElectronicAds.idelectroinc_brand,newElectronicAds.titel,newElectronicAds.idAds_Sub_info,newElectronicAds.status], (err, res) => {
//         if (err) {
//             console.log("error: ", err);
//             result(err, null);
//             return;
//         }
//         console.log("created new electronics ads info : ", { id: res.insertId, ...newElectronicAds });
//         result(null, { id: res.insertId, ...newElectronicAds });
//     });
// };

Electronics_Ads.updateInfoById = (updateElectronicAds, idElectricAds, result) => {
    sql.query("update electronics_Ads set idelectroinc_brand=?, titel=? where idelectronics_Ads =? ", [updateElectronicAds.idelectroinc_brand,updateElectronicAds.titel,idElectricAds], function (err, res, fields) {
        if (err) {
          console.log("error happen when update eletcric ads " + err);
          result(null, JSON.stringify({ "status": 200, "error": err, "response": null }))
        } else {
          console.log(" update from update eletcric ads " + res);
          result(null, JSON.stringify({ "status": 200, "error": null, "response": res }))
        }
      });
};


module.exports = Electronics_Ads;
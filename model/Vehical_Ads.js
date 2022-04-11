const sql = require('../utill/database');

const Vehical_Ads = function (newVehicalAds) {
  this.idvehical_brand = newVehicalAds.idvehical_brand;
  this.idvehical_model = newVehicalAds.idvehical_model;
  this.manifacture_year = newVehicalAds.manifacture_year;
  this.mileage = newVehicalAds.mileage;
  this.idtransmission_type = newVehicalAds.idtransmission_type;
  this.eng_capacity = newVehicalAds.eng_capacity;
  this.idAds_Sub_info = newVehicalAds.idAds_Sub_info;
  this.idfuel_type = newVehicalAds.idfuel_type;
  this.idcolours = newVehicalAds.idcolours;
  this.status = newVehicalAds.status;
  this.create_at = newVehicalAds.create_at;
  this.update_at = newVehicalAds.update_at;
  this.remove_at = newVehicalAds.remove_at;
};

//!Create vehical ads
Vehical_Ads.create = (newVehicalAds) => {
  return new Promise((resolve, reject) => {
    sql.query("INSERT INTO `vehical_ads` (`vehical_brand`, `vehical_model`, `manifacture_year`, `mileage`, `id_transmission_type`, `eng_capacity`, `id_ads_sub_info`, `id_fuel_type`, `id_color`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);",
      [newVehicalAds.vehical_brand, newVehicalAds.vehical_model, newVehicalAds.manifacture_year, newVehicalAds.mileage, newVehicalAds.idtransmission_type, newVehicalAds.eng_capacity, newVehicalAds.idAds_Sub_info, newVehicalAds.idfuel_type, newVehicalAds.idcolor], (err, res) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(res);
      });
  })
};

//!Update vehical ads
Vehical_Ads.update = (updatedVehicalAds) => {
  return new Promise((resolve, reject) => {
    sql.query("UPDATE `vehical_ads` SET `vehical_brand`=?, `vehical_model`=?, `manifacture_year`=?, `mileage`=?, `id_transmission_type`=?, `eng_capacity`=?, `id_fuel_type`=?, `id_color`=? WHERE  id_ads_sub_info=?;",
      [updatedVehicalAds.vehical_brand, updatedVehicalAds.vehical_model, updatedVehicalAds.manifacture_year, updatedVehicalAds.mileage, updatedVehicalAds.idtransmission_type, updatedVehicalAds.eng_capacity, updatedVehicalAds.idfuel_type, updatedVehicalAds.idcolor, updatedVehicalAds.id_ads_sub_info], (err, res) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(res);
      });
  })
};





// Vehical_Ads.create = (newVehicalAds, result) => {
//     sql.query("INSERT INTO `vehical_Ads` (`idvehical_brand`, `idvehical_model`, `manifacture_year`, `mileage`, `idtransmission_type`, `eng_capacity`, `idAds_Sub_info`, `idfuel_type`, `idcolours`, `status`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);", [newVehicalAds.idvehical_brand,newVehicalAds.idvehical_model,newVehicalAds.manifacture_year,newVehicalAds.mileage,newVehicalAds.idtransmission_type,newVehicalAds.eng_capacity,newVehicalAds.idAds_Sub_info,newVehicalAds.idfuel_type,newVehicalAds.idcolours,newVehicalAds.status], (err, res) => {
//         if (err) {
//             console.log("error: ", err);
//             result(err, null);
//             return;
//         }
//         console.log("created new ads vehical info : ", { id: res.insertId, ...newVehicalAds });
//         result(null, { id: res.insertId, ...newVehicalAds });
//     });
// };

Vehical_Ads.updateById = (updateVehicalAds, idVehicalAds, result) => {
  sql.query("update vehical_Ads set idvehical_brand=? ,idvehical_model=?, manifacture_year=?, mileage=?, idtransmission_type=?, eng_capacity=?, idfuel_type=?, idcolours=? where idvehical_Ads=?", [updateVehicalAds.idvehical_brand, updateVehicalAds.idvehical_model, updateVehicalAds.manifacture_year, updateVehicalAds.mileage, updateVehicalAds.idtransmission_type, updateVehicalAds.eng_capacity, updateVehicalAds.idfuel_type, updateVehicalAds.idcolours, idVehicalAds], function (err, res, fields) {
    if (err) {
      console.log("error happen when update vehical_Ads ads " + err);
      result(null, JSON.stringify({ "status": 200, "error": err, "response": null }))
    } else {
      console.log(" update from update vehical_Ads ads " + res);
      result(null, JSON.stringify({ "status": 200, "error": null, "response": res }))
    }
  });
};

module.exports = Vehical_Ads;
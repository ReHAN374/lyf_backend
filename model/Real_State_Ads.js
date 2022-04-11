const sql = require('../utill/database');

const Real_State_Ads = function (newRealStateAds) {
    this.land_size = newRealStateAds.land_size;
    this.bed_room_count = newRealStateAds.bed_room_count;
    this.bathroom_count = newRealStateAds.bathroom_count;
    this.house_size = newRealStateAds.house_size;
    this.furniture_avalible = newRealStateAds.furniture_avalible;
    this.floor_number = newRealStateAds.floor_number;
    this.developer = newRealStateAds.developer;
    this.banglow_avalibilty = newRealStateAds.banglow_avalibilty;
    this.idlands_crops = newRealStateAds.idlands_crops;
    this.idproperty_type = newRealStateAds.idproperty_type;
    this.idAds_Sub_info = newRealStateAds.idAds_Sub_info;
    this.idLandType = newRealStateAds.idLandType;
    this.status = newRealStateAds.status;
    this.create_at = newRealStateAds.create_at;
    this.update_at = newRealStateAds.update_at;
    this.remove_at = newRealStateAds.remove_at;
};

//! Create real state ads
Real_State_Ads.create = (data) => {
    return new Promise((resolve, reject) => {
        sql.query("INSERT INTO `real_state_ads` (`land_size`, `bed_room_count`, `bathroom_count`, `house_size`, `furniture_avalible`, `floor_number`, `developer`, `banglow_avalibilty`, `id_lands_crops`, `id_property_type`, `id_ads_sub_info`,`id_land_type`,`permises`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
            [data.land_size, data.bedroomCount, data.bathroom_count, data.house_size, data.furniture_avalible, data.floor_number, data.developer, data.banglow_avalibilty, data.idlands_crops, data.idproperty_type, data.idAds_Sub_info, data.idLandType, data.permises],
            (err, res) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(res);
            });
    })
};

//!update real state ads
Real_State_Ads.update = (data) => {
    return new Promise((resolve, reject) => {
        // console.log("UPDATE `real_state_ads` SET `land_size`="+data.land_size+", `bed_room_count`="+data.bedroomCount+", `bathroom_count`="+data.bathroom_count+", `house_size`="+data.house_size+", `furniture_avalible`="+data.furniture_avalible+", `floor_number`="+data.floor_number+", `developer`="+data.developer+", `banglow_avalibilty`="+data.banglow_avalibilty+", `id_lands_crops`="+data.idlands_crops+", `id_property_type`="+data.idproperty_type+",`id_land_type`="+data.idLandType+",`permises`="+data.permises+" WHERE id_ads_sub_info="+data.id_ads_sub_info);
        sql.query("UPDATE `real_state_ads` SET `land_size`=?, `bed_room_count`=?, `bathroom_count`=?, `house_size`=?, `furniture_avalible`=?, `floor_number`=?, `developer`=?, `banglow_avalibilty`=?, `id_lands_crops`=?, `id_property_type`=?,`id_land_type`=?,`permises`=? WHERE id_ads_sub_info=?;",
            [data.land_size, data.bedroomCount, data.bathroom_count, data.house_size, data.furniture_avalible, data.floor_number, data.developer, data.banglow_avalibilty, data.idlands_crops, data.idproperty_type, data.idLandType, data.permises, data.id_ads_sub_info],
            (err, res) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(res);
            });
    })
};



// Real_State_Ads.create = (newRealStateAds, result) => {
//     sql.query("INSERT INTO `real_state_Ads` (`land_size`, `bed_room_count`, `bathroom_count`, `house_size`, `furniture_avalible`, `floor_number`, `developer`, `banglow_avalibilty`, `idlands_crops`, `idproperty_type`, `idAds_Sub_info`,`idLandType`,`permises`,`status`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?);", [newRealStateAds.land_size,newRealStateAds.bed_room_count,newRealStateAds.bathroom_count,newRealStateAds.house_size,newRealStateAds.furniture_avalible,newRealStateAds.floor_number,newRealStateAds.developer,newRealStateAds.banglow_avalibilty,newRealStateAds.idlands_crops,newRealStateAds.idproperty_type,newRealStateAds.idAds_Sub_info,newRealStateAds.idLandType,newRealStateAds.permises,newRealStateAds.status], (err, res) => {
//         if (err) {
//             console.log("error: ", err);
//             result(err, null);
//             return;
//         }
//         console.log("created new real state info : ", { id: res.insertId, ...newRealStateAds });
//         result(null, { id: res.insertId, ...newRealStateAds });
//     });
// };



module.exports = Real_State_Ads;
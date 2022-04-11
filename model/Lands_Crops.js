const sql = require('../utill/database');

const Lands_Crops = function () { };

//!Create lands crops
Lands_Crops.create = (newLandsCrops, result) => {
    sql.query('INSERT INTO `lands_crops` (`crop_name`,lan_code) VALUES (?,?);', [newLandsCrops.crop_name, newLandsCrops.lan_code],
        function (err, res) {
            if (err) {
                result(err, null);
                return;
            }
            result(null, res);
        });
};

// land_crops info update
Lands_Crops.updateById = (land_crops, result) => {

};

//land_crops info remove 
Lands_Crops.removeById = (land_crops, result) => {

};

//get selected land_crops info
Lands_Crops.getLandsCropsById = (land_crops, result) => {

};

//!get All land_crops info
Lands_Crops.getAllLandsCrops = (lan_code, result) => {
    sql.query("select * from lands_crops where status ='1' and lan_code=?", [lan_code], function (err, res, fields) {
        if (err) {
            result(err, null)
        } else {
            result(null, res)
        }
    });
};

module.exports = Lands_Crops;
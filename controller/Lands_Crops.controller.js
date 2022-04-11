const LandsCrops = require('../model/Lands_Crops');

//!Create lands crops
exports.create = (req, res) => {
    const newLandCrop = {
        "crop_name": req.body.crop_name,
        "lan_code": req.body.lan_code
    };
    LandsCrops.create(newLandCrop, (err, data) => {
        if (err) {
            res.status(400).json({
                status: 400,
                response: null,
                error: err
            })
        } else {
            res.status(200).json({
                status: 200,
                response: "Lands crope created successfuly!",
                error: null
            })
        }
    });
};

exports.updateById = (req, resp) => {

};

exports.removeById = (req, resp) => {

};

exports.getLandsCropsById = (req, resp) => {

};

//!Get all lands cropes
exports.getAllLandsCrops = (req, res) => {
    var lan_code = req.body.lan_code
    LandsCrops.getAllLandsCrops(lan_code, function (err, data) {
        if (err) {
            res.status(400).json({
                status: 400,
                response: null,
                error: err
            })
        } else {
            res.status(200).json({
                status: 200,
                response: data,
                error: null
            })
        }
    });
};
const Area = require('../model/Area');

//!Create area
exports.create = (req, res) => {
    const newArea = {
        "area_name": req.body.area_name,
        "lan_code":req.body.lan_code
    };
    Area.create(newArea).then(success => {
        res.status(200).json({
            status: 200,
            error: null,
            response: "Success!",
        })
    }).catch(e => {
        res.status(400).json({
            status: 400,
            error: e,
            response: null
        });
    });
};

exports.updateById = (req, resp) => {

};

exports.removeById = (req, resp) => {

};

exports.getAreaById = (req, resp) => {

};

//!Get all areas
exports.getAllArea = (req, res) => {
    var lan_code = req.body.lan_code;
    Area.getAllAreaInfo(lan_code).then(success => {
        res.status(200).json({
            status: 200,
            error: null,
            response: success,
        })
    }).catch(e => {
        res.status(400).json({
            status: 400,
            error: e,
            response: null
        });
    });
};
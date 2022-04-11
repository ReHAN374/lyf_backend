const PropertyType = require('../model/Property_Type');

//!Create property type
exports.create = (req, res) => {
    const newPropertyType = {
        "type_name": req.body.type_name,
        "lan_code": req.body.lan_code
    };
    PropertyType.create(newPropertyType, (err, data) => {
        if (err) {
            res.status(400).json({
                status: 400,
                response: null,
                error: err
            })
        } else {
            res.status(200).json({
                status: 200,
                response: "Property type created successfuly!",
                error: null
            })
        }
    });
};

exports.updateById = (req, resp) => {

};

exports.removeById = (req, resp) => {

};

exports.getPropertyTypeById = (req, resp) => {

};

//!Get all property types
exports.getAllPropertyType = (req, res) => {
    var lan_code = req.body.lan_code
    PropertyType.getAllPropertyType(lan_code, function (err, data) {
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
const PetType = require('../model/Pet_Type');

//!Create pet type
exports.create = (req, res) => {
    const newPetType = {
        "type_name": req.body.type_name,
        "lan_code": req.body.lan_code
    }
    PetType.create(newPetType, function (err, data) {
        if (err) {
            res.status(400).json({
                status: 400,
                response: null,
                error: err
            })
        } else {
            res.status(200).json({
                status: 200,
                response: "Pet type created successfuly!",
                error: null
            })
        }
    });
};

exports.updateById = (req, resp) => {

};

exports.removeById = (req, resp) => {

};

exports.getPetTypeById = (req, resp) => {

};

//!Get all pet types
exports.getAllPetType = (req, res) => {
    var lan_code = req.body.lan_code
    PetType.getAllPetType(lan_code, function (err, data) {
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
const VehicalBrand = require('../model/Vehical_Brand');

exports.create = (req, resp) => {
    if (!req.body) {
        resp.status(400).send({
            message: "Content can not be empty!"
        });
    }
    var createTime = new Date().getTime();
    const newVehicalBrand = {
        "brand_name": req.body.brand_name,
        "status": "1",
        "create_at": createTime, // when create must assing current time 
        "update_at": null,// when create must assing current time 
        "remove_at": null
    };

    VehicalBrand.create(newVehicalBrand, (err, data) => {
        if (err)
            resp.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Vehical Brand."
            });
        else resp.send(data);
    });
};

exports.updateById = (req, resp) => {

};

exports.removeById = (req, resp) => {

};

exports.getVehicalBrandById = (req, resp) => {

};

//!Get all
exports.getAllVehicalBrand = (req, res) => {
    var lan_code = req.body.lan_code
    VehicalBrand.getAllVehicalBrand(lan_code, function (err, data) {
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
    })
};
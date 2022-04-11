const Electroinc_Brand = require('../model/Electroinc_Brand');

exports.create = (req, resp) => {
    if (!req.body) {
        resp.status(400).send({
            message: "Content can not be empty!"
        });
    }
    var createTime = new Date().getTime();
    const newElectricBrand = {
        "brand_name": req.body.brand_name,
        "status": "1",
        "create_at": createTime, // when create must assing current time 
        "update_at": null, // when create must assing current time 
        "remove_at": null
    };
    Electroinc_Brand.create(newElectricBrand, function (err, data) {
        if (err)
            resp.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Electronic Brand."
            });
        else resp.send(data);
    })
};

exports.updateById = (req, resp) => {

};

exports.removeById = (req, resp) => {

};

exports.getElectroincBrandById = (req, resp) => {

};


exports.getAllElectroincBrand = (req, res) => {
    var lan_code = req.body.lan_code;
    Electroinc_Brand.getAllElectroincBrand(lan_code, function (err, data) {
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
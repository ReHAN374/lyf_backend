const FuelType = require('../model/Fuel_Type');

exports.create = (req, resp) => {
    if (!req.body) {
        resp.status(400).send({
            message: "Content can not be empty!"
        });
    }
    var createTime = new Date();

    var newFuleType = {
        "fuel_name": req.body.fuel_name,
        "status": "1",
        "create_at": createTime,
        "update_at": null,
        "remove_at": null
    }

    FuelType.create(newFuleType, (err, data) => {
        if (err)
            resp.status(500).send({
                message:
                    err.message || "Some error occurred while creating the new Fule Type."
            });
        else resp.send(data);
    });
};

exports.updateById = (req, resp) => {
    if (!req.body) {
        resp.status(400).send({
            message: "Content can not be empty!"
        });
    }
    var upadteTime = new Date();
    var idFuel = req.body.idFuelType;

    var updateFuleType = {
        "fuel_name": req.body.fuel_name,
        "status": "1",
        "create_at": null,
        "update_at": upadteTime,
        "remove_at": null
    }

    FuelType.updateById(updateFuleType, idFuel, (err, data) => {
        if (err)
            resp.send(err);
        resp.send(data);
    });

};

exports.removeById = (req, resp) => {
    if (!req.body) {
        resp.status(400).send({
            message: "Content can not be empty!"
        });
    }
    var removeTime = new Date();
    var idfuel = req.body.idFuelType;

    FuelType.removeById(idfuel, removeTime, (err, data) => {
        if (err)
            resp.send(err);
        resp.send(data);
    });
};

//!Create fuel type
exports.getAllFuleInfo = (req, res) => {
    var lan_code = req.body.lan_code
    FuelType.getAllFuelInfo(lan_code, (err, data) => {
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
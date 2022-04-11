const LandType = require('../model/Land_Type');

exports.create = (req, resp) => {
    if (!req.body) {
        resp.status(400).send({
            message: "Content can not be empty!"
        });
    }
    var createTime = new Date();

    var newLandType = {
        "typeName": req.body.typeName,
        "status": "1",
        "create_at": createTime,
        "update_at": null,
        "remove_at": null
    }

    LandType.create(newLandType, (err, data) => {
        if (err)
            resp.status(500).send({
                message:
                    err.message || "Some error occurred while creating the new Land Type."
            });
        else resp.send(data);
    });
};

exports.updateLandTypeInfo = (req, resp) => {
    if (!req.body) {
        resp.status(400).send({
            message: "Content can not be empty!"
        });
    }
    var upadteTime = new Date();
    var idLand = req.body.idLandType;
    var updateLandType = {
        "typeName": req.body.typeName,
        "status": "1",
        "create_at": null,
        "update_at": upadteTime,
        "remove_at": null
    }

    LandType.updateById(idLand, updateLandType, (err, data) => {
        if (err)
            resp.send(err);
        resp.send(data);
    });
};


exports.removeFromLandTypeInfo = (req, resp) => {
    if (!req.body) {
        resp.status(400).send({
            message: "Content can not be empty!"
        });
    }
    var removeTime = new Date();
    var idLand = req.body.idLandType;

    LandType.removeById(idLand, removeTime, (err, data) => {
        if (err)
            resp.send(err);
        resp.send(data);
    });

};

//!get all
exports.getAllLandTypeInfo = (req, res) => {
    var lan_code = req.body.lan_code
    LandType.getAllLandTypeInfo(lan_code, (err, data) => {
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
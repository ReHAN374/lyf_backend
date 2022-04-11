const TransmissionType = require('../model/Transmission_Type');

exports.create = (req, resp) => {
    if (!req.body) {
        resp.status(400).send({
            message: "Content can not be empty!"
        });
    }
    var createTime = new Date();

    var newTransmissionType = {
        "name": req.body.name,
        "status": "1",
        "create_at": createTime,
        "update_at": null,
        "remove_at": null
    };

    TransmissionType.create(newTransmissionType, (err, data) => {
        if (err)
            resp.status(500).send({
                message:
                    err.message || "Some error occurred while creating the new Transmission Type."
            });
        else resp.send(data);
    });
};

exports.updateFromTransmissionType = (req, resp) => {
    if (!req.body) {
        resp.status(400).send({
            message: "Content can not be empty!"
        });
    }

    var updateTime = new Date();

    var idTrans = req.body.idTrasmission;
    var updateTransmissionType = {
        "name": req.body.name,
        "status": "1",
        "create_at": null,
        "update_at": updateTime,
        "remove_at": null
    };

    TransmissionType.updateById(idTrans, updateTransmissionType, (err, data) => {
        if (err)
            resp.send(err);
        resp.send(data);
    });
};


exports.removeFromTransmissionType = (req, resp) => {
    if (!req.body) {
        resp.status(400).send({
            message: "Content can not be empty!"
        });
    }

    var idTrans = req.body.idTrasmission;
    var removeTime = new Date();

    TransmissionType.removeById(idTrans, removeTime, (err, data) => {
        if (err)
            resp.send(err);
        resp.send(data);
    });
};

//!Get all
exports.getAllTransmissionTypeInfo = (req, res) => {
    var lan_code = req.body.lan_code
    TransmissionType.getAllTransmissionTypeInfo(lan_code, (err, data) => {
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
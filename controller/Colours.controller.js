const Colours = require('../model/Colours');

exports.create = (req, resp) => {
    if (!req.body) {
        resp.status(400).send({
            message: "Content can not be empty!"
        });
    }
    //upate apis
    var createTime = new Date();

    var newColours = {
        "name": req.body.name,
        "hex_code": req.body.hex_code,
        "status": "1",
        "create_at": createTime,
        "update_at": null,
        "remove_at": null
    };

    Colours.create(newColours, (err, data) => {
        if (err)
            resp.status(500).send({
                message:
                    err.message || "Some error occurred while creating the new Colours."
            });
        else resp.send(data);
    });
};

exports.updateColourInfoById = (req, resp) => {
    if (!req.body) {
        resp.status(400).send({
            message: "Content can not be empty!"
        });
    }
    //upate apis
    var updateTime = new Date();
    var idColour = req.body.idColours;

    var updateColours = {
        "name": req.body.name,
        "hex_code": req.body.hex_code,
        "status": "1",
        "create_at": null,
        "update_at": updateTime,
        "remove_at": null
    };

    Colours.updateById(idColour, updateColours, (err, data) => {
        if (err)
            resp.send(err);
        resp.send(data);
    });
};

exports.removeFromColourInfo = (req, resp) => {
    if (!req.body) {
        resp.status(400).send({
            message: "Content can not be empty!"
        });
    }
    //upate apis
    var removeTime = new Date();
    var idColour = req.body.idColours;

    Colours.removeById(idColour, removeTime, (err, data) => {
        if (err)
            resp.send(err);
        resp.send(data);
    });
};

exports.getAllColoursInfo = (req, res) => {
    var lan_code = req.body.lan_code;
    Colours.getAllColoursInfo(lan_code, (err, data) => {
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
}
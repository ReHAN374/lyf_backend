const SportType = require('../model/Sport_Type');

exports.create = (req, resp) => {
    if (!req.body) {
        resp.status(400).send({
            message: "Content can not be empty!"
        });
    }
    var createTime = new Date().getTime();
    const newSportType = {
        "type_name": req.body.type_name,
        "status": "1",
        "create_at": createTime, // when create must assing current time 
        "update_at": null, // when create must assing current time 
        "remove_at": null
    }

    SportType.create(newSportType, (err, data) => {
        if (err)
            resp.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Sport Type."
            });
        else resp.send(data);
    });
};

exports.updateById = (req, resp) => {

};

exports.removeById = (req, resp) => {

};

exports.getSportTypeById = (req, resp) => {

};

//!get all
exports.getAllSportType = (req, res) => {
    var lan_code = req.body.lan_code
    SportType.getAllSportType(lan_code, function (err, data) {
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
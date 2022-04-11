const AppartmentDeveloper = require('../model/Aprtment_developer');

exports.create = (req, resp) => {
    if (!req.body) {
        resp.status(400).send({
            message: "Content can not be empty!"
        });
    }

    var createTime = new Date();

    var newApprtmentDeveloper = {
        name: req.body.deloperName,
        status: "1",
        create_at: createTime,
        update_at: null,
        remove_at: null
    };

    AppartmentDeveloper.create(newApprtmentDeveloper, (err, data) => {
        if (err)
            resp.status(500).send({
                message:
                    err.message || "Some error occurred while creating the new add New Developer Name."
            });
        else resp.send(data);
    });
};

//!get all
exports.getAllDeveloperInfo = (req, res) => {
    AppartmentDeveloper.getAllDeveloperInfo(req.body.land_code, (err, data) => {
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
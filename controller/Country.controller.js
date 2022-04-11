const Country = require('../model/Country.model');

//!Create new country
exports.create = (req, res) => {
    const newCountry = {
        "country_name": req.body.country_name,
        "code": req.body.code,
        "tel_code": req.body.tel_code,
        "lan_code": req.body.lan_code
    };

    Country.create(newCountry, (err, data) => {
        if (err) {
            res.status(400).json({
                status: 400,
                response: null,
                error: err
            })
        } else {
            res.status(200).json({
                status: 200,
                response: "Country created successfuly!",
                error: null
            })
        }
    });
};

exports.updateById = (req, resp) => {
    if (!req.body) {
        resp.status(400).send({
            message: "Content can not be empty!"
        });
    }

    var countryId = req.body.countryID;
    const newCountry = new Country(
        country_name = req.body.country_name,
        code = req.body.code,
        tel_code = req.body.tel_code,
        status = req.body.status,
        create_at = req.body.create_at, // when create must assing current time 
        update_at = req.body.update_at, // when create must assing current time 
        remove_at = req.body.remove_at, // when create must assing current time
    );

    // need to pass county code also
    Country.updateById(countryId, newCountry, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while update the Country."
            });
        else res.send(data);
    });
};

exports.removeById = (req, resp) => {

};

exports.getCountryById = (req, resp) => {

};

//!Get all countries
exports.getAllCountry = (req, res) => {
    var lan_code = req.body.lan_code;
    Country.getAllCountry(lan_code, (err, data) => {
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


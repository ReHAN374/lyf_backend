const InstrumentType = require('../model/Instrument_Type');

//!Create instrument
exports.create = (req, res) => {
    const newInstrumentTime = {
        "type_name": req.body.type_name,
        "lan_code": req.body.lan_code
    };
    InstrumentType.create(newInstrumentTime, (err, data) => {
        if (err) {
            res.status(400).json({
                status: 400,
                response: null,
                error: err
            })
        } else {
            res.status(200).json({
                status: 200,
                response: "Instrument type created successfuly!",
                error: null
            })
        }
    });
};

exports.updateById = (req, resp) => {

};

exports.removeById = (req, resp) => {

};

exports.getInstrumentTypeById = (req, resp) => {

};

//!get all
exports.getAllInstrumentType = (req, res) => {
    var lan_code = req.body.lan_code
    InstrumentType.getAllInstrumentType(lan_code, function (err, data) {
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
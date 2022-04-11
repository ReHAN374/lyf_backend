const sql = require('../utill/database');

const Instrument_Type = function () { };

//!instrument_type info save 
Instrument_Type.create = (newInstrumentType, result) => {
    sql.query('INSERT INTO `instrument_type` (`type_name`,`lan_code`) VALUES (?,?);', [newInstrumentType.type_name, newInstrumentType.lan_code],
        function (err, res) {
            if (err) {
                result(err, null);
                return;
            }
            result(null, res);
        });
};

// instrument_type info update
Instrument_Type.updateById = (instrument_type, result) => {

};

//instrument_type info remove 
Instrument_Type.removeById = (instrument_type, result) => {

};

//get selected instrument_type info
Instrument_Type.getInstrumentTypeById = (instrument_type, result) => {

};

//!get All instrument_type info
Instrument_Type.getAllInstrumentType = (lan_code, result) => {
    sql.query("select * from instrument_type where status ='1' and lan_code=?", [lan_code], function (err, res, fields) {
        if (err) {
            result(err,null)
        } else {
            result(null, res)
        }
    });
};

module.exports = Instrument_Type;
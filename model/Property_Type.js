const sql = require('../utill/database');

const Property_Type = function () { };

//!Create property type
Property_Type.create = (newPropertyType, result) => {
    sql.query('INSERT INTO `property_type` (`type_name`,lan_code) VALUES (?,?);', [newPropertyType.type_name, newPropertyType.lan_code],
        function (err, res) {
            if (err) {
                result(err, null);
                return;
            }
            result(null, res);
        });
};



// property_type info update
Property_Type.updateById = (property_type, result) => {

};

//property_type info remove 
Property_Type.removeById = (property_type, result) => {

};

//get selected property_type info
Property_Type.getPropertyTypeById = (property_type, result) => {

};

//!Get All property_type info
Property_Type.getAllPropertyType = (lan_code, result) => {
    sql.query("select * from property_type where status ='1' and lan_code=?", [lan_code], function (err, res) {
        if (err) {
            result(err, null)
        } else {
            result(null, res)
        }
    });
};

module.exports = Property_Type;
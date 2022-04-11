const sql = require('../utill/database');

const Pet_Type = function () { };

//!Create pet type
Pet_Type.create = (newPetType, result) => {
    sql.query('INSERT INTO `pet_type` (`type_name`,`lan_code`) VALUES (?,?);', [newPetType.type_name, newPetType.lan_code],
        function (err, res) {
            if (err) {
                result(err, null);
                return;
            }
            result(null, res);
        }
    );
};

// pet_type info update
Pet_Type.updateById = (pet_type, result) => {

};

//pet_type info remove 
Pet_Type.removeById = (pet_type, result) => {

};

//get selected pet_type info
Pet_Type.getPetTypeById = (pet_type, result) => {

};

//!get All pet_type info
Pet_Type.getAllPetType = (lan_code, result) => {
    sql.query("select * from pet_type where status ='1' and lan_code=?", [lan_code], function (err, res) {
        if (err) {
            result(err, null)
        } else {
            result(null, res)
        }
    });
};

module.exports = Pet_Type;
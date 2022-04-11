const sql = require('../utill/database');

const Fuel_Type = function (newFeulType) {
    this.fuel_name = newFeulType.fuel_name;
    this.status = newFeulType.status;
    this.create_at = newFeulType.create_at;
    this.update_at = newFeulType.update_at;
    this.remove_at = newFeulType.remove_at;
};

Fuel_Type.create = (newFeulType, result) => {
    sql.query("INSERT INTO `fuel_type` (`fuel_name`, `status`, `create_at`, `update_at`, `remove_at`) VALUES (?, ?, ?, ?, ?);", [newFeulType.fuel_name, newFeulType.status, newFeulType.create_at, newFeulType.update_at, newFeulType.remove_at], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created new Fuel Type : ", { id: res.insertId, ...newFeulType });
        result(null, { id: res.insertId, ...newFeulType });
    });
};

Fuel_Type.updateById = (updateFeulType, idFeul, result) => {
    sql.query("update set fuel_type `fuel_name`=?, `update_at`=? where `idfuel_type`=?", [updateFeulType.fuel_name, updateFeulType.update_at, idFeul], function (err, res, fields) {
        if (err) {
            console.log("error happen when update data from Fuel Type " + err);
            result(null, JSON.stringify({ "status": 200, "error": err, "response": null }))
        } else {
            console.log(" update from Land Type " + res);
            result(null, JSON.stringify({ "status": 200, "error": null, "response": res }))
        }
    });
};

Fuel_Type.removeById = (idFeul, removeTime, result) => {
    sql.query("update set fuel_type status ='0', remove_at=? where idfuel_type=? ", [removeTime, idFeul], function (err, res, fields) {
        if (err) {
            console.log("error happen remove get data from Fuel Type " + err);
            result(null, JSON.stringify({ "status": 200, "error": err, "response": null }))
        } else {
            console.log(" remove from Land Type " + res);
            result(null, JSON.stringify({ "status": 200, "error": null, "response": res }))
        }
    });
};

//!get all fuel types
Fuel_Type.getAllFuelInfo = (lan_code, result) => {
    sql.query("select * from fuel_type where status ='1' and lan_code=?", [lan_code],
        function (err, res) {
            if (err) {
                result(err, null)
            } else {
                result(null, res)
            }
        });
};

module.exports = Fuel_Type;
const sql = require('../utill/database');

const Transmission_Type = function (newTransmissionType) {
  this.name = newTransmissionType.name;
  this.status = newTransmissionType.status;
  this.create_at = newTransmissionType.create_at;
  this.update_at = newTransmissionType.update_at;
  this.remove_at = newTransmissionType.remove_at;
};

Transmission_Type.create = (newTransmissionType, result) => {
  sql.query("INSERT INTO `transmission_type` (`name`, `status`, `create_at`, `update_at`, `remove_at`) VALUES (?, ?, ?, ?, ?);", [newTransmissionType.name, newTransmissionType.status, newTransmissionType.create_at, newTransmissionType.update_at, newTransmissionType.remove_at], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created new Transmission Type : ", { id: res.insertId, ...newTransmissionType });
    result(null, { id: res.insertId, ...newTransmissionType });
  });
};

Transmission_Type.updateById = (idTramission, updateTransmissionType, result) => {
  sql.query("update transmission_type set `name`=?, `update_at` =? where idtransmission_type =? ", [updateTransmissionType.name, updateTransmissionType.update_at, idTramission], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created new Transmission Type : ", { id: res.insertId, ...newTransmissionType });
    result(null, { id: res.insertId, ...newTransmissionType });
  });
};

Transmission_Type.removeById = (idTramssion, removeTime, result) => {
  sql.query("update transmission_type set status ='0', remove_at =? where idtransmission_type =?", [removeTime, idTramssion], function (err, res, fields) {
    if (err) {
      console.log("error happen when remove data from Transmission Type " + err);
      result(null, JSON.stringify({ "status": 200, "error": err, "response": null }))
    } else {
      console.log(" remove from Transmission Type " + res);
      result(null, JSON.stringify({ "status": 200, "error": null, "response": res }))
    }
  });
};

//!Get all
Transmission_Type.getAllTransmissionTypeInfo = (lan_code, result) => {
  sql.query("select * from transmission_type where status ='1' and lan_code=?", [lan_code], function (err, res, fields) {
    if (err) {
      result(err, null)
    } else {
      result(null, res)
    }
  });
};

module.exports = Transmission_Type;
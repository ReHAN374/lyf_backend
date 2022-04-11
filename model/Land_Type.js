const sql = require('../utill/database');

const Land_Type = function (newLandType) {
  this.typeName = newLandType.typeName;
  this.status = newLandType.status;
  this.create_at = newLandType.create_at;
  this.update_at = newLandType.update_at;
  this.remove_at = newLandType.remove_at;
};

Land_Type.create = (newLandType, result) => {
  sql.query("INSERT INTO `LandType` (`typeName`, `status`, `create_at`, `update_at`, `remove_at`) VALUES (?, ?, ?, ?, ?);", [newLandType.typeName, newLandType.status, newLandType.create_at, newLandType.update_at, newLandType.remove_at], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created new Land Type : ", { id: res.insertId, ...newLandType });
    result(null, { id: res.insertId, ...newLandType });
  });
};

Land_Type.updateById = (idLandType, updateLandType, result) => {
  sql.query("update set LandType `typeName`=?, `update_at`=? where `idLandType`=?", [updateLandType.typeName,updateLandType.update_at,idLandType], function (err, res, fields) {
    if (err) {
      console.log("error happen when update data from Land Type " + err);
      result(null, JSON.stringify({ "status": 200, "error": err, "response": null }))
    } else {
      console.log(" update from Land Type " + res);
      result(null, JSON.stringify({ "status": 200, "error": null, "response": res }))
    }
  });
};

Land_Type.removeById = (idLandType, removeTime, result) =>{
  sql.query("update set LandType status ='0', remove_at=? where idLandType=? ", [removeTime,idLandType], function (err, res, fields) {
    if (err) {
      console.log("error happen remove get data from Land Type " + err);
      result(null, JSON.stringify({ "status": 200, "error": err, "response": null }))
    } else {
      console.log(" remove from Land Type " + res);
      result(null, JSON.stringify({ "status": 200, "error": null, "response": res }))
    }
  });
};

Land_Type.getAllLandTypeInfo = (lan_code,result) => {
  sql.query("select * from landtype where status ='1' and lan_code=?", [lan_code], function (err, res, fields) {
    if (err) {
      result(err,null)
    } else {
      result(null,res)
    }
  });
};

module.exports = Land_Type;
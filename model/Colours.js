const sql = require('../utill/database');

const Colours = function (newColours) {
  this.name = newColours.name;
  this.hex_code = newColours.hex_code;
  this.status = newColours.status;
  this.create_at = newColours.create_at;
  this.update_at = newColours.update_at;
  this.remove_at = newColours.remove_at;
};

Colours.create = (newColours, result) => {
  sql.query("INSERT INTO `colours` (`name`, `hex_code`, `status`, `create_at`, `update_at`, `remove_at`) VALUES (?, ?, ?, ?, ?, ?);", [newColours.name, newColours.hex_code, newColours.status, newColours.create_at, newColours.update_at, newColours.remove_at], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created new Colours : ", { id: res.insertId, ...newColours });
    result(null, { id: res.insertId, ...newColours });
  });
};

Colours.updateById = (idColour, updateColourInfo, result) => {
  sql.query("update colours set `name` =?, `hex_code` =? , update_at =? where idcolours=? ", [updateColourInfo.name, updateColourInfo.hex_code, updateColourInfo.update_at, idColour], function (err, res, fields) {
    if (err) {
      console.log("error happen when remove data from Colours " + err);
      result(null, JSON.stringify({ "status": 200, "error": err, "response": null }))
    } else {
      console.log(" remove from Colours " + res);
      result(null, JSON.stringify({ "status": 200, "error": null, "response": res }))
    }
  });
};

Colours.removeById = (idColour, removeTime, result) => {
  sql.query("update colours set status ='0', remove_at =? where idcolours=? ", [removeTime, idColour], function (err, res, fields) {
    if (err) {
      console.log("error happen when remove data from Colours " + err);
      result(null, JSON.stringify({ "status": 200, "error": err, "response": null }))
    } else {
      console.log(" remove from Colours " + res);
      result(null, JSON.stringify({ "status": 200, "error": null, "response": res }))
    }
  });
};

//!Get all
Colours.getAllColoursInfo = (lan_code, result) => {
  sql.query("select * from colours where status ='1' and lan_code=?", [lan_code], function (err, res) {
    if (err) {
      result(err, null)
    } else {
      result(null, res)
    }
  });
};

module.exports = Colours;
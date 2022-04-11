const sql = require('../utill/database');

const Area = function () {
};

//!Create are
Area.create = (newArea) => {
  return new Promise((resolve, reject) => {
    sql.query("INSERT INTO `area` (`area_name`, lan_code) VALUES (?,?);",
      [newArea.area_name, newArea.lan_code], (err, res) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(res);
      });
  })
};

Area.UpdateById = (UserConfig, userId, result) => {
  sql.query("", [], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created country: ", { id: res.insertId, ...newCountry });
    result(null, { id: res.insertId, ...newCountry });
  });
};

Area.removeById = (userId, result) => {

};

Area.getAllAreaInfo = (lan_code) => {
  return new Promise((resolve, reject) => {
    sql.query("SELECT * FROM area WHERE status ='1' and lan_code=? ORDER BY area_name ASC",
      [lan_code],
      function (err, res) {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
  })
};

module.exports = Area;
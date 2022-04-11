const sql = require('../utill/database');

const Country = function () { };

//!Create new country
Country.create = (newCountry, result) => {
  sql.query("INSERT INTO `country` (`country_name`,`code`,`tel_code`, lan_code) VALUES (?,?,?,?);", [newCountry.country_name, newCountry.code, newCountry.tel_code, newCountry.lan_code],
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, res);
    });
};





// country info update
Country.updateById = (countryId, country, result) => {

};

//country info remove 
Country.removeById = (countryId, result) => {
  sql.query("update `Country` set status ='0' where countryId=?;", [countryId], function (err, res, fields) {
    if (err) {
      console.log("error happen when remove data from countryID " + err);
      result(null, JSON.stringify({ "status": 200, "error": " This call" + err, "response": null }))
    } else {
      console.log(" data remove from countryID " + res);
      result(null, JSON.stringify({ "status": 200, "error": null, "response": res }))
    }
  });
};

//get selected country info
Country.getCountryById = (countryId, result) => {
  sql.query("select * from `Country` where status ='1' and countryId=?;", [countryId], function (err, res, fields) {
    if (err) {
      console.log("error happen when get data from countryID " + err);
      result(null, JSON.stringify({ "status": 200, "error": " This call" + err, "response": null }))
    } else {
      console.log(" data from countryID " + res);
      result(null, JSON.stringify({ "status": 200, "error": null, "response": res }))
    }
  });
};

//!get All country info 
Country.getAllCountry = (lan_code, result) => {
  sql.query("select * from `country` where status ='1'and lan_code=?;", [lan_code], function (err, res) {
    if (err) {
      result(err, null)
    } else {
      result(null, res)
    }
  });
};

module.exports = Country;
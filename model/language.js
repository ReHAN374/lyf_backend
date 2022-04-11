const sql = require('../utill/database');


const Language = function(newLanaguage){
    this.lanaguageName = newLanaguage.lanaguageName;
    this.lan_code = newLanaguage.lan_code;
    this.status = newLanaguage.status;
    this.create_at = newLanaguage.create_at;
    this.update_at = newLanaguage.update_at;
    this.remove_at = newLanaguage.remove_at;
};

Language.create = (newLanaguage,result) =>{
    sql.query("INSERT INTO `language` (`lanaguageName`, `lan_code`, `status`, `create_at`, `update_at`, `remove_at`) VALUES (?, ?, ?, ?, ?, ?);", [newLanaguage.lanaguageName,newLanaguage.lan_code,newLanaguage.status,newLanaguage.create_at,newLanaguage.update_at,newLanaguage.remove_at], (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        console.log("created Language: ", { id: res.insertId, ...newLanaguage });
        result(null, { id: res.insertId, ...newLanaguage });
      });
};

Language.UpdateById = (updateLanaguage, languageId, result) => {
  sql.query("update language set `lanaguageName` =?, `lan_code` =?, status = '1', update_at=? where idlanguage =?; ", [updateLanaguage.lanaguageName,updateLanaguage.lan_code,updateLanaguage.update_at,languageId], (err, res) => {
    if(err){
        console.log("error happen when update data from language "+err);
        result(null,JSON.stringify({"status":200,"error": err,"response": null}))
      }else{
        console.log(" update from language "+res);
        result(null,JSON.stringify({"status":200,"error":null,"response": res}))
      }
});
};

Language.removeById = (languageId, removeTime, result) => {
  sql.query("update language set status = '0', remove_at=? where idlanguage =?; ", [removeTime,languageId], (err, res) => {
    if(err){
        console.log("error happen when remove data from language "+err);
        result(null,JSON.stringify({"status":200,"error": err,"response": null}))
      }else{
        console.log(" remove from language "+res);
        result(null,JSON.stringify({"status":200,"error":null,"response": res}))
      }
});
};  

Language.getAllLanguageInfo = result => {
  sql.query("select * from language where status = '1'", [], function (err, res, fields) {
    if (err) {
      console.log("error happen when serach language " + err);
      result(null, JSON.stringify({ "status": 200, "error": err, "response": null }))
    } else {
      console.log(" data from language " + res);
      result(null, JSON.stringify({ "status": 200, "error": null, "response": res }))
    }
  });
};

module.exports = Language;

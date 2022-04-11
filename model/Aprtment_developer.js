const sql = require('../utill/database');

const Appartment_Developer = function(newApprtemtDeveloper){
    this.name = newApprtemtDeveloper.name;
    this.status = newApprtemtDeveloper.status;
    this.create_at = newApprtemtDeveloper.create_at;
    this.update_at = newApprtemtDeveloper.update_at;
    this.remove_at = newApprtemtDeveloper.remove_at;
};

Appartment_Developer.create = (newApprtemtDeveloper, result) => {
    sql.query("INSERT INTO `aprtment_developer` (`name`, `status`, `create_at`, `update_at`, `remove_at`) VALUES (?, ?, ?, ?, ?);", [newApprtemtDeveloper.name,newApprtemtDeveloper.status,newApprtemtDeveloper.create_at,newApprtemtDeveloper.update_at,newApprtemtDeveloper.remove_at], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("add new property developer: ", { id: res.insertId, ...newApprtemtDeveloper });
        result(null, JSON.stringify({ "status": 200, "error": null, "response": { id: res.insertId, ...newApprtemtDeveloper } }));
    });
};

Appartment_Developer.updateById = (updateApprtemntDeveloper, idApprtemnt, result) =>{

};

Appartment_Developer.removeUsingId = (idApprtemnt, result) => {

};

//!get all
Appartment_Developer.getAllDeveloperInfo = (code,result) => {
    sql.query("select * from aprtment_developer where status ='1' AND lan_code=?",[code],function(err,res,fields){
        if(err){
          result(err,null)
        }else{
          result(null,res)
        }
      });
};

module.exports = Appartment_Developer;
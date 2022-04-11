const sql = require('../utill/database');

const Vehical_Model = function(vehical_model){
    this.model_name = vehical_model.model_name;
    this.status = vehical_model.status;
    this.create_at = vehical_model.create_at; // when create must assing current time 
    this.update_at = vehical_model.update_at; // when create must assing current time 
    this.remove_at = vehical_model.remove_at; // when create must assing current time 
};

//vehical_model info save 
Vehical_Model.create = (newVehicalModel,result)=>{
    sql.query('INSERT INTO `vehical_model` (`model_name`,`status`) VALUES (?,?);',[newVehicalModel.model_name,newVehicalModel.status],function(err,res){
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
          console.log("created vehical_model: ", { id: res.insertId, ...newVehicalModel });
          result(null, { id: res.insertId, ...newVehicalModel });
    });
};

// vehical_model info update
Vehical_Model.updateById = (vehical_model, result) => {

};

//vehical_model info remove 
Vehical_Model.removeById = (vehical_model,result) =>{

};

//get selected vehical_model info
Vehical_Model.getVehicalModelById = (vehical_model , result) =>{

};

//!get All vehical_model info
Vehical_Model.getAllVehicalModel =  (lan_code,result) =>{
    sql.query("select * from vehical_model where status ='1' and lan_code=?", [lan_code], function (err, res, fields) {
        if (err) {
            result(err,null)
        } else {
            result(null, res)
        }
    });
};

module.exports = Vehical_Model;
const sql = require('../utill/database');

const Sport_Type = function(sport_type){
    this.type_name = sport_type.type_name;
    this.status = sport_type.status;
    this.create_at = sport_type.create_at; // when create must assing current time 
    this.update_at = sport_type.update_at; // when create must assing current time 
    this.remove_at = sport_type.remove_at; // when create must assing current time 
};

//sport_type info save 
Sport_Type.create = (newSportType,result)=>{
    sql.query('INSERT INTO `sport_type` (`type_name`,`status`) VALUES (?,?);',[newSportType.type_name,newSportType.status],function(err,res){
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
          console.log("created country: ", { id: res.insertId, ...newSportType });
          result(null, { id: res.insertId, ...newSportType });
    });
};

// sport_type info update
Sport_Type.updateById = (sport_type, result) => {

};

//sport_type info remove 
Sport_Type.removeById = (sport_type,result) =>{

};

//get selected sport_type info
Sport_Type.getSportTypeById = (sport_type , result) =>{

};

//get All sport_type info
Sport_Type.getAllSportType =  (lan_code,result) =>{
    sql.query("select * from sport_type where status ='1' and lan_code=?", [lan_code], function (err, res, fields) {
        if (err) {
            result(err,null)
        } else {
            result(null,res)
        }
    });
};

module.exports = Sport_Type;
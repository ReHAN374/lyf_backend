const sql = require('../utill/database');

const Vehical_Brand = function(vehical_brand){
    this.brand_name = vehical_brand.brand_name;
    this.status = vehical_brand.status;
    this.create_at = vehical_brand.create_at; // when create must assing current time 
    this.update_at = vehical_brand.update_at; // when create must assing current time 
    this.remove_at = vehical_brand.remove_at; // when create must assing current time 
};

//vehical_brand info save 
Vehical_Brand.create = (newVehicalBrand,result)=>{
    sql.query('INSERT INTO `vehical_brand` (`brand_name`,`status`) VALUES (?,?);',[newVehicalBrand.brand_name,newVehicalBrand.status],function(err,res){
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
          console.log("created vehical_brand: ", { id: res.insertId, ...newVehicalBrand });
          result(null, { id: res.insertId, ...newVehicalBrand });
    });
};

// vehical_brand info update
Vehical_Brand.updateById = (vehical_brand, result) => {

};

//vehical_brand info remove 
Vehical_Brand.removeById = (vehical_brand,result) =>{

};

//get selected vehical_brand info
Vehical_Brand.getVehicalBrandById = (vehical_brand , result) =>{

};

//!get All vehical_brand info
Vehical_Brand.getAllVehicalBrand =  (lan_code,result) =>{
    sql.query("select * from vehical_brand where status ='1' and lan_code=?", [lan_code], function (err, res, fields) {
        if (err) {
            result(err, null)
        } else {
            result(null, res)
        }
    });
};

module.exports = Vehical_Brand;
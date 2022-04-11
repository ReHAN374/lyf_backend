const sql = require('../utill/database');

const Electroinc_Brand = function(electroinc_brand){
    this.brand_name = electroinc_brand.brand_name;
    this.status = electroinc_brand.status;
    this.create_at = electroinc_brand.create_at; // when create must assing current time 
    this.update_at = electroinc_brand.update_at; // when create must assing current time 
    this.remove_at = electroinc_brand.remove_at; // when create must assing current time 
};

//electroinc_brand info save 
Electroinc_Brand.create = (newElectroincBrand,result)=>{
    sql.query('INSERT INTO `electroinc_brand` (`brand_name`,`status`) VALUES (?,?);',[newElectroincBrand.brand_name,newElectroincBrand.status],function(err,res){
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
          console.log("created country: ", { id: res.insertId, ...newElectroincBrand });
          result(null, { id: res.insertId, ...newElectroincBrand });
    });
};

// electroinc_brand info update
Electroinc_Brand.updateById = (electroinc_brand, result) => {

};

//electroinc_brand info remove 
Electroinc_Brand.removeById = (electroinc_brand,result) =>{

};

//get selected electroinc_brand info
Electroinc_Brand.getElectroincBrandById = (electroinc_brand , result) =>{

};

//get All electroinc_brand info

Electroinc_Brand.getAllElectroincBrand =  (code,result) =>{
    sql.query("select * from electroinc_brand where status ='1' and lan_code =?;",[code],function(err,res,fields){
        if(err){
          result(err,null)
        }else{
          result(null,res)
        }
      });
};

module.exports = Electroinc_Brand;
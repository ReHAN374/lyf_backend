const sql = require('../utill/database');
const multer = require("multer");

const Sub_Category = function () { };

//!Create sub category
Sub_Category.create = (newSub_Category, result) => {
    sql.query('INSERT INTO `sub_category` (`sub_cat_name`, `id_ads_category`, `icon_path`, `color`,lan_code) VALUES (?,?,?,?,?);', [newSub_Category.Sub_Cat_name, newSub_Category.idAds_Category, newSub_Category.Icon_path, newSub_Category.Colour, newSub_Category.lan_code],
        function (err, res) {
            if (err) {
                result(err, null);
                return;
            }
            result(null, res);
        });
};

//!Upload sub category image
var storageSubCategory = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/subcategory/')
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`)
    },
    // fileFilter: (req, file, cb) => {
    //   const ext = path.extname(file.originalname)
    //   if (ext !== '.jpg' && ext !== '.png' && ext !== '.mp4') {
    //     return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
    //   }
    //   cb(null, true)
    // }
  })
  
  Sub_Category.uploadSubCategoryPhoto = multer({ storage: storageSubCategory }).single("file");



  

// sub_category info update
Sub_Category.updateById = (sub_category, result) => {

};

//sub_category info remove 
Sub_Category.removeById = (sub_category, result) => {

};

//get selected sub_category info
Sub_Category.getSubCategoryById = (sub_category, result) => {
    sql.query("select * from Sub_Category where status ='1' and idAds_Category = '1' ", [], function (err, res, fields) {
        if (err) {
            console.log("error happen when get data from pet type " + err);
            result(null, JSON.stringify({ "status": 200, "error": " This call" + err, "response": null }))
        } else {
            console.log(" data from pet type " + res);
            result(null, JSON.stringify({ "status": 200, "error": null, "response": res }))
        }
    });
};

//get selected sub_category info
Sub_Category.getAllSubCategoryInfoByCatID = (catId, result) => {
    sql.query("select * from Sub_Category where status ='1' and idAds_Category =? ", [catId], function (err, res, fields) {
        if (err) {
            console.log("error happen when get data from sub cat by catid " + err);
            result(null, JSON.stringify({ "status": 200, "error": " This call" + err, "response": null }))
        } else {
            console.log(" data from sub cat by catid " + res);
            result(null, JSON.stringify({ "status": 200, "error": null, "response": res }))
        }
    });
};

//get All sub_category info
Sub_Category.getAllSubCategory = (lan_code, result) => {
    sql.query("select * from Sub_Category where status ='1' and lan_code=?", [lan_code], function (err, res, fields) {
        if (err) {
            console.log("error happen when get data from pet type " + err);
            result(null, JSON.stringify({ "status": 200, "error": " This call" + err, "response": null }))
        } else {
            console.log(" data from pet type " + res);
            result(null, JSON.stringify({ "status": 200, "error": null, "response": res }))
        }
    });
};

module.exports = Sub_Category;
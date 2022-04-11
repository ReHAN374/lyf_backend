
const sql = require('../utill/database');
const multer = require("multer");

const Ads_Category = function () { };

//!Create main category
Ads_Category.create = (newAds_Category, result) => {
  sql.query("INSERT INTO `ads_category` (`category_name`, `icon_path`, `color`, lan_code) VALUES (?,?,?,?);", [newAds_Category.Category_name, newAds_Category.Icon_path, newAds_Category.Colour, newAds_Category.lan_code],
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, res);
    });
};

//!Get All main ads_category info
Ads_Category.getAllAdsMainCategory = (lan_code, result) => {
  sql.query("select * from ads_category where status ='1' and lan_code=? ORDER By order_by", [lan_code], function (err, res) {
    if (err) {
      result(err, null)
    } else {
      result(null, res)
    }
  });
};

// //!Get all main and sub cat info
Ads_Category.getAllCatAndSubInfo = (lan_code) => {
  return new Promise((resolve, reject) => {
    sql.query(`SELECT c.*, s.* FROM ads_category As c INNER JOIN sub_category AS s ON c.id_ads_category=s.id_ads_category WHERE c.status=1 AND c.lan_code=? AND s.lan_code=?;`,
      [lan_code, lan_code],
      function (err, res) {
        if (err) {
          reject(err);
        } else {
          console.log(res)
          resolve(res);
        }
      })
  })
};


//!Get all main and sub cat info
Ads_Category.getAllCategory = (lan_code) => {
  return new Promise((resolve, reject) => {
    sql.query(`SELECT id_ads_category,category_name,Icon_path,color,status FROM ads_category WHERE status=1 AND lan_code=? ORDER BY order_by`,[lan_code, lan_code],
      function (err, res) {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      })
  })
};

//!Get all main and sub cat info
Ads_Category.getAllSubCatById = (id) => {
  return new Promise((resolve, reject) => {
    sql.query(`SELECT id_sub_category,id_ads_category, sub_cat_name, Icon_path, status FROM sub_category WHERE id_ads_category=?;`,[id, id],
      function (err, res) {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      })
  })
};


//!Upload category image
var storageCategory = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/category/')
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

Ads_Category.uploadCategoryPhoto = multer({ storage: storageCategory }).single("file");

module.exports = Ads_Category;
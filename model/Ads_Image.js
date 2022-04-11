const sql = require('../utill/database');

const Ads_Image = function (ads_image) {};

//ads_image info save 
Ads_Image.create = (newAdsImage, result) => {
  sql.query("INSERT INTO `Ads_Image` (`id_ads_info`, `image_name`, `img_url`, `date`, `status`, `create_at`, `update_at`, `remove_at`) VALUES (?, ?, ?, ?, ?, ?, ?, ?);", [newAdsImage.idAds_Info, newAdsImage.Image_Name, newAdsImage.Ads_url, newAdsImage.Date, newAdsImage.status, newAdsImage.create_at, newAdsImage.update_at, newAdsImage.remove_at], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created ads: ", { id: res.insertId, ...newAdsImage });
    result(null, { id: res.insertId, ...newAdsImage });
  });
};

//!Delete ads image by image id
Ads_Image.deleteImage = (data) => {
  return new Promise((resolve, reject) => {
    sql.query(
      `DELETE FROM ads_image WHERE id_ads_image=?;`,
      [data.imageId],
      function (err, res) {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      }
    );
  })
};

// ads_image info update
Ads_Image.updateById = (ads_image, result) => {

};

//ads_image info remove 
Ads_Image.removeById = (ads_image, result) => {

};

//get selected ads_image info
Ads_Image.getAdsImageById = (ads_image, result) => {

};

//get All ads_image info
Ads_Image.getAllAdsImage = result => {

};

//!Get img list by ads id
Ads_Image.getAdsImgsByAdsId = (adsId) => {
  return new Promise((resolve, reject) => {
    sql.query("SELECT * FROM ads_image AS i WHERE i.id_ads_info=?", [adsId],
      function (err, res) {
        if (err) {
          reject(err);
          return;
        } else {
          resolve(res);
        }
      });
  })
}

module.exports = Ads_Image;
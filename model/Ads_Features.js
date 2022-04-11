const sql = require('../utill/database');

const Ads_Feature = function(newAdsFeature){
    this.featureName = newAdsFeature.featureName;
    this.duration = newAdsFeature.duration;
    this.status = newAdsFeature.status;
    this.create_at = newAdsFeature.create_at;
    this.update_at = newAdsFeature.update_at;
    this.remove_at = newAdsFeature.remove_at;
};

Ads_Feature.create = (newAdsFeature, result) =>{
    sql.query("INSERT INTO `Ads_Fetatures` (`featureName`, `duration`, `status`, `create_at`, `update_at`, `remove_at`) VALUES (?, ?, ?, ?, ?, ?);", [newAdsFeature.featureName,newAdsFeature.duration,newAdsFeature.status,newAdsFeature.create_at,newAdsFeature.update_at,newAdsFeature.remove_at], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created AdsFeature: ", { id: res.insertId, ...newAdsFeature });
        result(null, { id: res.insertId, ...newAdsFeature });
    });
};

Ads_Feature.updateById = (adsFeature,featureID, result) => {

};

Ads_Feature.removeById = (featureID, result) => {

};

Ads_Feature.getFeatureById = (featureID, result) => {

};

Ads_Feature.getAllFeatureInfo = (lan_code,result) => {
    sql.query("select * from Ads_Fetatures where status ='1' and lan_code=?", [lan_code], function (err, res, fields) {
        if (err) {
            console.log("error happen when get data from notification " + err);
            result(null, JSON.stringify({ "status": 200, "error": err, "response": null }))
        } else {
            console.log(" data from notification " + res);
            result(null, JSON.stringify({ "status": 200, "error": null, "response": res }))
        }
    });
};

module.exports = Ads_Feature;
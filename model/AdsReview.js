const sql = require('../utill/database');

const AdsReview = function(newAdsReview){
    this.reivew = newAdsReview.reivew; 
    this.rate = newAdsReview.rate; 
    this.status = newAdsReview.status; 
    this.idAds_Info = newAdsReview.idAds_Info; 
    this.idUser = newAdsReview.idUser; 
    this.create_at = newAdsReview.create_at; 
    this.update_at = newAdsReview.update_at; 
    this.remove_at = newAdsReview.remove_at; 
};

AdsReview.create = (newAdsReview, result) => {
    sql.query("INSERT INTO `reiview` (`reivew`, `rate`, `status`, `idAds_Info`, `idUser`, `create_at`, `update_at`, `remove_at`) VALUES (?, ?, ?, ?, ?, ?, ?, ?);", [newAdsReview.reivew,newAdsReview.rate,newAdsReview.status,newAdsReview.idAds_Info,newAdsReview.idUser,newAdsReview.create_at,newAdsReview.update_at,newAdsReview.remove_at], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("add new Ads Review : ", { id: res.insertId, ...newAdsReview });
        result(null, JSON.stringify({ "status": 200, "error": null, "response": { id: res.insertId, ...newAdsReview } }));
    });
};

AdsReview.updateById = (updateReview, idReview, result) => {
    sql.query("update reiview set `reivew` =?, `rate` =?, `status` ='1', `update_at` =? where idreiview =? ", [updateReview.reivew,updateReview.rate,updateReview.update_at,idReview], function (err, res, fields) {
        if (err) {
            console.log("error happen when update data from Ads Review " + err);
            result(null, JSON.stringify({ "status": 200, "error": err, "response": null }))
        } else {
            console.log(" update from Ads Review " + res);
            result(null, JSON.stringify({ "status": 200, "error": null, "response": res }))
        }
    });
};

AdsReview.removeById = (idReview, removeTime, result) => {
    sql.query("update reiview set  status ='0', remove_at=? where idreiview=? ", [removeTime,idReview], function (err, res, fields) {
        if (err) {
            console.log("error happen remove get data from Ads Review " + err);
            result(null, JSON.stringify({ "status": 200, "error": err, "response": null }))
        } else {
            console.log(" remove from Ads Review " + res);
            result(null, JSON.stringify({ "status": 200, "error": null, "response": res }))
        }
    });
};

AdsReview.getAllReviewByInfo = (idAds, result) => {
    sql.query("select * from reiview where status='1' and idUser=?", [idAds], function (err, res, fields) {
        if (err) {
            console.log("error happen when get data from Ads Review " + err);
            result(null, JSON.stringify({ "status": 200, "error": err, "response": null }))
        } else {
            console.log(" data from Ads Review " + res);
            result(null, JSON.stringify({ "status": 200, "error": null, "response": res }))
        }
    });
};

module.exports = AdsReview;
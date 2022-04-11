const AdsReivew = require('../model/AdsReview');

exports.create = (req, resp) => {
    if (!req.body) {
        resp.status(400).send({
            message: "Content can not be empty!"
        });
    }
    var createTime = new Date();

    var newAdsReview = {
        reivew : req.body.reivewDes,  
        rate :  req.body.rate, 
        status : '1', 
        idAds_Info : req.body.adsId, 
        idUser : req.body.userId, 
        create_at : createTime, 
        update_at : null, 
        remove_at : null
    }

    AdsReivew.create(newAdsReview,(err,data)=>{
        if (err)
            resp.status(500).send({
                message:
                    err.message || "Some error occurred while creating the new Ads Reivew."
            });
        else resp.send(data);
    });
};

exports.updateById = (req, resp) => {
    if (!req.body) {
        resp.status(400).send({
            message: "Content can not be empty!"
        });
    }
    var updateTime = new Date();
    var idAdsReivew = req.body.idAdsReview;
    var updateAdsReview = {
        reivew : req.body.reivewDes,  
        rate :  req.body.rate, 
        status : '1', 
        idAds_Info : req.body.adsId, 
        idUser : req.body.userId, 
        create_at : null, 
        update_at : updateTime, 
        remove_at : null
    }

    AdsReivew.updateById(updateAdsReview,idAdsReivew,(err,data)=>{
        if(err)
            resp.send(err);
        resp.send(data);
    });
};

exports.removeById = (req, resp) => {
    if (!req.body) {
        resp.status(400).send({
            message: "Content can not be empty!"
        });
    }
    var removeTime = new Date();
    var idAdsReivew = req.body.idAdsReview;

    AdsReivew.removeById(idAdsReivew,removeTime,(err,data)=>{
        if(err)
            resp.send(err);
        resp.send(data);
    });
}; 

exports.getAllAdsReiewsByAdsId = (req, resp) => {
    if (!req.body) {
        resp.status(400).send({
            message: "Content can not be empty!"
        });
    }
    var adsId = req.body.adsId;

    AdsReivew.getAllReviewByInfo(adsId, (err,data)=>{
        if(err)
            resp.send(err);
        resp.send(data);
    });
}; 
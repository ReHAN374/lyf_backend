const AdsFeature = require('../model/Ads_Features');

exports.create = (req, resp) =>{
    if (!req.body) {
        resp.status(400).send({
            message: "Content can not be empty!"
        });
    }
    var createTime = new Date();

    const newAdsFeature = {
        "featureName" : req.body.featureName,
        "duration" : req.body.duration,
        "status" : "1",
        "create_at" : createTime,
        "update_at" : null,
        "remove_at" : null
    }; 
    
    AdsFeature.create = (newAdsFeature,(err, data)=>{
        if (err)
            resp.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Vehical Model."
            });
        else resp.send(data);
    });
};

exports.getAllAdsFeatures = (req, resp) => {
    var lan_code=req.body.lan_code
    AdsFeature.getAllFeatureInfo(lan_code,function(err, data){
        console.log("send data "+data);
        if(err)
            resp.send(err);
        resp.send(data);
    });
};
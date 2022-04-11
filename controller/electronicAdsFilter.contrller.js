const ElectronicFilterAds = require('../model/electronicFilterAds');

exports.filterElectroncAds = (req,resp)=> {
    if (!req.body) {
        resp.status(400).send({
            message: "Content can not be empty!"
        });
    }

    var main_Catergory = req.body.mainCat; // defualt
    var sub_Catergory =  req.body.subCat; // defualt
    var ads_name = req.body.adsName;
    var price_min =  req.body.priceMin; // defualt
    var price_max = req.body.priceMax; // defualt
    var location = req.body.location;
    var condition = req.body.conditions;
    var dte = req.body.dates;
    var electrcBard = req.body.brandID;

    var filter = {
        "main_Catergory" : main_Catergory,
        "sub_Catergory" :  sub_Catergory, // defualt
        "ads_name" : ads_name,
        "price_min" :  price_min,// defualt
        "price_max" : price_max, // defualt
        "location" : location,
        "condition" : condition,
        "dte" : dte,
        "electrcBard" : electrcBard
    }

    ElectronicFilterAds.filterAds(filter, (err, data) => {
        if (err)
            resp.send(err);
        resp.send(data);
    });
}
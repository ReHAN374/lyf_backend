const vehicalFilter = require('../model/vehicalFilterAds');
const realStateFilter = require('../model/realStateFilterAds');
const petFilter = require('../model/Pet_Filter_Ads');
const sportFilter = require('../model/Sport_FilterAds');
const musicFilter = require('../model/Sport_FilterAds');
const collectibleFilter = require('../model/Collectible_FilterAds');

exports.getVehicalFilterAds = (req, resp) => {

    var main_Catergory = req.body.mainCat; // defualt
    var sub_Catergory = req.body.subCat; // defualt
    var ads_name = req.body.adsName;
    var price_min = req.body.priceMin; // defualt
    var price_max = req.body.priceMax; // defualt
    var location = req.body.location;
    var vehical_brand = req.body.brand;
    var vehical_model = req.body.model;
    var millage = req.body.millages;
    var mani_year = req.body.year;
    var condition = req.body.conditions; // defualt
    var transmission = req.body.transmissions;
    var fuel_type = req.body.fuel_types;
    var eng_cap = req.body.eng_capacity;
    var colour = req.body.color;
    var dte = req.body.dates;

    var filters = {
        "main_Catergory": main_Catergory,
        "sub_Catergory": sub_Catergory,
        "ads_name": ads_name,
        "price_min": price_min,
        "price_max": price_max,
        "location": location,
        "vehical_brand": vehical_brand,
        "vehical_model": vehical_model,
        "millage": millage,
        "mani_year": mani_year,
        "condition": condition,
        "transmission": transmission,
        "fuel_type": fuel_type,
        "eng_cap": eng_cap,
        'colour': colour,
        "dte": dte
    }

    vehicalFilter.filterAds(filters, (err, data) => {
        if (err)
            resp.send(err);
        resp.send(data);
    });
};

exports.getRealStateFilterAds = (req, res) => {
    if (!req.body) {
        resp.status(400).send({
            message: "Content can not be empty!"
        });
    }

    var main_Catergory = req.body.mainCat; // defualt
    var sub_Catergory = req.body.subCat; // defualt
    var ads_name = req.body.adsName;
    var price_min = req.body.priceMin; // defualt
    var price_max = req.body.priceMax; // defualt
    var location = req.body.location;
    var condition = req.body.conditions; // defualt
    var dte = req.body.dates;

    var filters = {
        "main_Catergory": main_Catergory,
        "sub_Catergory": sub_Catergory,
        "ads_name": ads_name,
        "price_min": price_min,
        "price_max": price_max,
        "location": location,
        "condition": condition,
        "dte": dte
    }

    realStateFilter.filterAds(filters, (err, data) => {
        if (err)
            res.send(err);
        res.send(data);
    });
}

exports.getPetFilterAds = (req, res) => {
    if (!req.body) {
        resp.status(400).send({
            message: "Content can not be empty!"
        });
    }
    var main_Catergory = req.body.mainCat; // defualt
    var sub_Catergory = req.body.subCat; // defualt
    var ads_name = req.body.adsName;
    var price_min = req.body.priceMin; // defualt
    var price_max = req.body.priceMax; // defualt
    var location = req.body.location;
    var condition = req.body.conditions; // defualt
    var dte = req.body.dates;

    var filters = {
        "main_Catergory": main_Catergory,
        "sub_Catergory": sub_Catergory,
        "ads_name": ads_name,
        "price_min": price_min,
        "price_max": price_max,
        "location": location,
        // "condition": condition,
        "dte": dte
    }

    petFilter.filterAds(filters, (err, data) => {
        if (err)
            res.send(err);
        res.send(data);
    });

}

exports.getSportFilterAds = (req, res) => {
    if (!req.body) {
        resp.status(400).send({
            message: "Content can not be empty!"
        });
    }
    var main_Catergory = req.body.mainCat; // defualt
    var sub_Catergory = req.body.subCat; // defualt
    var ads_name = req.body.adsName;
    var price_min = req.body.priceMin; // defualt
    var price_max = req.body.priceMax; // defualt
    var location = req.body.location;
    var condition = req.body.conditions; // defualt
    var dte = req.body.dates;

    var filters = {
        "main_Catergory": main_Catergory,
        "sub_Catergory": sub_Catergory,
        "ads_name": ads_name,
        "price_min": price_min,
        "price_max": price_max,
        "location": location,
        "condition": condition,
        "dte": dte
    }

    sportFilter.filterAds(filters, (err, data) => {
        if (err)
            res.send(err);
        res.send(data);
    });

}

exports.getMusicFilterAds = (req, res) => {
    if (!req.body) {
        resp.status(400).send({
            message: "Content can not be empty!"
        });
    }
    var main_Catergory = req.body.mainCat; // defualt
    var sub_Catergory = req.body.subCat; // defualt
    var ads_name = req.body.adsName;
    var price_min = req.body.priceMin; // defualt
    var price_max = req.body.priceMax; // defualt
    var location = req.body.location;
    var condition = req.body.conditions; // defualt
    var idinstrument_type = req.body.idinstrument_type;
    var dte = req.body.dates;

    var filters = {
        "main_Catergory": main_Catergory,
        "sub_Catergory": sub_Catergory,
        "ads_name": ads_name,
        "price_min": price_min,
        "price_max": price_max,
        "location": location,
        "condition": condition,
        "idinstrument_type": idinstrument_type,
        "dte": dte
    }

    musicFilter.filterAds(filters, (err, data) => {
        if (err)
            res.send(err);
        res.send(data);
    });

}

exports.getCollectibleFilterAds = (req, res) => {
    if (!req.body) {
        resp.status(400).send({
            message: "Content can not be empty!"
        });
    }
    var main_Catergory = req.body.mainCat; // defualt
    var sub_Catergory = req.body.subCat; // defualt
    var ads_name = req.body.adsName;
    var price_min = req.body.priceMin; // defualt
    var price_max = req.body.priceMax; // defualt
    var location = req.body.location;
    var condition = req.body.conditions; // defualt
    var idinstrument_type = req.body.idinstrument_type;
    var dte = req.body.dates;

    var filters = {
        "main_Catergory": main_Catergory,
        "sub_Catergory": sub_Catergory,
        "ads_name": ads_name,
        "price_min": price_min,
        "price_max": price_max,
        "location": location,
        "condition": condition,
        "idinstrument_type": idinstrument_type,
        "dte": dte
    }

    collectibleFilter.filterAds(filters, (err, data) => {
        if (err)
            res.send(err);
        res.send(data);
    });

}
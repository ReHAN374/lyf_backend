const sql = require("../utill/database");

const RealStateFilterAds = function () { };

RealStateFilterAds.filterAds = (filters, result) => {
    let adsData = [];
    let finalArray = [];

    console.log('filters')

    adsData = getfilterAdsList(filters);

    adsData
        .then((adsList) => {
            let updateArray = adsList.map(async (ads) => {
                try {
                    var imagelsit = await loadImage(ads);
                    finalArray = imagelsit;
                } catch (error) {
                    console.log("error happen when geting filters ads " + error);
                }
            });
            Promise.all(updateArray)
                .then((value) => {
                    result(
                        JSON.stringify({ status: 200, err: null, response: finalArray })
                    );
                })
                .catch((er) => {
                    console.log("errors happen");
                });
        })
        .catch((eror) => {
            console.log("error happen get Ads Info " + eror);
            result(JSON.stringify({ status: 400, err: eror, response: null }));
        });
}

function getfilterAdsList(filters) {
    var query =
        "SELECT " +
        "`ads_info`.`idAds_Info`," +
        "`ads_info`.`Ads_name`," +
        "`ads_info`.`Description`," +
        "`ads_info`.`Date`," +
        "`ads_info`.`sell_price`," +
        "`ads_info`.`location`," +
        "`ads_info`.`status`," +
        "`ads_info`.`create_at`," +
        "`ads_info`.`update_at`," +
        "`ads_info`.`remove_at`," +
        "`ads_sub_info`.`idAds_Info`," +
        "`ads_sub_info`.`idAds_Category`," +
        "`ads_sub_info`.`idSub_Category`," +
        "`ads_sub_info`.`idConditions`," +
        "`conditions`.`Condition_name`," +
        "`conditions`.`status`," +
        "`ads_category`.`Category_name`," +
        "`ads_category`.`Icon_path`," +
        "`ads_category`.`Colour` AS category_color," +
        "`sub_category`.`Sub_Cat_name`," +
        "`sub_category`.`idAds_Category`," +
        "`sub_category`.`Colour` AS sub_category_color," +

        "`real_state_ads`.`land_size`," +
        "`real_state_ads`.`bed_room_count`," +
        "`real_state_ads`.`bathroom_count`," +
        "`real_state_ads`.`house_size`," +
        "`real_state_ads`.`furniture_avalible`," +
        "`real_state_ads`.`floor_number`," +
        "`real_state_ads`.`developer`," +
        "`real_state_ads`.`banglow_avalibilty` AS aprtment_developer_name," +
        "`lands_crops`.`crop_name`," +
        "`landtype`.`typeName`," +
        "`property_type`.`type_name`," +
        "`aprtment_developer`.`name`" +

        "FROM" +
        "  `heroku_76e4853cf6cfcbc`.`ads_sub_info`" +
        "  INNER JOIN `heroku_76e4853cf6cfcbc`.`ads_info`" +
        "    ON (" +
        "      `ads_sub_info`.`idAds_Info` = `ads_info`.`idAds_Info`" +
        "    )" +
        "  INNER JOIN `heroku_76e4853cf6cfcbc`.`ads_category`" +
        "    ON (" +
        "      `ads_sub_info`.`idAds_Category` = `ads_category`.`idAds_Category`" +
        "    )" +
        "  INNER JOIN `heroku_76e4853cf6cfcbc`.`sub_category`" +
        "    ON (" +
        "      `ads_sub_info`.`idSub_Category` = `sub_category`.`idSub_Category`" +
        "    )" +
        "  INNER JOIN `heroku_76e4853cf6cfcbc`.`conditions`" +
        "    ON (" +
        "     `ads_sub_info`.`idConditions` = `conditions`.`idConditions`" +
        "   )" +
        " INNER JOIN `heroku_76e4853cf6cfcbc`.`real_state_ads`" +
        "  ON (" +
        "    `ads_sub_info`.`idAds_Sub_info` = `real_state_ads`.`idAds_Sub_info`" +
        " )" +
        " INNER JOIN `heroku_76e4853cf6cfcbc`.`lands_crops` ON (`real_state_ads`.`idlands_crops` = `lands_crops`.`idlands_crops`)" +
        " INNER JOIN `heroku_76e4853cf6cfcbc`.`landtype`ON (`real_state_ads`.`idLandType` = `landtype`.`idLandType`)" +
        " INNER JOIN `heroku_76e4853cf6cfcbc`.`property_type`ON (`real_state_ads`.`idproperty_type` = `property_type`.`idproperty_type`)" +
        " INNER JOIN `heroku_76e4853cf6cfcbc`.`aprtment_developer`ON (`real_state_ads`.`developer` = `aprtment_developer`.`idaprtment_developer`)" +

        " WHERE  " +
        "`ads_sub_info`.`idSub_Category` = '" +
        filters.sub_Catergory +
        "' " +
        "AND `ads_sub_info`.`idAds_Category` = '" +
        filters.main_Catergory +
        "' " +
        "AND `ads_info`.`sell_price` BETWEEN '" +
        filters.price_min +
        "' AND '" +
        filters.price_max +
        "' " +
        "AND `ads_sub_info`.`idConditions`= '" +
        filters.condition +
        "' " +
        "AND ads_info.`status`= 1";

    if (filters.location !== "0") {
        query + "AND `ads_info`.`location` = '" + filters.location + "'";
    }

    if (filters.ads_name !== "0") {
        query + "AND `ads_info`.`Ads_name` LIKE '%" + filters.ads_name + "%'";
    }

    if (filters.land_type !== "0") {
        query + "AND `real_state_ads`.`idLandType` = '" + filters.land_type + "'";
    }

    if (filters.land_size !== "0") {
        query + "AND `real_state_ads`.` land_size` = '" + filters.land_size + "'";
    }

    if (filters.bed_room_count !== "0") {
        query + "AND `real_state_ads`.`bed_room_count` = '" + filters.bed_room_count + "'";
    }

    if (filters.bathroom_count !== "0") {
        query + "AND `real_state_ads`.`bathroom_count` = '" + filters.bathroom_count + "'";
    }

    if (filters.house_size !== "0") {
        query + "AND `real_state_ads`.`house_size` = '" + filters.house_size + "'";
    }

    if (filters.furniture_avalible !== "0") {
        query + "AND `real_state_ads`.`furniture_avalible` = '" + filters.furniture_avalible + "'";
    }

    if (filters.floor_number !== "0") {
        query + "AND `real_state_ads`.`floor_number` = '" + filters.floor_number + "'";
    }

    if (filters.developer !== "0") {
        query + "AND `real_state_ads`.`developer` = '" + filters.developer + "'";
    }

    if (filters.banglow_avalibilty !== "0") {
        query + "AND `real_state_ads`.`banglow_avalibilty` = '" + filters.banglow_avalibilty + "'";
    }

    if (filters.idaprtment_developer !== "0") {
        query + "AND `aprtment_developer`.`idaprtment_developer` = '" + filters.idaprtment_developer + "'";
    }

    if (filters.dte != "0") {
        query +
            "AND `ads_info`.`Date` BETWEEN '" +
            filters.dte +
            "' AND '" +
            filters.dte +
            "'";
    }
    query + " ;";

    let filtadsData = [];
    return new Promise(function (resolve, reject) {
        sql.query(query, [], function (err, adsInfo, fields) {
            if (err) {
                filtadsData = [];
                return reject(err);
            } else {
                filtadsData = adsInfo;
                // console.log("Ads data " + adsData);
            }
            resolve(filtadsData, fields);
        });
    });
}

function loadImage(Ads) {
    let singleAds = [];
    return new Promise(function (resovel, reject) {
        var element = null;
        sql.query(
            "select * from Ads_Image where idAds_Info = ?;",
            [Ads.idAds_Info],
            (err, data, fields) => {
                if (err) {
                    var dt = {
                        ////
                        idAds_Info: Ads.idAds_Info,
                        Ads_name: Ads.Ads_name,
                        Description: Ads.Description,
                        Date: Ads.Date,
                        sell_price: Ads.sell_price,
                        location: Ads.location,
                        status: Ads.status,
                        idfavorite_Ads: "0",
                        idAdsHasFeatures: "0",
                        idFetatures: "0",
                        featureStartDate: "0",
                        featureEndDate: "0",
                        featureName: "0",
                        featureDuration: "0",
                        isFavourite: "1",
                        idSubInfo: Ads.idAds_Category,
                        mainCategoryName: Ads.Category_name,
                        idSubCategory: Ads.idSub_Category,
                        subCategoryName: Ads.Sub_Cat_name,
                        idConditions: Ads.idConditions,
                        condtionName: Ads.Condition_name,
                        land_size: Ads.land_size,
                        bed_room_count: Ads.bed_room_count,
                        house_size: Ads.house_size,
                        furniture_avalible: Ads.furniture_avalible,
                        floor_number: Ads.floor_number,
                        developer: Ads.developer,
                        banglow_avalibilty: Ads.banglow_avalibilty,
                        crop_name: Ads.crop_name,
                        typeName: Ads.typeName,
                        type_name: Ads.type_name,
                        name: Ads.name,


                        idColour: Ads.idcolours,
                        ColourName: Ads.color_name,
                        hexValue: Ads.hex_code,
                        ImageList: [],
                    };
                    element = dt;
                    singleAds.push(element);
                    console.log("error happen when get data from Ads Image " + errs);
                    return reject(singleAds);
                } else {
                    var dt = {
                        idAds_Info: Ads.idAds_Info,
                        Ads_name: Ads.Ads_name,
                        Description: Ads.Description,
                        Date: Ads.Date,
                        sell_price: Ads.sell_price,
                        location: Ads.location,
                        status: Ads.status,
                        idfavorite_Ads: "0",
                        idAdsHasFeatures: "0",
                        idFetatures: "0",
                        featureStartDate: "0",
                        featureEndDate: "0",
                        featureName: "0",
                        featureDuration: "0",
                        isFavourite: "1",
                        idSubInfo: Ads.idAds_Category,
                        mainCategoryName: Ads.Category_name,
                        idSubCategory: Ads.idSub_Category,
                        subCategoryName: Ads.Sub_Cat_name,
                        idConditions: Ads.idConditions,
                        condtionName: Ads.Condition_name,
                        land_size: Ads.land_size,
                        bed_room_count: Ads.bed_room_count,
                        house_size: Ads.house_size,
                        furniture_avalible: Ads.furniture_avalible,
                        floor_number: Ads.floor_number,
                        developer: Ads.developer,
                        banglow_avalibilty: Ads.banglow_avalibilty,
                        crop_name: Ads.crop_name,
                        typeName: Ads.typeName,
                        type_name: Ads.type_name,
                        name: Ads.name,


                        idColour: Ads.idcolours,
                        ColourName: Ads.color_name,
                        hexValue: Ads.hex_code,
                        ImageList: data,
                    };
                    element = dt;
                    singleAds.push(element);

                    //console.log("image data push "+JSON.stringify(singleAds));
                }
                resovel(dt);
            }
        );
    });
}

module.exports = RealStateFilterAds;
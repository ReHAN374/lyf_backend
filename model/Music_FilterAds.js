const sql = require("../utill/database");

const MusicFilterAds = function () { };

SportFilterAds.filterAds = (filters, result) => {
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
                        JSON.stringify({ status: 200, err: [], response: finalArray })
                    );
                })
                .catch((er) => {
                    console.log("errors happen");
                });
        })
        .catch((eror) => {
            console.log("error happen get Ads Info " + eror);
            result(JSON.stringify({ status: 200, err: eror, response: [] }));
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
        "`sub_category`.`Colour` AS sub_category_color," +
        "`sub_category`.`idAds_Category`" +
        "`music_ads`.`idinstrument_type`" +


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
        "  INNER JOIN `heroku_76e4853cf6cfcbc`.`music_ads`" +
        "    ON (" +
        "     `ads_sub_info`.`idAds_Sub_info` = `music_ads`.`idAds_Sub_info`" +
        "   )" +


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

    if (filters.idinstrument_type !== "0") {
        query + "AND `music_ads`.`	idinstrument_type` LIKE '%" + filters.idinstrument_type + "%'";
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
                        idinstrument_type: Ads.	idinstrument_type,
                        name: Ads.name,



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

                        name: Ads.name,
                        idinstrument_type:Ads.	idinstrument_type,


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

module.exports = MusicFilterAds;
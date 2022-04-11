const sql = require("../utill/database");

const ElectronicFiterAds = function () { };

ElectronicFiterAds.filterAds = (filter, result) => {
    let adsData = [];
  let finalArray = [];

  adsData = getfilterAdsList(filter);

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
};

function getfilterAdsList(filters) {
    var query = "SELECT "+
"        `ads_info`.`idAds_Info` "+
"         `ads_info`.`Ads_name` "+
"        `ads_info`.`Description` "+
"         `ads_info`.`Date`"+
"         `ads_info`.`sell_price` "+
"         `ads_info`.`location`"+
"         `ads_info`.`status`"+
"           `ads_info`.`create_at`," +
"           `ads_info`.`update_at`," +
"           `ads_info`.`remove_at`," +
"         `ads_sub_info`.`idAds_Category`"+
"           `ads_category`.`Category_name`," +
"         `ads_sub_info`.`idSub_Category`"+
"          `sub_category`.`Sub_Cat_name`," +
"         `ads_sub_info`.`idConditions`"+
"         `ads_has_fetatures`.`idAdsFeatures`"+
"         `ads_has_fetatures`.`idFetatures`"+
"         `ads_has_fetatures`.`start_date`"+
"         `ads_has_fetatures`.`end_date`"+
"         `ads_fetatures`.`featureName`"+
"         `ads_fetatures`.`duration`"+
"         `conditions`.`idConditions`"+
"         `conditions`.`Condition_name`"+
"         `electroinc_brand`.`brand_name`"+
"         `electronics_ads`.`idelectroinc_brand`"+
"         `electronics_ads`.`titel`"+
"    FROM "+
"        `heroku_76e4853cf6cfcbc`.`ads_sub_info`"+
"        INNER JOIN `heroku_76e4853cf6cfcbc`.`ads_info`"+ 
"            ON (`ads_sub_info`.`idAds_Info` = `ads_info`.`idAds_Info`)"+
"        INNER JOIN `heroku_76e4853cf6cfcbc`.`electronics_ads` "+
"            ON (`electronics_ads`.`idAds_Sub_info` = `ads_sub_info`.`idAds_Sub_info`)"+
"        INNER JOIN `heroku_76e4853cf6cfcbc`.`electroinc_brand` "+
"            ON (`electronics_ads`.`idelectroinc_brand` = `electroinc_brand`.`idelectroinc_brand`)"+
"        INNER JOIN `heroku_76e4853cf6cfcbc`.`conditions` "+
"            ON (`ads_sub_info`.`idConditions` = `conditions`.`idConditions`)"+
"        INNER JOIN `heroku_76e4853cf6cfcbc`.`ads_has_fetatures` "+
"            ON (`ads_has_fetatures`.`idAds_Info` = `ads_info`.`idAds_Info`)"+
"        INNER JOIN `heroku_76e4853cf6cfcbc`.`ads_fetatures` "+
"            ON (`ads_has_fetatures`.`idFetatures` = `ads_fetatures`.`idAds_Fetatures`)"+   
"        WHERE"+
"     `ads_sub_info`.`idSub_Category`= '"+filters.main_Catergory+"' "+
"     AND `ads_sub_info`.`idAds_Category` = '"+filters.sub_Catergory+"'"+
"     AND `ads_info`.`sell_price` BETWEEN '"+filters.price_min+"' AND '"+filters.price_max+"'"+
"    AND `ads_info`.`location` = '"+filters.location+"'"+
"     AND `ads_info`.`status` = 1"+
"     AND `ads_info`.`Date` BETWEEN '"+filter.dte+"' AND '"+filter.dte+"' "+ 
"            AND `conditions`.`idConditions` = '"+filter.condition+"'";

    if(filters.ads_name != "0") {
        query + " AND `ads_info`.`Ads_name` LIKE '%"+filters.ads_name+"%'";
    }

    if(filters.electrcBard != "0"){
        query + " AND `electroinc_brand`.`idelectroinc_brand` = '"+filters.electrcBard+"'";
    }

    query + ";";
    

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
};

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
                        create_at: Ads.create_at,
                        update_at: Ads.update_at,
                        remove_at: Ads.remove_at,
                        idfavorite_Ads: "0",
                        idAdsHasFeatures: Ads.idAdsFeatures,
                        idFetatures: Ads.idFetatures,
                        featureStartDate: Ads.start_date,
                        featureEndDate: Ads.end_date,
                        featureName: Ads.featureName,
                        featureDuration: Ads.duration,
                        isFavourite: "1",
                        idSubInfo: Ads.idAds_Sub_info,
                        idMainCategory: Ads.idAds_Category,
                        mainCategoryName: Ads.Category_name,
                        idSubCategory: Ads.idSub_Category,
                        subCategoryName: Ads.Sub_Cat_name,
                        idConditions: Ads.idConditions,
                        condtionName: Ads.Condition_name,
                        idelectroinc_brand :Ads.idelectroinc_brand,
                        brand_name : Ads.brand_name,
                        titel : Ads.titel,
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
                        create_at: Ads.create_at,
                        update_at: Ads.update_at,
                        remove_at: Ads.remove_at,
                        idfavorite_Ads: "0",
                        idAdsHasFeatures: Ads.idAdsFeatures,
                        idFetatures: Ads.idFetatures,
                        featureStartDate: Ads.start_date,
                        featureEndDate: Ads.end_date,
                        featureName: Ads.featureName,
                        featureDuration: Ads.duration,
                        isFavourite: "1",
                        idSubInfo: Ads.idAds_Sub_info,
                        idMainCategory: Ads.idAds_Category,
                        mainCategoryName: Ads.Category_name,
                        idSubCategory: Ads.idSub_Category,
                        subCategoryName: Ads.Sub_Cat_name,
                        idConditions: Ads.idConditions,
                        condtionName: Ads.Condition_name,
                        idelectroinc_brand :Ads.idelectroinc_brand,
                        brand_name : Ads.brand_name,
                        titel : Ads.titel,
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

module.exports = ElectronicFiterAds;
const sql = require("../utill/database");

const VehicalFiterAds = function () {};

//VehicalFiterAds.filterAds = (filters, result) => {};

VehicalFiterAds.filterAds=(filters,result)=>{
    console.log("filters "+JSON.stringify(filters));
  let adsData = [];
  let finalArray = [];

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
};

function getfilterAdsList(filters) {
  var query =
    "SELECT " +
    "`ads_info`.`id_ads_info`," +
    "`ads_info`.`ads_name`," +
    "`ads_info`.`description`," +
    "`ads_info`.`date`," +
    "`ads_info`.`sell_price`," +
    "`ads_info`.`location`," +
    "`ads_info`.`status`," +
    "`ads_info`.`create_at`," +
    "`ads_info`.`update_at`," +
    "`ads_info`.`remove_at`," +
    "`ads_sub_info`.`id_ads_sub_info`," +
    
    "`ads_sub_info`.`id_ads_category`," +
    "`ads_sub_info`.`id_sub_category`," +
    "`ads_sub_info`.`id_conditions`," +
    "`conditions`.`condition_name`," +
    "`conditions`.`status`," +
    "`ads_category`.`category_name`," +
    "`ads_category`.`icon_path`," +
    "`ads_category`.`color` AS category_color," +
    "`sub_category`.`sub_cat_name`," +
    "`sub_category`.`id_ads_category`," +
    "`sub_category`.`color` AS sub_category_color," +
    "`vehical_ads`.`idvehical_ads`," +
    "`vehical_ads`.`id_vehical_brand`," +
    " `vehical_ads`.`id_vehical_model`," +
    "`vehical_ads`.`manifacture_year`," +
    "`vehical_ads`.`mileage`," +
    " `vehical_ads`.`eng_capacity`," +
    " `vehical_ads`.`id_fuel_type`," +
    " `vehical_ads`.`id_transmission_type`," +
    " `vehical_ads`.`id_color`," +
    "`fuel_type`.`fuel_name`," +
    "`transmission_type`.`name` AS transmission_type_name," +
    "`colours`.`name` AS color_name," +
    "`colours`.`hex_code`," +
    "`vehical_model`.`model_name`," +
    "`vehical_brand`.`brand_name`" +
    "FROM" +
    "  `heroku_76e4853cf6cfcbc`.`ads_sub_info`" +
    "  INNER JOIN `heroku_76e4853cf6cfcbc`.`ads_info`" +
    "    ON (" +
    "      `ads_sub_info`.`id_ads_info` = `ads_info`.`id_ads_info`" +
    "    )" +
    "  INNER JOIN `heroku_76e4853cf6cfcbc`.`ads_category`" +
    "    ON (" +
    "      `ads_sub_info`.`id_ads_category` = `ads_category`.`id_ads_category`" +
    "    )" +
    "  INNER JOIN `heroku_76e4853cf6cfcbc`.`sub_category`" +
    "    ON (" +
    "      `ads_sub_info`.`id_sub_category` = `sub_category`.`id_sub_category`" +
    "    )" +
    "  INNER JOIN `heroku_76e4853cf6cfcbc`.`conditions`" +
    "    ON (" +
    "     `ads_sub_info`.`id_conditions` = `conditions`.`id_conditions`" +
    "   )" +
    "   INNER JOIN `heroku_76e4853cf6cfcbc`.`vehical_ads`" +
    "      ON (" +
    "        `ads_sub_info`.`id_ads_sub_info` = `vehical_ads`.`id_ads_sub_info`" +
    "      )" +
    "    INNER JOIN `heroku_76e4853cf6cfcbc`.`fuel_type`" +
    "      ON (" +
    "        `vehical_ads`.`id_fuel_type` = `fuel_type`.`id_fuel_type`" +
    "      )" +
    "   INNER JOIN `heroku_76e4853cf6cfcbc`.`colours`" +
    "     ON (" +
    "   `vehical_ads`.`id_color` = `colours`.`id_colors`" +
    "   )" +
    "    INNER JOIN `heroku_76e4853cf6cfcbc`.`transmission_type`" +
    "      ON (" +
    "        `vehical_ads`.`id_transmission_type` = `transmission_type`.`id_transmission_type`" +
    "  )" +
    "    INNER JOIN `heroku_76e4853cf6cfcbc`.`vehical_brand`" +
    "  ON (" +
    "    `vehical_ads`.`id_vehical_brand` = `vehical_brand`.`id_vehical_brand`" +
    "  )" +
    "INNER JOIN `heroku_76e4853cf6cfcbc`.`vehical_model`" +
    "  ON (" +
    "    `vehical_ads`.`id_vehical_model` = `vehical_model`.`id_vehical_model`" +
    "  ) " +
    " WHERE  " +
    "`ads_sub_info`.`id_sub_category` = '" +
    filters.main_Catergory +
    "' " +
    "AND `ads_sub_info`.`id_ads_category` = '" +
    filters.sub_Catergory +
    "' " +
    "AND `ads_info`.`sell_price` BETWEEN '" +
    filters.price_min +
    "' AND '" +
    filters.price_max +
    "' " +
    "AND `ads_sub_info`.`id_conditions`= '" +
    filters.condition +
    "' " +
    "AND ads_info.`status`= 1";

  if (filters.location !== "0") {
    query + "AND `ads_info`.`location` = '" + filters.location + "'";
  }

  if (filters.ads_name !== "0") {
    query + "AND `ads_info`.`ads_name` LIKE '%" + filters.ads_name + "%'";
  }

  if (filters.vehical_model != "0") {
    query +
      "AND `vehical_model`.`id_vehical_model` ='" +
      filters.vehical_model +
      "'";
  }

  if (filters.vehical_brand != "0") {
    query +
      "AND `vehical_brand`.`id_vehical_brand` = '" +
      filters.vehical_brand +
      "'";
  }

  if (filters.mani_year != "0") {
    query + "AND `vehical_ads`.`manifacture_year`= '" + filters.mani_year + "'";
  }

  if (filters.millage != "0") {
    query + "AND `vehical_ads`.`mileage`= '" + filters.millage + "'";
  }

  if (filters.transmission != "0") {
    query +
      "AND `vehical_ads`.`id_transmission_type`= '" +
      filters.transmission +
      "'";
  }

  if (filters.fuel_type != "0") {
    query + "AND `vehical_ads`.`id_fuel_type``= '" + filters.fuel_type + "'";
  }

  if (filters.eng_cap != "0") {
    query + "AND `vehical_ads`.`eng_capacity`= '" + filters.eng_ca + "'";
  }

  if (filters.colour != "0") {
    query + "AND `vehical_ads`.`id_colours`= '" + filters.colour + "'";
  }

  if (filters.dte != "0") {
    query +
      "AND `ads_info`.`date` BETWEEN '" +
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
      "select * from ads_image where id_ads_info = ?;",
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
            idAdsHasFeatures: "0",
            idFetatures: "0",
            featureStartDate: "0",
            featureEndDate: "0",
            featureName:  "0",
            featureDuration: "0",
            isFavourite: "1",
            idSubInfo: Ads.idAds_Sub_info,
            idMainCategory: Ads.idAds_Category,
            mainCategoryName: Ads.Category_name,
            idSubCategory: Ads.idSub_Category,
            subCategoryName: Ads.Sub_Cat_name,
            idConditions: Ads.idConditions,
            condtionName: Ads.Condition_name,
            manift_year: Ads.manifacture_year,
            mileage: Ads.mileage,
            eng_cap: Ads.eng_capacity,
            idvehicalBrand: Ads.idvehical_brand,
            brandName: Ads.brand_name,
            modelId: Ads.idvehical_model,
            modelName: Ads.model_name,
            idFuel: Ads.idfuel_type,
            fuelName: Ads.fuel_name,
            idTransmission: Ads.idtransmission_type,
            transmissionName: Ads.transmission_type_name,
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
            create_at: Ads.create_at,
            update_at: Ads.update_at,
            remove_at: Ads.remove_at,
            idfavorite_Ads: "0",
            idAdsHasFeatures: "0",
            idFetatures: "0",
            featureStartDate: "0",
            featureEndDate: "0",
            featureName:  "0",
            featureDuration: "0",
            isFavourite: "1",
            idSubInfo: Ads.idAds_Sub_info,
            idMainCategory: Ads.idAds_Category,
            mainCategoryName: Ads.Category_name,
            idSubCategory: Ads.idSub_Category,
            subCategoryName: Ads.Sub_Cat_name,
            idConditions: Ads.idConditions,
            condtionName: Ads.Condition_name,
            manift_year: Ads.manifacture_year,
            mileage: Ads.mileage,
            eng_cap: Ads.eng_capacity,
            idvehicalBrand: Ads.idvehical_brand,
            brandName: Ads.brand_name,
            modelId: Ads.idvehical_model,
            modelName: Ads.model_name,
            idFuel: Ads.idfuel_type,
            fuelName: Ads.fuel_name,
            idTransmission: Ads.idtransmission_type,
            transmissionName: Ads.transmission_type_name,
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

module.exports = VehicalFiterAds;

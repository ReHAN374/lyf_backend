const sql = require("../utill/database");


const Ads_Info = function () {
};


//!Create new ads
Ads_Info.create = (data) => {
  return new Promise((resolve, reject) => {
    sql.query(
      `INSERT INTO ads_info (ads_name, description, sell_price, location, id_user, lan_code, phone_number, status, calls_only)
      VALUES (?, ?, ?, ?, ?, ?,?,?,?);`,
      [data.ads_name, data.description, data.sell_price, data.location, data.id_user, data.lan_code, data.phone_number, data.status, data.calls_only],
      function (err, res) {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      }
      );
  })
};

//! Update ads info by id(Edit ad)
Ads_Info.update = (data) => {
  return new Promise((resolve, reject) => {
    sql.query(
      `UPDATE ads_info SET ads_name=?, description=?, sell_price=?, location=? WHERE id_ads_info=?;`,
      [data.ads_name, data.description, data.sell_price, data.location, data.adsId],
      function (err, res) {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      }
      );
  })
};

//!Create ads image
Ads_Info.saveImgPath = (data) => {
  return new Promise((resolve, reject) => {
    sql.query(`INSERT INTO ads_image (id_ads_info, image_name, img_url) VALUES (?,?,?);`,
      [data.adsId, data.imgName, data.imgUrl],
      function (err, res) {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      }
      )
  })
}

//!Get ads info by ads id
Ads_Info.getAdsInfoByAdsIdNew = (data) => {
  return new Promise((resolve, reject) => {
    let query;
    if (data.idAds_Category == 1 || data.idAds_Category == 25) {
      query = `SELECT v.*,f.*, v.vehical_brand AS brand_name, tt.name AS TransmissionTypeName, co.* FROM vehical_ads As v
      INNER JOIN fuel_type As f ON v.id_fuel_type=f.id_fuel_type
      INNER JOIN transmission_type AS tt ON v.id_transmission_type=tt.id_transmission_type
      INNER JOIN colours AS co ON v.id_color=co.id_colors 
      WHERE v.id_ads_sub_info=?`;
    } else if (data.idAds_Category == 2 || data.idAds_Category == 26) {
      query = `SELECT r.*,lc.*, p.type_name AS PropertyTypeName,lt.type_name AS LandTypeName FROM real_state_ads AS r
      LEFT JOIN lands_crops AS lc ON r.id_lands_crops=lc.id_lands_crops
      LEFT JOIN property_type AS p ON r.id_property_type=p.id_property_type
      LEFT JOIN landtype AS lt ON r.id_land_type=lt.id_land_type
      WHERE r.id_ads_sub_info=?`;
    } else if (data.idAds_Category == 3 || data.idAds_Category == 29) {
      query = `SELECT p.*,pt.* FROM pet_ads AS p
      INNER JOIN pet_type AS pt ON p.id_pet_type=pt.id_pet_type
      WHERE p.id_ads_sub_info`;
    } else if (data.idAds_Category == 6 || data.idAds_Category == 27) {
      query = `SELECT e.*, eb.* FROM electronics_ads As e
      INNER JOIN electroinc_brand As eb ON e.id_electroinc_brand=eb.id_electroinc_brand
      WHERE e.id_ads_sub_info=?`;
    } else if ((data.idAds_Category == 4 && data.idSub_Category == 20) || (data.idAds_Category == 28 && data.idSub_Category == 110)) {
      query = `SELECT s.*,st.* FROM sports_ads As s
      INNER JOIN sport_type AS st ON s.id_sport_type=st.id_sport_type
      WHERE s.id_ads_sub_info=?`;
    } else if ((data.idAds_Category == 4 && data.idSub_Category == 21) || (data.idAds_Category == 28 && data.idSub_Category == 111)) {
      query = `SELECT m.*, it.* FROM music_ads As m
      INNER JOIN instrument_type AS it ON m.id_instrument_type=it.id_instrument_type
      WHERE m.id_ads_sub_info=?`;
    } else if ((data.idAds_Category == 4 && data.idSub_Category == 22) || (data.idAds_Category == 28 && data.idSub_Category == 112)) {
      resolve([])
    }
    sql.query(query,
      [data.idAds_Sub_info], function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      })
  })
}

//!Get all ads by uid
Ads_Info.getAllAdsByUid = (data) => {
  return new Promise((resolve, reject) => {
    sql.query(`SELECT i.*,i.description AS AdsDescription,u.*,ac.*,asi.*,sc.*,c.*, asi.id_ads_sub_info AS IdAdsSubInfo , i.create_at AS AdsCreateTime FROM ads_info As i 
      INNER JOIN user AS u ON i.id_user=u.id_user 
      INNER JOIN ads_sub_info As asi ON i.id_ads_info=asi.id_ads_info
      INNER JOIN ads_category AS ac ON asi.id_ads_category=ac.id_ads_category
      INNER JOIN sub_category AS sc  ON asi.id_sub_category=sc.id_sub_category
      LEFT JOIN conditions AS c ON asi.id_conditions=c.id_conditions  
      WHERE i.status=1 AND i.id_user=? ORDER BY i.create_at ASC LIMIT ${data.limit} OFFSET ${data.offset};`,
      [data.uid],
      function (err, res) {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      }
      )
  })
}

//!Get my ads
Ads_Info.getMyAds = (data) => {
  return new Promise((resolve, reject) => {
    sql.query(`SELECT i.*,i.description AS AdsDescription,u.*,ac.*,asi.*,sc.*,c.*, asi.id_ads_sub_info AS IdAdsSubInfo , i.create_at AS AdsCreateTime,i.status FROM ads_info As i 
      INNER JOIN user AS u ON i.id_user=u.id_user 
      INNER JOIN ads_sub_info As asi ON i.id_ads_info=asi.id_ads_info
      INNER JOIN ads_category AS ac ON asi.id_ads_category=ac.id_ads_category
      INNER JOIN sub_category AS sc  ON asi.id_sub_category=sc.id_sub_category
      LEFT JOIN conditions AS c ON asi.id_conditions=c.id_conditions  
      WHERE i.status=? AND i.id_user=? ORDER BY i.create_at DESC LIMIT ${data.limit} OFFSET ${data.offset};`,
      [data.status, data.uid],
      function (err, res) {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      }
      )
  })
}


//! Approve ads by admin
Ads_Info.approveAdsInfoByAdmin = (data) => {
  return new Promise((resolve, reject) => {
    sql.query("update ads_info set `status`=1, `update_at`=? where `id_ads_info`=?",
      [data.updateTime, data.adsId],
      function (err, res) {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      })
  })
}

//!Reject ads by admin
Ads_Info.reject = (data) => {
  return new Promise((resolve, reject) => {
    sql.query("update ads_info set `status`=2, `update_at`=? where `id_ads_info`=?",
      [data.updateTime, data.adsId],
      function (err, res) {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      })
  })
}

//!Get all pending ads
Ads_Info.getAllPendingAds = (data) => {
  return new Promise((resolve, reject) => {
    sql.query(`SELECT i.*,i.description AS AdsDescription,u.*,ac.*,asi.*,sc.*,c.*, asi.id_ads_sub_info AS IdAdsSubInfo , i.create_at AS AdsCreateTime FROM ads_info As i 
      INNER JOIN user AS u ON i.id_user=u.id_user 
      INNER JOIN ads_sub_info As asi ON i.id_ads_info=asi.id_ads_info
      INNER JOIN ads_category AS ac ON asi.id_ads_category=ac.id_ads_category
      INNER JOIN sub_category AS sc  ON asi.id_sub_category=sc.id_sub_category
      LEFT JOIN conditions AS c ON asi.id_conditions=c.id_conditions 
      WHERE i.status=3 AND (u.status=1 OR u.status=2) ORDER BY i.create_at DESC LIMIT ${data.limit} OFFSET ${data.offset};`,
      [],
      function (err, res) {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      }
      )
  })
}

//!Get recent ads
// Ads_Info.getRecentAds = (data) => {
//   return new Promise((resolve, reject) => {
//     sql.query(`SELECT i.*,i.description AS AdsDescription,u.*,ac.*,asi.*,sc.*,c.*, asi.id_ads_sub_info AS IdAdsSubInfo ,f.status As isFavorite, i.create_at AS AdsCreateTime FROM ads_info As i 
//      INNER JOIN user AS u ON i.id_user=u.id_user 
//      LEFT JOIN favorite_ads AS f ON f.id_user=? and i.id_ads_info=f.id_ads_info 
//      INNER JOIN ads_sub_info As asi ON i.id_ads_info=asi.id_ads_info
//      INNER JOIN ads_category AS ac ON asi.id_ads_category=ac.id_ads_category
//      INNER JOIN sub_category AS sc  ON asi.id_sub_category=sc.id_sub_category
//      LEFT JOIN conditions AS c ON asi.id_conditions=c.id_conditions  
//      WHERE i.status=1 AND i.lan_code=? AND (u.status=1 OR u.status=2) AND i.id_user !=? ORDER BY i.create_at DESC LIMIT ${data.limit} OFFSET ${data.offset};`,
//       [data.uid, data.lan_code, data.uid],
//       function (err, res) {
//         if (err) {
//           reject(err);
//         } else {
//           resolve(res);
//         }
//       }
//     )
//   })
// }


Ads_Info.getRecentAds = (data) => {

  return new Promise((resolve, reject) => {
    sql.query(`SELECT
      ads_info.id_ads_info,
      ads_info.ads_name,
      ads_info.date,
      ads_info.sell_price AS ad_price,
      ads_info.location,
      ads_info.status,
      ads_info.id_user,
      ads_info.create_at AS AdsCreateTime,
      ads_sub_info.id_ads_sub_info AS IdAdsSubInfo,
      ads_sub_info.id_ads_category,
      ads_sub_info.id_sub_category,
      ads_sub_info.id_conditions,
      favorite_ads.status as isFavorite
      FROM ads_info
      INNER JOIN ads_sub_info ON
      (ads_info.id_ads_info = ads_sub_info.id_ads_info)
      INNER JOIN user ON
      ( ads_info.id_user = user.id_user)
      LEFT JOIN favorite_ads ON
      (ads_info.id_ads_info = favorite_ads.id_ads_info)
      WHERE ads_info.status = 1 AND ads_info.lan_code='${data.lan_code}' AND (user.status = 1 OR user.status = 2) AND user.id_user!='${data.uid}' ORDER BY ads_info.create_at DESC LIMIT ${data.limit}  OFFSET ${data.offset};`,
      function (err, res) {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      }
      )
  })
}


//!Get ads by main and sub id
Ads_Info.getAdsByMainSubID = (data, result) => {
  sql.query(`SELECT i.*,i.description AS AdsDescription,u.*,ac.*,asi.*,sc.*,c.*, asi.id_ads_sub_info AS IdAdsSubInfo ,f.status As isFavorite, i.create_at AS AdsCreateTime, i.sell_price AS ad_price FROM ads_info As i 
    INNER JOIN user AS u ON i.id_user=u.id_user 
    LEFT JOIN favorite_ads AS f ON f.id_user=? and i.id_ads_info=f.id_ads_info 
    INNER JOIN ads_sub_info As asi ON i.id_ads_info=asi.id_ads_info
    INNER JOIN ads_category AS ac ON asi.id_ads_category=ac.id_ads_category
    INNER JOIN sub_category AS sc  ON asi.id_sub_category=sc.id_sub_category
    LEFT JOIN conditions AS c ON asi.id_conditions=c.id_conditions
    WHERE asi.id_sub_category=? and asi.id_ads_category=? AND i.status=1 AND i.lan_code=? AND (u.status=1 OR u.status=2) ORDER BY i.create_at DESC LIMIT ${data.limit} OFFSET ${data.offset}`,
    [data.uid, data.idSub_Category, data.idAds_Category, data.lan_code], function (err, res) {
      if (err) {
        result(err, null);
        return;
      } else {
        result(null, res)
      }
    })
}

//! Get ads by main category id
Ads_Info.getAdsByMainCatId = (data, result) => {
  sql.query(`SELECT i.*,i.description AS AdsDescription,u.*,ac.*,asi.*,sc.*,c.*, asi.id_ads_sub_info AS IdAdsSubInfo ,f.status As isFavorite, i.create_at AS AdsCreateTime FROM ads_info As i 
    INNER JOIN user AS u ON i.id_user=u.id_user 
    LEFT JOIN favorite_ads AS f ON f.id_user=? and i.id_ads_info=f.id_ads_info 
    INNER JOIN ads_sub_info As asi ON i.id_ads_info=asi.id_ads_info
    INNER JOIN ads_category AS ac ON asi.id_ads_category=ac.id_ads_category
    INNER JOIN sub_category AS sc  ON asi.id_sub_category=sc.id_sub_category
    LEFT JOIN conditions AS c ON asi.id_conditions=c.id_conditions
    WHERE asi.id_ads_category=? AND i.status=1 AND i.lan_code=? AND (u.status=1 OR u.status=2) ORDER BY i.create_at DESC LIMIT ${data.limit} OFFSET ${data.offset}`,
    [data.uid, data.idAds_Category, data.lan_code], function (err, res) {
      if (err) {
        result(err, null);
        return;
      } else {
        result(null, res)
      }
    })
}

//!Get single ads info by ads id
Ads_Info.getAdsInfoByIdNew = (data) => {

  // console.log("SELECT i.*,i.description AS AdsDescription,u.*,ac.*,asi.*,sc.*,c.*, asi.id_ads_sub_info AS IdAdsSubInfo ,f.status As isFavorite, i.create_at AS AdsCreateTime FROM ads_info As i "+
  //     "INNER JOIN user AS u ON i.id_user=u.id_user "+
  //     "LEFT JOIN favorite_ads AS f ON f.id_user=? and i.id_ads_info=f.id_ads_info "+
  //     "INNER JOIN ads_sub_info As asi ON i.id_ads_info=asi.id_ads_info"+
  //     "INNER JOIN ads_category AS ac ON asi.id_ads_category=ac.id_ads_category"+
  //     "INNER JOIN sub_category AS sc  ON asi.id_sub_category=sc.id_sub_category"+
  //     "LEFT JOIN conditions AS c ON asi.id_conditions=c.id_conditions"+
  //     "WHERE i.id_ads_info=? AND i.status=1")


  return new Promise((resolve, reject) => {
    sql.query(`SELECT i.*,i.description AS AdsDescription,u.*,ac.*,asi.*,sc.*,c.*, asi.id_ads_sub_info AS IdAdsSubInfo ,f.status As isFavorite, i.create_at AS AdsCreateTime FROM ads_info As i 
      INNER JOIN user AS u ON i.id_user=u.id_user 
      LEFT JOIN favorite_ads AS f ON f.id_user=? and i.id_ads_info=f.id_ads_info 
      INNER JOIN ads_sub_info As asi ON i.id_ads_info=asi.id_ads_info
      INNER JOIN ads_category AS ac ON asi.id_ads_category=ac.id_ads_category
      INNER JOIN sub_category AS sc  ON asi.id_sub_category=sc.id_sub_category
      LEFT JOIN conditions AS c ON asi.id_conditions=c.id_conditions
      WHERE i.id_ads_info=?`, [data.uid, data.adsId], function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      })
  });
}

//! Get single ads info by ads id for notifyme section
Ads_Info.getAdsInfoByAdsIdForNotifymeSection = (adsId) => {
  return new Promise((resolve, reject) => {
    sql.query(`SELECT * FROM ads_info As i
      INNER JOIN ads_sub_info As asi ON i.id_ads_info=asi.id_ads_info
      WHERE i.id_ads_info=? AND i.status=1`, [adsId], function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      })
  });
}

//!Get all ads
Ads_Info.getAll = (data) => {
  return new Promise((resolve, reject) => {
    sql.query(`SELECT i.*, i.status AS adsStatus,i.description AS AdsDescription,u.*,ac.*,asi.*,sc.*,c.*, asi.id_ads_sub_info AS IdAdsSubInfo ,f.status As isFavorite, i.create_at AS AdsCreateTime FROM ads_info As i 
     INNER JOIN user AS u ON i.id_user=u.id_user 
     LEFT JOIN favorite_ads AS f ON f.id_user=? and i.id_ads_info=f.id_ads_info 
     INNER JOIN ads_sub_info As asi ON i.id_ads_info=asi.id_ads_info
     INNER JOIN ads_category AS ac ON asi.id_ads_category=ac.id_ads_category
     INNER JOIN sub_category AS sc  ON asi.id_sub_category=sc.id_sub_category
     LEFT JOIN conditions AS c ON asi.id_conditions=c.id_conditions  
     WHERE i.lan_code=? AND (u.status=1 OR u.status=2) ORDER BY i.create_at DESC LIMIT ${data.limit} OFFSET ${data.offset};`,
     [data.uid, data.lan_code],
     function (err, res) {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    }
    )
  })
}

//!Ads search
Ads_Info.searchAds = (data) => {
  return new Promise((resolve, reject) => {
    sql.query(`SELECT DISTINCT i.*,i.description AS AdsDescription,u.*,ac.*,asi.*,sc.*,c.*, asi.id_ads_sub_info AS IdAdsSubInfo ,f.status As isFavorite, i.create_at AS AdsCreateTime FROM ads_info As i 
     INNER JOIN user AS u ON i.id_user=u.id_user 
     LEFT JOIN favorite_ads AS f ON i.id_ads_info=f.id_ads_info AND f.id_user=${data.uid}
     INNER JOIN ads_sub_info As asi ON i.id_ads_info=asi.id_ads_info
     INNER JOIN ads_category AS ac ON asi.id_ads_category=ac.id_ads_category
     INNER JOIN sub_category AS sc  ON asi.id_sub_category=sc.id_sub_category
     LEFT JOIN conditions AS c ON asi.id_conditions=c.id_conditions  
     WHERE i.lan_code=? AND (u.status=1 OR u.status=2) AND i.status=1 AND i.ads_name LIKE '%${data.key}%' ORDER BY i.create_at DESC LIMIT ${data.limit} OFFSET ${data.offset}; `,
     [data.lan_code],
     function (err, res) {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    }
    )
  })
}

//!Get ads count info by uid
Ads_Info.getAdsCountByUid = (data) => {
  return new Promise((resolve, reject) => {
    sql.query(`SELECT COUNT(*) FROM ads_info WHERE id_user=? AND ads_info.status=1`,
      [data.uid],
      function (err, res) {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      }
      )
  })
}

//!Get all ads count
Ads_Info.getAllAdsCount = (lanCode) => {
  return new Promise((resolve, reject) => {
    sql.query(`SELECT COUNT(*) FROM ads_info WHERE lan_code=?`,
      [lanCode],
      function (err, res) {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      }
      )
  })
}

//!Get Active ads count
Ads_Info.getAllActiveAdsCount = (lanCode) => {
  return new Promise((resolve, reject) => {
    sql.query(`SELECT COUNT(*) FROM ads_info WHERE status=1 AND lan_code=?`,
      [lanCode],
      function (err, res) {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      }
      )
  })
}

//!Get Pending ads count
Ads_Info.getAllPendingAdsCount = (lanCode) => {
  return new Promise((resolve, reject) => {
    sql.query(`SELECT COUNT(*) FROM ads_info WHERE status=3 AND lan_code=?`,
      [lanCode],
      function (err, res) {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      }
      )
  })
}

//!Get Rejected ads count
Ads_Info.getAllRejectedAdsCount = (lanCode) => {
  return new Promise((resolve, reject) => {
    sql.query(`SELECT COUNT(*) FROM ads_info WHERE status=2 AND lan_code=?`,
      [lanCode],
      function (err, res) {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      }
      )
  })
}

//!Get fav ads count by uid
Ads_Info.getFavAdsCountByUid = (data) => {
  return new Promise((resolve, reject) => {
    sql.query(`SELECT COUNT(*) FROM ads_info AS i
      INNER JOIN favorite_ads AS f ON f.id_ads_info=i.id_ads_info
      WHERE i.id_user=? AND f.status=1`,
      [data.uid],
      function (err, res) {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      }
      )
  })
}

//!Get vehical filter ads
// Ads_Info.getFilterAds = (data) => {
//   return new Promise((resolve, reject) => {
//     sql.query(`SELECT i.*, i.description AS AdsDescription, f.status As isFavorite, i.create_at AS AdsCreateTime, asi.id_ads_sub_info AS IdAdsSubInfo, u.*,  asi.*, c.* FROM ads_info AS i
//       INNER JOIN user AS u ON i.id_user=u.id_user 
//       LEFT JOIN favorite_ads AS f ON f.id_user=? and i.id_ads_info=f.id_ads_info 
//       INNER JOIN ads_sub_info As asi ON i.id_ads_info=asi.id_ads_info
//       INNER JOIN ads_category AS ac ON asi.id_ads_category=ac.id_ads_category
//       INNER JOIN sub_category AS sc  ON asi.id_sub_category=sc.id_sub_category
//       LEFT JOIN conditions AS c ON asi.id_conditions=c.id_conditions 
//       WHERE i.sell_price BETWEEN ${data.startPrice} AND ${data.endPrice} AND i.status=1 AND asi.id_ads_category=${data.adsCategory} AND asi.id_sub_category=${data.adsSubCategory} AND (u.status=1 OR u.status=2) AND i.lan_code=? AND asi.id_conditions=?`,
//       [data.uid, data.lanCode, data.idCondition],
//       function (err, res) {
//         if (err) {
//           reject(err);
//         } else {
//           resolve(res);
//         }
//       }
//       )
//   })
// }


Ads_Info.getFilterAds = (data) => {
  return new Promise((resolve, reject) => {
    sql.query("SELECT i.`id_ads_info`, i.`ads_name`, i.`description`, i.`sell_price`, i.`location`, i.`status` AS ad_status, i.`id_user`,"+
     "i.`create_at`, asi.id_ads_sub_info, asi.id_ads_category, c.category_name, asi.id_sub_category, sc.sub_cat_name, fa.status AS isFavorite "+
      "FROM ads_info AS i INNER JOIN ads_sub_info AS asi ON ( i.id_ads_info = asi.id_ads_info ) "+
      "INNER JOIN ads_category AS c ON ( asi.id_ads_category = c.id_ads_category ) "+
      "INNER JOIN sub_category AS sc ON ( asi.id_sub_category = sc.id_sub_category ) LEFT JOIN favorite_ads AS fa ON (i.id_ads_info = fa.id_ads_info) "+
      "INNER JOIN user AS u ON (i.id_user = u.id_user) WHERE i.status = 1 AND (u.status=1 OR u.status=2) AND i.lan_code='EN' "+
      "AND i.sell_price BETWEEN '0' AND '10000';",
      [data.uid, data.lanCode],
      function (err, res) {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      }
      )
  })
}



//!Get ads info by ads id with filters
Ads_Info.getAdsInfoByAdsIdWithFilters = (data) => {
  return new Promise((resolve, reject) => {
    let query;
    if (data.idAds_Category == 1 || data.idAds_Category == 25) {
      query = `SELECT v.*,f.*, tt.name AS TransmissionTypeName, co.* FROM vehical_ads As v
      INNER JOIN fuel_type As f ON v.id_fuel_type=f.id_fuel_type
      INNER JOIN transmission_type AS tt ON v.id_transmission_type=tt.id_transmission_type
      INNER JOIN colours AS co ON v.id_color=co.id_colors 
      WHERE v.id_ads_sub_info=? AND v.id_vehical_brand=${data.idVehicalBrand} AND v.id_transmission_type=${data.idTransmissionType} AND v.id_vehical_model=${data.idVehicalModel} AND v.manifacture_year=${data.year} AND v.mileage BETWEEN ${data.startMileage} AND ${data.endMileage} AND v.eng_capacity BETWEEN ${data.startCapacity} AND ${data.endCapacity} AND v.id_fuel_type=${data.idFuelType}`;
    } else if (data.idAds_Category == 2 || data.idAds_Category == 26) {
      query = `SELECT r.*,lc.*, p.type_name AS PropertyTypeName,lt.type_name AS LandTypeName FROM real_state_ads AS r
      LEFT JOIN lands_crops AS lc ON r.id_lands_crops=lc.id_lands_crops
      LEFT JOIN property_type AS p ON r.id_property_type=p.id_property_type
      LEFT JOIN landtype AS lt ON r.id_land_type=lt.id_land_type
      WHERE r.id_ads_sub_info=? AND r.id_lands_crops=${data.id_lands_crops} AND r.id_property_type=${data.id_property_type} AND r.id_land_type=${data.id_land_type}`;
    } else if (data.idAds_Category == 3 || data.idAds_Category == 29) {
      query = `SELECT p.*,pt.* FROM pet_ads AS p
      INNER JOIN pet_type AS pt ON p.id_pet_type=pt.id_pet_type
      WHERE p.id_ads_sub_info`;
    } else if (data.idAds_Category == 6 || data.idAds_Category == 27) {
      query = `SELECT e.*, eb.* FROM electronics_ads As e
      INNER JOIN electroinc_brand As eb ON e.id_electroinc_brand=eb.id_electroinc_brand
      WHERE e.id_ads_sub_info=? AND e.id_electroinc_brand=${data.id_electroinc_brand}`;
    } else if ((data.idAds_Category == 4 && data.idSub_Category == 20) || (data.idAds_Category == 28 && data.idSub_Category == 110)) {
      query = `SELECT s.*,st.* FROM sports_ads As s
      INNER JOIN sport_type AS st ON s.id_sport_type=st.id_sport_type
      WHERE s.id_ads_sub_info=? AND s.id_sport_type=${data.id_sport_type}`;
    } else if ((data.idAds_Category == 4 && data.idSub_Category == 21) || (data.idAds_Category == 28 && data.idSub_Category == 111)) {
      query = `SELECT m.*, it.* FROM music_ads As m
      INNER JOIN instrument_type AS it ON m.id_instrument_type=it.id_instrument_type
      WHERE m.id_ads_sub_info=? AND m.id_instrument_type=${data.id_instrument_type}`;
    }
    else if ((data.idAds_Category == 4 && data.idSub_Category == 22) || (data.idAds_Category == 28 && data.idSub_Category == 112)) {
      resolve([])
    }
    sql.query(query,
      [data.idAds_Sub_info], function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      })
  })
}

//!Delete ads
Ads_Info.deleteAds = (data) => {
  return new Promise((resolve, reject) => {
    sql.query(`UPDATE ads_info SET status=2 WHERE id_ads_info=?`,
      [data.adsId],
      function (err, res) {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      })
  })
}

//!Edit ad by user
Ads_Info.editAdByUser = (data) => {
  return new Promise((resolve, reject) => {
    sql.query(`UPDATE ads_info SET ads_name=?, description=?, sell_price=? WHERE id_ads_info=?`,
      [data.ads_name, data.description, data.sell_price, data.adsId],
      function (err, res) {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      })
  })
}

//!Delete image by id
Ads_Info.deleteImageById = (imageId) => {
  return new Promise((resolve, reject) => {
    sql.query(`UPDATE ads_image SET status=0 WHERE id_ads_image=?`,
      [imageId],
      function (err, res) {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      })
  })
}

Ads_Info.searchAdByUser = (data) => {
  return new Promise((resolve, reject) => {
    sql.query(`SELECT DISTINCT i.*,i.description AS AdsDescription,u.*,ac.*,asi.*,sc.*,c.*, asi.id_ads_sub_info AS IdAdsSubInfo , i.create_at AS AdsCreateTime FROM ads_info As i 
     INNER JOIN user AS u ON i.id_user=u.id_user 
     INNER JOIN ads_sub_info As asi ON i.id_ads_info=asi.id_ads_info
     INNER JOIN ads_category AS ac ON asi.id_ads_category=ac.id_ads_category
     INNER JOIN sub_category AS sc  ON asi.id_sub_category=sc.id_sub_category
     LEFT JOIN conditions AS c ON asi.id_conditions=c.id_conditions  
     WHERE i.lan_code=? AND i.status=? AND i.id_user=? AND i.ads_name LIKE '%${data.key}%' ORDER BY i.create_at DESC LIMIT ${data.limit} OFFSET ${data.offset}; `,
     [data.lan_code, data.status, data.uid],
     function (err, res) {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    }
    )
  })
}

module.exports = Ads_Info;


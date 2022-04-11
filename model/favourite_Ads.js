const sql = require('../utill/database');

const Favourite_Ads = function () {
}

//!Create favorite
Favourite_Ads.create = (newFavourte, result) => {
    sql.query("INSERT INTO favorite_ads (`id_user`, `id_ads_info`) VALUES (?, ?);", [newFavourte.uid, newFavourte.adsId], (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res);
    });
};

//!Get favorite by ads id and uid
Favourite_Ads.getFavByUidAndAdsId = (data) => {
    return new Promise((resolve, reject) => {
        sql.query(`SELECT f.* FROM favorite_ads As f WHERE f.id_user=? AND f.id_ads_info=?`,
            [data.uid, data.adsId],
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

//!Update favorite
Favourite_Ads.update = (data) => {
    return new Promise((resolve, reject) => {
        sql.query(`UPDATE favorite_ads SET status=?, update_at=? WHERE id_user=? AND id_ads_info=? `,
            [data.status, data.updateTime, data.uid, data.adsId],
            function (err, res) {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            })
    })
}

//!Get fav ads by uid
Favourite_Ads.getFavAdsByUid = (data) => {
    return new Promise((resolve, reject) => {
        sql.query(`SELECT i.*,i.description AS AdsDescription, i.create_at AS AdsCreateTime, u.*, asi.*,ac.*,c.*,sc.*, asi.id_ads_sub_info AS IdAdsSubInfo FROM favorite_ads As f 
        INNER JOIN ads_info AS i ON f.id_ads_info=i.id_ads_info
        INNER JOIN user AS u ON u.id_user=i.id_user
        INNER JOIN ads_sub_info As asi ON f.id_ads_info=asi.id_ads_info
        INNER JOIN ads_category AS ac ON asi.id_ads_category=ac.id_ads_category
        INNER JOIN sub_category AS sc  ON asi.id_sub_category=sc.id_sub_category
        INNER JOIN conditions AS c ON asi.id_conditions=c.id_conditions 
        WHERE f.id_user=? AND f.status=1 AND i.status=1  ORDER BY f.create_at DESC LIMIT ${data.limit} OFFSET ${data.offset};`,
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






Favourite_Ads.updateById = (userID, favId, AdsId, result) => {
    sql.query("", [], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        //console.log("add new fav ads: ", { id: res.insertId, ...newFavourte });
        //result(null,JSON.stringify({"status":200,"error":null,"response": { id: res.insertId, ...newFavourte }}));
    });
};

Favourite_Ads.removeFavById = (userid, removeTime, adsId, result) => {
    sql.query("update favorite_Ads set status = '0', remove_at=? where idAds_Info =? and idUser =?; ", [removeTime, adsId, userid], (err, res) => {
        if (err) {
            console.log("error happen when remove data from fav ads " + err);
            result(null, JSON.stringify({ "status": 200, "error": err, "response": null }))
        } else {
            console.log(" remove from fav ads " + res);
            result(null, JSON.stringify({ "status": 200, "error": null, "response": res }))
        }
    });
};

Favourite_Ads.getAllFavByUserId = (userID, result) => {
    var dt = getAllAdsInfoByAdsID(userID);
    var finalArray = [];
    dt.then((adsInfoArray) => {
        let updateAds = adsInfoArray.map(async (Ads) => {
            console.log(" fav ads " + JSON.stringify(Ads));
            console.log('info array' + adsInfoArray.length)
            try {
                var imagelst = await loadImage(Ads);
                console.log(" data return " + JSON.stringify(imagelst));
                finalArray.push(imagelst);
            } catch (error) {
                console.log("error happen load image " + error);
            }
        });
        Promise.all(updateAds).then((value) => {
            result(JSON.stringify({ "status": 200, "err": [], "response": finalArray }));
        }).catch((er) => {
            console.log("errors happen");
        });

    }).catch((eror) => {
        console.log("error happen get Ads Info " + eror);
        result(JSON.stringify({ "status": 200, "err": eror, "response": [] }));
    });
};


function getAllAdsInfoByAdsID(Userid) {
    let adsData = [];
    return new Promise(function (resolve, reject) {
        sql.query("SELECT * FROM favorite_Ads INNER JOIN Ads_Info ON favorite_Ads.idAds_Info = Ads_Info.idAds_Info where favorite_Ads.idUser = ? and favorite_Ads.status='1';", [Userid], function (err, adsInfo, fields) {
            if (err) {
                adsData = [];
                return reject(err);
            } else {
                console.log('adsinfo' + adsInfo.length)
                adsData = adsInfo;
                console.log("Ads data " + adsData);
            }
            resolve(adsData, fields);
        });

    });
}

// function getAllAdsInfoByAdsID(Userid) {
//     let adsData = [];
//     return new Promise(function (resolve, reject) {
//         sql.query("SELECT * FROM favorite_Ads INNER JOIN Ads_Info ON favorite_Ads.idAds_Info = Ads_Info.idAds_Info where favorite_Ads.idUser = ? and favorite_Ads.status='1';", [Userid], function (err, adsInfo, fields) {
//             if (err) {
//                 adsData = [];
//                 return reject(err);
//             } else {
//                 console.log('adsinfo'+ adsInfo)
//                 adsData = adsInfo;
//                 console.log("Ads data " + adsData);
//             }
//             resolve(adsData, fields);
//         });

//     });
// }

function loadImage(Ads) {
    let singleAds = [];
    return new Promise(function (resovel, reject) {
        var element = null;
        sql.query("select * from Ads_Image where idAds_Info = ?;", [Ads.idAds_Info], (err, data, fields) => {
            if (err) {
                var dt = {
                    "idfavorite_Ads": Ads.idfavorite_Ads,
                    "idAds_Info": Ads.idAds_Info,
                    "Ads_name": Ads.Ads_name,
                    "Description": Ads.Description,
                    "Date": Ads.Date,
                    "sell_price": Ads.sell_price,
                    "location": Ads.location,
                    "idUser": Ads.idUser,
                    "ImageList": []
                }
                element = dt;
                singleAds.push(element);
                console.log("error happen when get data from Ads Image " + errs);
                return reject(singleAds);
            } else {
                var dt = {
                    "idfavorite_Ads": Ads.idfavorite_Ads,
                    "idAds_Info": Ads.idAds_Info,
                    "Ads_name": Ads.Ads_name,
                    "Description": Ads.Description,
                    "Date": Ads.Date,
                    "sell_price": Ads.sell_price,
                    "location": Ads.location,
                    "idUser": Ads.idUser,
                    "ImageList": data
                }
                element = dt;
                singleAds.push(element);
            }
            resovel(dt);
        });
    });
}


Favourite_Ads.changeFavState = (data, result) => {
    sql.query('UPDATE favorite_ads SET status=? WHERE idUser=? and 	idAds_Info=?', [data.state, data.uid, data.idAds_Info], function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
}

Favourite_Ads.getAllAdsWithFav = (result) => {
    sql.query("SELECT i.idAds_Info, i.Ads_name, i.Description, i.sell_price, i.location, f.status FROM ads_info AS i LEFT JOIN favorite_ads AS f ON f.idUser=1 and i.idAds_Info=f.idAds_Info", [], function (err, res) {
        if (err) {
            result(err, null);
            return;
        } else {
            result(null, res);
        }
    })
}

Favourite_Ads.getAdsImgsByAdsId = (adsId, result) => {
    sql.query("SELECT i.image_name, i.img_url FROM ads_image AS i WHERE i.id_ads_info=?", [adsId], function (err, res) {
        if (err) {
            result(err, null);
            return;
        } else {
            result(null, res);
        }
    });
}



module.exports = Favourite_Ads;


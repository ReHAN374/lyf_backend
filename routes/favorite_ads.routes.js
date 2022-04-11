module.exports = app => {
    const Fav = require("../controller/favourite_Ads.controller");

    var router = require("express").Router();

   // router.post("/changeFavState", FavNew.updateOrCreate);
   // router.post("/getByUid", FavNew.getFavAdsByUid);
    router.get("/getAllWithFav", Fav.getAllAdsWithFav);

    app.use('/api/fav', router);
};
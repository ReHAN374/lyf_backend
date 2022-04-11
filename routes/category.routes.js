module.exports = app => {
    const Category = require("../controller/Ads_Catogery.controller");
    const checkAuthMiddleware = require("../middleware/check-auth");

    var router = require("express").Router();
    
    router.post("/create-main", Category.create);
    router.post("/get-main", Category.getAllMainCategory);
    router.post("/get-main-sub", Category.getAllMainAndSubCat);
    router.post("/get-all", Category.getAllCategory);

    app.use('/api/category', router);
};
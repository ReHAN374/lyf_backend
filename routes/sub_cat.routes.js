module.exports = app => {
    const SubCat = require("../controller/Sub_Category.controller");
    const checkAuthMiddleware = require("../middleware/check-auth");

    var router = require("express").Router();

    router.post("/create", SubCat.create);
    //router.post("/get-all", checkAuthMiddleware.checkAuth, Area.getAllArea);

    app.use('/api/sub-category', router);
};
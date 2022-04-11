module.exports = app => {
    const Country = require("../controller/Country.controller");
    const checkAuthMiddleware = require("../middleware/check-auth");

    var router = require("express").Router();

    router.post("/create", checkAuthMiddleware.checkAuth, Country.create);
    router.post("/get-all", checkAuthMiddleware.checkAuth, Country.getAllCountry);

    app.use('/api/country', router);
};
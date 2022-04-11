module.exports = app => {
    const Developer = require("../controller/Apartment_Developer.controller");
    const checkAuthMiddleware = require("../middleware/check-auth");

    var router = require("express").Router();

  //  router.post("/create", checkAuthMiddleware.checkAuth, Area.create);
  //  router.post("/get-all", Developer.getAllDeveloperInfo);  no table

    app.use('/api/developer', router);
};
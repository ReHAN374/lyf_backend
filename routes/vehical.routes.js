// module.exports = app => {
//     const Area = require("../controller/Area.controller");
//     const checkAuthMiddleware = require("../middleware/check-auth");

//     var router = require("express").Router();

//     router.post("/create", checkAuthMiddleware.checkAuth, Area.create);
//     router.post("/get-all", checkAuthMiddleware.checkAuth, Area.getAllArea);

//     app.use('/api/area', router);
// };
module.exports = app => {
    const PetType = require("../controller/Pet_Type.controller");
    const checkAuthMiddleware = require("../middleware/check-auth");

    var router = require("express").Router();

    router.post("/create", checkAuthMiddleware.checkAuth, PetType.create);
    router.post("/get-all", PetType.getAllPetType);

    app.use('/api/pet-type', router);
};
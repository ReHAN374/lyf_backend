const UserHasPrivilages = require('../model/user_has_privilages');

exports.create = (req, resp) => {
    if (!req.body) {
        resp.status(400).send({
            message: "Content can not be empty!"
        });
    }
    var createTime = new Date();

    var newUserHasPrivliage = {
        "iduser_role" : req.body.iduser_role,
        "idprivilages" : req.body.idprivilages,
        "status" : "1",
        "create_at" : createTime,
        "update_at" : null,
        "remove_at" : null,
    };

    UserHasPrivilages.create(newUserHasPrivliage,(err,data)=>{
        if (err)
            resp.status(500).send({
                message:
                    err.message || "Some error occurred while creating the new User Role."
            });
        else resp.send(data);
    });
};

exports.updateById = (req, resp) => {
    if(!req.body) {
        resp.status(400).send({
            message: "Content can not be empty!"
        });
    }
    var updateTime = new Date();
    var idUserHasPrivilages = req.body.idUserHasPrivilages;

    var updateUserHasPrivliage = {
        "iduser_role" : req.body.iduser_role,
        "idprivilages" : req.body.idprivilages,
        "status" : "1",
        "create_at" : null,
        "update_at" : updateTime,
        "remove_at" : null,
    };

    UserHasPrivilages.updateById(updateUserHasPrivliage,idUserHasPrivilages,(err,data)=>{
        if(err)
            resp.send(err);
        resp.send(data);
    });

};

exports.removeById = (req, resp) => {
    if(!req.body) {
        resp.status(400).send({
            message: "Content can not be empty!"
        });
    }
    var removeTime = new Date();
    var idUserHasPrivilages = req.body.idUserHasPrivilages;

    UserHasPrivilages.removeById(idUserHasPrivilages,removeTime,(err,data)=>{
        if(err)
            resp.send(err);
        resp.send(data);
    });
};

exports.getAllPrivilageByRoleId = (req, resp) => {
    if(!req.body) {
        resp.status(400).send({
            message: "Content can not be empty!"
        });
    }
    var idRoles = req.body.idRole;

    UserHasPrivilages.getAllUserHasPrivilagesInfo(idRoles,(err,data)=>{
        if(err)
            resp.send(err);
        resp.send(data);
    });
};
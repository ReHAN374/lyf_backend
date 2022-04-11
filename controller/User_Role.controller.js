const UserRole = require('../model/User_Role');

exports.create = (req, resp) => {
    if (!req.body) {
        resp.status(400).send({
            message: "Content can not be empty!"
        });
    }
    var createTime = new Date();

    var newUserRole = {
        "role_name" : req.body.role_name,
        "status" : "1",
        "create_at" : createTime,
        "update_at" : null,
        "remove_at" : null,
    };

    UserRole.create(newUserRole,(err,data)=>{
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
    var idRole = req.body.idUserRole;

    var updateUserRole = {
        "role_name" : req.body.role_name,
        "status" : "1",
        "create_at" : null,
        "update_at" : updateTime,
        "remove_at" : null,
    };

    UserRole.updateById(updateUserRole,idRole,(err,data)=>{
        if(err)
            resp.send(err);
        resp.send(data);
    });

};

exports.removebyId = (req, resp) => {
    if(!req.body) {
        resp.status(400).send({
            message: "Content can not be empty!"
        });
    }
    var removeTime = new Date();
    var idRole = req.body.idUserRole;

    UserRole.removeById(idRole,removeTime,(err,data)=>{
        if(err)
            resp.send(err);
        resp.send(data);
    });

};

exports.getAllUserRoleInfo = (req, resp) => {
    UserRole.getAllUserRole((err,data)=>{
        if(err)
            resp.send(err);
        resp.send(data);
    });
};
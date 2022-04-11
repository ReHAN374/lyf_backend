const UserPrivilages = require('../model/user_privilage');

exports.create = (req, resp) => {
    if (!req.body) {
        resp.status(400).send({
            message: "Content can not be empty!"
        });
    }
    var createTime = new Date();

    var newUserPrivliage = {
        "privliage_name" : req.body.privliage_name,
        "status" : "1",
        "create_at" : createTime,
        "update_at" : null,
        "remove_at" : null,
    }

    UserPrivilages.create(newUserPrivliage,(err,data)=>{
        if (err)
            resp.status(500).send({
                message:
                    err.message || "Some error occurred while creating the new User Privilage."
            });
        else resp.send(data);
    });
};

exports.updatePrivlageById = (req, resp) => {
    if(!req.body) {
        resp.status(400).send({
            message: "Content can not be empty!"
        });
    }
    var updateTime = new Date();
    var idPrivilages = req.body.idPrivilage;

    var updateUserPrivliage = {
        "privliage_name" : req.body.privliage_name,
        "status" : "1",
        "create_at" : null,
        "update_at" : updateTime,
        "remove_at" : null,
    }

    UserPrivilages.updateById(updateUserPrivliage,idPrivilages,(err,data)=>{
        if(err)
            resp.send(err);
        resp.send(data);
    });
};  

exports.removePrivilageById = ( req, resp) => {
    if(!req.body) {
        resp.status(400).send({
            message: "Content can not be empty!"
        });
    }
    var removeTime = new Date();
    var idPrivilages = req.body.idPrivilage;

    UserPrivilages.removeById(idPrivilages,removeTime,(err,data)=>{
        if(err)
            resp.send(err);
        resp.send(data);
    });

};

exports.getAllPrivilagesInfo = (req, resp) => {
    UserPrivilages.getAllUserPrivilageInfo((err,data)=>{
        if(err)
            resp.send(err);
        resp.send(data);
    });
};  
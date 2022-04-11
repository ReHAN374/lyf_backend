const Language = require('../model/language');

exports.create = (req, resp) => {
    if (!req.body) {
        resp.status(400).send({
            message: "Content can not be empty!"
        });
    }
    var createTime = new Date();

    const newLanaguage = {
        "lanaguageName" : req.body.lanaguageName,
        "lan_code" : req.body.lan_code,
        "status" : "1",
        "create_at" : createTime,
        "update_at" : null,
        "remove_at" : null
    };

    Language.create(newLanaguage,(err,data)=>{
        if (err)
            resp.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Language."
            });
        else resp.send(data);
    });
};

exports.updateById = (req, resp) => {
    if (!req.body) {
        resp.status(400).send({
            message: "Content can not be empty!"
        });
    }
    var updateTime = new Date();
    var languageId = req.body.languageId;
    const updateLanaguage = {
        "lanaguageName" : req.body.lanaguageName,
        "lan_code" : req.body.lan_code,
        "status" : "1",
        "create_at" : null,
        "update_at" : updateTime,
        "remove_at" : null
    };

    Language.UpdateById(updateLanaguage,languageId,(err,data)=>{
        if(err)
            resp.send(err);
        resp.send(data);
    });
};

exports.removeById = (req, resp) => {
    if (!req.body) {
        resp.status(400).send({
            message: "Content can not be empty!"
        });
    }
    var removeTime = new Date();
    var languageId = req.body.languageId;

    Language.removeById(languageId,removeTime,(err,data)=>{
        if(err)
            resp.send(err);
        resp.send(data);
    });
};

exports.getLanguageInfoById = (req, resp) => {

};

exports.getAllLanguageInfo =  (req, resp) => {
    Language.getAllLanguageInfo((err, res)=>{
        console.log("send data "+resp);
        if(err)
            resp.send(err);
        resp.send(res);
    });
};
const sql = require('../utill/database');

const User_Privilages = function (newUserPrivliage) {
    this.privliage_name = newUserPrivliage.privliage_name;
    this.status = newUserPrivliage.status;
    this.create_at = newUserPrivliage.create_at;
    this.update_at = newUserPrivliage.update_at;
    this.remove_at = newUserPrivliage.remove_at;
};

User_Privilages.create = (newUserPrivliage, result) => {
    sql.query("INSERT INTO `privilages` (`privliage_name`, `status`, `create_at`, `update_at`, `remove_at`) VALUES (?, ?, ?, ?, ?);", [newUserPrivliage.privliage_name,newUserPrivliage.status,newUserPrivliage.create_at,newUserPrivliage.update_at,newUserPrivliage.remove_at], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created new privilages : ", { id: res.insertId, ...newUserPrivliage });
        result(null, { id: res.insertId, ...newUserPrivliage });
    });
};

User_Privilages.updateById = (updateUserPrivilage, idUserPrivilage, result) => {
    sql.query("update set privilages `privliage_name`=?, `update_at`=? where `idprivilages`=?", [updateUserPrivilage.privliage_name, updateUserPrivilage.update_at, idUserPrivilage], function (err, res, fields) {
        if (err) {
            console.log("error happen when update data from privilages " + err);
            result(null, JSON.stringify({ "status": 200, "error": err, "response": null }))
        } else {
            console.log(" update from privilages " + res);
            result(null, JSON.stringify({ "status": 200, "error": null, "response": res }))
        }
    });
};

User_Privilages.removeById = (idUserPrivilage, removeTime, result) => {
    sql.query("update set privilages status ='0', remove_at=? where idprivilages=? ", [removeTime, idUserPrivilage], function (err, res, fields) {
        if (err) {
            console.log("error happen remove get data from privilages " + err);
            result(null, JSON.stringify({ "status": 200, "error": err, "response": null }))
        } else {
            console.log(" remove from privilages " + res);
            result(null, JSON.stringify({ "status": 200, "error": null, "response": res }))
        }
    });
};

User_Privilages.getAllUserPrivilageInfo = result => {
    sql.query("select * from privilages where status ='1'", [], function (err, res, fields) {
        if (err) {
            console.log("error happen when get data from privilages " + err);
            result(null, JSON.stringify({ "status": 200, "error": err, "response": null }))
        } else {
            console.log(" data from privilages " + res);
            result(null, JSON.stringify({ "status": 200, "error": null, "response": res }))
        }
    });
};

module.exports = User_Privilages;
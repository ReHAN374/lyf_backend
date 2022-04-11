const sql = require('../utill/database');

const UserHasPrivilage = function(newPrivilage){
    this.iduser_role = newPrivilage.iduser_role;
    this.idprivilages = newPrivilage.idprivilages;
    this.status = newPrivilage.status;
    this.create_at = newPrivilage.create_at;
    this.update_at = newPrivilage.update_at;
    this.remove_at = newPrivilage.remove_at;
};

UserHasPrivilage.create = (newUserHasPrivilages, result) => {
    sql.query("INSERT INTO `user_role_has_privilages` (`iduser_role`, `idprivilages`, `status`, `create_at`, `update_at`, `remove_at`) VALUES (?, ?, ?, ?, ?, ?);", [newUserHasPrivilages.iduser_role,newUserHasPrivilages.idprivilages,newUserHasPrivilages.status,newUserHasPrivilages.create_at,newUserHasPrivilages.update_at,newUserHasPrivilages.remove_at], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created new user has privilages : ", { id: res.insertId, ...newUserHasPrivilages });
        result(null, { id: res.insertId, ...newUserHasPrivilages });
    });
};  

UserHasPrivilage.updateById = (updateUserHasPrvialages, idUserHasPrivlages, result)=>{
    sql.query("update set user_role_has_privilages `iduser_role`=?, idprivilages=? `update_at`=? where `idUserHasPrivilages`=?", [updateUserHasPrvialages.iduser_role, updateUserHasPrvialages.idprivilages ,updateUserHasPrvialages.update_at, idUserHasPrivlages], function (err, res, fields) {
        if (err) {
            console.log("error happen when update data from user_role_has_privilages " + err);
            result(null, JSON.stringify({ "status": 200, "error": err, "response": null }))
        } else {
            console.log(" update from user_role_has_privilages " + res);
            result(null, JSON.stringify({ "status": 200, "error": null, "response": res }))
        }
    });
};

UserHasPrivilage.removeById = (idUserHasPrivlages, removeTime, result) => {
    sql.query("update set user_role_has_privilages status ='0', remove_at=? where idUserHasPrivilages=? ", [removeTime, idUserHasPrivlages], function (err, res, fields) {
        if (err) {
            console.log("error happen remove get data from user_role_has_privilages " + err);
            result(null, JSON.stringify({ "status": 200, "error": err, "response": null }))
        } else {
            console.log(" remove from user_role_has_privilages " + res);
            result(null, JSON.stringify({ "status": 200, "error": null, "response": res }))
        }
    });
};

UserHasPrivilage.getAllUserHasPrivilagesInfo = (idRole,result) =>{
    sql.query("select user_role_has_privilages.idUserHasPrivilages as id, user_role_has_privilages.create_at as createDate,privilages.idprivilages as pirvilageId, privilages.privliage_name as privilageName from user_role_has_privilages left join privilages on user_role_has_privilages.idprivilages = privilages.idprivilages where user_role_has_privilages.status ='1' and user_role_has_privilages.iduser_role=?;", [idRole], function (err, res, fields) {
        if (err) {
            console.log("error happen when get data from user_role_has_privilages " + err);
            result(null, JSON.stringify({ "status": 200, "error": err, "response": null }))
        } else {
            console.log(" data from user_role_has_privilages " + res);
            result(null, JSON.stringify({ "status": 200, "error": null, "response": res }))
        }
    });
};

module.exports = UserHasPrivilage;
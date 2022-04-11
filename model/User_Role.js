const sql = require('../utill/database');

const User_Role = function(newRole){
    this.role_name = newRole.role_name;
    this.status = newRole.status;
    this.create_at = newRole.create_at;
    this.update_at = newRole.update_at;
    this.remove_at = newRole.remove_at;
};

User_Role.create = (newRole, result) => {
    sql.query("INSERT INTO `user_role` (`role_name`, `status`, `create_at`, `update_at`, `remove_at`) VALUES (?, ?, ?, ?, ?);", [newRole.role_name,newRole.status,newRole.create_at,newRole.update_at,newRole.remove_at], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created new user_role : ", { id: res.insertId, ...newRole });
        result(null, { id: res.insertId, ...newRole });
    });
};

User_Role.updateById = (updateRole, idRole , result) => {
    sql.query("update set user_role `role_name`=?, `update_at`=? where `iduser_role`=?", [updateRole.role_name, updateRole.update_at, idRole], function (err, res, fields) {
        if (err) {
            console.log("error happen when update data from user_role " + err);
            result(null, JSON.stringify({ "status": 200, "error": err, "response": null }))
        } else {
            console.log(" update from user_role " + res);
            result(null, JSON.stringify({ "status": 200, "error": null, "response": res }))
        }
    });
};

User_Role.removeById = (idRole, removeTime , result) => {
    sql.query("update set user_role status ='0', remove_at=? where iduser_role=? ", [removeTime, idRole], function (err, res, fields) {
        if (err) {
            console.log("error happen remove get data from user_role " + err);
            result(null, JSON.stringify({ "status": 200, "error": err, "response": null }))
        } else {
            console.log(" remove from user_role " + res);
            result(null, JSON.stringify({ "status": 200, "error": null, "response": res }))
        }
    });
};

User_Role.getAllUserRole = result => {
    sql.query("select * from user_role where status ='1'", [], function (err, res, fields) {
        if (err) {
            console.log("error happen when get data from user_role " + err);
            result(null, JSON.stringify({ "status": 200, "error": err, "response": null }))
        } else {
            console.log(" data from user_role " + res);
            result(null, JSON.stringify({ "status": 200, "error": null, "response": res }))
        }
    });
};

module.exports = User_Role;
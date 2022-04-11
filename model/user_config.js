const sql = require('../utill/database');

const UserConfig = function () {
};

UserConfig.create = (uid) => {
    return new Promise((resolve, reject) => {
        sql.query(`INSERT INTO userconfig
            (id_user)
            VALUES (?)`,
            [uid],
            function (error, response) {
                if (error) {
                    reject(error);
                } else {
                    resolve(response);
                }
            });
    })
};

UserConfig.update = (data) => {
    return new Promise((resolve, reject) => {
        sql.query(`UPDATE userconfig AS uc SET allow_show_my_mobile=?,subcribe_for_off=?,recommendation=? WHERE uc.id_user=?`,
            [data.allow_show_my_mobile, data.subcribe_for_off, data.recommendation, data.idUser],
            function (error, response) {
                if (error) {
                    reject(error);
                } else {
                    resolve(response);
                }
            });
    })
};

UserConfig.removeById = (userId, result) => {

};

UserConfig.getAllUserInfo = result => {

};

module.exports = UserConfig;
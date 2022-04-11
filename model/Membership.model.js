const sql = require('../utill/database');

const Membership = function () {
};

//!Create membership
Membership.create = (newMembership) => {
    return new Promise((resolve, reject) => {
        sql.query('INSERT INTO `membership` (`membership_name`, `descirption`, `price`, `free_ads_count`, lan_code) VALUES (?,?,?,?,?);',
            [newMembership.membership_name, newMembership.descirption, newMembership.price, newMembership.free_ads_count, newMembership.lan_code],
            function (err, res) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(res);
            });
    });
};

//!Get selected membership info
Membership.getMembershipInfoById = (membershipID) => {
    return new Promise((resolve, reject) => {
        sql.query("select * from membership where id_membership =? status ='1'",
            [membershipID],
            function (err, res) {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            }
        );
    })
};

//!Get All membership info
Membership.getAllMembershipInfo = (lan_code, result) => {
    sql.query("select * from membership where status ='1' and lan_code=?", [lan_code], function (err, res) {
        if (err) {
            result(err, null)
        } else {
            result(null, res)
        }
    });
};


module.exports = Membership;
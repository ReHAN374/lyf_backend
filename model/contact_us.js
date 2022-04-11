const sql = require('../utill/database');

const Contatct_Us = function(newContactUs){
    this.username = newContactUs.username;
    this.mail_address = newContactUs.mail_address;
    this.message = newContactUs.message;
    this.status = newContactUs.status;
    this.relpy_message = newContactUs.relpy_message;
    this.create_at = newContactUs.create_at;
    this.update_at = newContactUs.update_at;
    this.remove_at = newContactUs.remove_at;
};

Contatct_Us.create = (newContatctUs, result) => {
    sql.query("INSERT INTO `contact_us_message` (`username`, `mail_address`, `message`, `status`, `relpy_message`, `create_at`, `update_at`, `remove_at`) VALUES (?, ?, ?, ?, ?, ?, ?, ?);", [newContatctUs.username,newContatctUs.mail_address,newContatctUs.message,newContatctUs.status,newContatctUs.relpy_message,newContatctUs.create_at,newContatctUs.update_at,newContatctUs.remove_at], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created new contact us : ", { id: res.insertId, ...newContatctUs });
        result(null, { id: res.insertId, ...newContatctUs });
    });
};

module.exports = Contatct_Us;
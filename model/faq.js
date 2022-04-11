const sql = require('../utill/database');

const FAQ = function(newFAQ){
    this.quiz = newFAQ.quiz;
    this.answer = newFAQ.answer;
    this.status = newFAQ.status;
    this.create_at = newFAQ.create_at;
    this.update_at = newFAQ.update_at;
    this.remove_at = newFAQ.remove_at;
};

FAQ.create = (newFAQ, result) => {
    sql.query("INSERT INTO `faq` (`quiz`, `answer`, `status`, `create_at`, `update_at`, `remove_at`) VALUES (?, ?, ?, ?, ?, ?);", [newFAQ.quiz,newFAQ.answer,newFAQ.status,newFAQ.create_at,newFAQ.update_at,newFAQ.remove_at], (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        console.log("created faq: ", { id: res.insertId, ...newFAQ });
        result(null, { id: res.insertId, ...newFAQ });
      });
};

FAQ.updateById = (faq,idFaq, result) => {

};

FAQ.removeById = (idFaq, result) => {

};

FAQ.getInfoById = (idFaq, result) => {

};

FAQ.getAllFaqInfo = result => {
    sql.query("select * from faq where status = '1'", [], function (err, res, fields) {
        if (err) {
          console.log("error happen when serach faq " + err);
          result(null, JSON.stringify({ "status": 200, "error": err, "response": null }))
        } else {
          console.log(" data from faq " + res);
          result(null, JSON.stringify({ "status": 200, "error": null, "response": res }))
        }
      });
};

module.exports = FAQ;
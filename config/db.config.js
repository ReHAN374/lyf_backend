module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "",
  DB: "heroku_76e4853cf6cfcbc",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

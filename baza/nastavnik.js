const Sequelize = require("sequelize");
const sequelize = require("./baza.js");
 
module.exports = function (sequelize, DataTypes) {
    const Nastavnik = sequelize.define('Nastavnik', {
       username: Sequelize.STRING,
       password_hash: Sequelize.STRING
   });
   return Nastavnik;
}

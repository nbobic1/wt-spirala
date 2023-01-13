const Sequelize = require("sequelize");
const sequelize = require("./baza.js");
 
module.exports = function (sequelize, DataTypes) {
    const Nastavnici = sequelize.define('Nastavnici', {
       });
   return Nastavnici;
}

const Sequelize = require("sequelize");
const sequelize = require("./baza.js");
 
module.exports = function (sequelize, DataTypes) {
    const Prisustva = sequelize.define('Prisustva', {
       predmet: Sequelize.STRING,
       brojPredavanjaSedmicno:Sequelize.INTEGER,
       brojVjezbiSedmicno: Sequelize.INTEGER
    });
   return Prisustva;
}

const Sequelize = require("sequelize");
const sequelize = require("./baza.js");
 
module.exports = function (sequelize, DataTypes) {
    const Student = sequelize.define('Student', {
       ime: Sequelize.STRING,
       index:Sequelize.INTEGER
    });
   return Student;
}

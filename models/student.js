const { DataTypes } = require('sequelize');
const sequelize = require('../db');
//this is the model for student
const Student = sequelize.define('Student', {
  rollno: {
    type: DataTypes.STRING,
    primaryKey:true,
    allowNull: false,
  },
  dob: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
},{
  timestamps:false,
});

module.exports = Student;

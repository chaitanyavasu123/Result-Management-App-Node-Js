const { DataTypes } = require('sequelize');
const sequelize = require('../db');
//this is the model for teacher
const Teacher = sequelize.define('Teacher', {
  registerNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},{
  timestamps:false,
});
//by using this hook data will be automatically added to database 
Teacher.afterSync(async () => {
    try {
      await Teacher.create({
        registerNumber: '123',
        password: 'Vasu@2001',
      });
      console.log('Initial teacher data inserted');
    } catch (error) {
      console.error('Error inserting initial teacher data:', error);
    }
  });
  
  module.exports = Teacher;

module.exports = Teacher;

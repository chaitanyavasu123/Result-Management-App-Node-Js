const { Sequelize } = require('sequelize');

// Replace 'your_database', 'your_username', and 'your_password' with your MySQL credentials
const sequelize = new Sequelize('RM', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
});

// Export the sequelize instance
module.exports = sequelize;

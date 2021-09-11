const Sequelize = require('sequelize');

require('dotenv').config();

// create connection to our db
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, `jojoBA123321`, {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306
});
module.exports = sequelize;


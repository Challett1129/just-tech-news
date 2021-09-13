const Sequelize = require('sequelize');

require('dotenv').config();

let sequelize; 

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, `jojoBA123321`, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
  });
}
// create connection to our db
module.exports = sequelize;


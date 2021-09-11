const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');
const { Model, DataTypes } = require('sequelize');

// create our User model 
class User extends Model {
    //method to check password
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

// define table columns and configuration 
User.init( 
    {
        //id column
        id: {
            type: DataTypes.INTEGER,
            //this is the equivalent of SQL's `NOT NULL` option
            allowNull: false,
            
            primaryKey: true,
            autoIncrement: true
        },
        //username column
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        //email column
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        //password column
        password: {
            type: DataTypes.STRING,
            allowNull: false, 
            validate: {
                len: [4]
            }
        }
    },
    {
        hooks: {
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;       
            },
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData
            }
        },
        sequelize, 
        // don't automatically create createdAt/updatedAt timestamp fields 
        timestamps: false,
        // don't pluralize name of database table 
        freezeTableName: true,
        // use underscores instead of camel-casing
        underscored: true,
        // make it to so our model name stays lowercase in the database 
        modelName: 'user'
    }
);

module.exports = User; 
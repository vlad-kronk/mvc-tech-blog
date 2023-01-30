const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

// model instance method to check password
class User extends Model {
    checkPassword(logInPw) {
        return bcrypt.compareSync(logInPw, this.password);
    }
}

/*

USER ------
   id: int, PK
   name: str
   username: str [a-z0-9_-]
   password: str (32 >= len >= 8)
   background_image: int (default 3)

*/

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: {
                    args: ["^[a-z0-9-]*$", "i"],
                    msg: "Name must only contain letters, numbers and dashes"
                }
            }
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                is: {
                    args: ["^[a-z0-9_-]*$", "i"],
                    msg: "Username must only contain letters, numbers, underscores and dashes"
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [8, 32],
                    msg: "Password length must be between 8 and 32 characters"
                }
            }
        },
        background_image: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 6
            },
            defaultValue: 3
        }
    },
    {
        // before creating an instance of the user, encrypt the password for storage.
        // app will decrypt password during checkPassword function on login attempt
        hooks: {
            beforeCreate: async (newUserData) => {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true
    }
)

module.exports = User;
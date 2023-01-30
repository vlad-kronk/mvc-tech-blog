const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model { }

/*

POST ------
   id: int, PK
   title: str
   content: str
   user_id: int, FK(user.id)

*/

Post.init(
   {
      id: {
         type: DataTypes.INTEGER,
         allowNull: false,
         primaryKey: true,
         autoIncrement: true
      },
      title: {
         type: DataTypes.STRING,
         allowNull: false
      },
      content: {
         type: DataTypes.TEXT('long'),
         allowNull: false
      },
      user_id: {
         type: DataTypes.INTEGER,
         references: {
            model: "User",
            key: 'id'
         }
      },
   },
   {
      sequelize,
      timestamps: true,
      freezeTableName: true,
      underscored: true
   }
)

module.exports = Post;
const { Model, DataTypes } = require('sequelize');
const { default: ModelManager } = require('sequelize/types/model-manager');
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
         type: DataTypes.STRING,
         allowNull: false
      },
      user_id: {
         type: DataTypes.INTEGER,
         references: {
            model: 'user',
            key: 'id'
         }
      }
   },
   {
      sequelize,
      freezeTableName: true,
      underscored: true,
      modelName: 'post'
   }
)

module.exports = Post;
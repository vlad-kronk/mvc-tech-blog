const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model { }

Comment.init(
   {
      id: {
         type: DataTypes.INTEGER,
         allowNull: false,
         primaryKey: true,
         autoIncrement: true
      },
      text: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      user_id: {
         type: DataTypes.INTEGER,
         references: {
            model: 'User',
            key: 'id'
         }
      },
      post_id: {
         type: DataTypes.INTEGER,
         refrences: {
            model: 'Post',
            key: 'id'
         }
      }
   },
   {
      sequelize,
      freezeTableName: true,
      timestamps: true,
   }
)

module.exports = Comment;
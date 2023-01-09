// import models
const User = require('./User');
const Post = require('./Post');

// implement one-to-many association between a user and their posts
User.hasMany(Post, {
   foreignKey: 'user_id'
});
Post.belongsTo(User);

module.exports = {
   User,
   Post
};
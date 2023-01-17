// import models
const User = require('./User');
const Post = require('./Post');

// implement one-to-many association between a user and their posts
User.hasMany(Post, {
   foreignKey: 'user_id'
});
Post.belongsTo(User);

// implement one-to-many association between a post and its comments
Post.hasMany(Comment, {
   foreignKey: 'post_id'
});
Comment.belongsTo(Post);

module.exports = {
   User,
   Post,
   Comment
};
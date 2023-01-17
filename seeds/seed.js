const sequelize = require('../config/connection');
const { User } = require('../models/User');
const { Post } = require('../models/Post');

const userData = require('./user_seed.json');
const postData = require('./post_seed.json');

const seed = async () => {
   await sequelize.sync({ force: true });

   await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true
   });

   await Post.bulkCreate(postData, {
      returning: true
   });

   process.exit(0);
}

seed();
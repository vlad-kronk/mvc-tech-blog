const router = require("express").Router();

// import models
const { Post, User, Comment } = require('../models');

// homepage
router.get('/', async (req, res) => {
   try {
      // gets all posts including authors and dates
      const dbPosts = await Post.findAll({
         include: [
            {
               model: Post,
               attributes: ["id", "title", "user_id", "date_updated"]
            },
            {
               model: User,
               attributes: ["username"]
            }
         ]
      })


      res.render('homepage', {});
   } catch (err) {
      console.log(err);
      res.status(500).json(err);
   }
});

module.exports = router;
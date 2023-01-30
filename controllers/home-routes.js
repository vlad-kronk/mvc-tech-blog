const router = require("express").Router();
const moment = require("moment")

// import models
const { Post, User, Comment } = require('../models');

// homepage
router.get('/', async (req, res) => {
   try {
      // gets all posts including authors and dates
      const dbPosts = await Post.findAll({
         // display up to 50 posts on the homepage
         limit: 50,
         // sort by newest first
         order: [['createdAt', 'DESC']],
         include: [
            {
               model: User,
               attributes: ['username']
            }
         ]
      })

      const post_previews = dbPosts.map((post) => {

         // only need date part of timestamp
         let date = JSON.stringify(post.updatedAt);
         date = date.substring(1, 11);

         const result = {
            id: post.id,
            title: post.title,
            author: post.User.username,
            // pre-formats the date for display
            updated_at: moment(date, 'YYYY-MM-DD').format('MMM DD, YYYY')
         };

         return result;
      })

      // res.status(200).json(homepage_info);

      let res_data = {
         page_title: 'Home',
         // logged_in: req.session.logged_in,
         logged_in: true,
         posts: post_previews
      }

      // res.status(200).json({ data: res_data });

      res.render('home', { data: res_data });
   } catch (err) {
      console.log(err);
      res.status(500).json(err);
   }
});

module.exports = router;
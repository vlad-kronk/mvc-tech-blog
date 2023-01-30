const router = require("express").Router();
const e = require("express");
const moment = require("moment")

// import models
const { Post, User, Comment } = require('../models');

// homepage home route
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
      // creates an array of post previews, formatted for display
      const post_previews = dbPosts.map((post) => {
         // only need date part of timestamp
         let date = JSON.stringify(post.updatedAt);
         date = date.substring(1, 11);
         // formats object for returned array
         const result = {
            id: post.id,
            title: post.title,
            author: post.User.username,
            // pre-formats the date for display
            updated_at: moment(date, 'YYYY-MM-DD').format('MMM DD, YYYY')
         };
         return result;
      })
      // array of all required page data
      let res_data = {
         page_title: 'Home',
         logged_in: req.session.logged_in,
         // logged_in: true,
         posts: post_previews
      }
      // render the page using the formatted data
      res.render('home', { data: res_data });
   } catch (err) {
      console.log(err);
      res.status(500).json(err);
   }
});

// login home route
router.get('/login', async (req, res) => {
   // if user is already logged in, redirect to the homepage
   if (req.session.logged_in) {
      res.redirect('/');
      return;
   }
   // if not, render login page
   res.render('login');
})

module.exports = router;
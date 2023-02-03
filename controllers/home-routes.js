const router = require('express').Router();
const moment = require('moment');
const withAuth = require('../utils/auth');

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
         // include username from User table
         include: [
            {
               model: User,
               attributes: ['username']
            }
         ],
         // don't need content of post
         attributes: [
            'id',
            'title',
            'updatedAt',
            'createdAt'
         ]
      });
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
      });
      // object with all required page data
      const res_data = {
         page_title: 'Home',
         background_image: req.session.bg_image || 3,
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
   const res_data = {
      page_title: "Login",
      background_image: req.session.background_image || 3
   }
   // if not, render login page
   res.render('login', { data: res_data });
});

// dashboard home route
router.get('/dashboard', withAuth, async (req, res) => {
   // only execute if the user is logged in
   try {
      // try to get all posts from the user
      const dbUserPosts = await Post.findAll({
         where: {
            user_id: req.session.user_id
         },
         // don't need content or author of post
         attributes: [
            'id',
            'title',
            'updatedAt',
            'createdAt'
         ],
         // same as instance.get({ plain: true })
         nest: true,
         raw: true
      });
      // map post data to format dates
      const post_data = dbUserPosts.map((post) => {
         // only need date part of timestamp
         let date = JSON.stringify(post.updatedAt);
         date = date.substring(1, 11);
         // formats object for returned array
         return {
            id: post.id,
            title: post.title,
            // pre-formats the date for display
            updated_at: moment(date, 'YYYY-MM-DD').format('MMM DD, YYYY')
         }
      });
      // set up an object with all req'd page data
      const res_data = {
         page_title: 'Dashboard',
         logged_in: req.session.logged_in,
         background_image: req.session.bg_image || 3,
         user: {
            username: req.session.username,
            name: req.session.name
         },
         posts: post_data
      }

      console.log(res_data);
      res.render('dashboard-view', { data: res_data });
   } catch (err) {
      console.log(err);
      res.status(500).json(err);
   }
});

// get one post by id
router.get("/post/:id", async (req, res) => {
   try {
      // only execute if user is logged in
      if (!req.session.logged_in) {
         res.redirect('/login');
         return;
      }
      // get the requested post data
      const dbPostData = await Post.findByPk(req.params.id, {
         include: {
            model: User,
            attributes: ['username']
         },
         attributes: ['id', 'title', 'content', 'updatedAt'],
         nest: true,
         raw: true
      });
      // find all the comments related to that post
      const dbCommentData = await Comment.findAll({
         where: {
            post_id: req.params.id
         },
         include: {
            model: User,
            attributes: ['username']
         },
         attributes: ['id', 'text', 'user_id', 'createdAt'],
         order: [['createdAt', 'DESC']],
      });
      // format date for display
      let date = JSON.stringify(dbPostData.updatedAt);
      date = date.substring(1, 11);
      // format a response object for handlebars
      const res_data = {
         page_title: dbPostData.title,
         logged_in: req.session.logged_in,
         background_image: req.session.bg_image || 3,
         user: {
            id: req.session.user_id
         },
         post: {
            title: dbPostData.title,
            author: dbPostData.User.username,
            updated_at: moment(date, 'YYYY-MM-DD').format('MMM DD, YYYY'),
            content: dbPostData.content
         },
         comments: dbCommentData.map((comment) => {
            // only need date part of timestamp
            let c_date = JSON.stringify(comment.createdAt);
            c_date = c_date.substring(1, 11);
            return {
               author: comment.User.username,
               created_at: moment(c_date, 'YYYY-MM-DD').format('MMM DD, YYYY'),
               content: comment.text,
               user_id: comment.user_id
            };
         })
      }
      // we chillin 
      res.render('post-view', { data: res_data });
   } catch (err) {
      console.log(err);
      res.status(500).json(err);
   }
});

// render the post edit page
router.get('/post/edit/:id', async (req, res) => {
   try {
      // only render page if logged in user is author of post
      // also, user must be logged in
      if (req.session.logged_in) {
         const userPosts = await Post.findAll({
            where: {
               user_id: req.session.user_id
            },
            attributes: ['id', 'title', 'content'],
            nest: true,
            raw: true
         });
         // convert array of objects containing id's to array of id's
         const userPostIdArr = userPosts.map((obj) => {
            return "" + obj.id; // converts to string because array.includes tests ===
         });
         // if the user is indeed the author of the post they're trying to edit
         if (userPostIdArr.includes(req.params.id)) {
            const currentPostData = userPosts.find((post) => post.id = req.params.id);
            const res_data = {
               page_title: "Edit: " + currentPostData.title,
               logged_in: req.session.logged_in,
               background_image: req.session.bg_image || 3,
               post: {
                  title: currentPostData.title,
                  content: currentPostData.content
               }
            }
            res.status(400).json({ data: res_data });
            // res.render('post-edit', { data: res_data });
            return;
         }
      }
      res.sendStatus(404);
   } catch (err) {
      console.log(err);
      res.status(500).json(err);
   }
})

module.exports = router;
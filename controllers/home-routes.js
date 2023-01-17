const router = require("express").Router();

// import models
const { Post, User } = require('../../models');

// GET all posts
router.get('/', async (req, res) => {
   try {
      let loggedIn = false; // temp

      if (loggedIn) {
         res.render('homepage', {
            loggedIn: true
         });
      } else {
         res.render('login', {});
      }
   } catch (err) {
      console.log(err);
      res.status(500).json(err);
   }
});
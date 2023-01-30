const router = require("express").Router();

// import models
const { Post, User, Comment } = require('../../models');

// GET all posts
router.get('/', async (req, res) => {
   try {
      let loggedIn = true; // temp



      res.render('homepage', {});
   } catch (err) {
      console.log(err);
      res.status(500).json(err);
   }
});
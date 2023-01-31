const router = require('express').Router();

// import models
const { Post, User, Comment } = require('../../models');

// create a blog post
// body: {
//    title: str
//    content: str('long')
// }
router.post('/', async (req, res) => {
   try {
      const dbPostData = await Post.create({
         title: req.body.title,
         content: req.body.content,
         user_id: req.session.user_id
      });
      res.status(200).json(dbPostData);
   } catch (err) {
      console.log(err);
      res.status(500).json(err);
   }
});

module.exports = router;
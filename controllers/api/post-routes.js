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

// update a blog post
// body: {
//    title: str
//    content: str('long')
// }
router.put('/:id', async (req, res) => {
   try {
      const updatedPostData = await Post.update({
         title: req.body.title,
         content: req.body.content
      }, {
         where: {
            id: req.params.id
         }
      });
      res.status(200).json(updatedPostData);
   } catch (err) {
      console.log(err);
      res.status(500).json(err);
   }
})

module.exports = router;
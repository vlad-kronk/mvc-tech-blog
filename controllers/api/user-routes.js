const router = require('express').Router();
const { User } = require('../../models');

// log in
// body: {
//    username: str
//    password: str
// }
router.post('/login', async (req, res) => {
   try {
      // look for the user with the given username in db
      const dbUserData = await User.findOne({
         where: {
            username: req.body.username
         }
      });
      // if db did not contain a user with the given username
      if (!dbUserData) {
         res.status(400).json({ message: 'Incorrect username.' });
         return;
      }
      // call user instance method to check password using bcrypt
      const passwordIsValid = await dbUserData.checkPassword(req.body.password);
      // if check password method returned false
      if (!passwordIsValid) {
         res.status(400).json({ message: 'Incorrect password.' });
         return;
      }
      // if code makes it to this point, user has successfully logged in
      req.session.save(() => {
         req.session.logged_in = true; // used by browser to mark user as logged in
         req.session.user_id = dbUserData.id;
         req.session.username = dbUserData.username;
         req.session.bg_image = dbUserData.background_image;
         res.status(200).json({ user: dbUserData, message: "You are now logged in." });
      });
   } catch (err) {
      console.log(err);
      res.status(500).json(err);
   }
});

// log out
// body: n/a
router.post('/logout', async (req, res) => {
   // if the user is logged in
   if (req.session.logged_in) {
      // destroy the session
      req.session.destroy(() => {
         res.status(204).end();
      });
   } else {
      res.status(404).end();
   }
})

// sign up
// body: {
//    name: str
//    username: str
//    password: str
// }
router.post('/signup', async (req, res) => {
   try {
      // create a user with the info provided in the request body
      const dbUserData = await User.create({
         name: req.body.name,
         username: req.body.username,
         password: req.body.password
      });
      // log in as the newly created user and save the session
      req.session.save(() => {
         req.session.logged_in = true; // used by browser to mark user as logged in
         req.session.user_id = dbUserData.id;
         req.session.username = dbUserData.username;
         req.session.bg_image = 3;
         res.status(200).json({ user: dbUserData, message: "Signed up and logged in." });
      });
   } catch (err) {
      console.log(err);
      res.status(500).json(err);
   }
});

module.exports = router;
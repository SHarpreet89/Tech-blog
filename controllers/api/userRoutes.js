const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
  try {
    console.log('Attempting to create new user:', req.body.username);  // Log when
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.logged_in = true;

      console.log('New user created:', userData.username);  // Log when a new user is created

      res.status(200).json(userData);
    });
  } catch (err) {
    console.error('Error creating new user:', err);  // Log error if user creation fails
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { username: req.body.username },
    });

    if (!userData) {
      console.log('User not found:', req.body.username);  // Log if user is not found
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      console.log('Invalid password for user:', req.body.username);  // Log if password is invalid
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.logged_in = true;

      console.log('User logged in successfully:', userData.username);  // Log when user logs in successfully

      res.status(200).json({
        userData,
        message: 'You are now logged in!',
      });
    });
  } catch (err) {
    console.error('Login error:', err);  // Log error during login
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    // Log the username before the session is destroyed
    console.log('User logged out:', req.session.username);

    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;

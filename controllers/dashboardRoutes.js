const router = require('express').Router();
const { Blogpost } = require('../models');  // Update this to Blogpost
const { withGuard } = require('../utils/authGuard');

router.get('/', withGuard, async (req, res) => {
  try {
    console.log('Getting all posts for user:', req.session.user_id);

    const postData = await Blogpost.findAll({
      where: {
        user_id: req.session.user_id, // Sequelize maps this to user_id
      },
    });

    console.log('Raw post data:', postData);  // Log the raw result from Sequelize

    if (postData.length === 0) {
      console.log('No posts found for user:', req.session.user_id);
    }

    const posts = postData.map((post) => post.get({ plain: true }));
    console.log('Mapped posts:', posts);  // Log the mapped posts

    res.render('dashboard', {
      dashboard: true,
      posts,
      loggedIn: req.session.logged_in,
    });
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).json(err);
  }
});

router.get('/new', withGuard, (req, res) => {
  res.render('newPost', {
    dashboard: true,
    loggedIn: req.session.logged_in,
  });
});

router.get('/edit/:id', withGuard, async (req, res) => {
  try {
    const postData = await Blogpost.findByPk(req.params.id);  // Update Post to Blogpost

    if (postData) {
      const post = postData.get({ plain: true });

      res.render('editPost', {
        dashboard: true,
        post,
        loggedIn: req.session.logged_in,
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

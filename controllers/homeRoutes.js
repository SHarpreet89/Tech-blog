const router = require('express').Router();
const { Blogpost, Comment, User } = require('../models/');
const { withGuard, withoutGuard } = require('../utils/authGuard');

router.get('/', async (req, res) => {
  try {
    const blogData = await Blogpost.findAll({
      include: [User],
    });

    const blogposts = blogData.map((post) => post.get({ plain: true }));

    res.render('home', { blogposts, loggedIn: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
  try {
    const blogData = await Blogpost.findByPk(req.params.id, {
      include: [
        User,
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    if (blogData) {
      const blogpost = blogData.get({ plain: true });

      res.render('post', { blogpost, loggedIn: req.session.logged_in });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', withoutGuard, (req, res) => {
  try {
    res.render('login');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/signup', withoutGuard, (req, res) => {
  try {
    res.render('signup');
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

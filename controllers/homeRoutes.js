const router = require('express').Router();
const { Blogpost, Comment, User } = require('../models/');
const { withGuard, withoutGuard } = require('../utils/authGuard');

router.get('/', async (req, res) => {
  try {
    const blogData = await Blogpost.findAll({
      include: [User],
    });

    const Blogposts = blogData.map((post) => post.get({ plain: true }));

    console.log('Found blog posts:', Blogposts);  // Log the found blog posts

    res.render('home', { Blogposts, loggedIn: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get('/post/:id', async (req, res) => {
  try {
    const blogData = await Blogpost.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          include: [User],
        },
        User,
      ],
    });

    if (blogData) {
      const Blogpost = blogData.get({ plain: true });

      console.log('Blogpost data:', Blogpost); // Log to check data

      res.render('post', { Blogpost, loggedIn: req.session.logged_in });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    console.error('Error fetching blog post:', err);
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

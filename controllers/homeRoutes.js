const router = require('express').Router();
const { blogpost, Comment, User } = require('../models/');
const { withGuard, withoutGuard } = require('../utils/authGuard');

router.get('/', async (req, res) => {
  try {
    const blogData = await blogpost.findAll({
      include: [User],
    });

    const blogposts = blogData.map((post) => post.get({ plain: true }));

    console.log('Found blog posts:', blogposts);  // Log the found blog posts

    res.render('home', { blogposts, loggedIn: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get('/post/:id', async (req, res) => {
  try {
    const blogData = await blogpost.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          include: [User],
        },
        User,
      ],
    });

    if (blogData) {
      const blogpost = blogData.get({ plain: true });

      console.log('blogpost data:', blogpost); // Log to check data

      res.render('post', { blogpost, loggedIn: req.session.logged_in });
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

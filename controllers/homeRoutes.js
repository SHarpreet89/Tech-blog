const router = require('express').Router();
const { BlogPost, User } = require('../models');
const withAuth = require('../utils/auth');

// Route to render the home page and display all blog posts
router.get('/', async (req, res) => {
  try {
    // Get all blog posts and JOIN with user data
    const blogPostData = await BlogPost.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = blogPostData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into the homepage template
    res.render('homepage', { 
      posts, 
      logged_in: req.session.logged_in // Send login status to template
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to view a specific blog post by its ID (requires login for commenting)
router.get('/blogpost/:id', withAuth, async (req, res) => {
  try {
    // Find the blog post by its primary key
    const blogPostData = await BlogPost.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        // Optionally include comments or other related data
      ],
    });

    // Serialize the data so the template can read it
    const blogPost = blogPostData.get({ plain: true });

    // Render the blog post template
    res.render('blogpost', {
      ...blogPost,
      logged_in: req.session.logged_in // Send login status to template
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to render the login page
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect them to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  // Render the login template
  res.render('login');
});

// Route to render the dashboard (requires login)
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Fetch user-specific blog posts for the dashboard
    const blogPostData = await BlogPost.findAll({
      where: { user_id: req.session.user_id },
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const posts = blogPostData.map((post) => post.get({ plain: true }));

    // Render the dashboard template
    res.render('dashboard', {
      posts, 
      logged_in: true // Pass the logged_in flag to the dashboard template
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

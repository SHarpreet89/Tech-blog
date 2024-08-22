const router = require('express').Router();
const { Comment } = require('../../models/');
const { apiGuard } = require('../../utils/authGuard');

router.post('/', apiGuard, async (req, res) => {
  try {
    console.log('New comment being added:', req.body); // Log to check what is being passed
    const newComment = await Comment.create({
      comment_text: req.body.comment_text,
      post_id: req.body.postId, 
      user_id: req.session.user_id,
    });

    console.log('Comment successfully added to the database:', newComment);
    res.json(newComment);
  } catch (err) {
    console.error('Error adding comment:', err);
    res.status(500).json(err);
  }
});

module.exports = router;

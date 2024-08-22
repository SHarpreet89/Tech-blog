const router = require('express').Router();
const { Comment } = require('../../models/');
const { apiGuard } = require('../../utils/authGuard');

router.post('/', apiGuard, async (req, res) => {
  try {
    console.log('New comment being added:', req.body); // Log to check what is being passed
    const newComment = await Comment.create({
      comment_text: req.body.comment_text,
      blogpost_id: req.body.postId, 
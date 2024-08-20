const BlogPost = require('./BlogPost');
const Comment = require('./Comment');
const User = require('./User');

// Define associations
BlogPost.hasMany(Comment, {
  foreignKey: 'blogpost_id',
  onDelete: 'CASCADE',
});

Comment.belongsTo(BlogPost, {
  foreignKey: 'blogpost_id',
});

User.hasMany(BlogPost, {
  foreignKey: 'user_id',
});

BlogPost.belongsTo(User, {
  foreignKey: 'user_id',
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = { BlogPost, Comment, User };

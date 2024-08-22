const blogpost = require('./blogpost');
const Comment = require('./Comment');
const User = require('./User');

// Define associations
blogpost.hasMany(Comment, {
  foreignKey: 'blogpost_id',
  onDelete: 'CASCADE',
});

Comment.belongsTo(blogpost, {
  foreignKey: 'blogpost_id',
});

User.hasMany(blogpost, {
  foreignKey: 'user_id',
});

blogpost.belongsTo(User, {
  foreignKey: 'user_id',
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = { blogpost, Comment, User };

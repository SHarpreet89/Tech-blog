const Blogpost = require('./Blogpost');
const Comment = require('./Comment');
const User = require('./User');

// Define associations
Blogpost.hasMany(Comment, {
  foreignKey: 'blogpost_id',
  onDelete: 'CASCADE',
});

Comment.belongsTo(Blogpost, {
  foreignKey: 'blogpost_id',
});

User.hasMany(Blogpost, {
  foreignKey: 'user_id',
});

Blogpost.belongsTo(User, {
  foreignKey: 'user_id',
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = { Blogpost, Comment, User };

const User = require('./User');
const Post = require('./Post');

module.exports = { User, Post };

Post.belongsTo(User, {
    foreignKey: 'user_id',
});
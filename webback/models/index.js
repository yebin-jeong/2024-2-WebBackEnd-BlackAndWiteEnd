const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const User = require('./user');
const Post = require('./post');
const Hashtag = require('./hashtag');
const Restaurant = require('./restaurant');

const db = {};
const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.User = User;
db.Post = Post;
db.Hashtag = Hashtag;
db.Restaurant = Restaurant;

User.init(sequelize);
Post.init(sequelize);
Hashtag.init(sequelize);
Restaurant.init(sequelize);

User.associate(db);
Post.associate(db);
Hashtag.associate(db);
Restaurant.associate(db);

module.exports = db;
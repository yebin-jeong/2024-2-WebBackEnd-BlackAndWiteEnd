const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const User = require('./user');
const Review = require('./review');
const Restaurant = require('./restaurant');

const db = {};
const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.User = User;
db.Review = Review;
db.Restaurant = Restaurant;

User.init(sequelize);
Review.init(sequelize);
Restaurant.init(sequelize);

User.associate(db);
Review.associate(db);
Restaurant.associate(db);

module.exports = db;
const express = require('express');
const {isLoggedIn, isNotLoggedIn} = require('../middlewares');
const {renderProfile, renderJoin, renderMain, renderLogin} = require('../controllers/page');

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user;
  // res.locals.followerCount = 0;
  // res.locals.followingCount = 0;
  // res.locals.followerIdList = [];
  next();
});

router.get('/profile', isLoggedIn,renderProfile);
router.get('/join', isNotLoggedIn, renderJoin);
router.get('/', renderMain);
router.get('/login',isNotLoggedIn, renderLogin);

module.exports = router;
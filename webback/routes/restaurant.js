const express = require('express');
const {renderResList, renderDetail} = require('../controllers/restaurant');
const restaurantController = require('../controllers/restaurant');
const router = express.Router();
const {isLoggedIn} = require('../middlewares');


router.get('/:district', renderResList);
router.get('/res/:id',renderDetail);
router.post('/res/:id',isLoggedIn, restaurantController.post);

module.exports = router;
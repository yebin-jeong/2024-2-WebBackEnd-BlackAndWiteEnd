const express = require('express');
const {renderResList, renderDetail} = require('../controllers/restaurant');
const restaurantController = require('../controllers/restaurant');
const router = express.Router();
const {isLoggedIn} = require('../middlewares');


// router.get('/dongguk', isLoggedIn, restaurantController.renderDongguk);
// router.get('/chungmuro', restaurantController.renderChungmuro);
// router.get('/:id', restaurantController.renderDetail); //음식점 상세 조회
// router.post('/:id', isLoggedIn, restaurantController.post);  // 리뷰 등록

router.get('/dongguk', restaurantController.renderDongguk);
router.get('/chungmuro', restaurantController.renderChungmuro);

router.route('/:id')
    .get(restaurantController.renderDetail)   // 음식점 상세 조회
    .post(isLoggedIn, restaurantController.post);  // 리뷰 등록

router.get('/:district', renderResList);
router.get('/res/:id',renderDetail);

module.exports = router;
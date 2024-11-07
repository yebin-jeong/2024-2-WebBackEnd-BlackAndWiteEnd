const express = require('express');
const {renderDongguk, renderChungmuro, renderDetail} = require('../controllers/restaurant');
const router = express.Router();



router.get('/dongguk', renderDongguk);
router.get('/chungmuro', renderChungmuro);
router.get('/:id',renderDetail);
module.exports = router;
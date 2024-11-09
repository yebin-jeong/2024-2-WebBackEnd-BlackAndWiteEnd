const express = require('express');
const {renderResList, renderDetail} = require('../controllers/restaurant');
const router = express.Router();



router.get('/:district', renderResList);
router.get('/res/:id',renderDetail);
module.exports = router;
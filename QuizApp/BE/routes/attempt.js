const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const attemptCtrl = require('../controllers/attempt');

router.post('/', protect, attemptCtrl.createAttempt);
router.get('/my', protect, attemptCtrl.myAttempts);

module.exports = router;

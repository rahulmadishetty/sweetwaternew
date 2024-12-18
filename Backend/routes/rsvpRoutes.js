const express = require('express');
const { rsvpToEvent, getRSVPsByEvent } = require('../controllers/rsvpController');
const router = express.Router();

router.post('/', rsvpToEvent);
router.get('/:eventId', getRSVPsByEvent);

module.exports = router;

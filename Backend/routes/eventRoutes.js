const express = require('express');
const {
    getAllEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent,
    getEventAttendees,
} = require('../controllers/eventController');
const router = express.Router();

router.get('/', getAllEvents);
router.get('/:id', getEventById);

router.post('/', createEvent);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);
router.get('/:id/attendees', getEventAttendees);

module.exports = router;

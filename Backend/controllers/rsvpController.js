const RSVP = require('../models/RSVP');
const Event = require('../models/Event');

// RSVP to an event
exports.rsvpToEvent = async (req, res) => {
    try {
        const { userId, eventId, status } = req.body;

        const event = await Event.findById(eventId);
        if (!event) return res.status(404).json({ message: 'Event not found' });

        const rsvp = await RSVP.findOneAndUpdate(
            { user: userId, event: eventId },
            { status },
            { new: true, upsert: true }
        );

        if (status === 'going' && !event.attendees.includes(userId)) {
            event.attendees.push(userId);
            await event.save();
        }

        res.status(200).json(rsvp);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get RSVPs for an event
exports.getRSVPsByEvent = async (req, res) => {
    try {
        const rsvps = await RSVP.find({ event: req.params.eventId }).populate('user', 'name email');
        res.status(200).json(rsvps);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

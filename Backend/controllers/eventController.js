const Event = require('../models/Event');
const User = require('../models/User');

// all events
exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.find().populate('createdBy', 'name email');
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id).populate('createdBy', 'name email');
        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createEvent = async (req, res) => {
    try {
        const event = await Event.create({ ...req.body, createdBy: req.user.id });
        res.status(201).json(event);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get attendees
exports.getEventAttendees = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id).populate('attendees', 'name email');
        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.status(200).json(event.attendees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

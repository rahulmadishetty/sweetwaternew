const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Event = require('./models/Event');
const RSVP = require('./models/RSVP');
const Feedback = require('./models/Feedback');

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Connected');
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

// Users data
const users = [
    { name: 'Rahul Madishetty', email: 'rahulmadishetty96@pfw.edu', password: 'admin123', role: 'admin' },
    { name: 'Alice Johnson', email: 'alice.johnson@pfw.edu', password: 'password123', role: 'student' },
    { name: 'Bob Smith', email: 'bob.smith@sf.edu', password: 'password123', role: 'student' },
    { name: 'Charlie Brown', email: 'charlie.brown@pfw.edu', password: 'password123', role: 'student' },
    { name: 'Diana Prince', email: 'diana.prince@sf.edu', password: 'password123', role: 'student' },
    { name: 'Evan Green', email: 'evan.green@pfw.edu', password: 'password123', role: 'student' },
    { name: 'Fiona White', email: 'fiona.white@sf.edu', password: 'password123', role: 'student' },
    { name: 'George Harris', email: 'george.harris@pfw.edu', password: 'password123', role: 'student' },
    { name: 'Hannah Black', email: 'hannah.black@sf.edu', password: 'password123', role: 'student' },
    { name: 'Ian Scott', email: 'ian.scott@pfw.edu', password: 'password123', role: 'student' },
];

// Events data with `img` field
const events = [
    {
        title: "Sound Explorers: Hands-On Music Technology Workshp",
        description: "Dive into the world of music production and technology in this interactive workshop. Students will learn the basics of recording, mixing, and editing sound using industry-standard equipment. No prior experience is required—just bring your creativity and curiosity!",
        location: "Sweetwater Sound Headquarters, Fort Wayne, IN",
        date: new Date("2024-07-10"),
        time: "1:00 PM - 4:00 PM",
        img: "/assets/images/Event.jpg",
        createdBy: null,
    },
    {
        title: "Careers in Music: Pathways to Success",
        description: "This seminar connects students with industry professionals to explore the diverse career opportunities in music. From production and performance to business and tech, attendees will gain valuable insights and practical advice to kickstart their journey in the music industry.",
        location: "Sweetwater Sound Headquarters, Fort Wayne, IN",
        date: new Date("2024-08-12"),
        time: "10:00 AM - 12:00 PM",
        img: "/assets/images/Event2.png",
        createdBy: null,
    },
    {
        title: "Sweetwater GuitarFest",
        description: "The largest music gear event of the year, featuring guitar demos, workshops, and live performances.",
        location: "Sweetwater Sound Headquarters, Fort Wayne, IN",
        date: new Date("2024-07-15"),
        time: "10:00 AM - 6:00 PM",
        img: "/assets/images/Event3.jpg",
        createdBy: null,
    },
];

// RSVP and Feedback arrays
const rsvps = [];
const feedbacks = [];

// Seed function
const seedDB = async () => {
    try {
        // Clear existing data
        await User.deleteMany();
        await Event.deleteMany();
        await RSVP.deleteMany();
        await Feedback.deleteMany();
        console.log('Existing data cleared.');

        // Hash passwords and insert users
        const hashedUsers = await Promise.all(
            users.map(async (user) => {
                const hashedPassword = await bcrypt.hash(user.password, 10);
                return { ...user, password: hashedPassword };
            })
        );
        const createdUsers = await User.insertMany(hashedUsers);
        console.log('Users added.');

        // Assign Admin as the creator for events
        events.forEach((event) => {
            event.createdBy = createdUsers[0]._id; // Admin user
        });

        // Insert Events
        const createdEvents = await Event.insertMany(events);
        console.log('Events added.');

        // Generate RSVPs and Feedbacks
        const rsvpStatuses = ['going', 'not going', 'maybe'];
        const feedbackComments = [
            'Amazing event!',
            'Had a great time.',
            'Could have been better.',
            'Loved the atmosphere!',
            'Very informative session.',
        ];

        createdUsers.slice(1).forEach((user, index) => {
            const event = createdEvents[index % createdEvents.length];

            rsvps.push({
                user: user._id,
                event: event._id,
                status: rsvpStatuses[Math.floor(Math.random() * rsvpStatuses.length)],
            });

            feedbacks.push({
                user: user._id,
                event: event._id,
                comments: feedbackComments[Math.floor(Math.random() * feedbackComments.length)],
                rating: Math.floor(Math.random() * 5) + 1,
            });
        });

        // Insert RSVPs and Feedbacks
        await RSVP.insertMany(rsvps);
        console.log('RSVPs added.');

        await Feedback.insertMany(feedbacks);
        console.log('Feedbacks added.');

        console.log('Database successfully seeded!');
        process.exit();
    } catch (error) {
        console.error(`Error seeding database: ${error.message}`);
        process.exit(1);
    }
};

connectDB().then(() => seedDB());

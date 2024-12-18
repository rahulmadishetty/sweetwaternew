import React from 'react';

const events = [
  {
    id: 1,
    title: 'Sweetwater GuitarFest',
    description:
      'The largest music gear event of the year, featuring guitar demos, workshops, and live performances.',
    img: '/assets/images/GuitarFest.png',
    location: 'Sweetwater Sound Headquarters, Fort Wayne, IN',
    date: 'July 15, 2024',
    time: '10:00 AM - 6:00 PM',
  },
  {
    id: 2,
    title: 'Sweetwater Virtual GearFest',
    description:
      'A virtual experience bringing Sweetwater GearFest to you, with exclusive deals and online workshops.',
    img: '/assets/images/eventImg2.png',
    location: 'Online Event',
    date: 'August 5, 2024',
    time: '9:00 AM - 5:00 PM',
  },
  {
    id: 3,
    title: 'Sweetwater Education Series',
    description:
      'Monthly workshops and live streams on music production, sound engineering, and more, led by industry experts.',
    img: '/assets/images/eventImg3.png',
    location: 'Online Event',
    date: 'Every 1st Monday of the Month',
    time: '6:00 PM - 8:00 PM',
  },
  {
    id: 4,
    title: 'Sweetwater Summer Jam',
    description:
      'A casual event where musicians and gear enthusiasts gather for jam sessions, gear testing, and fun.',
    img: '/assets/images/eventImg4.png',
    location: 'Sweetwater Sound Headquarters, Fort Wayne, IN',
    date: 'June 30, 2024',
    time: '3:00 PM - 8:00 PM',
  },
  {
    id: 5,
    title: 'Sweetwater Studio Sessions',
    description:
      'Exclusive studio tours and product demonstrations, showcasing Sweetwater’s recording and live sound gear.',
    img: '/assets/images/eventImg5.png',
    location: 'Sweetwater Sound Headquarters, Fort Wayne, IN',
    date: 'July 10, 2024',
    time: '1:00 PM - 4:00 PM',
  },
  {
    id: 6,
    title: 'Sweetwater Pro Audio Meetups',
    description:
      'Networking and educational events for pro audio engineers, producers, and musicians in the Sweetwater community.',
    img: '/assets/images/eventImg6.png',
    location: 'Sweetwater Sound Headquarters, Fort Wayne, IN',
    date: 'August 20, 2024',
    time: '5:00 PM - 9:00 PM',
  },
];

const Gallery: React.FC = () => {
  return (
    <section className="bg-background py-16" id="gallery">
      <div className="container max-w-6xl mx-auto px-8">
        <h2 className="text-5xl font-bold text-center text-primary mb-12">Event Gallery</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col"
            >
              <img
                src={event.img}
                alt={event.title}
                className="w-full h-64 object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;

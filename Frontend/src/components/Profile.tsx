import React, { useEffect, useState } from 'react';

interface ProfileProps {
  user: {
    name: string;
    email: string;
    memberSince: string; // Date the user registered
  };
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  const [rsvpedEvents, setRsvpedEvents] = useState<string[]>([]);

  useEffect(() => {
    // Get RSVP'd events from local storage
    const savedRsvpedEvents = JSON.parse(localStorage.getItem('rsvpedEvents') || '[]');
    setRsvpedEvents(savedRsvpedEvents);
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full">
      <h2 className="text-2xl font-semibold text-gray-900">Profile</h2>
      <div className="mt-4">
        <div className="mb-2">
          <span className="font-medium text-gray-700">Name: </span>
          <span>{user.name}</span>
        </div>
        <div className="mb-2">
          <span className="font-medium text-gray-700">Email: </span>
          <span>{user.email}</span>
        </div>
        <div className="mb-4">
          <span className="font-medium text-gray-700">Member Since: </span>
          <span>{user.memberSince}</span>
        </div>

        <div className="mb-4">
          <h3 className="font-medium text-gray-700">RSVP'd Events:</h3>
          {rsvpedEvents.length > 0 ? (
            <ul className="mt-2">
              {rsvpedEvents.map((event, index) => (
                <li key={index} className="text-gray-600">
                  {event}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No events RSVP'd yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

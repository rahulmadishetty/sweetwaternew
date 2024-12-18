import React, { useState, useEffect } from 'react';
import Divider from './Divider';
import api from '../config/api';

interface ProductProps {
  isAdmin: boolean; // Prop to check if the user is an admin
}

const Product: React.FC<ProductProps> = ({ isAdmin }) => {
  const [items, setItems] = useState<any[]>([]); // Manage events dynamically
  const [rsvpStatus, setRsvpStatus] = useState<{ [key: string]: boolean }>({});
  const [notification, setNotification] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null); // State for the selected event
  const [modalOpen, setModalOpen] = useState<boolean>(false); // State for modal visibility

  // State for the add/edit event modal
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    img: '',
    location: '',
    date: '',
    time: '',
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null); // For showing image preview

  // Fetch events dynamically from the API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get('/events');
        setItems(response.data); // Set fetched events dynamically
      } catch (error) {
        console.error('Error fetching events:', error);
        setNotification('Failed to load events. Please try again later.');
      }
    };
    fetchEvents();
  }, []);

  const handleRsvp = (title: string) => {
    const newStatus = !rsvpStatus[title];
    setRsvpStatus((prevState) => ({
      ...prevState,
      [title]: newStatus,
    }));

    const action = newStatus ? 'RSVPed' : 'canceled RSVP';
    setNotification(`You have ${action} for ${title}`);

    // Hide notification after 3 seconds
    setTimeout(() => setNotification(null), 3000);
  };

  // Handle event creation with form input
  const handleAddEvent = () => {
    setNewEvent({
      title: '',
      description: '',
      img: '',
      location: '',
      date: '',
      time: '',
    });
    setImagePreview(null);
    setSelectedEvent(null); // Clear selected event for adding new event
    setModalOpen(true);
  };

  // Handle event edit (fill form with event data)
  const handleEditEvent = (event: any) => {
    setNewEvent({
      title: event.title,
      description: event.description,
      img: event.img,
      location: event.location,
      date: event.date,
      time: event.time,
    });
    setImagePreview(event.img);
    setSelectedEvent(event); // Set the event as the selected one to edit
    setModalOpen(true);
  };

  // Handle image upload and preview
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewEvent((prevState) => ({ ...prevState, img: reader.result as string }));
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle saving the new or edited event
  const handleSaveEvent = () => {
    if (!newEvent.title || !newEvent.description || !newEvent.img || !newEvent.location || !newEvent.date || !newEvent.time) {
      setNotification('Please provide all event details');
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    if (selectedEvent) {
      // Edit existing event (update by ID)
      const updatedItems = items.map((item) =>
        item._id === selectedEvent._id ? { ...item, ...newEvent } : item
      );
      setItems(updatedItems);
    } else {
      // Add new event
      const newEventData = {
        _id: `${items.length + 1}`, // Assuming unique IDs
        ...newEvent,
      };
      setItems([...items, newEventData]);
    }

    setModalOpen(false);
    setNewEvent({ title: '', description: '', img: '', location: '', date: '', time: '' });
    setImagePreview(null);
  };

  // Handle event deletion
  const handleDeleteEvent = (index: number) => {
    const filteredItems = items.filter((_, i) => i !== index);
    setItems(filteredItems);
  };

  // Function to open the modal and set the selected event
  const openModal = (event: any) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <section className="bg-background py-8" id="product">
      <div className="container max-w-5xl mx-auto m-8">
        {notification && (
          <div className="fixed top-5 right-5 bg-black text-white px-4 py-2 rounded shadow-lg z-50">
            {notification}
          </div>
        )}
        <h1 className="w-full my-2 text-5xl font-bold leading-tight text-center text-primary">
          Events
        </h1>
        <Divider />

        {isAdmin && (
          <div className="mb-6 flex justify-end">
            <button
              onClick={handleAddEvent}
              className="px-6 py-2 text-white bg-green-500 hover:bg-green-600 rounded-md"
            >
              Add Event
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <div
              key={item._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col cursor-pointer"
              onClick={() => openModal(item)} // Open modal when event is clicked
            >
              <img
                className="w-full h-64 object-cover"
                src={item.img}
                alt={item.title}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent the modal from opening when the image is clicked in admin mode
                  handleEditEvent(item); // Open modal for editing the event in admin mode
                }}
              />
              <div className="p-6 flex flex-col justify-between flex-grow">
                <h3 className="text-2xl font-semibold text-center text-gray-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-left mb-4">{item.description}</p>

                {/* Button in the bottom left corner */}
                <div className="flex justify-start mt-auto">
                  <button
                    className="px-4 py-1 text-sm text-white bg-primary hover:bg-primary-dark rounded-md"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent opening modal when clicking the RSVP button
                      handleRsvp(item.title);
                    }}
                  >
                    {rsvpStatus[item.title] ? 'Cancel RSVP' : 'RSVP for Event'}
                  </button>
                </div>

                {isAdmin && (
                  <div className="mt-4 flex space-x-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditEvent(item); // Open modal for editing
                      }}
                      className="px-6 py-2 text-white bg-yellow-500 hover:bg-yellow-600 rounded-md"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteEvent(index); // Delete event
                      }}
                      className="px-6 py-2 text-white bg-red-500 hover:bg-red-600 rounded-md"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Modal for event details or add/edit */}
        {modalOpen && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg w-full sm:w-3/4 lg:w-1/2 relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full"
              >
                X
              </button>

              <div className="flex flex-col items-center">
                {/* Image Display */}
                <img
                  src={imagePreview || newEvent.img}
                  alt={newEvent.title}
                  className="w-full max-h-[500px] object-contain rounded-lg mb-4"
                />
                <h3 className="text-3xl font-bold text-gray-800 mb-4">
                  {isAdmin ? (selectedEvent ? 'Edit Event' : 'Add Event') : 'Event Details'}
                </h3>

                {/* Event Details or Form */}
                {isAdmin ? (
                  <>
                    {/* Admin Form */}
                    <div>
                      <label htmlFor="title" className="block text-gray-600">
                        Title
                      </label>
                      <input
                        type="text"
                        id="title"
                        className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                        value={newEvent.title}
                        onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                      />

                      <label htmlFor="description" className="block text-gray-600">
                        Description
                      </label>
                      <textarea
                        id="description"
                        className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                        value={newEvent.description}
                        onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                      />

                      <label htmlFor="location" className="block text-gray-600">
                        Location
                      </label>
                      <input
                        type="text"
                        id="location"
                        className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                        value={newEvent.location}
                        onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                      />

                      <label htmlFor="date" className="block text-gray-600">
                        Date
                      </label>
                      <input
                        type="date"
                        id="date"
                        className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                        value={newEvent.date}
                        onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                      />

                      <label htmlFor="time" className="block text-gray-600">
                        Time
                      </label>
                      <input
                        type="time"
                        id="time"
                        className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                        value={newEvent.time}
                        onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                      />

                      <label htmlFor="image" className="block text-gray-600">
                        Event Image
                      </label>
                      <input
                        type="file"
                        id="image"
                        className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                        onChange={handleImageUpload}
                      />
                    </div>

                    <div className="flex justify-between">
                      <button
                        onClick={handleSaveEvent}
                        className="px-6 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md"
                      >
                        Save Event
                      </button>
                      <button
                        onClick={closeModal}
                        className="px-6 py-2 text-white bg-gray-500 hover:bg-gray-600 rounded-md"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="text-center">
                    <p className="text-gray-600 text-center mb-4">{selectedEvent?.description}</p>
                    <p className="text-lg font-semibold">Location: {selectedEvent?.location}</p>
                    <p className="text-lg font-semibold">Date: {selectedEvent?.date}</p>
                    <p className="text-lg font-semibold">Time: {selectedEvent?.time}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Product;

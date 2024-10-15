import React, { useState } from 'react';

const LocalEvent = () => {
  const [events, setEvents] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const apiKey = import.meta.env.TICKETMASTER_API_KEY;
  const apiUrl = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&city=New York&locale=*`;

  const fetchEvents = async () => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error(`Error: ${response.status}`);

      const data = await response.json();
      if (data._embedded && data._embedded.events) {
        // Set maximum of 5 events
        const limitedEvents = data._embedded.events.slice(0, 5);
        setEvents(limitedEvents);
        setErrorMessage('');
      } else {
        setErrorMessage('No events found');
        setEvents([]);
      }
    } catch (error) {
      setErrorMessage(`Error fetching events: ${error.message}`);
      setEvents([]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <h1 className="text-3xl font-bold text-center mb-8">Events you can check out</h1>
      <div className="flex justify-center mb-8">
        <button
          className="bg-main hover:bg-secondary text-white font-bold py-2 px-4 rounded"
          onClick={fetchEvents}
        >
          Fetch Events
        </button>
      </div>

      {errorMessage && (
        <p className="text-red-500 text-center mb-4">{errorMessage}</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-lg shadow-md p-6 transition-transform transform hover:scale-105"
          >
            <h2 className="text-xl font-semibold mb-2">{event.name}</h2>
            <p className="text-gray-600 mb-4">
              Date: {new Date(event.dates.start.dateTime).toLocaleString()}
            </p>
            <a
              href={event.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-main hover:text-secondary"
            >
              More Info
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocalEvent;

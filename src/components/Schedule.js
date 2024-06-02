import { useState, useEffect } from "react";
import apiRequest from "../utils/apiRequest";
import { FaCheckCircle } from 'react-icons/fa';

export const Schedule = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('primary');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await apiRequest.get("/events?populate=*", {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API}`,
          },
        });
        console.log("Fetched events:", response.data.data);
        setEvents(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  const primaryEvents = events.filter(
    (event) => event.attributes.event_type === "primary"
  );
  const secondaryEvents = events.filter(
    (event) => event.attributes.event_type === "secondary"
  );
  const pragueEvents = events.filter(
    (event) => event.attributes.event_type === "prague_event"
  );

  const renderEvents = (eventList) => {
    if (eventList.length === 0) {
      return <li className="text-center text-gray-500">No events found.</li>;
    }
    return eventList.map((event, index) => (
      <li key={index} className="relative mb-6">
        <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
        <div className="flex items-center justify-between">
          <div className="w-1/3 text-right pr-4">
            <div className="text-gray-500">{event.attributes.date}</div>
          </div>
          <div className="w-1/12 flex justify-center">
            <FaCheckCircle className="text-green-500 w-5 h-5" />
          </div>
          <div className="w-1/3 bg-white p-4 rounded-lg shadow-md border border-green-500">
            {event.attributes.title}
          </div>
        </div>
      </li>
    ));
  };

  const getActiveEvents = () => {
    switch (activeTab) {
      case 'primary':
        return primaryEvents;
      case 'secondary':
        return secondaryEvents;
      case 'prague':
        return pragueEvents;
      default:
        return primaryEvents;
    }
  };

  return (
    <div className="bg-white p-6">
      <h2 className="text-3xl text-center font-bold text-gray-800 mb-8">Akce</h2>
      <div className="max-w-7xl mx-auto">
        <div role="tablist" className="flex space-x-4 mb-6 justify-center">
          <button
            role="tab"
            className={`px-4 py-2 rounded-lg ${activeTab === 'primary' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-800'} focus:outline-none`}
            onClick={() => setActiveTab('primary')}
          >
            Primary Events
          </button>
          <button
            role="tab"
            className={`px-4 py-2 rounded-lg ${activeTab === 'secondary' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-800'} focus:outline-none`}
            onClick={() => setActiveTab('secondary')}
          >
            Secondary Events
          </button>
          <button
            role="tab"
            className={`px-4 py-2 rounded-lg ${activeTab === 'prague' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-800'} focus:outline-none`}
            onClick={() => setActiveTab('prague')}
          >
            Prague Events
          </button>
        </div>
        <div role="tabpanel" className="tab-content">
          <ul className="timeline timeline-vertical relative">
            {renderEvents(getActiveEvents())}
          </ul>
        </div>
      </div>
    </div>
  );
};

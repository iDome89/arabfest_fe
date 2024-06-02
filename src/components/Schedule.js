import { useState, useEffect } from "react";
import apiRequest from "../utils/apiRequest";
import { FaCheckCircle } from 'react-icons/fa';
import { format } from 'date-fns';

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

  console.log("Events state:", events);
  console.log("Loading state:", loading);

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

  console.log("Primary events:", primaryEvents);
  console.log("Secondary events:", secondaryEvents);
  console.log("Prague events:", pragueEvents);

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return format(date, 'd.M.yyyy - HH:mm');
  };

  const renderEvents = (eventList) => {
    if (eventList.length === 0) {
      console.log("No events found for this category.");
      return <li className="text-center text-gray-500">No events found.</li>;
    }
    return eventList.map((event, index) => {
      console.log("Rendering event:", event);
      return (
        <li key={index} className="relative mb-6 p-4 bg-white rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-500 flex items-center justify-center">
              <FaCheckCircle className="text-white w-5 h-5" />
            </div>
            <div className="ml-4">
              <div className="text-lg font-semibold text-gray-800">{event.attributes.name}</div>
              <div className="text-sm text-gray-500">{formatDateTime(event.attributes.date)}</div>
            </div>
          </div>
        </li>
      );
    });
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
        <div role="tabpanel" className={`${activeTab !== 'primary' ? 'hidden' : ''}`}>
          <ul className="space-y-4">
            {renderEvents(primaryEvents)}
          </ul>
        </div>
        <div role="tabpanel" className={`${activeTab !== 'secondary' ? 'hidden' : ''}`}>
          <ul className="space-y-4">
            {renderEvents(secondaryEvents)}
          </ul>
        </div>
        <div role="tabpanel" className={`${activeTab !== 'prague' ? 'hidden' : ''}`}>
          <ul className="space-y-4">
            {renderEvents(pragueEvents)}
          </ul>
        </div>
      </div>
    </div>
  );
};

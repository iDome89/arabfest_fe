import { useState, useEffect } from "react";
import apiRequest from "../utils/apiRequest";
import { FaCheckCircle } from "react-icons/fa";
import { Speakers } from "./Speakers";
import { format } from "date-fns";
import Locations from "./Locations";

export const Schedule = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("primary");
  const [activeDateTab, setActiveDateTab] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await apiRequest.get("/events?populate=*", {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API}`,
          },
        });
        setEvents(response.data.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const primaryEvents = events.filter(
    (event) => event.attributes.event_type === "primary"
  );
  const secondaryEvents = events.filter(
    (event) => event.attributes.event_type === "secondary"
  );
  const pragueEvents = events.filter(
    (event) => event.attributes.event_type === "prague_event"
  );

  const formatDate = (dateTime) => {
    const date = new Date(dateTime);
    return format(date, "d.M.yyyy");
  };

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return format(date, "d.M.yyyy - HH:mm");
  };

  const groupEventsByDay = (eventList) => {
    const groupedEvents = {};
    eventList.forEach((event) => {
      const date = formatDate(event.attributes.date);
      if (!groupedEvents[date]) {
        groupedEvents[date] = [];
      }
      groupedEvents[date].push(event);
    });
    return groupedEvents;
  };

  const groupedPrimaryEvents = groupEventsByDay(primaryEvents);

  useEffect(() => {
    if (activeTab === "primary" && primaryEvents.length > 0) {
      const firstDate = Object.keys(groupedPrimaryEvents)[0];
      setActiveDateTab(firstDate);
    }
  }, [activeTab, events]);

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  const renderPrimaryEventsForDate = (eventsForDate) => {
    if (!eventsForDate) {
      return (
        <div className="text-center text-gray-500">
          Stále pro vás připravujeme program 15. ročníku
        </div>
      );
    }
    return eventsForDate.map((event, index) => (
      <li
        key={index}
        className="relative mb-6 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
      >
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-600 flex items-center justify-center">
            <FaCheckCircle className="text-white w-5 h-5" />
          </div>
          <div className="ml-4">
            <div className="text-lg font-semibold text-gray-800">
              {event.attributes.name}
            </div>
            <div className="text-sm text-gray-500">
              {formatDateTime(event.attributes.date)}
            </div>
          </div>
        </div>
      </li>
    ));
  };

  const renderSecondaryAndPragueEvents = (eventList) => {
    if (eventList.length === 0) {
      return (
        <div className="text-center text-gray-500">
          Stále pro vás připravujeme program 15. ročníku
        </div>
      );
    }
    return eventList.map((event, index) => (
      <li
        key={index}
        className="relative mb-6 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
      >
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-600 flex items-center justify-center">
            <FaCheckCircle className="text-white w-5 h-5" />
          </div>
          <div className="ml-4">
            <div className="text-lg font-semibold text-gray-800">
              {event.attributes.name}
            </div>
            <div className="text-sm text-gray-500">
              {formatDateTime(event.attributes.date)}
            </div>
          </div>
        </div>
      </li>
    ));
  };

  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl text-center font-bold text-gray-800 mb-8">
        Akce
      </h2>
      <div className="max-w-7xl mx-auto min-h-[300px]">
        <div
          role="tablist"
          className="flex flex-wrap space-x-2 mb-6 justify-center"
        >
          <button
            role="tab"
            className={`px-4 py-2 rounded-lg mb-2 ${
              activeTab === "primary"
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-800"
            } focus:outline-none`}
            onClick={() => setActiveTab("primary")}
          >
            Hlavní Program
          </button>
          <button
            role="tab"
            className={`px-4 py-2 rounded-lg mb-2 ${
              activeTab === "secondary"
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-800"
            } focus:outline-none`}
            onClick={() => setActiveTab("secondary")}
          >
            Doprovodný Program
          </button>
          <button
            role="tab"
            className={`px-4 py-2 rounded-lg mb-2 ${
              activeTab === "prague"
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-800"
            } focus:outline-none`}
            onClick={() => setActiveTab("prague")}
          >
            Akce v Praze
          </button>
        </div>

        {activeTab === "primary" && (
          <div>
            <div
              role="tablist"
              className="flex flex-wrap space-x-2 mb-6 justify-center"
            >
              {Object.keys(groupedPrimaryEvents).map((date) => (
                <button
                  key={date}
                  role="tab"
                  className={`px-4 py-2 rounded-lg mb-2 ${
                    activeDateTab === date
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  } focus:outline-none`}
                  onClick={() => setActiveDateTab(date)}
                >
                  {date}
                </button>
              ))}
            </div>
            <div className="max-w-2xl m-auto" role="tabpanel">
              {activeDateTab ? (
                <ul className="space-y-4">
                  {renderPrimaryEventsForDate(
                    groupedPrimaryEvents[activeDateTab]
                  )}
                </ul>
              ) : (
                <div className="text-center text-gray-500">
                  Stále pro vás připravujeme novinky program 15. ročníku
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "secondary" && (
          <div role="tabpanel" className="max-w-2xl m-auto">
            <ul className="space-y-4">
              {renderSecondaryAndPragueEvents(secondaryEvents)}
            </ul>
          </div>
        )}

        {activeTab === "prague" && (
          <div role="tabpanel">
            <ul className="space-y-4">
              {renderSecondaryAndPragueEvents(pragueEvents)}
            </ul>
          </div>
        )}
      </div>
      <Speakers />
      <Locations />
    </div>
  );
};

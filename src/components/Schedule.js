import { useState, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Speakers } from "./Speakers";
import { format } from "date-fns";
import Locations from "./Locations";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { useGetAll } from "@/features/useGetAll";
import Goout from "@/features/Goout";

export const Schedule = () => {
  const [activeTab, setActiveTab] = useState("primary");
  const [activeDateTab, setActiveDateTab] = useState("");
  const [currentEvent, setCurrentEvent] = useState(null);

  const toggleEvent = (event) => {
    if (currentEvent === event) {
      setCurrentEvent(null);
    } else {
      setCurrentEvent(event);
    }
  };
  const { events, color } = useGetAll();

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
    if (
      activeTab === "primary" &&
      Object.keys(groupedPrimaryEvents).length > 0
    ) {
      // Explicitly convert to dates for proper sorting
      const sortedDates = Object.keys(groupedPrimaryEvents).sort((a, b) => {
        // Parse DD.MM.YYYY format to Date objects
        const [dayA, monthA, yearA] = a.split(".");
        const [dayB, monthB, yearB] = b.split(".");

        // Create Date objects (months are 0-indexed in JS Date)
        const dateA = new Date(yearA, monthA - 1, dayA);
        const dateB = new Date(yearB, monthB - 1, dayB);

        return dateA - dateB;
      });

      setActiveDateTab(sortedDates[0]);
    }
  }, [activeTab, groupedPrimaryEvents]);

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
        onClick={() => toggleEvent(event.id)}
        key={index}
        className=" cursor-pointer relative mb-6 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
      >
        <div className="flex items-start">
          <div
            className="flex-shrink-0 h-10 w-10 rounded-full mt-4 flex items-center justify-center"
            style={{ backgroundColor: color }}
          >
            <FaCheckCircle className="text-white w-5 h-5" />
          </div>
          <div className="ml-4">
            <div className="text-lg font-semibold text-gray-800">
              {event.attributes.name}
            </div>
            <div className="text-sm text-gray-500 letter-spacing-wide">
              {formatDateTime(event.attributes.date)}
            </div>
            {event.attributes.entry_price && (
              <p className="text-sm text-gray-800 font-semibold flex items-center">
                Vstupné: {event.attributes.entry_price}{" "}
                {event.attributes.goout && (
                  <a href={event.attributes.goout}>
                    <Goout />
                  </a>
                )}
              </p>
            )}
            <a
              style={{ color: color }}
              href={event.attributes.location_url ?? ""}
              target="_blank"
            >
              {event.attributes.location}
            </a>

            <div className="relative py-4">
              <ReactMarkdown
                className="prose prose-lg whitespace-pre-line text-gray-800"
                rehypePlugins={[rehypeRaw]}
                remarkPlugins={[remarkGfm, remarkBreaks]}
                components={{
                  a: ({ node, ...props }) => (
                    <a
                      {...props}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    />
                  ),
                }}
              >
                {event.attributes.description}
              </ReactMarkdown>
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
        onClick={() => toggleEvent(event.id)}
        key={index}
        className=" cursor-pointer relative mb-6 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
      >
        <div className="flex items-start">
          <div
            className="flex-shrink-0 h-10 w-10 rounded-full mt-4 flex items-center justify-center"
            style={{ backgroundColor: color }}
          >
            <FaCheckCircle className="text-white w-5 h-5" />
          </div>
          <div className="ml-4">
            <div className="text-lg font-semibold text-gray-800">
              {event.attributes.name}
            </div>
            <div className="text-sm text-gray-500">
              {formatDateTime(event.attributes.date)}
            </div>
            <p className="text-sm text-gray-800 font-semibold">
              Vstupné: {event.attributes.entry_price}
            </p>
            <a
              style={{ color: color }}
              href={event.attributes.location_url ?? ""}
              target="_blank"
            >
              {event.attributes.location}
            </a>

            <div className="relative py-4">
              <ReactMarkdown
                className="prose prose-lg whitespace-pre-line text-gray-800"
                rehypePlugins={[rehypeRaw]}
                remarkPlugins={[remarkGfm, remarkBreaks]}
                components={{
                  a: ({ node, ...props }) => (
                    <a
                      {...props}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    />
                  ),
                }}
              >
                {event.attributes.description}
              </ReactMarkdown>
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
            className={`cursor-pointer px-4 py-2 rounded-lg mb-2 focus:outline-none`}
            style={{
              backgroundColor: activeTab === "primary" ? color : "#E5E7EB",
              color: activeTab === "primary" ? "white" : "#1F2937",
            }}
            onClick={() => setActiveTab("primary")}
          >
            Hlavní program
          </button>
          <button
            role="tab"
            className={`cursor-pointer px-4 py-2 rounded-lg mb-2 focus:outline-none`}
            style={{
              backgroundColor: activeTab === "secondary" ? color : "#E5E7EB",
              color: activeTab === "secondary" ? "white" : "#1F2937",
            }}
            onClick={() => setActiveTab("secondary")}
          >
            Doprovodný program
          </button>
          <button
            role="tab"
            className={`cursor-pointer px-4 py-2 rounded-lg mb-2 focus:outline-none`}
            style={{
              backgroundColor: activeTab === "prague" ? color : "#E5E7EB",
              color: activeTab === "prague" ? "white" : "#1F2937",
            }}
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
              {Object.keys(groupedPrimaryEvents)
                .sort((a, b) => {
                  const [dayA, monthA, yearA] = a.split(".");
                  const [dayB, monthB, yearB] = b.split(".");
                  const dateA = new Date(yearA, monthA - 1, dayA);
                  const dateB = new Date(yearB, monthB - 1, dayB);
                  return dateA - dateB;
                })
                .map((date) => {
                  // Format date with spaces around dots
                  const formattedDate = date.replace(/\./g, ". ");

                  return (
                    <button
                      key={date}
                      role="tab"
                      className="cursor-pointer px-4 py-2 rounded-lg mb-2 focus:outline-none tracking-wider"
                      style={{
                        backgroundColor:
                          activeDateTab === date ? color : "#E5E7EB",
                        color: activeDateTab === date ? "white" : "#1F2937",
                      }}
                      onClick={() => setActiveDateTab(date)}
                    >
                      {formattedDate}
                    </button>
                  );
                })}
            </div>
            <div className="max-w-xl m-auto" role="tabpanel">
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

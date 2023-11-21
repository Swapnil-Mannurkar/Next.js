import EventList from "@/components/events/EventList";
import EventsSearch from "@/components/events/EventsSearch";
import ErrorAlert from "@/components/ui/error-alert";
import { getFilteredEvents } from "@/dummy-data";
import { useRouter } from "next/router";
import React from "react";

const FilteredEventsPage = () => {
  const router = useRouter();
  const filteredData = router.query.slug;

  const findEventsHandler = (year, month) => {
    const pathname = `/events/${year}/${month}`;
    router.push(pathname);
  };

  if (!filteredData) {
    return <p className="center">Loading...</p>;
  }

  const numYear = +filteredData[0];
  const numMonth = +filteredData[1];

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear < 2021 ||
    numYear > 2030 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return (
      <>
        <EventsSearch onSearch={findEventsHandler} />
        <ErrorAlert>
          <p className="center">Inavlid filter. Please adjust your values!</p>
        </ErrorAlert>
      </>
    );
  }

  const filteredEvents = getFilteredEvents({ year: numYear, month: numMonth });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        <EventsSearch onSearch={findEventsHandler} />
        <ErrorAlert>
          <p className="center">No events found!</p>
        </ErrorAlert>
      </>
    );
  }

  return (
    <>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={filteredEvents} />
    </>
  );
};

export default FilteredEventsPage;

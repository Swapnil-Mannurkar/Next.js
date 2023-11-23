import EventList from "@/components/events/EventList";
import EventsSearch from "@/components/events/EventsSearch";
import { useRouter } from "next/router";
import React from "react";

const AllEventsPage = (props) => {
  const events = props.allEvents;
  const router = useRouter();

  const findEventsHandler = (year, month) => {
    const pathname = `/events/${year}/${month}`;
    router.push(pathname);
  };

  return (
    <>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />;
    </>
  );
};

export const getStaticProps = async () => {
  const response = await fetch(
    "https://nextjs-course-3d59e-default-rtdb.firebaseio.com/events.json"
  );
  const data = await response.json();
  const allEvents = [];

  for (const key in data) {
    allEvents.push(data[key]);
  }

  return {
    props: {
      allEvents: allEvents,
    },
  };
};

export default AllEventsPage;

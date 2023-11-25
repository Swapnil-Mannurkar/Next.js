import EventList from "@/components/events/EventList";
import EventsSearch from "@/components/events/EventsSearch";
import { getAllEvents } from "@/helper/api-util";
import { useRouter } from "next/router";
import React from "react";

const AllEventsPage = (props) => {
  const router = useRouter();

  const findEventsHandler = (year, month) => {
    const pathname = `/events/${year}/${month}`;
    router.push(pathname);
  };

  return (
    <>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={props.events} />;
    </>
  );
};

export const getStaticProps = async () => {
  const events = await getAllEvents();

  return { props: { events }, revalidate: 10 };
};

export default AllEventsPage;

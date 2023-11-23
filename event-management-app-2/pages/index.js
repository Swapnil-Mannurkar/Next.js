import EventList from "@/components/events/EventList";
import { getFeaturedEvents } from "@/helper/api-util";
import React from "react";

const HomePage = (props) => {
  return (
    <div>
      <EventList items={props.events} />
    </div>
  );
};

export const getStaticProps = async () => {
  const featuredEvents = await getFeaturedEvents();

  return { props: { events: featuredEvents } };
};

export default HomePage;

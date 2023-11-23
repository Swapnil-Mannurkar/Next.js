import EventList from "@/components/events/EventList";
import React from "react";

const HomePage = (props) => {
  const { featuredEvents } = props;

  return (
    <div>
      <EventList items={featuredEvents} />
    </div>
  );
};

export const getStaticProps = async () => {
  const response = await fetch(
    "https://nextjs-course-3d59e-default-rtdb.firebaseio.com/events.json"
  );
  const data = await response.json();
  const featuredEvents = [];

  for (const key in data) {
    if (data[key].isFeatured) {
      featuredEvents.push(data[key]);
    }
  }

  return {
    props: {
      featuredEvents,
    },
  };
};

export default HomePage;

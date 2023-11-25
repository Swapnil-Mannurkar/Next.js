import React from "react";
import EventLogistics from "@/components/event-detail/event-logistics";
import EventSummary from "@/components/event-detail/event-summary";
import EventContent from "@/components/event-detail/event-content";
import { getEventById, getFeaturedEvents } from "@/helper/api-util";

const EventDetailPage = (props) => {
  const event = props.event;

  if (!event) {
    return (
      <div className="center">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
};

export const getStaticProps = async (context) => {
  const eventId = context.params.eventId;
  const event = await getEventById(eventId);

  return {
    props: { event },
    revalidate: 10,
  };
};

export const getStaticPaths = async () => {
  const allEvents = await getFeaturedEvents();
  const validPaths = allEvents.map((event) => ({
    params: { eventId: event.id },
  }));

  return {
    paths: validPaths,
    fallback: true,
  };
};

export default EventDetailPage;

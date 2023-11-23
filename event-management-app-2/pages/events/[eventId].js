import React from "react";
import EventLogistics from "@/components/event-detail/event-logistics";
import EventSummary from "@/components/event-detail/event-summary";
import EventContent from "@/components/event-detail/event-content";
import ErrorAlert from "@/components/ui/error-alert";

const EventDetailPage = (props) => {
  const event = props.event;

  if (!event) {
    return (
      <ErrorAlert>
        <p>No event found!</p>
      </ErrorAlert>
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

  const response = await fetch(
    "https://nextjs-course-3d59e-default-rtdb.firebaseio.com/events.json"
  );

  const allEvents = await response.json();

  if (!allEvents[eventId]) {
    return {
      props: { event: null },
    };
  }

  return { props: { event: allEvents[eventId] } };
};

export const getStaticPaths = async (context) => {
  const { params, req, res } = context;

  return {
    paths: [],
    fallback: "blocking",
  };
};

export default EventDetailPage;

import EventList from "@/components/events/EventList";
import EventsSearch from "@/components/events/EventsSearch";
import ErrorAlert from "@/components/ui/error-alert";
import { getFilteredEvents } from "@/helper/api-util";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

const FilteredEventsPage = (props) => {
  const router = useRouter();
  const findEventsHandler = (year, month) => {
    const pathname = `/events/${year}/${month}`;
    router.push(pathname);
  };

  const metaTag = (
    <Head>
      <meta name="description" content="This page contains filtered events" />
    </Head>
  );

  if (props.hasError) {
    return (
      <>
        {metaTag}
        <EventsSearch onSearch={findEventsHandler} />
        <ErrorAlert>
          <p className="center">Inavlid filter. Please adjust your values!</p>
        </ErrorAlert>
      </>
    );
  }

  const filteredEvents = props.filteredEvents;

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        {metaTag}
        <EventsSearch onSearch={findEventsHandler} />
        <ErrorAlert>
          <p className="center">No events found!</p>
        </ErrorAlert>
      </>
    );
  }

  return (
    <>
      {metaTag}
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={filteredEvents} />
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { params } = context;
  const filteredData = params.slug;

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
    return {
      props: { hasError: true },
      // notFound: true,
      // redirect: { destination: "/error" },
    };
  }

  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  return {
    props: { filteredEvents },
  };
};

export default FilteredEventsPage;

import EventList from "@/components/events/EventList";
import { getFeaturedEvents } from "@/helper/api-util";
import Head from "next/head";
import React from "react";

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>Next.js Events</title>
        <meta
          name="description"
          content="This is an event scheduling application"
        />
      </Head>
      <div>
        <EventList items={props.events} />
      </div>
    </>
  );
};

export const getStaticProps = async () => {
  const featuredEvents = await getFeaturedEvents();
  return { props: { events: featuredEvents }, revalidate: 10 };
};

export default HomePage;

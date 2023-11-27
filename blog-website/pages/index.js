import React from "react";
import Hero from "../components/home-page/Hero";
import FeaturedPosts from "../components/home-page/FeaturedPosts";

const HomePage = () => {
  const DUMMY_DATA = [
    {
      slug: "getting-started-with-NextJS",
      title: "Getting started with NextJS",
      image: "getting-started-with-nextjs.png",
      date: "2022-02-10",
      excerpt: "NextJS is a React framework for production",
    },
    {
      slug: "getting-started-with-NextJS2",
      title: "Getting started with NextJS",
      image: "getting-started-with-nextjs.png",
      date: "2022-02-10",
      excerpt: "NextJS is a React framework for production",
    },
    {
      slug: "getting-started-with-NextJS3",
      title: "Getting started with NextJS",
      image: "getting-started-with-nextjs.png",
      date: "2022-02-10",
      excerpt: "NextJS is a React framework for production",
    },
    {
      slug: "getting-started-with-NextJS4",
      title: "Getting started with NextJS",
      image: "getting-started-with-nextjs.png",
      date: "2022-02-10",
      excerpt: "NextJS is a React framework for production",
    },
  ];

  return (
    <>
      <Hero />
      <FeaturedPosts posts={DUMMY_DATA} />
    </>
  );
};

export default HomePage;

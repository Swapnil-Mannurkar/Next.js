import React from "react";
import Head from "next/head";
import Hero from "../components/home-page/Hero";
import FeaturedPosts from "../components/home-page/FeaturedPosts";
import { getFeaturedPosts } from "../lib/posts-util";

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>Swapnil's Blog</title>
        <meta
          name="description"
          content="I post about programming and web development"
        />
      </Head>
      <Hero />
      <FeaturedPosts posts={props.posts} />
    </>
  );
};

export const getStaticProps = () => {
  const featuredPosts = getFeaturedPosts();

  return {
    props: { posts: featuredPosts },
  };
};

export default HomePage;

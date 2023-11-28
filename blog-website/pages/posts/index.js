import React from "react";
import Head from "next/head";
import AllPosts from "../../components/posts/AllPosts";
import { getAllPosts } from "../../lib/posts-util";

const AllPostPage = (props) => {
  return (
    <>
      <Head>
        <title>All posts</title>
        <meta name="description" content="list of all posts" />
      </Head>
      <AllPosts posts={props.posts} />;
    </>
  );
};

export const getStaticProps = () => {
  const allPosts = getAllPosts();

  return {
    props: { posts: allPosts },
  };
};

export default AllPostPage;

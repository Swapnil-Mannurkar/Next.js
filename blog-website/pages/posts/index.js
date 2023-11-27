import React from "react";
import AllPosts from "../../components/posts/AllPosts";
import { getAllPosts } from "../../lib/posts-util";

const AllPostPage = (props) => {
  return <AllPosts posts={props.posts} />;
};

export const getStaticProps = () => {
  const allPosts = getAllPosts();

  return {
    props: { posts: allPosts },
  };
};

export default AllPostPage;

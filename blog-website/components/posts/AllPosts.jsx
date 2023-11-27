import React from "react";
import styles from "./AllPosts.module.css";
import PostsGrids from "./PostsGrids";

const AllPosts = (props) => {
  return (
    <section className={styles.posts}>
      <h1>All Posts</h1>
      <PostsGrids posts={props.posts} />
    </section>
  );
};

export default AllPosts;

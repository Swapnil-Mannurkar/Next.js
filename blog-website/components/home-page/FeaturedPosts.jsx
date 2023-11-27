import React from "react";
import styles from "./FeaturedPosts.module.css";
import PostsGrids from "../posts/PostsGrids";

const FeaturedPosts = (props) => {
  return (
    <section className={styles.latest}>
      <h2>Featured Posts</h2>
      <PostsGrids posts={props.posts} />
    </section>
  );
};

export default FeaturedPosts;

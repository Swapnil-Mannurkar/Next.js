import React from "react";
import styles from "./PostContent.module.css";
import PostHeader from "./PostHeader";
import ReactMarkdown from "react-markdown";

const PostContent = (props) => {
  const { post } = props;
  const title = post.title;
  const imagePath = `/images/posts/${post.slug}/${post.image}`;
  const content = post.content;

  return (
    <article className={styles.content}>
      <PostHeader title={title} image={imagePath} />
      <ReactMarkdown>{content}</ReactMarkdown>
    </article>
  );
};

export default PostContent;

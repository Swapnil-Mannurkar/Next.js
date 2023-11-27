import React from "react";
import styles from "./PostContent.module.css";
import PostHeader from "./PostHeader";
import ReactMarkdown from "react-markdown";

const DUMMY_DATA = {
  slug: "getting-started-with-nextJS",
  title: "Getting started with NextJS",
  image: "getting-started-with-nextjs.png",
  date: "2022-02-10",
  content: "# This is a post",
};

const PostContent = () => {
  const title = DUMMY_DATA.title;
  const imagePath = `/images/posts/${DUMMY_DATA.slug}/${DUMMY_DATA.image}`;
  const content = DUMMY_DATA.content;

  return (
    <article className={styles.content}>
      <PostHeader title={title} image={imagePath} />
      <ReactMarkdown>{content}</ReactMarkdown>
    </article>
  );
};

export default PostContent;

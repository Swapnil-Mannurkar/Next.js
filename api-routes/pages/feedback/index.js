import React from "react";
import { getFileData } from "../api/feedback";

const FeedbackPage = (props) => {
  return (
    <ul>
      {props.feedback.map((item) => (
        <li key={item.id}>{item.feedback}</li>
      ))}
    </ul>
  );
};

export const getStaticProps = async () => {
  const data = getFileData();

  return {
    props: {
      feedback: data,
    },
  };
};

export default FeedbackPage;

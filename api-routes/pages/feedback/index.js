import React from "react";
import { getFileData } from "../api/feedback";

const FeedbackPage = (props) => {
  const loadSelectedFeedbackHandler = (id) => {
    fetch(`/api/${id}`);
  };

  return (
    <ul>
      {props.feedback.map((item) => (
        <li key={item.id}>
          {item.feedback}{" "}
          <button onClick={loadSelectedFeedbackHandler.bind(null, item.id)}>
            Show Details
          </button>
        </li>
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

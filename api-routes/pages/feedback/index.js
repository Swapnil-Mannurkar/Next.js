import React, { useState } from "react";
import { getFileData } from "../api/feedback";

const FeedbackPage = (props) => {
  const [feedbackData, setFeedbackData] = useState();

  const loadSelectedFeedbackHandler = (id) => {
    fetch(`/api/${id}`)
      .then((response) => response.json())
      .then((data) => setFeedbackData(data.feedback));
  };

  return (
    <>
      {feedbackData && <p>{feedbackData.email}</p>}
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
    </>
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

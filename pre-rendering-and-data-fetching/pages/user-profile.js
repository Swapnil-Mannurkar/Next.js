import React from "react";

const userProfile = (props) => {
  return <div>{props.username}</div>;
};

export const getServerSideProps = async (context) => {
  return {
    props: {
      username: "Swapnil",
    },
  };
};

export default userProfile;

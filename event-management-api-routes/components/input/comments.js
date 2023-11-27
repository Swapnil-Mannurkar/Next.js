import { useContext, useEffect, useState } from "react";
import NotificationContext from "../../store/notification-context";
import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";

function Comments(props) {
  const { eventId } = props;
  const [commentList, setCommentList] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [isFetchingComment, setIsFetchingComment] = useState(false);
  const notificationCtx = useContext(NotificationContext);

  useEffect(() => {
    setIsFetchingComment(true);
    fetch(`/api/comments/${eventId}`)
      .then((response) => response.json())
      .then((data) => {
        setCommentList(data.comments);
        setIsFetchingComment(false);
      });
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    notificationCtx.showNotification({
      title: "Sending comment...",
      message: "Your comment is being posted",
      status: "pending",
    });

    fetch(`/api/comments/${eventId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentData),
    })
      .then(async (response) => {
        if (response.ok) {
          return response.json();
        }

        return response.json().then((data) => {
          throw new Error({ message: data.message || "Something went wrong!" });
        });
      })
      .then((data) => {
        notificationCtx.showNotification({
          title: "Success!",
          message: "Comment has been posted",
          status: "success",
        });
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: "Error!",
          message: error.message || "Something went wrong!",
          status: "error",
        });
      });
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isFetchingComment && (
        <CommentList items={commentList} />
      )}
      {showComments && isFetchingComment && <p>Loading...</p>}
    </section>
  );
}

export default Comments;

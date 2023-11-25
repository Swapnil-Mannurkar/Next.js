import { getFileData } from "./feedback";

const handler = (req, res) => {
  const feedbackId = req.query.feedbackId;
  const data = getFileData();
  const selectedFeedback = data.find((feedback) => feedback.id === feedbackId);

  res.status(200).json({ feedback: selectedFeedback });
};

export default handler;

import fs from "fs";
import path from "path";

// const getFilePath = () => {};

export const getFileData = () => {
  const filePath = path.join(process.cwd(), "data", "feedback.json");
  const fileData = fs.readFileSync(filePath);
  return JSON.parse(fileData);
};

const handler = (req, res) => {
  if (req.method === "POST") {
    const email = req.body.email;
    const feedback = req.body.feedback;

    const newFeedback = {
      id: new Date().toISOString(),
      email: email,
      feedback: feedback,
    };

    // send the data to the database or a file
    const data = getFileData(filePath);
    data.push(newFeedback);
    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(201).json({ message: "success", feedback: newFeedback });
  } else {
    const data = getFileData();
    res.status(200).json({ feedback: data });
  }
};

export default handler;

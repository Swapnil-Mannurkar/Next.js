import fs from "fs";
import path from "path";

const getFilePath = () => {
  return path.join(process.cwd(), "data", "feedback.json");
};

const getFileData = (filePath) => {
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
    const filePath = getFilePath();
    const data = getFileData(filePath);
    data.push(newFeedback);
    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(201).json({ message: "success", feedback: newFeedback });
  } else {
    const filePath = getFilePath();
    const data = getFileData(filePath);
    res.status(200).json({ feedback: data });
  }
};

export default handler;

import {
  connectDatabse,
  fetchDocument,
  insertDocument,
} from "../../../helpers/db-util";

const handler = async (req, res) => {
  const eventId = req.query.eventId;
  let client = null;

  try {
    client = await connectDatabse();
  } catch (error) {
    res.status(500).json({ message: "Connecting to database failed!" });
    return;
  }

  if (req.method === "POST") {
    const { email, name, comment } = req.body;

    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !comment ||
      comment.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input data." });
      return;
    }

    const newComment = {
      eventId,
      email,
      name,
      comment,
    };

    try {
      const result = await insertDocument(client, "comments", newComment);
      newComment._id = result.insertedId;
      client.close();
    } catch (error) {
      res.status(500).json({ message: "Inserting data to database failed!" });
      return;
    }

    res
      .status(201)
      .json({ message: "Sucessfully added the comment", comment: newComment });
  }

  if (req.method === "GET") {
    const documents = await fetchDocument(client, "comments");

    const comments = documents.filter((comment) => comment.eventId === eventId);

    res.status(200).json({ comments: comments });
  }

  client.close();
};

export default handler;

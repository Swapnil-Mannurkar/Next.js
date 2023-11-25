import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  const eventId = req.query.eventId;

  const client = await MongoClient.connect(
    "mongodb+srv://nextjscourse:nextjscourse@cluster0.qtbqunv.mongodb.net/events?retryWrites=true&w=majority"
  );

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

    const db = client.db();
    const result = await db.collection("comments").insertOne(newComment);

    newComment.id = result.insertedId;

    res
      .status(201)
      .json({ message: "Sucessfully added the comment", comment: newComment });
  }

  if (req.method === "GET") {
    const db = client.db();

    const documents = await db
      .collection("comments")
      .find()
      .sort({ _id: -1 })
      .toArray();

    const comments = documents.filter((comment) => comment.eventId === eventId);

    res.status(200).json({ comments: comments });
  }

  client.close();
};

export default handler;

import { MongoClient } from "mongodb";

const connectDatabse = async () => {
  return await MongoClient.connect(
    "mongodb+srv://nextjscourse:nextjscourse@cluster0.qtbqunv.mongodb.net/events?retryWrites=true&w=majority"
  );
};

const insertDocument = async (client, document) => {
  const db = client.db();
  return await db.collection("comments").insertOne(document);
};

const handler = async (req, res) => {
  const eventId = req.query.eventId;

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

    let client = null;

    try {
      client = await connectDatabse();
    } catch (error) {
      res.status(500).json({ message: "Connecting to database failed!" });
      return;
    }

    try {
      const result = await insertDocument(client, newComment);
      newComment.id = result.insertedId;
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

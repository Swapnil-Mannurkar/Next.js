import { MongoClient } from "mongodb";

const connectDatabse = async () => {
  return await MongoClient.connect(
    "mongodb+srv://nextjscourse:nextjscourse@cluster0.qtbqunv.mongodb.net/events?retryWrites=true&w=majority"
  );
};

const insertDocument = async (client, document) => {
  const db = client.db();
  await db.collection("newsletter emails").insertOne(document);
};

const handler = async (req, res) => {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address!" });
      return;
    }

    let client = null;

    try {
      client = await connectDatabse();
    } catch (error) {
      res.status(500).json({ message: "Failed to connect database!" });
      return;
    }

    try {
      await insertDocument(client, { email: userEmail });
      client.close();
    } catch (error) {
      res.status(500).json({ message: "Failed to connect database!" });
      return;
    }

    res.status(201).json({ message: "Succesfully signed!" });
  }
};

export default handler;

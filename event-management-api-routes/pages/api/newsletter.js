import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address!" });
      return;
    }

    const client = await MongoClient.connect(
      "mongodb+srv://nextjscourse:nextjscourse@cluster0.qtbqunv.mongodb.net/events?retryWrites=true&w=majority"
    );

    const db = client.db();
    await db.collection("newsletter emails").insertOne({ email: userEmail });

    client.close();

    res.status(201).json({ message: "Succesfully signed!" });
  }
};

export default handler;

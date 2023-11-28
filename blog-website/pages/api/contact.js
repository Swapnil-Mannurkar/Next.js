import { MongoClient } from "mongodb";

const connectDatabase = async () => {
  return await MongoClient.connect(
    "mongodb+srv://nextjscourse:swapnil@cluster0.qtbqunv.mongodb.net/blogs?retryWrites=true&w=majority"
  );
};

const inserData = async (client, newMessage) => {
  const db = client.db();
  await db.collection("contact").insertOne(newMessage);
};

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { email, name, message } = req.body;

    if (
      !email ||
      !name ||
      !message ||
      !email.includes("@") ||
      !name.trim() === "" ||
      !message.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input" });
      return;
    }

    const newMessage = { email, name, message };

    let client = null;

    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: "Failed to connect database!" });
      return;
    }

    try {
      await inserData(client, newMessage);
    } catch (error) {
      res.status(500).json({ message: "Failed to insert data!" });
      client.close();
      return;
    }

    client.close();
    res
      .status(201)
      .json({ message: "Successfully sent the message" }, newMessage);
  }
};

export default handler;

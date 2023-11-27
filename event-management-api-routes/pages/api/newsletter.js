import { connectDatabse, insertDocument } from "../../helpers/db-util";

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
      await insertDocument(client, "newsletter emails", { email: userEmail });
      client.close();
    } catch (error) {
      res.status(500).json({ message: "Failed to insert data into database!" });
      return;
    }

    res.status(201).json({ message: "Succesfully signed!" });
  }
};

export default handler;

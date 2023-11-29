import { createEncryptedPassword } from "../../../lib/auth";
import { connectDatabase } from "../../../lib/db";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return;
  }

  const { email, password } = req.body;

  if (!email || !password || !email.includes("@") || password.length < 7) {
    res.status(422).json({ message: "Invalid input data!" });
    return;
  }

  const client = await connectDatabase();

  const db = client.db();

  const existingUser = await db
    .collection("credentials")
    .findOne({ email: email });

  if (existingUser) {
    res.status(422).json({ message: "User already exists!" });
    client.close();
    return;
  }

  const encryptedPassword = await createEncryptedPassword(password);

  await db.collection("credentials").insertOne({
    email,
    password: encryptedPassword,
  });

  res.status(201).json({ message: "User created!" });
  client.close();
};

export default handler;

import { createEncryptedPassword } from "../../../lib/auth";
import { connectDatabase } from "../../../lib/db";

const handler = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password || !email.includes("@") || password.length < 7) {
    res.status(422).json({ message: "Invalid input data!" });
    return;
  }

  const client = await connectDatabase();

  const db = client.db("users");

  const encryptedPassword = await createEncryptedPassword(password);

  db.collection("credentials").insertOne({
    email,
    password: encryptedPassword,
  });

  res.status(201).json({ message: "User created!" });
};

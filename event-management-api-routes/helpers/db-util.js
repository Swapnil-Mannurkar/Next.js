import { MongoClient } from "mongodb";

export const connectDatabse = async () => {
  return await MongoClient.connect(
    "mongodb+srv://nextjscourse:swapnil@cluster0.qtbqunv.mongodb.net/events?retryWrites=true&w=majority"
  );
};

export const insertDocument = async (client, collection, document) => {
  const db = client.db();
  return await db.collection(collection).insertOne(document);
};

export const fetchDocument = async (client, collection) => {
  const db = client.db();

  return await db.collection(collection).find().sort({ _id: -1 }).toArray();
};

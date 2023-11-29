import { MongoClient } from "mongodb";

export const connectDatabase = async () => {
  return await MongoClient.connect(
    "mongodb+srv://nextjs-authentication:Swapnil@nextjs-authentication.zkspcid.mongodb.net/users?retryWrites=true&w=majority"
  );
};

import "dotenv/config";
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbconfig.js";

const connection = await conectarAoBanco(process.env.STRING_CONEXAO);

export async function getAllPosts() {
  const db = connection.db("imercaoDev-instabites");
  const collection = db.collection("posts");

  return collection.find().toArray();
}

export async function createPost(newPost) {
  const db = connection.db("imercaoDev-instabites");
  const collection = db.collection("posts");

  return collection.insertOne(newPost);
}

export async function attPost(id, newPost) {
  const db = connection.db("imercaoDev-instabites");
  const collection = db.collection("posts");

  const objId = ObjectId.createFromHexString(id);

  return collection.updateOne({ _id: new ObjectId(objId) }, { $set: newPost });
}

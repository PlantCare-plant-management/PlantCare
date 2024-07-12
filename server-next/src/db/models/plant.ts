import { ObjectId } from "mongodb";
import { getMongoClientInstance } from "../config";

export interface PlantModel {
  _id: ObjectId;
  name: string;
  latin_name: string;
  description: string;
  difficulty: string;
  harvest: string;
  recommendation: string[];
  main_care: string[];
}

export const getDb = async () => {
  const client = await getMongoClientInstance();
  const db = client.db("PlantCare");
  return db;
};


export const GetAllPlants = async (
  page: number,
  limit: number,
  search?: string
) => {
  const db = await getDb();
  const query = search ? { name: { $regex: search, $options: "i" } } : {};
  const products = (await db
    .collection("plants")
    .find(query)
    .skip(page * limit)
    .limit(limit)
    .toArray()) as PlantModel[];
  return products;
};


export const GetPlantById = async (_id: string) => {
  const db = await getDb();
  const products = (await db
    .collection("plants")
    .findOne({ _id: new ObjectId(_id) })) as PlantModel;
  return products;
};
import { ObjectId } from "mongodb";
import db from "../db/conn.mjs";

export class Plant {
    static async getPlant(req, res, next) {
        try {
            const collection = await db.collection("plants")
            const result = await collection.find({}).toArray()
            res.json({result}).status(200)
        } catch (error) {
            console.log(error)
        }
    }
}
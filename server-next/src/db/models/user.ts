import { ObjectId } from "mongodb";
import { getMongoClientInstance } from "../config";
import { comparePassword, hashPassword } from "../helpers/bcrypt";
import { signToken } from "../helpers/jwt";

export interface UserModel {
  _id: ObjectId;
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export type UserModelInput = Omit<UserModel, "_id">;

export const getDb = async () => {
  const client = await getMongoClientInstance();
  const db = client.db("PlantCare");
  return db;
};

export const getAllUsers = async () => {
  const db = await getDb();
  const users = (await db
    .collection("user")
    .find()
    .project({ password: 0 })
    .toArray()) as UserModel[];

  return users;
};

export const getUserById = async (id: string) => {
  const db = await getDb();
  const user = (await db
    .collection("user")
    .findOne(
      { _id: new ObjectId(id) },
      { projection: { password: 0 } }
    )) as UserModel;

  return user;
};

export const getUserByEmail = async (email: string) => {
  const db = await getDb();

  const user = await db.collection("user").findOne({ email });
  return user;
};

export const register = async (user: UserModelInput) => {
  const db = await getDb();
  const userCollection = await db.collection("user");

  const existingUser = await userCollection.findOne({
    $or: [{ username: user.username }, { email: user.email }],
  });

  if (existingUser) {
    if (existingUser.username === user.username) {
      throw new Error("Username already exists");
    }
    if (existingUser.email === user.email) {
      throw new Error("Email already exists");
    }
  }

  const modifiedUser: UserModelInput = {
    ...user,
    password: hashPassword(user.password),
  };

  // user.password = hashPassword(user.password)

  const newUser = await userCollection.insertOne(modifiedUser);

  return newUser;
};

export const login = async (input: LoginInput) => {
  const db = await getDb();
  const userCollection = await db.collection("user");

  const user = await userCollection.findOne({ email: input.email });

  if (!user || !comparePassword(input.password, user.password)) {
    throw new Error("Invalid email or password");
  }

  const access_token = signToken({
    _id: user._id,
    email: user.email,
  });

  return { access_token };
};

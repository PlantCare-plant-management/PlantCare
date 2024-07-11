const { ObjectId } = require("mongodb");
const { hashPassword, comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");

const typeDefs = `#graphql


type User {
  _id: ID
  name: String
  username: String!
  email: String!
  imgUrl: String
}

input RegisterInput{
  name: String
  username: String!
  email: String!
  password: String!
}

input LoginInput {
  identifier: String!
  password: String!
}

# input EditUserInput {
#   name: String
#   username: String
#   email: String
#   imgUrl: String
#   lokasi: String
# }

# input EditPassword {

# }

type Login {
  access_token: String
  username: String
  imgUrl: String
}

type Message {
  message: String
}

type Query {
  getUserById(id: ID): User
}

type Mutation {
  register(input: RegisterInput): Message
  login(input: LoginInput): Login
  # editUser(input: EditUserInput): Message
}
`;

const resolvers = {
  Query: {
    getUserById: async (_, __, contextValue) => {
      try {
        const { db } = contextValue;
        const { id } = await contextValue.authentication();
        const userCollection = db.collection("user");

        if (!id) {
          throw new Error("Id user required");
        }

        const user = await userCollection.findOne({
          _id: new ObjectId(id || authId),
        });

        if (!user) {
          throw new Error("User not found");
        }

        return { user };
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
  Mutation: {
    register: async (_, { input }, contextValue) => {
      try {
        const { db } = contextValue;
        const userCollection = db.collection("user");

        if (!input.username) {
          throw new Error("Username is required");
        }
        if (!input.email) {
          throw new Error("Email is required");
        }
        if (!input.password) {
          throw new Error("Password is required");
        }
        if (input.password.length < 5) {
          throw new Error("Password length must be at least 5 characters");
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.email)) {
          throw new Error("Invalid email format");
        }

        const existingUser = await userCollection.findOne({
          $or: [{ username: input.username }, { email: input.email }],
        });

        if (existingUser) {
          if (existingUser.username === input.username) {
            throw new Error("Username is already exists");
          }
          if (existingUser.email === input.email) {
            throw new Error("Email is already exists");
          }
        }

        input.password = hashPassword(input.password);
        const newuser = await userCollection.insertOne(input);

        return {
          message: "Success create account",
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },

    login: async (_, { input }, contextValue) => {
      try {
        const { db } = contextValue;
        const userCollection = db.collection("user");
        const user = await userCollection.findOne({
          $or: [{ username: input.identifier }, { email: input.identifier }],
        });
        if (!user || !comparePassword(input.password, user.password)) {
          throw new Error("Invalid email or password");
        }

        const access_token = signToken({
          _id: user._id,
          username: user.username,
        });
        return { access_token, username: user.username, imgUrl: user.imgUrl };
      } catch (error) {
        throw new Error(error.message);
      }
    },

    // editUser: async (_, { input }, contextValue) => {
    //   try {
    //     const { db } = contextValue;
    //     const { id } = await contextValue.authentication();

    //     const userCollection = db.collection("user");
    //     const updateData = { ...input };

    //     const updatedUser = await userCollection.findOneAndUpdate(
    //       { _id: id },
    //       { $set: updateData },
    //       { returnDocument: "after" }
    //     );

    //     if (!updatedUser) {
    //       throw new Error("User not found");
    //     }

    //     return { message: "Update profile success" };
    //   } catch (error) {
    //     throw new Error(error.message);
    //   }
    // },
  },
};

module.exports = { typeDefs, resolvers };

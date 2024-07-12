const { ObjectId } = require("mongodb");

// GraphQL Schema Definition
const typeDefs = `#graphql
  type Plant {
    _id: ID
    name: String!
    latin_name: String
    description: String
    difficulty: String
    harvest: String
    recommendation: [String]
    main_care: [String]
  }

  input PlantInput {
    name: String!
    latin_name: String
    description: String
    difficulty: String
    harvest: Boolean
    recommendation: [String]
    main_care: [String]
  }

  type Query {
    getAllPlants: [Plant]
    getPlantById(id: ID!): Plant
  }

  type Mutation {
    addPlant(input: PlantInput): Plant
  }
`;

// GraphQL Resolvers
const resolvers = {
  Query: {
    getAllPlants: async (_, __, { db }) => {
      try {
        const plantCollection = db.collection("plants");
        const plants = await plantCollection.find().toArray();
        return plants;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    getPlantById: async (_, { id }, { db }) => {
      try {
        const plantCollection = db.collection("plants");
        const plant = await plantCollection.findOne({ _id: ObjectId(id) });
        if (!plant) {
          throw new Error("Plant not found");
        }
        return plant;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
  Mutation: {
    addPlant: async (_, { input }, { db }) => {
      try {
        const plantCollection = db.collection("plants");
        const newPlant = {
          ...input,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        const result = await plantCollection.insertOne(newPlant);
        return result.ops[0];
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};

module.exports = { typeDefs, resolvers };

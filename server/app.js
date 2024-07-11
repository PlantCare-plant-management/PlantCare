if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
  }
  
  const { ApolloServer } = require("@apollo/server");
  const { startStandaloneServer } = require("@apollo/server/standalone");

  const {
    typeDefs: typeDefsUser,
    resolvers: resolversUser,
  } = require("./schemas/user");
  
  const authentication = require("./middlewares/authentication");
  
  const { connect, getDB } = require("./config/mongoDb");
  
  const server = new ApolloServer({
    typeDefs: [typeDefsUser],
    resolvers: [resolversUser],
    introspection: true
  });
  
  async function startServer() {
    try {
      await connect();
      const db = await getDB();
      const { url } = await startStandaloneServer(server, {
        listen: { port: process.env.PORT || 3000 },
  
        context: async ({ req }) => ({
          authentication: () => authentication(req),
          db,
        }),
      });
      console.log(`🚀  Server ready at: ${url}`);
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }
  
  startServer();
  
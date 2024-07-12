import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://bd23-103-165-209-195.ngrok-free.app",
  cache: new InMemoryCache(),
});

export default client;

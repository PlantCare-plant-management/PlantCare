import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://b71e-125-167-35-211.ngrok-free.app",
  cache: new InMemoryCache(),
});

export default client;

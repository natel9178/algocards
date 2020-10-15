import express from "express";
import { ApolloServer, gql } from "apollo-server-express";

const app = express();

app.get("/", (_, res) => {
  res.send("ok");
});

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => "Hello world!",
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

const port = process.env.PORT || 4000;

app.listen({ port }, () => {
  console.log(`🚀  Server ready at http://localhost:${port}`);
});

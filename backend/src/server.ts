import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import { RootModule } from "./modules/root.module";

const app = express();

app.get("/", (_, res) => {
  res.send("ok");
});

const { schema } = RootModule;

const server = new ApolloServer({ schema, playground: true });
server.applyMiddleware({ app });

const port = process.env.PORT || 4000;

app.listen({ port }, () => {
  console.log(`🚀  Server ready at http://localhost:${port}`);
});

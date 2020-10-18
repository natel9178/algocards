import { GraphQLModule } from "@graphql-modules/core";
import { GraphQLDate, GraphQLDateTime } from "graphql-iso-date";
import gql from "graphql-tag";
import { QueryResolvers } from "../generated-models";
import { PullerModule } from "./puller/puller.module";

export const RootModule = new GraphQLModule({
  imports: [PullerModule],
  typeDefs: gql`
    type Query {
      version: String!
    }

    scalar JSON
    scalar DateTime
    scalar Date
  `,
  resolvers: {
    DateTime: GraphQLDateTime,
    Date: GraphQLDate,
    Query: <QueryResolvers>{
      version: () => "0.0.0",
    },
  },
});

import { GraphQLModule } from "@graphql-modules/core";
import { GraphQLDate, GraphQLDateTime } from "graphql-iso-date";
import gql from "graphql-tag";

export const RootModule = new GraphQLModule({
  imports: [],
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

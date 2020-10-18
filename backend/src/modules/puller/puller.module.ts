import { GraphQLModule } from "@graphql-modules/core";
import gql from "graphql-tag";
import { QueryResolvers } from "../../generated-models";
import GraphQLJSON, { GraphQLJSONObject } from "graphql-type-json";
import { getCardsFromGithub } from "./puller.provider";

export const PullerModule = new GraphQLModule({
  typeDefs: gql`
    scalar JSON
    scalar JSONObject

    type Query {
      getCardFromLink(input: GetCardFromLinkInput!): GetCardFromLinkOutput!
    }

    input GetCardFromLinkInput {
      link: String!
    }

    type GetCardFromLinkOutput {
      files: [File!]!
    }

    type File {
      name: String!
      path: String!
      download_url: String!
    }
  `,
  resolvers: {
    JSON: GraphQLJSON,
    JSONObject: GraphQLJSONObject,
    Query: <QueryResolvers>{
      getCardFromLink: async (_, { input: { link } }) => {
        const parsedLink = new URL(
          link.startsWith("https://") ? link : `https://${link}`
        );

        switch (parsedLink.hostname) {
          case "github.com":
            const splitLink = parsedLink.pathname
              .split("/")
              .filter((s) => s !== "");
            if (splitLink.length < 2) {
              throw "Invalid github link";
            }

            const username = splitLink[0];
            const repo = splitLink[1];
            const remainder = splitLink.slice(2, splitLink.length).join("/");

            const files = await getCardsFromGithub(
              username,
              repo,
              remainder === "" ? undefined : "/" + remainder
            );
            return { files };
          default:
            throw "No cards found";
        }
      },
    },
  },
});

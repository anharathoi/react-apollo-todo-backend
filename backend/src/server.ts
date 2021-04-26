const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');


// Mock in memory data
const itemList = [
  {
    id: 1,
    title: "Retro",
    done: false
  },
  {
    id: 2,
    title: "Planning",
    done: false
  },
  {
    id: 3,
    title: "Ship PR",
    done: true
  },
  {
    id: 4,
    title: "Fix code",
    done: true
  },

]
// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Item {
    id: Int
    title: String
    done: Boolean
  }
  type Query {
    getAllItems: [Item]
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    getAllItems: () => itemList,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Again n again Server ready at http://localhost:4000${server.graphqlPath}`)
);
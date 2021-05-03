import { ToDoAPI } from "./ToDoAPI";
import * as express from "express";
import { ApolloServer, gql } from "apollo-server-express";

// Instantiate api
// const toDoApi = new ToDoAPI();
// Turns out you can't do it like this, see below how this is used instead

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Item {
    id: Int
    title: String
    done: Boolean
  }

  type Query {
    getAllItems: [Item]
    getItem(id: Int): Item
  }

  type Mutation {
    addItem(id: Int, title: String, done: Boolean): Item
    deleteItem(id: Int): Item
    updateItem(id: Int, title: String, done: Boolean): Item
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    getAllItems: async (_source, {  }, { dataSources }) => 
      await dataSources.toDoApi.getAllItems(),
    getItem: async (_source, { id }, { dataSources }) =>
      await dataSources.toDoApi.getItem(id),
  },
  Mutation: {
    addItem: async (_source, { id, title, done }, { dataSources }) =>
      await dataSources.toDoApi.addItem(id, title, done),
    deleteItem: async (_source, { id }, { dataSources }) =>
      await dataSources.toDoApi.deleteItem(id),
    updateItem: async (_source, { id, title, done }, { dataSources }) =>
      await dataSources.toDoApi.updateItem(id, title, done),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return { toDoApi: new ToDoAPI() };
  },
});

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);

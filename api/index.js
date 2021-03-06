import { ApolloServer } from 'apollo-server';
import { typeDefs } from './types.js';
import { resolvers } from './resolvers.js';

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  // eslint-disable-next-line no-console
  console.log(`🚀  Server ready at ${url}`);
});

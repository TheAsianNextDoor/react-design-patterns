// const { ApolloServer, gql } = require('apollo-server');

import { ApolloServer, gql } from 'apollo-server';

const typeDefs = gql`
  type List {
    id: Int
    isChecked: Boolean
  }

  type Query {
    list: [List]
  }

  input inputUpdateList {
    id: Int
    isChecked: Boolean
  }

  type Mutation {
      updateList(newList: [inputUpdateList]): [List]
  }
`;

let list = [
    { id: 0, isChecked: false }, 
    {id: 1, isChecked: true},
];

const resolvers = {
    Query: {
      list: () => list,
    },
    Mutation: {
        updateList: (_, {newList}) => { 
            if (newList){
                list = newList;
                
                return list;
            }
        },
    }
};

const server = new ApolloServer({ typeDefs, resolvers});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

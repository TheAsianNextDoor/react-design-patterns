import { gql } from 'apollo-server';

export const typeDefs = gql`
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

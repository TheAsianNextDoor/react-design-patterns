import {
  ApolloClient, gql, HttpLink, InMemoryCache,
} from '@apollo/client';
import fetch from 'cross-fetch';

const link = new HttpLink({
  fetch,
  uri: 'http://localhost:4000/graphql',
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

export const listQuery = gql`
    query getList {
        list {
            id
            isChecked
        }
    }
`;

export const listMutation = gql`
    mutation UpdateList($newList: [inputUpdateList]) {
        updateList(newList: $newList) {
            id
            isChecked
        }
    }
`;

export const loadList = async () => client.query({ query: listQuery, fetchPolicy: 'network-only' });
export const updateList = async (newList) => {
  // example of shared logic that all View Models would adhere to
  if (!newList.length) {
    return 'Unable to update. No List';
  }

  return client.mutate({ mutation: listMutation, variables: { newList } });
};

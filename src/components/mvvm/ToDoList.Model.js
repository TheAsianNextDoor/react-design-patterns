import { ApolloClient, gql, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'http://localhost:4000/graphql',
  });

const listQuery = gql`
    query getList {
        list {
            id
            isChecked
        }
    }
`;

const listMutation = gql`
    mutation UpdateList($newList: [inputUpdateList]) {
        updateList(newList: $newList) {
            id
            isChecked
        }
    }
`;

export const loadList = async () => client.query({query: listQuery, fetchPolicy: 'network-only' });
export const updateList = (newList) => client.mutate({mutation: listMutation, variables: { newList }});


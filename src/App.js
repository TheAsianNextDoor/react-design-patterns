import React from 'react';

// Uncomment either ToDoList for other example
// import { ToDoList } from './components/clean-architecture/ToDoList.jsx';
// import { ToDoList } from './components/mvvm/ToDoList.jsx';
import { ToDoList } from './components/mvv/ToDoList.jsx';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from '@apollo/client';
import fetch from 'cross-fetch';

const link = new HttpLink({
  fetch: fetch,
  uri: 'http://localhost:4000/graphql',
})


const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});


function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <ToDoList/>
      </div>
    </ApolloProvider>
  );
}

export default App;

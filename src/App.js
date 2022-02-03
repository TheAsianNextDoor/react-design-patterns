import React from 'react';

import { CleanToDoList } from './components/clean-architecture/CleanToDoList.jsx';
import { MVVMToDoList } from './components/mvvm/MVVMToDoList.jsx';
import { MVVToDoList } from './components/mvv/MVVToDoList.jsx';
import { HelperToDoList } from './components/helper-functions/HelperToDoList.jsx';
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
    <>
      <div>
        <h2>Clean Architecture</h2>
        <CleanToDoList/>
      </div>

      <div>
        <h2>MVVM</h2>
        <MVVMToDoList/>
      </div>

      <ApolloProvider client={client}>
        <div>
          <h2>MVV</h2>
          <MVVToDoList/>
        </div>

        <div>
          <h2>Helper Functions</h2>
          <HelperToDoList/>
        </div>
      </ApolloProvider>
    </>
  );
}

export default App;

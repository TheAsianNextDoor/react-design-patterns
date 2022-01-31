// import { ToDoList } from './components/clean-architecture/ToDoList.jsx';
import { ToDoList } from './components/mvvm/ToDoList.jsx';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client';


const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'http://localhost:4000/graphql',
});


function App() {
  return (
    <>
      hello
    </>
    // <ApolloProvider client={client}>
    //   <div>
    //     <ToDoList/>
    //   </div>
    // </ApolloProvider>
  );
}

export default App;

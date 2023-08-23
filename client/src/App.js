
import './App.css';
import {ApolloClient,InMemoryCache,ApolloProvider} from "@apollo/client";
import DisplayData from './displaydata';

function App() {

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://127.0.0.1:3000/graphql"
  });
  return (
    <ApolloProvider client={client}>
    <div className="App">
      <DisplayData / >
    </div>
    </ApolloProvider>
  );
}

export default App;

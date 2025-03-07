const { ApolloServer } = require("apollo-server"); // We are creating the Apollo Server Instance that will then run the GraphQL
/* The { ApolloServer } part is the
   The const is the constant 'reference' to a value. In thei case {ApolloServer}
*/
const { typeDefs } = require('./schema/typeDefs.js');
// The typeDefs define the shape ofthe queries. 

const { resolvers } = require('./schema/resolvers.js')
// The resolvers define how ApolloServer is supposed to even use that type definitions 

const server = new ApolloServer({
    typeDefs, 
    resolvers,  
    cors: {
    origin: '*', // Allow all origins
    credentials: true,
  },
})
//The Apollo Server instance must have typeDefs (which is the schema definition) and resolvers(that tell Apollo Server what to do with the Schema Defs.)

// Connecting to Postgres



server.listen().then(({ url }) => {
    console.log(`The API is running at: ${url}`);
})
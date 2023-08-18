const { ApolloServer } = require("apollo-server");
const typeDefs = require('./schema/typeDefs.graphql');
const resolvers = require('./schema/resolvers')
const server = new ApolloServer({typeDefs, resolvers})

server.listen().then(() => {
    console.log(`The API is running at: ${url}`);
})
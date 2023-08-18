const { ApolloServer } = require("apollo-server");

const server = new ApolloServer({typeDefs, resolvers})

server.listen().then(() => {
    console.log(`The API is running at: ${url}`);
})
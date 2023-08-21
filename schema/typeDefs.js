const { gql } = require("apollo-server");

const typeDefs = gql `
    type User{
        id: ID!
        name: String
        username: String
        age: Int
        nationality: Nationality
        friends: [User] #Fields can be nested inside one another
    }

    type Query{
        users: [User!]!
        user(id: ID!): User! #This will allow for the selecting of certain users based on the ID providede. The ID MUST be provided
        #The return type is User.
    }

    enum Nationality{
        American
        Canadian
        Spanish
        Pakistani
        Australian
    }
`;

module.exports = { typeDefs }

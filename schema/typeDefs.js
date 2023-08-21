const { gql } = require("apollo-server");

const typeDefs = gql `
    type User{
        id: ID!
        name: String
        username: String
        age: Int
        nationality: Nationality
        friends: [User] #Fields can be nested inside one another
        #Let's add another nested type. This time pointing to another file altogether

        favmovie: [Movies]
    }

    type Query{
        users: [User!]!
        user(id: ID!): User! #This will allow for the selecting of certain users based on the ID providede. The ID MUST be provided
        #The return type is User.
        movies: [Movies!]!
        movie(name: String!): Movies!
    }

    enum Nationality{
        American
        Canadian
        Spanish
        Pakistani
        Australian
    }

    type Movies{
        id: ID!
        name: String!
        releaseyear: Int!
        isintheatres: Boolean!
    }
`;

module.exports = { typeDefs }

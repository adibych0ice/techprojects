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
        Greek
    }

    type Movies{
        id: ID!
        name: String!
        releaseyear: Int!
        isintheatres: Boolean!
    }
    input adduserinp{
        name: String!
        username: String!
        age: Int = 21
        nationality: Nationality = American
        #We will not be referencing the Objects like in friends: [User]
        #This is because we are creating a new entry. We are not querying 
        #anything so we we will not be referencing anything
    }
    input addmovieinp{
        name: String!
        releaseyear: Int!
        isintheatres: Boolean!
    }

    input updateuser{
        id: ID!
        newusername: String!
        newuser_name: String!
        updatedage: Int
        updatedNationality: String
    }

    input updatemovie{
        id: ID!
        newname: String!
        updatedreleaseyear: Int!
        currentshowingstatus: Boolean
    }

    type Mutation{
        adduser(input: adduserinp!): User
        addmovie(input: addmovieinp!): Movies
        updateuser(input: updateuser!): User!
        updatemovie(input: updatemovie!): Movies
    }
`;

module.exports = { typeDefs }

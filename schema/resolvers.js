const UserList = require('./Generateddata')

const resolvers = {
    Query: {
        users() {
            return UserList
        }
    }
}

module.exports = { resolvers }
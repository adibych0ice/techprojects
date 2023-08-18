const data = require('./Generateddata.json')

const resolvers = {
    Query: {
        users() {
            return data
        }
    }
}

module.exports = resolvers;
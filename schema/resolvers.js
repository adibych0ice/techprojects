const UserList = require('./Generateddata')
const _ = require("lodash");
const MovieList = require('./MovieList');
const resolvers = {
    Query: {
        //User Resolver
        users: ()=> {
            return UserList;
        },
        user: (parent,args) =>{
            const id = args.id;
            const user = _.find(UserList,{id: Number(id)});
            return user
        },
        //Movie Resolvers
        movies: ()=> {
            return MovieList
        },
        movie: (parent,args)=>{
            const name = args.name
            const mov = _.find(MovieList,{name:String(name)})
            return mov
        }
    }
}

module.exports = { 
    resolvers 
};
const UserList = require('./Generateddata')
const _ = require("lodash");
const MovieList = require('./MovieList');
const dbconn = require('./dbconn')
const fs = require('fs');
const path = require('path');
//const { argsToArgsConfig } = require('graphql/type/definition');
const { DateTimeResolver } = require('graphql-scalars')

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
        },

        dbusers: async () =>{
            return await dbconn.any('SELECT * FROM decistech.users LIMIT 50');
        }
    },

    User: {
        favmovie: () => {
            return _.filter(MovieList,(movie) => movie.releaseyear >= 2000 && movie.releaseyear <= 2010); //This readily creates a filter. No need to pass anything in arguments
        }
    },
    
    Mutation: {
        adduser: (parent,args)=> {
            const user = args.input;// We are using args.input beccause we created a type input that will then accept a keyvalue dictionary in the variables field
            // when executing the query
            //console.log(user)
            const lastid = UserList[UserList.length-1].id; /*This step helps with ensuring that the
            lastid digit is captured. using the length of the userlist
            which is beinbg retrieved from the file we initialized above 
            */
            user.id = lastid+1;//Adding one to the last id in the kist of users
            UserList.push(user) //Actually commiting the changes we made to the database(in this case the GeneratedData.js file)

            //Adding the new entry to the file:
            const dataToWrite = `UserList = ${JSON.stringify(UserList, null, 2)}\n\nmodule.exports = UserList`;

            const filePath = 'C:\\Users\\Public\\OneDrive\\GprahQL REST OData Technprojects\\techprojects\\schema\\Generateddata.js';

            fs.writeFileSync(filePath, dataToWrite);

            return user
        },


        addmovie:(parent,args)=>{
            const newmovie = args.input;
            const lastid = MovieList[MovieList.length-1].id//The MovieList length is the total number of records. 
            //Subtracting one gives the last record
            //Using MovieList[int(in this case the lastid in the list of movie entries)].id gives us the value assigned to the MovieList[location]

            newmovie.id = lastid+1;/* As can be seen from the schema definition of the 
            Movies Type, we need to have an id. the lastid const takes care of the numeric value
            The newmovie.id is imitating the Movies.id field to which we are assigning the next id value by 
            adding 1 to the lastid. 
            Because we are only adding the non-id fields in the variable(in the Apollo Client Portal) as the input, we need to 
            auto add the id field too.
            */
           MovieList.push(newmovie)

           const dataToWrite = `MovieList = ${JSON.stringify(MovieList, null, 2)}\n\nmodule.exports = MovieList`;

           const filepath = 'C:\\Users\\Public\\OneDrive\\GprahQL REST OData Technprojects\\techprojects\\schema\\MovieList.js'

           fs.writeFileSync(filepath,dataToWrite);
           return newmovie
        },


        updateuser: (parent,args) => {
            const updateuser = args.input;
            const idforupdation = Number(updateuser.id);
            /*The loop below goes through each field in the UpdateUser Input, we receive from the variable
            to the actual user that would exist in a user list, and then updates the 
            corresponding 'user' entry in the UserList object we have */
            let updateduser;
            UserList.forEach((user) => {
                if (user.id === idforupdation) {
                    if(updateuser.newusername){user.username = updateuser.newusername};
                    if (updateuser.newuser_name) {
                        user.name = updateuser.newuser_name
                    };
                    if (updateuser.updateage) {
                        user.age = updateuser.updateage
                    };
                    if (updateuser.updatedNationality) {
                        user.nationality = updateuser.updatedNationality
                    }

                    updateduser= user;
                }
            });
            //This is going to update the chnages we have made to the file

            const dataToWrite = `UserList = ${JSON.stringify(UserList, null, 2)}\n\nmodule.exports = UserList`;

            const filePath = 'C:\\Users\\Public\\OneDrive\\GprahQL REST OData Technprojects\\techprojects\\schema\\Generateddata.js';

            fs.writeFileSync(filePath, dataToWrite);

            return updateduser
        },

        //Doing the whole thing again byt this time for movie
        updatemovie: (parent,args) => {
            //take the arguments
            const updatemovie = args.input;
            let updatedmovie;
            const movieid = Number(updatemovie.id);
            
            MovieList.forEach((movie) => {
                if (movie.id === movieid) {
                    if (updatemovie.newname) {
                        movie.name = updatemovie.newname
                    };
                    if (updatemovie.updatedreleaseyear) {
                        movie.releaseyear = updatemovie.updatedreleaseyear
                    };
                    if (updatemovie.currentshowingstatus) {
                        movie.isintheatres = updatemovie.currentshowingstatus
                    }

                    updatedmovie = movie;
                }

                
            });
            //Now adding the necessary details and updating in the actual file
            const dataToWrite = `MovieList = ${JSON.stringify(MovieList, null, 2)}\n\nmodule.exports = MovieList`;
            const filepath = 'C:\\Users\\Public\\OneDrive\\GprahQL REST OData Technprojects\\techprojects\\schema\\MovieList.js'

            fs.writeFileSync(filepath,dataToWrite);

            return updatedmovie;
        }

    }
}

module.exports = { 
    resolvers 
};
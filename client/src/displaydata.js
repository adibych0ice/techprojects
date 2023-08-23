import React from "react";
import { useQuery,gql } from "@apollo/client";

const QUERY_ALL_USERS = gql`
    query GetAllUsers {
        users{
            id
            name
            age
            username
        }
    }
`

function DisplayData() {
    const {data,loading,error} = useQuery(QUERY_ALL_USERS);
    if (loading) {
        return <h1>DATA IS LOADING</h1>
    }
    if (data) {
        console.log(data)
    }
    if (error) {
        console.log(error)
    }

    return <div>{data && data.map(() => {
        return <div><h1>Name: {user.name}</h1> </div>
    })}</div>;
}

export default DisplayData;

import { client } from './apolloclient';
import { gql } from '@apollo/client';

document.addEventListener("DOMContentLoaded", () => {
  client
    .query({
      query: gql`
        query GetAllUsers {
          dbusers {
            id
            name
            email
            
            birthdate
          }
        }
      `,
    })
    .then((result) => {
      const tableBody = document.getElementById("usersTable").querySelector("tbody");
      result.data.dbusers.forEach((user) => {
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = user.id;
        row.insertCell(1).textContent = user.name;
        row.insertCell(2).textContent = user.email;
        //row.insertCell(3).textContent = user.address;
        row.insertCell(3).textContent = user.birthdate;
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
});

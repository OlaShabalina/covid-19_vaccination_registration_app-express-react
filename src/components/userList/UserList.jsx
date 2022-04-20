import './UserList.scss';
import axios from 'axios';
import { useState, useEffect } from 'react';

function UserList() {

  // state for getting data from the backend in form of array of objects
  const [backendData, setBackendData] = useState([]);

  // state for handling error to dusplay error message to the user
  const [hasError, setHasError] = useState(false);

  // getting data from the backend 
  useEffect(() => {
    axios.get("/api")
      .then((res) => {
        const usersData = res.data.usersList;
        setBackendData(usersData);
      })
      .catch(error => {

        // will display the error to the console and notify the user
        console.log(error);
        setHasError(true);
      })
  }, []);

  return (
    <div>

      {hasError ? (
        <p className="text-danger text-center">The server encountered an internal error or misconfiguration and was unable to complete your request. Please contact the server administrator.</p>
      ) : (
      <div className="d-flex justify-content-center container">
        <table className="list table">
            <thead className="thead-light">
                <tr>
                <th scope="col"> </th>
                <th scope="col">Name</th>
                <th scope="col">Date</th>
                </tr>
            </thead>
            <tbody>
            {(typeof backendData === 'undefined') ? (
              <tr key={1}>
                <th scope="row">Loading...</th>
                <td>Loading...</td>
                <td>Loading...</td>
              </tr>
            ) : (
              backendData.map((user, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{user.users_name}</td>
                  <td>{user.reg_date}</td>
                </tr>
            )))}
            </tbody>
          </table>
      </div>
      )}
    </div>
  )
}

export default UserList

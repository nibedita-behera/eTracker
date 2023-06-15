import React from 'react';
import { Client, Account } from 'appwrite';

const endpoint = 'https://cloud.appwrite.io/v1';
const project = '6475ed780344f01c4b66';

const appwrite = new Client();
appwrite.setEndpoint(endpoint).setProject(project);

const account = new Account(appwrite);



const Logout = () => {
const promise = account.deleteSession('current');

promise.then(function (response) {
    console.log(response); // Success
}, function (error) {
    console.log(error); // Failure
});
  return (
    <div>
      <button onClickCapture={Logout}>logout user</button>
      <h1>Logout Successful!!</h1>
      
    </div>
  );
};

export default Logout;

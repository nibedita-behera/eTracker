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
    <div  style={{justifyContent:'center' }} >
      <button onClickCapture={Logout}
      style={{justifyContent:'center', color:'-moz-initial', fontFamily:'cursive'}}>Logged out</button>
      <h1>Thank you for using!!</h1>
      
    </div>
  );
};

export default Logout;

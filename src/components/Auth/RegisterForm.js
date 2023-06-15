import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Client, Account } from 'appwrite';

const endpoint = 'https://cloud.appwrite.io/v1';
const project = '6475ed780344f01c4b66';

const appwrite = new Client();
appwrite.setEndpoint(endpoint).setProject(project);

const account = new Account(appwrite);

const Register = () => {
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await account.create(userId, email, password);
      setMessage('Registration successful');
      setUserId('');
      setEmail('');
      setPassword('');
    } catch (error) {
      setMessage(`Registration failed: ${error.message}`);
    }
  };

  return (
    <div className="container" style={{ marginTop: '10%', backgroundColor: '#eec0c8',  minHeight: '400px' }}>
      <div className="row justify-content-center">
        <div className="col-lg-6 p-4 rounded shadow">
          <h2 className="text-center">Register</h2>
          {message && <p className="text-center">{message}</p>}
          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <label htmlFor="userId" className="form-label fw-bold" >
                User ID:
              </label>
              <input
                type="text"
                className="form-control fw-bold"
                 style={{borderBlockStyle:'double',borderBlockColor:'ActiveBorder'}}
                id="userId"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-bold">
                Email:
              </label>
              <input
                type="email"
                className="form-control fw-bold"
                style={{borderBlockStyle:'double',borderBlockColor:'ActiveBorder'}}
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label fw-bold">
                Password:
              </label>
              <input
                type="password"
                className="form-control fw-bold"
                style={{borderBlockStyle:'double',borderBlockColor:'ActiveBorder'}}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary fw-bold">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Client, Account } from 'appwrite';

const endpoint = 'https://cloud.appwrite.io/v1';
const project = '6475ed780344f01c4b66';

const appwrite = new Client();
appwrite.setEndpoint(endpoint).setProject(project);

const account = new Account(appwrite);

const LoginForm = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await account.createEmailSession(user.email, user.password);
      console.log(response);
      setMessage('Login successful');
      navigate(`/dashboard/${response?.userId}`, {
        state: {
          userId: response?.$id,
          name: response?.name,
          id: response?.$id,
        },
      });
    } catch (error) {
      console.log(error);
      setMessage(`Login failed: ${error.message}`);
    }
  };

  return (
    <div className="container" style={{ marginTop: '10%', backgroundColor: '#eec0c8', minHeight: '400px' }}>
      <div className="row justify-content-center">
        <div className="col-lg-6 p-4 rounded shadow" style={{ backgroundColor: '#eec0c8' }}>
          <h2 className="text-center">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-bold">
                Email:
              </label>
              <input
                type="email"
                className="form-control fw-bold"
                style={{ borderBlockStyle: 'double', borderBlockColor: 'ActiveBorder' }}
                id="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
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
                style={{ borderBlockStyle: 'double', borderBlockColor: 'ActiveBorder' }}
                id="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                required
              />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary fw-bold">
                Login
              </button>
            </div>
          </form>
          {message && (
            <div className="text-center mt-3">
              <p>{message}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import Dashboard from './pages/Dashboard';
import ExpenseForm from './ExpenseForm';
import TransactionList from './TransactionList';
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logout from './components/Auth/LogoutFrom';

const App = () => {
  return (
    <Router>
      <div className="bg-light" style={{ color: '#1d1160', fontFamily: 'Verdana, sans-serif', fontWeight: 'bolder' }}>
        <nav className="navbar navbar-expand-lg bg-primary fixed-top">
          <div className="container">
            <Link className="navbar-brand" to="/dashboard">
              Dashboard
            </Link>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/login" style={{ color: '#ffffff' }}>
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/" style={{ color: '#ffffff' }}>
                  Register
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/logout" style={{ color: '#ffffff' }}>
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        
      </div>
      <div className="container mt-4">
                <Routes>
                  <Route path="/dashboard/:userId" element={<Dashboard />} />
                  <Route path="/login" element={<LoginForm />} />
                  <Route path="/logout" element={<Logout />} />
                  <Route path="/" element={<RegisterForm />} />
                  <Route path="/expenses" element={<ExpenseForm />} />
                  <Route path="/transactions" element={<TransactionList />} />
                </Routes>
              </div>
    </Router>
  );
};

export default App;

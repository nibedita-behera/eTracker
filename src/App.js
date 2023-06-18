import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import Dashboard from './pages/Dashboard';
import ExpenseForm from './ExpenseForm';
import TransactionList from './TransactionList';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logout from './components/Auth/LogoutFrom';
import Feedback from './components/Auth/Feedback';
import { Navbar, Nav } from 'react-bootstrap';

const App = () => {
  return (
    <Router>
      <div className="bg-light" style={{ color: '#FF00FF', fontFamily: 'Verdana, sans-serif', fontWeight: 'bolder', }}>
        <Navbar navbar-light  expand="lg" className="custom-navbar" style={{backgroundColor:'#FF00FF'}}>
          <div className="container" style={{height:'16px'}}>
            <Navbar.Brand as={Link} to="/dashboard">
              E-Tracker
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarNav" />
            <Navbar.Collapse id="navbarNav">
              <Nav className="ml-auto">
                <Nav.Link as={Link} to="/login" className="nav-link" style={{color:'#ffffff'}}>
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/" className="nav-link" style={{color:'#ffffff'}}>
                  Register
                </Nav.Link>
                <Nav.Link as={Link} to="/logout" className="nav-link" style={{color:'#ffffff'}}>
                  Logout
                </Nav.Link>
                <Nav.Link as={Link} to="/feedback" className="nav-link" style={{color:'#ffffff'}}>
                  Share
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </div>
        </Navbar>
      </div>
      <div className="container mt-4">
        <Routes>
          <Route path="/dashboard/:userId" element={<Dashboard />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/" element={<RegisterForm />} />
          <Route path="/expenses" element={<ExpenseForm />} />
          <Route path="/transactions" element={<TransactionList />} />
          <Route path="/feedback" element={<Feedback />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

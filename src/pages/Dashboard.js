import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ExpenseForm from '../ExpenseForm';
const Dashboard = () => {
  const [activeLink, setActiveLink] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Set the active link based on the current URL
    const currentPath = window.location.pathname;
    setActiveLink(currentPath);
  }, []);

  const handleLinkClick = (link) => {
    setActiveLink(link);
    navigate(link);
  };

  return (
    <div className="container-fluid" style={{marginLeft:'-10%', width:'100%'}}>
      <div className="row">
        <div className="col-md-3 bg-primary text-light" style={{ minHeight: '100vh' }}>
          <div className="sidebar">
            <ul className="list-group">
              <li className={`list-group-item ${activeLink === '/expenses' ? 'active' : ''}`}>
                <button
                  className="btn btn-link"
                  onClick={() => handleLinkClick('/expenses')}
                  style={{ color: '#A9A9A9' }}
                >
                  Expense Form
                </button>
              </li>
              <li className={`list-group-item ${activeLink === '/transactions' ? 'active' : ''}`}>
                <button
                  className="btn btn-link"
                  onClick={() => handleLinkClick('/transactions')}
                  style={{ color: '#A9A9A9' }}
                >
                  Transaction List
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-md-9">
          <div className="container mt-4">
            {/* Render other pages based on activeLink */}
            {activeLink === '/expenses' && <ExpenseForm />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

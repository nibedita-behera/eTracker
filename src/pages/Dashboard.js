import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import { Client, Databases, Account } from 'appwrite';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const endpoint = 'https://cloud.appwrite.io/v1';
const project = '6475ed780344f01c4b66';

const appwrite = new Client();
appwrite.setEndpoint(endpoint).setProject(project);

const database = new Databases(appwrite, '6487fa3c68cadbcea3c1');
const account = new Account(appwrite);
const collectionId = '6487fa75b30eba4f8a73';
const databaseId = '6487fa3c68cadbcea3c1';

const ExpenseForm = () => {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [expense, setExpense] = useState('');
  const [paymentMode, setPaymentMode] = useState('');
  const [appName, setAppName] = useState('');
  const [currency, setCurrency] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [userEmail, setUserEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const documentId = nanoid();

      const response = await database.createDocument(databaseId, collectionId, documentId, {
        amount: amount,
        date: date,
        expense: expense,
        PaymentMode: paymentMode,
        appName: appName,
        currency: currency,
        userEmail: userEmail,
      });

      const newExpense = {
        $id: response.$id,
        date: date,
        expense: expense,
        PaymentMode: paymentMode,
        appName: appName,
        currency: currency,
        userEmail: userEmail,
      };

      // Reset form fields
      setAmount('');
      setDate('');
      setExpense('');
      setPaymentMode('');
      setAppName('');
      setCurrency('');
      setUserEmail('');

      setExpenses((prevExpenses) => [...prevExpenses, newExpense]);

      // Display success message or perform any additional actions
      console.log('Expense saved successfully!');
      setMessage('Expense saved successfully!');
    } catch (error) {
      console.error('Failed to save expense:', error);
    }
  };

  return (
    <>
      <div className="container-fluid" style={{ marginLeft: '-19%', marginTop: '-2%' }}>
        <div className="row">
          <div className="col-lg-3 navbar-light text-light d-none d-lg-block" style={{ minHeight: '100vh', backgroundColor:'#FF00FF' }}>
            <div className="sidebar">
              <ul className="list-group">
                <li className="list-group-item">
                  <Link to="/expenses" style={{ color: '#A9A9A9' }}>
                    Expense Form
                  </Link>
                </li>
                <li className="list-group-item">
                  <Link to="/transactions" style={{ color: '#A9A9A9' }}>
                    Transaction List
                  </Link>
                </li>
                <li className="list-group-item">
                  <Link to="/feedback" style={{ color: '#A9A9A9' }}>
                    Share Experience
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-9" style={{}}>
            <div className="container" >
              <h2 className="mb-4" style={{ justifyContent: 'center', marginLeft: '50%' }}>
                Add Expense
              </h2>
              <form 
                onSubmit={handleSubmit}
                style={{
                  backgroundColor: '#f8f9fa',
                  padding: '20px',
                  borderRadius: '5px',
                  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                  marginLeft:'20%'
                }}
              >
                <div className="mb-3">
                  <label htmlFor="amount" className="form-label fw-bold">
                    Amount:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                    style={{ borderColor: '#ced4da' }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="date" className="form-label fw-bold">
                    Date:
                  </label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    style={{ borderColor: '#ced4da' }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="expense" className="form-label fw-bold">
                    Expense:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="expense"
                    value={expense}
                    onChange={(e) => setExpense(e.target.value)}
                    required
                    style={{ borderColor: '#ced4da' }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="paymentMode" className="form-label fw-bold">
                    Payment Mode:
                  </label>
                  <select
                    className="form-select"
                    id="paymentMode"
                    value={paymentMode}
                    onChange={(e) => setPaymentMode(e.target.value)}
                    required
                    style={{ borderColor: '#ced4da' }}
                  >
                    <option value="">Select Payment Mode</option>
                    <option value="credit/debit card">Credit/Debit Card</option>
                    <option value="G pay">G Pay</option>
                    <option value="Ph pay">Ph Pay</option>
                    <option value="Paytm">Paytm</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="appName" className="form-label fw-bold">
                    App Name:
                  </label>
                  <select
                    className="form-select"
                    id="appName"
                    value={appName}
                    onChange={(e) => setAppName(e.target.value)}
                    required
                    style={{ borderColor: '#ced4da' }}
                  >
                    <option value="">Select the App</option>
                    <option value="Amazon">Amazon</option>
                    <option value="Flipkart">Flipkart</option>
                    <option value="Zomato">Zomato</option>
                    <option value="Uber">Uber</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="currency" className="form-label fw-bold">
                    Currency:
                  </label>
                  <select
                    className="form-select"
                    id="currency"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    required
                    style={{ borderColor: '#ced4da' }}
                  >
                    <option value="">Select Currency</option>
                    <option value="INR">INR</option>
                    <option value="USD">USD</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="userEmail" className="form-label fw-bold">
                    Email:
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="userEmail"
                    placeholder="Please enter the same email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    required
                    style={{ borderColor: '#ced4da' }}
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  Save Expense
                </button>
                <button className="btn btn-primary" style={{ marginLeft: '5%', color: '#ffffff' }}>
                  <Link to="/transactions" style={{ color: 'whitesmoke' }}>
                    Check Your Transactions
                  </Link>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExpenseForm;

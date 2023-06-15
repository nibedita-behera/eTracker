import React, { useState, useEffect } from 'react';
import{Link} from 'react-router-dom'
import { Client, Databases } from 'appwrite';
import { Pie } from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const endpoint = 'https://cloud.appwrite.io/v1';
const project = '6475ed780344f01c4b66';

const appwrite = new Client();
appwrite.setEndpoint(endpoint).setProject(project);

const database = new Databases(appwrite, '6487fa3c68cadbcea3c1');
const collectionId = '6487fa75b30eba4f8a73';
const databaseId = '6487fa3c68cadbcea3c1';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [userEmail, setUserEmail] = useState('');
  const [error, setError] = useState(null);

  const fetchTransactions = async () => {
    try {
      const response = await database.listDocuments(databaseId, collectionId);

      const filteredTransactions = response.documents.filter(
        (transaction) => transaction.userEmail === userEmail
      );

      setTransactions(filteredTransactions);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setError('Error fetching transactions');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchTransactions();
  };

  // Prepare data for the pie chart (Payment Mode)
  const pieChartDataPaymentMode = {
    labels: transactions.map((transaction) => transaction.PaymentMode),
    datasets: [
      {
        data: transactions.map((transaction) => transaction.amount),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#FF8A80',
          '#7E57C2',
          '#81C784',
        ],
      },
    ],
  };

  // Prepare data for the pie chart (App Name)
  const pieChartDataAppName = {
    labels: transactions.map((transaction) => transaction.appName),
    datasets: [
      {
        data: transactions.map((transaction) => transaction.amount),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#FF8A80',
          '#7E57C2',
          '#81C784',
        ],
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    
      
  
  <div  style={{ marginTop: '5%' ,marginLeft:'-17%'}}>
          <div className="row">
            <div className="col-md-3 bg-primary text-light" style={{ minHeight: '100vh' }}>
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
                      Feedback
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className='col-md-9'>
      <div className="container">
      <h2 className="my-4">Transaction List</h2>
      <div className="d-flex justify-content-center mt-4">
        <div className="mx-2" style={{ width: '40%' }}>
          <h3>Payment Mode Distribution</h3>
          {transactions.length > 0 && (
            <Pie data={pieChartDataPaymentMode} options={chartOptions} />
          )}
        </div>
        <div className="mx-2" style={{ width: '40%' }}>
          <h3>App Name Distribution</h3>
          {transactions.length > 0 && (
            <Pie data={pieChartDataAppName} options={chartOptions} />
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="userEmail">Enter your email:</label>
          <input
            type="email"
            id="userEmail"
            className="form-control"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Fetch Transactions</button>
      </form>

      {error && <p className="alert alert-danger mt-4">{error}</p>}
      {transactions.length > 0 ? (
        <div>
          <h3 className="mt-4">Transaction Details</h3>
          <ul className="list-group mt-2">
            {transactions.map((transaction) => (
              <li key={transaction.$id} className="list-group-item">
                <strong>Amount:</strong> {transaction.amount}<br />
                <strong>Date:</strong> {transaction.date}<br />
                <strong>Payment Mode:</strong> {transaction.PaymentMode}<br />
                <strong>App Name:</strong> {transaction.appName}<br />
                <strong>Currency:</strong> {transaction.currency}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="mt-4">No transactions found.</p>
      )}
    </div>
    </div>
          </div>
        </div>
  

    
    
    
    
  
  
  );
};

export default TransactionList;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [employees, setEmployees] = useState([]);
  const [rowCount, setRowCount] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch employee data from JSONPlaceholder API
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setEmployees(response.data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  const handleRowCountChange = (e) => {
    setRowCount(parseInt(e.target.value));
  };

  const filterEmployees = (employees, query) => {
    return employees.filter(employee => {
      return (
        employee.name.toLowerCase().includes(query.toLowerCase()) ||
        employee.email.toLowerCase().includes(query.toLowerCase())
      );
    });
  };

  const filteredEmployees = filterEmployees(employees, searchQuery);

  return (
    <div className="App">
      <h2>Employee Data</h2>
      <label htmlFor="row-count">Select Rows:</label>
      <select id="row-count" onChange={handleRowCountChange} value={rowCount}>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>

      <label htmlFor="search">Search:</label>
      <input
        type="text"
        id="search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.slice(0, rowCount).map(employee => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;

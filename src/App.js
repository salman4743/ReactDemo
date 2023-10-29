import React, { useState, useEffect } from 'react';
import { getDatabase, ref, get } from 'firebase/database';
import firebaseApp from './firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // You can create a custom CSS file for your app

function App() {
  const [data, setData] = useState([]);
  const [rowCount, setRowCount] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const db = getDatabase(firebaseApp);
    const dataRef = ref(db, 'employees');

    get(dataRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const employeeData = snapshot.val();
          const employeeArray = Object.values(employeeData);
          setData(employeeArray);
        } else {
          console.log('No data available');
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleRowCountChange = (e) => {
    setRowCount(parseInt(e.target.value));
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSort = (columnName) => {
    if (sortBy === columnName) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(columnName);
      setSortOrder('asc');
    }
  };

  const sortedData = [...data];

  if (sortBy) {
    sortedData.sort((a, b) => {
      const valueA = a[sortBy];
      const valueB = b[sortBy];
      if (sortOrder === 'asc') {
        return valueA < valueB ? -1 : 1;
      } else {
        return valueA > valueB ? -1 : 1;
      }
    });
  }

  const filteredData = sortedData.filter((employee) => {
    return (
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.age.toString().includes(searchQuery)
    );
  });

  return (
    <div className="container mt-5">
      <h2 className="text-primary">Employee Data</h2>
      <label htmlFor="row-count" className="form-label">
        Select Rows:
      </label>
      <select
        id="row-count"
        onChange={handleRowCountChange}
        value={rowCount}
        className="form-select"
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>

      <label htmlFor="search" className="form-label">
        Search:
      </label>
      <input
        type="text"
        id="search"
        placeholder="Search..."
        className="form-control"
        value={searchQuery}
        onChange={handleSearch}
      />

      <table className="table table-striped table-bordered mt-3">
        <thead className="table-primary">
          <tr>
            <th onClick={() => handleSort('name')}>
              Name
              {sortBy === 'name' && (
                <i
                  className={`fas fa-sort-${
                    sortOrder === 'asc' ? 'up' : 'down'
                  }`}
                ></i>
              )}
            </th>
            <th onClick={() => handleSort('age')}>
              Age
              {sortBy === 'age' && (
                <i
                  className={`fas fa-sort-${
                    sortOrder === 'asc' ? 'up' : 'down'
                  }`}
                ></i>
              )}
            </th>
            {/* Add other columns here */}
          </tr>
        </thead>
        <tbody>
          {filteredData.slice(0, rowCount).map((employee, index) => (
            <tr key={index}>
              <td>{employee.name}</td>
              <td>{employee.age}</td>
              {/* Add other columns here */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;

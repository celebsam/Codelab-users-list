// src/UserList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filters, setFilters] = useState({
    ageRange: { min: 0, max: 100 },
    nationality: 'all',
    gender: 'all',
    search: '',
  });

  useEffect(() => {
    // Fetch users data from randomuser.me API
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://randomuser.me/api/?results=50');
        setUsers(response.data.results);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  // Apply filters and search when users or filters change
  useEffect(() => {
    let filtered = users.filter(user => {
      const { ageRange, nationality, gender, search } = filters;
      const age = parseInt(user.dob.age);
      const name = user.name.first.toLowerCase() + user.name.last.toLowerCase();

      // Filter by age
      if (age < ageRange.min || age > ageRange.max) return false;

      // Filter by nationality
      if (nationality !== 'all' && user.nat !== nationality) return false;

      // Filter by gender
      if (gender !== 'all' && user.gender !== gender) return false;

      // Filter by search term in name
      if (search !== '' && !name.includes(search.toLowerCase())) return false;

      return true;
    });

    setFilteredUsers(filtered);
  }, [users, filters]);

  return (
    <div>
      {/* Filter options */}
      <div>
        {/* Age Range */}
        <label>
          Age Range:
          <input
            type="number"
            value={filters.ageRange.min}
            onChange={e => setFilters({ ...filters, ageRange: { ...filters.ageRange, min: e.target.value } })}
          />
          <input
            type="number"
            value={filters.ageRange.max}
            onChange={e => setFilters({ ...filters, ageRange: { ...filters.ageRange, max: e.target.value } })}
          />
        </label>

        {/* Nationality */}
        <label>
          Nationality:
          <select value={filters.nationality} onChange={e => setFilters({ ...filters, nationality: e.target.value })}>
            <option value="all">All</option>
            <option value="AU">AU</option>
            <option value="BR">BR</option>
            {/* Add more nationality options here */}
          </select>
        </label>

        {/* Gender */}
        <label>
          Gender:
          <select value={filters.gender} onChange={e => setFilters({ ...filters, gender: e.target.value })}>
            <option value="all">All</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>

        {/* Search */}
        <label>
          Search by Name:
          <input
            type="text"
            value={filters.search}
            onChange={e => setFilters({ ...filters, search: e.target.value })}
          />
        </label>
      </div>

      {/* Display users */}
      <div>
        {filteredUsers.map(user => (
          <div key={user.login.uuid}>
            <img src={user.picture.thumbnail} alt={user.name.first} />
            <p>{`${user.name.first} ${user.name.last}`}</p>
            <p>{`Age: ${user.dob.age}`}</p>
            <p>{`Gender: ${user.gender}`}</p>
            <p>{`Nationality: ${user.nat}`}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;

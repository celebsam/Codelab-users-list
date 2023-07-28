import React, { useState, useEffect } from "react";
import axios from "axios";
import UserCard from "./UserCard";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nationality, setNationality] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    // Fetch users data from randomuser.me API
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://randomuser.me/api/?results=50"
        );
        setUsers(response.data.results);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleFilter = () => {
    let filteredUsers = [...users];

    if (age === "16-30") {
      filteredUsers = filteredUsers.filter((user) => user.dob.age <= 30);
    } else if (age === "31-50") {
      filteredUsers = filteredUsers.filter(
        (user) => user.dob.age > 30 && user.dob.age <= 50
      );
    } else if (age === "51-70") {
      filteredUsers = filteredUsers.filter(
        (user) => user.dob.age > 50 && user.dob.age <= 70
      );
    } else if (age === "71-100") {
      filteredUsers = filteredUsers.filter((user) => user.dob.age > 70);
    } else {
      filteredUsers = filteredUsers.filter((user) => user.dob.age > 15);
    }

    if (nationality) {
      filteredUsers = filteredUsers.filter((user) => user.nat === nationality);
    }

    if (gender) {
      filteredUsers = filteredUsers.filter((user) => user.gender === gender);
    }

    if (searchName) {
      filteredUsers = filteredUsers.filter((user) =>
        `${user.name.first} ${user.name.last}`
          .toLowerCase()
          .includes(searchName.toLowerCase())
      );
    }

    setFilteredUsers(filteredUsers);
  };

  useEffect(() => {
    handleFilter();
  }, [users, nationality, gender, searchName, age]);

  const handleClear = () => {
    setNationality("");
    setAge("");
    setGender("")
    setSearchName("")
  };
  return (
    <div>
      {/* Filter options */}
      <form>
        {/* Age */}
        <div className="mb-4">
          <label htmlFor="age" className="block text-md text-gray-900">
            Age:
          </label>
          <select
            id="age"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm
            rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full
            p-2.5 dark:bg-gray-700 dark:border-gray-600
            dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
            dark:focus:border-blue-500"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          >
            <option value="">All</option>
            <option value="16-30">16 - 30</option>
            <option value="31-50">31 - 50</option>
            <option value="51-70">51 - 70</option>
            <option value="71-100">71 - 100</option>
          </select>
        </div>

        {/* Nationality */}
        <div className="mb-4">
          <label htmlFor="nationality" className="block text-md text-gray-900">
            Nationality:
          </label>
          <select
            id="nationality"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm
            rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full
            p-2.5 dark:bg-gray-700 dark:border-gray-600
            dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
            dark:focus:border-blue-500"
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
          >
            <option value="">All</option>
            <option value="AU">AU</option>
            <option value="BR">BR</option>
            <option value="US">US</option>
            <option value="NZ">NZ</option>
            <option value="ES">ES</option>
            <option value="FR">FR</option>
            <option value="GB">GB</option>
          </select>
        </div>

        {/* Gender */}
        <div className="mb-4">
          <label htmlFor="gender" className="block text-md text-gray-900">
            Gender:
          </label>
          <select
            id="gender"
            name="gender"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm
          rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full
          p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
          dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">All</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        {/* Search */}
        <div>
          <label>
            Search by Name:
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm
          rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full
          p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
          dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              placeholder="Enter text"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
          </label>
        </div>
      </form>

      {/* Display users */}
      <div>
        <div className="flex items-center justify-between mt-6 mb-3">
          <h3 className="text-xl font-bold">Results</h3>
          <button
            onClick={handleClear}
            className="bg-gray-700 py-2 px-6 text-white rounded-md"
          >
            Clear filters
          </button>
        </div>
        {loading ? (
          <div className="grid place-items-center mt-10">
            <span
              className="animate-ping inline-flex h-10 w-10
        rounded-full bg-gray-900 "
            ></span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredUsers.map((user) => (
              <div key={user.login.uuid}>
                <UserCard
                  image={user.picture.large}
                  name={`${user.name.first}
        ${user.name.last}`}
                  age={user.dob.age}
                  gender={user.gender}
                  nationality={user.nat}
                />
              </div>
            ))}
          </div>
        )}

        {!loading && filteredUsers.length < 1 ? (
          <h3 className="text-xl mb-1 mt-5 text-center">No results found!</h3>
        ) : null}
      </div>
    </div>
  );
};

export default UserList;

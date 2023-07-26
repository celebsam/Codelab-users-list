import React, { useState, useEffect } from "react";
import axios from "axios";
import UserCard from "./UserCard";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [ageRange, setAgeRange] = useState({ min: "", max: "" });
  const [nationality, setNationality] = useState("");
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

    if (ageRange.min !== "" && ageRange.max !== "") {
      filteredUsers = filteredUsers.filter(
        (user) =>
          user.dob.age >= parseInt(ageRange.min) &&
          user.dob.age <= parseInt(ageRange.max)
      );
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
  }, [users, ageRange, nationality, gender, searchName]);

  return (
    <div>
      {/* Filter options */}
      <form>
        {/* Age Range */}
        <label>
          Age Range:
          <input
            type="number"
            value={ageRange.min}
            onChange={(e) => setAgeRange({ ...ageRange, min: e.target.value })}
          />
          <input
            type="number"
            value={ageRange.max}
            onChange={(e) => setAgeRange({ ...ageRange, max: e.target.value })}
          />
        </label>

        {/* Nationality */}
        <div className="mb-4">
          <label
            htmlFor="nationality"
            className="block mb-1 text-md text-gray-900"
          >
            Nationality
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
            {/* Add more nationality options here */}
          </select>
        </div>

        {/* Gender */}
        <div className="mb-4">
          <label htmlFor="gender" className="block mb-1 text-md text-gray-900">
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
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
          </label>
        </div>
      </form>

      {/* Display users */}

      <div>
        <h3 className="text-xl mb-1 mt-5 font-bold">Results</h3>
        {loading ? (
          <div className="grid place-items-center mt-10">
            <span
              className="animate-ping inline-flex h-10 w-10
        rounded-full bg-gray-900 "
            ></span>
          </div>
        ) : (
          <div>
            {filteredUsers.map((user) => (
              <div key={user.login.uuid}>
                <UserCard
                  image={user.picture.thumbnail}
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
      </div>
    </div>
  );
};

export default UserList;

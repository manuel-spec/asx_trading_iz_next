import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';
import axios from 'axios';

const Support = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          'https://uapi.universe-safepal.site/api/users',
        );
        setUsers(response.data);
      } catch (error) {
        console.error(
          'Error fetching users:',
          error.response ? error.response.data : error.message,
        );
      }
    };
    fetchUsers();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user._id.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="flex flex-col">
      <div className="flex m-2">
        <Link to="/admin/admin/">
          <IoArrowBack />
        </Link>
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={handleSearch}
          className="ml-10 p-1 shadow border-gray-300 rounded"
        />
      </div>
      <div className="flex flex-col m-2">
        <div className="flex flex-col">
          {filteredUsers.map((item, index) => (
            <div className="p-2" key={index}>
              <div
                className="shadow p-3"
                onClick={() =>
                  navigate('/admin/chat/now/', {
                    state: { user_id: item._id },
                  })
                }
              >
                {item._id}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Support;

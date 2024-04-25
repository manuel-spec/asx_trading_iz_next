import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';
import axios from 'axios';

const Support = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios
          .get('https://test.safepauleni.site/api/users')
          .then((res) => setUsers(res['data']));
      } catch (error) {
        console.error(
          'Error fetching users:',
          error.response ? error.response.data : error.message,
        );
      }
    };
    fetchUsers();
    console.log(users);
  }, [users]);
  return (
    <div className="flex flex-col">
      <div className="flex m-2">
        <Link to="/admin/admin/">
          <IoArrowBack />
        </Link>
      </div>
      <div className="flex flex-col m-2">
        <div className="flex flex-col">
          {users &&
            users.map((item, index) => (
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

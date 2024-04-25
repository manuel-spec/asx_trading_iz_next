import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';
import axios from 'axios';

const AdminSupportWindow = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [users, setUsers] = useState([]);
  console.log(location.state);

  return (
    <div className="flex flex-col ">
      <div className="flex m-2">
        <Link to="/admin/admin/">
          <IoArrowBack />
        </Link>
      </div>
    </div>
  );
};

export default AdminSupportWindow;

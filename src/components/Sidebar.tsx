import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { IoHomeOutline, IoSettingsOutline } from 'react-icons/io5';
import { HiOutlineNewspaper } from 'react-icons/hi2';
import { MdOutlineCurrencyExchange } from 'react-icons/md';
import { CiChat1 } from 'react-icons/ci';
import { FaRegUser } from 'react-icons/fa';
import Axios from 'axios';
import { useAccount, useBalance, useDisconnect } from 'wagmi';
import { AiOutlineDisconnect } from 'react-icons/ai';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true',
  );
  const { disconnect } = useDisconnect();

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);
  const { address } = useAccount();
  const { data, isError, isLoading } = useBalance({
    address: address,
  });

  const [uid, setUid] = useState('');
  Axios.get(`https://test.safepauleni.site/api/users/${address}`)
    .then((response) => {
      const id = response.data['_id'];
      const shortenedId = id.substring(0, 5); // Get the first 5 characters of the ID
      setUid(shortenedId);
    })
    .catch((error) => {
      console.error(
        'Error fetching user:',
        error.response ? error.response.data : error.message,
      );
    });

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-white duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <div className="flex flex-col">
          <div>
            <NavLink to="/">
              <h3 className="text-lg text-[#2850E7] ">ASX</h3>
            </NavLink>
          </div>
          <div>
            <p className="">UID : {uid}</p>
          </div>
        </div>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <ul className="mb-6 flex flex-col gap-1.5">
              <h2 className="text-xl font-semibold ml-4">Functions</h2>
              {/* <!-- Menu Item Dashboard --> */}
              <NavLink
                onClick={() => setSidebarOpen(false)}
                to="/accounts"
                className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4  duration-300 ease-in-out 
                    }`}
              >
                <div className="focus:bg-[#ffffff]">
                  <FaRegUser style={{ color: '#2850E7' }} size={20} />
                </div>
                Account
              </NavLink>

              <NavLink
                onClick={() => setSidebarOpen(false)}
                to="/"
                className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4  duration-300 ease-in-out  hover:rounded-lg dark:hover:bg-meta-4
              }`}
              >
                <IoHomeOutline style={{ color: '#2850E7' }} size={23} />
                Home
              </NavLink>
              {/* <!-- Menu Item Dashboard --> */}

              <li>
                <NavLink
                  onClick={() => setSidebarOpen(false)}
                  to="/News"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4  duration-300 ease-in-out  hover:rounded-lg dark:hover:bg-meta-4
                    }`}
                >
                  <HiOutlineNewspaper style={{ color: '#2850E7' }} size={23} />
                  News
                </NavLink>
              </li>
              <li>
                <NavLink
                  onClick={() => setSidebarOpen(false)}
                  to="/cryptocurrerncies"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4  duration-300 ease-in-out  hover:rounded-lg dark:hover:bg-meta-4
                    }`}
                >
                  <MdOutlineCurrencyExchange
                    style={{ color: '#2850E7' }}
                    size={23}
                  />
                  Cryptos
                </NavLink>
              </li>

              {/* <!-- Menu Item Chat --> */}
              <li>
                <a
                  onClick={() => setSidebarOpen(false)}
                  href="https://customersupport.safepauleni.site/"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4  duration-300 ease-in-out  hover:rounded-lg dark:hover:bg-meta-4 
                    }`}
                >
                  <CiChat1 style={{ color: '#2850E7' }} size={23} />
                  Customer Service
                </a>
                <NavLink
                  onClick={() => setSidebarOpen(false)}
                  to="/Settings"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4  duration-300 ease-in-out  hover:rounded-lg dark:hover:bg-meta-4 
                    }`}
                >
                  <IoSettingsOutline style={{ color: '#2850E7' }} size={23} />
                  Profile
                </NavLink>
              </li>
              <li>
                <div className="group relative flex items-center gap-2.5 rounded-sm py-2 px-4  duration-300 ease-in-out  hover:rounded-lg dark:hover:bg-meta-4  ">
                  <AiOutlineDisconnect style={{ color: '#2850E7' }} size={23} />
                  <button className="text-black" onClick={() => disconnect()}>
                    Disconnect
                  </button>
                </div>
              </li>
              {/* <!-- Menu Item Profile --> */}
            </ul>
          </div>

          {/* <!-- Others Group --> */}
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;

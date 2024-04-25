import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import Modal from '@mui/material/Modal';
import { Box, Typography } from '@mui/material';
import { IoArrowBack } from 'react-icons/io5';

const cookies = new Cookies();

const style = {
  position: 'absolute' as '',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,

  bgcolor: 'background.paper',
  border: '2px solid #fff',
  boxShadow: 24,
  p: 4,
};

const Admin = () => {
  const navigate = useNavigate();
  const token = cookies.get('jwtToken');
  const [openModalIndex, setOpenModalIndex] = useState(null);
  const [profit, setProfit] = useState(true);

  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editedBalances, setEditedBalances] = useState({});
  const [demoBalance, setDemoBalance] = useState(0);
  const [ETHPrice, setEthPrice] = useState(0);
  const [BTCPrice, setBTCPrice] = useState(0);
  const [USDTPrice, setUSDTPrice] = useState(0);
  const [BNBPrice, setBNBPrice] = useState(0);
  const [SOLPrice, setSOLPrice] = useState(0);
  const [XRPPrice, setXRPPrice] = useState(0);
  const [USDCPrice, setUSDCPrice] = useState(0);
  const [ADAPrice, setADAPrice] = useState(0);
  const [AVAXPrice, setAVAXPrice] = useState(0);
  const [DOGEPrice, setDOGEPrice] = useState(0);

  useEffect(() => {
    if (!token) {
      navigate('/auth/signin');
    }
    // Fetch users when the component mounts
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await Axios.get(
        'https://test.safepauleni.site/api/users',
      );
      setUsers(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(
        'Error fetching users:',
        error.response ? error.response.data : error.message,
      );
    }
  };

  const editBalance = async (userId) => {
    try {
      const newBalance = editedBalances[userId];
      await Axios.put(`https://test.safepauleni.site/api/users/${userId}`, {
        USDTBalance: newBalance,
      });
      // Refresh the user list after updating the balance
      fetchUsers();
    } catch (error) {
      console.error(
        'Error updating balance:',
        error.response ? error.response.data : error.message,
      );
    }
  };

  const handleBalanceChange = (userId, newValue) => {
    setEditedBalances((prevState) => ({
      ...prevState,
      [userId]: newValue,
    }));
  };

  const handleBlur = (userId) => {
    // Perform any validation or processing when the input field loses focus
    // In this case, you can choose to save the edited balance immediately
    editBalance(userId);
  };

  const logout = () => {
    cookies.remove('jwtToken', { path: '/' });
    navigate('/auth/signin');
  };

  const filteredUsers = users.filter((user) =>
    user._id.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const handleCloseModal = () => {
    setOpenModalIndex(null);
  };
  const handleBalanceUpdate = (updatedBalance, CoinSymbol, event, address) => {
    event.preventDefault();
    console.log(updatedBalance, CoinSymbol);

    let newdata = {
      balance: updatedBalance,
      coinSymbol: CoinSymbol,
    };
    try {
      Axios.put(
        `https://test.safepauleni.site/api/users/update/balance/${address}`,
        newdata,
      ).then((response) => {
        console.log(response.data);
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const setProfitUp = (address) => {
    setProfit(true);
    let data = {
      profit: profit,
    };
    try {
      Axios.put(
        `https://test.safepauleni.site/api/users/update/profit/${address}`,
        data,
      ).then((response) => {
        console.log(response.data);
        alert('profit turned on');
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const setProfitDown = (address) => {
    setProfit(false);
    let data = {
      profit: profit,
    };
    try {
      Axios.put(
        `https://test.safepauleni.site/api/users/update/profit/${address}`,
        data,
      ).then((response) => {
        console.log(response.data);
        alert('profit turned off');
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <div className="flex">
        <div className="flex flex-row bg-[#2850E7] w-full p-4 text-white">
          <button onClick={() => navigate('admin/chat')} className="ml-5">
            Support
          </button>
          <button onClick={logout} className="ml-5 text-red">
            Logout
          </button>

          <div className="flex-1">
            <input
              className="ml-3 rounded py-2 px-3  text-black focus:outline-none focus:shadow-outline"
              placeholder="wallet address"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div></div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <tbody>
            {filteredUsers.map((user) => (
              <tr className="dark:border-gray-700" key={user._id}>
                <td className="px-6 py-4">
                  <button onClick={() => setOpenModalIndex(user._id)}>
                    {user._id}
                  </button>
                </td>
                <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                  {user.walletAddress}
                </td>
                <td className="px-6 py-4">
                  <input
                    type="text"
                    value={
                      editedBalances[user._id] !== undefined
                        ? editedBalances[user._id]
                        : user.USDTBalance
                    }
                    onChange={(e) =>
                      handleBalanceChange(user._id, e.target.value)
                    }
                    onBlur={() => handleBlur(user._id)}
                  />
                </td>
                <td className="px-6 py-4">
                  <button
                    className="px-3 rounded bg-[#00F700]"
                    onClick={() => editBalance(user._id)}
                  >
                    Edit
                  </button>
                </td>

                <Modal
                  open={openModalIndex === user._id}
                  onClose={handleCloseModal}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <div>
                      <button onClick={handleCloseModal}>
                        {' '}
                        <IoArrowBack />
                      </button>
                    </div>
                    <div className="text-center">
                      <form>
                        <div>
                          profit
                          <button
                            className="shadow p-3 bg-[#37F713] mr-3 px-4"
                            onClick={(e) => {
                              e.preventDefault();
                              setProfitUp(user.walletAddress);
                            }}
                          >
                            on
                          </button>
                          <button
                            className="shadow p-3 bg-[#FF0000] px-4"
                            onClick={(e) => {
                              e.preventDefault();
                              setProfitDown(user.walletAddress);
                            }}
                          >
                            off
                          </button>
                        </div>
                        <Typography
                          id="modal-modal-title"
                          variant="h6"
                          component="h2"
                        >
                          User Id: {user._id}
                        </Typography>
                        <Typography
                          id="modal-modal-title"
                          variant="h6"
                          component="h2"
                        >
                          User walletAddress: {user.walletAddress}
                        </Typography>
                        <div>
                          <label htmlFor="demoBalance">Demo Balance:</label>
                          <input
                            type="text"
                            id="demoBalance"
                            value={user.DemoBalance}
                            onChange={(e) => setDemoBalance(e.target.value)}
                            className="shadow border-1 rounded-lg mt-1 text-center"
                          />
                          <button
                            className="shadow p-3 hover:bg-[#f32de2] rounded-lg"
                            onClick={() =>
                              handleBalanceUpdate(
                                demoBalance,
                                'DemoBalance',
                                event,
                                user.walletAddress,
                              )
                            }
                          >
                            Update
                          </button>
                        </div>

                        <div>
                          <label htmlFor="USDTPrice">USDT Balance:</label>
                          <input
                            type="text"
                            id="USDTPrice"
                            value={
                              USDTPrice == 0 ? user.USDTBalance : USDTPrice
                            }
                            onChange={(e) => setUSDTPrice(e.target.value)}
                            className="shadow border-1 rounded-lg mt-1 text-center"
                          />
                          <button
                            className="shadow p-3 hover:bg-[#f32de2] rounded-lg"
                            onClick={() =>
                              handleBalanceUpdate(
                                USDTPrice,
                                'USDTBalance',
                                event,
                                user.walletAddress,
                              )
                            }
                          >
                            Update
                          </button>
                        </div>

                        <div>
                          <label htmlFor="BTCPrice">BTC Balance:</label>
                          <input
                            type="text"
                            id="BTCPrice"
                            value={BTCPrice == 0 ? user.BTCBalance : BTCPrice}
                            onChange={(e) => {
                              setBTCPrice(e.target.value);
                            }}
                            className="shadow border-1 rounded-lg mt-1 text-center"
                          />
                          <button
                            className="shadow p-3 hover:bg-[#f32de2] rounded-lg"
                            onClick={() =>
                              handleBalanceUpdate(
                                BTCPrice,
                                'BTCBalance',
                                event,
                                user.walletAddress,
                              )
                            }
                          >
                            Update
                          </button>
                        </div>

                        <div>
                          <label htmlFor="ETHPrice">ETH Balance:</label>
                          <input
                            type="text"
                            id="ETHPrice"
                            value={ETHPrice == 0 ? user.ETHBalance : ETHPrice}
                            onChange={(e) => setEthPrice(e.target.value)}
                            className="shadow border-1 rounded-lg mt-1 text-center"
                          />
                          <button
                            className="shadow p-3 hover:bg-[#f32de2] rounded-lg"
                            onClick={() =>
                              handleBalanceUpdate(
                                ETHPrice,
                                'ETHBalance',
                                event,
                                user.walletAddress,
                              )
                            }
                          >
                            Update
                          </button>
                        </div>

                        <div>
                          <label htmlFor="BNBPrice">BNB Balance:</label>
                          <input
                            type="text"
                            id="BNBPrice"
                            value={BNBPrice == 0 ? user.BNBBalance : BNBPrice}
                            onChange={(e) => setBNBPrice(e.target.value)}
                            className="shadow border-1 rounded-lg mt-1 text-center"
                          />
                          <button
                            className="shadow p-3 hover:bg-[#f32de2] rounded-lg"
                            onClick={() =>
                              handleBalanceUpdate(
                                BNBPrice,
                                'BNBBalance',
                                event,
                                user.walletAddress,
                              )
                            }
                          >
                            Update
                          </button>
                        </div>

                        <div>
                          <label htmlFor="ADAPrice">ADA Balance:</label>
                          <input
                            type="text"
                            id="ADAPrice"
                            value={ADAPrice == 0 ? user.ADABalance : ADAPrice}
                            onChange={(e) => setADAPrice(e.target.value)}
                            className="shadow border-1 rounded-lg mt-1 text-center"
                          />
                          <button
                            className="shadow p-3 hover:bg-[#f32de2] rounded-lg"
                            onClick={() =>
                              handleBalanceUpdate(
                                ADAPrice,
                                'ADABalance',
                                event,
                                user.walletAddress,
                              )
                            }
                          >
                            Update
                          </button>
                        </div>

                        <div>
                          <label htmlFor="DOGEPrice">DOGE Balance:</label>
                          <input
                            type="text"
                            id="DOGEPrice"
                            value={
                              DOGEPrice == 0 ? user.DOGEBalance : DOGEPrice
                            }
                            onChange={(e) => setDOGEPrice(e.target.value)}
                            className="shadow border-1 rounded-lg mt-1 text-center"
                          />
                          <button
                            className="shadow p-3 hover:bg-[#f32de2] rounded-lg"
                            onClick={() =>
                              handleBalanceUpdate(
                                DOGEPrice,
                                'DOGEBalance',
                                event,
                                user.walletAddress,
                              )
                            }
                          >
                            Update
                          </button>
                        </div>

                        <div>
                          <label htmlFor="SOLPrice">SOL Balance:</label>
                          <input
                            type="text"
                            id="SOLPrice"
                            value={SOLPrice == 0 ? user.SOLBalance : SOLPrice}
                            onChange={(e) => setSOLPrice(e.target.value)}
                            className="shadow border-1 rounded-lg mt-1 text-center"
                          />
                          <button
                            className="shadow p-3 hover:bg-[#f32de2] rounded-lg"
                            onClick={() =>
                              handleBalanceUpdate(
                                SOLPrice,
                                'SOLBalance',
                                event,
                                user.walletAddress,
                              )
                            }
                          >
                            Update
                          </button>
                        </div>
                      </form>
                    </div>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      <div className="flex flex-col"></div>
                    </Typography>
                  </Box>
                </Modal>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;

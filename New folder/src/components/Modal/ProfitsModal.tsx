import { IoArrowBack } from 'react-icons/io5';
import { FaExchangeAlt } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import { FaGreaterThan } from 'react-icons/fa6';
import { useAccount } from 'wagmi';
import { Audio } from 'react-loader-spinner';
import TransactionModal from './TransactionModal';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CountDown from './CountDown/CountDown';
import emptyTransaction from '../../images/empty_transaction.svg';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 600,
  bgcolor: 'background.paper',
  border: '2px solid #fff',
  boxShadow: 24,
  p: 4,
  borderRadius: '25px',
};

const ProfitModal = ({ visible, onClose, coindata }) => {
  const [open, setOpen] = useState(false);
  const handleOpenModal = (index) => {
    // console.log('Opening modal for index:', index);
    setOpenModalIndex(index);
  };

  const handleCloseModal = () => {
    setOpenModalIndex(null);
  };

  const handleOnClose = (e) => {
    if (e.target.id === 'container') onClose();
  };
  const handleDiv = (event) => {
    event.stopPropagation();
  };

  // console.log(coindata)
  const [accountType, setAccountType] = useState([
    'Real Account',
    'Demo Account',
  ]);
  const [showComponents, setShowComponents] = useState(true);
  const [activeButton, setActiveButton] = useState('wait');
  const [data, setData] = useState([]);
  const [finishedData, setFinishedData] = useState([]);
  const [percent, setPercent] = useState(1);
  const [seconds, setSeconds] = useState({});
  const { address } = useAccount();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!address) return;

        // Make both GET requests concurrently
        const [response, finishedResponse] = await Promise.all([
          Axios.get(
            `https://uapi.universe-safepal.site/api/porto/wait/${address}`,
          ),
          Axios.get(
            `https://uapi.universe-safepal.site/api/porto/finished/${address}`,
          ),
        ]);

        // Set the state only after both requests have been completed
        setData(response.data);
        setFinishedData(finishedResponse.data.reverse());

        const secondsData = response.data.map((waitingCrypto, index) => ({
          id: index,
          value: parseFloat(waitingCrypto.deliveryTime.replace(/[^\d.]/g, '')),
        }));

        if (response.data.length !== 0) {
          setSeconds(secondsData);
          setPercent(
            parseFloat(response.data[0].priceRange.replace(/[^\d.]/g, '')),
          );
        }
        // Handle success and update data state
      } catch (error) {
        console.error('Error making GET request');
        // Handle error
      }
    };

    fetchData(); // Call the fetch function when the component mounts
  }, []);

  const [accountTypeNow, setAccountTypeNow] = useState(accountType[0]);

  const handleExchange = () => {
    setAccountType((prevAccountType) => {
      // Swap the values at index 0 and 1
      const newAccountType = [...prevAccountType];
      const temp = newAccountType[0];
      newAccountType[0] = newAccountType[1];
      newAccountType[1] = temp;
      setAccountTypeNow(newAccountType[0]);
      return newAccountType;
    });
  };
  const onCountdownCompleted = () => {
    console.log('');
  };
  const getExpectedValue = (priceRange, purchasePrice) => {
    const percentage = parseFloat(priceRange.replace(/\D/g, '')) / 100; // Extract percentage from priceRange and convert to decimal
    return (percentage * purchasePrice).toFixed(2); // Calculate expected value
  };

  const handleButtonClick = (button) => {
    setShowComponents(true);
    setActiveButton(button);
  };
  const [openTransactionModal, setOpenTransactionModal] = useState(false);
  const [openModalIndex, setOpenModalIndex] = useState(null);

  return (
    <div onClick={handleOnClose}>
      {openTransactionModal && <TransactionModal />}
      <div
        className="mt-9 fixed inset-0 flex justify-center items-center z-50"
        onClick={() => onClose()}
        style={{ overflow: 'scroll' }}
      >
        <div
          className="bg-white h-full space-y-6 w-full flex flex-col"
          onClick={handleDiv}
        >
          <div className="flex flex-row justify-between">
            <div className="flex justify-center items-center ml-4">
              <div
                onClick={() => {
                  onClose();
                }}
                className="mr-3"
              >
                <IoArrowBack />
              </div>
              <div>My Contracts</div>
            </div>
            <div className="flex flex-row">
              <div className="mt-1" onClick={handleExchange}>
                <FaExchangeAlt />
              </div>
              <div>{accountType[0]}</div>
            </div>
          </div>
          <div className="p-2 flex flex-row justify-center bg-[#F5F5F5] rounded-xl">
            <div>
              <button
                className={`focus:bg-white px-3 py-1 rounded ${
                  activeButton === 'wait' ? 'bg-gray-300' : ''
                }`}
                onClick={() => handleButtonClick('wait')}
              >
                wait
              </button>
            </div>
            <div className="ml-4">
              <button
                className={`focus:bg-white px-3 py-1 rounded ${
                  activeButton === 'finished' ? 'bg-gray-300' : ''
                }`}
                onClick={() => handleButtonClick('finished')}
              >
                finished
              </button>
            </div>
          </div>
          <div>
            {showComponents && (
              <div className="mt-4">
                {data && activeButton === 'wait' && (
                  <div
                    className="ml-10"
                    style={{
                      maxHeight: '400px',
                      overflowY: 'auto',
                      textAlign: 'justify',
                      scrollbarWidth: 'none',
                    }}
                  >
                    {data.map(
                      (item, index) =>
                        accountTypeNow === 'Real Account' &&
                        item.accountType === 'Real Account' && (
                          <div
                            key={index}
                            className="mt-4 flex flex-row justify-between "
                          >
                            <div className="flex flex-col">
                              <div className="flex flex-col mt-2">
                                <div className="flex flex-row">
                                  <div>
                                    <img
                                      className="coin-logo mr-2"
                                      src={coindata.image}
                                      loading="lazy"
                                      decoding="async"
                                      width={30}
                                      alt={`${item.name} logo`}
                                    />
                                  </div>
                                  <div className="flex flex-row mt-1">
                                    <div className="mr-1">
                                      {item.from.toUpperCase()}/USDT
                                    </div>
                                    <div className="">
                                      {item.createdAt.substring(0, 10)}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="ml-5">
                                <CountDown
                                  Seconds={seconds[index]['value']}
                                  Item={item}
                                  id={index}
                                  closeIt={onClose}
                                />
                              </div>
                            </div>
                            <div className="mt-5">
                              <Button onClick={() => handleOpenModal(index)}>
                                <FaGreaterThan
                                  style={{
                                    color: '#000000',
                                    width: '8px',
                                    height: '12px',
                                  }}
                                />
                              </Button>
                            </div>
                            <div className="mt-4">
                              <Modal
                                open={openModalIndex === index}
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
                                    <Typography
                                      id="modal-modal-title"
                                      variant="h6"
                                      component={'span'}
                                    >
                                      <span> My contrats</span>
                                    </Typography>
                                  </div>
                                  <Typography
                                    id="modal-modal-description"
                                    sx={{ mt: 2 }}
                                    component={'span'}
                                  >
                                    <div className="flex flex-col">
                                      <div>
                                        <div>
                                          {item.from.toUpperCase()} / USDT
                                        </div>
                                      </div>
                                      <div className="flex flex-row justify-between">
                                        <div>Purchase Amount:</div>{' '}
                                        <div>{item.purchasePrice}</div>
                                      </div>
                                      <div className="flex flex-row justify-between">
                                        <div>Direction:</div>{' '}
                                        <div>{item.buyTime}</div>
                                      </div>
                                      <div className="flex flex-row justify-between">
                                        <div>Purchase Price:</div>{' '}
                                        <div>
                                          {coindata.current_price.toFixed(3)}
                                        </div>
                                      </div>
                                      <div className="flex flex-row justify-between">
                                        <div>Contract:</div>{' '}
                                        <div>{item.deliveryTime}</div>
                                      </div>
                                      {/* <div className='flex flex-row justify-between'><div>profit :</div> <span className='text-[#37F713]'>{(parseFloat(item.priceRange.replace(/\D/g, '')) / 100) * item.purchasePrice}</span></div> */}
                                      {/* <div className='flex flex-row justify-between'>Delivery Price: {parseFloat(coindata.current_price.toFixed(3)) + (parseFloat(item.priceRange.replace(/\D/g, '')) / 100) * item.purchasePrice} </div> */}
                                      <div className="flex flex-row justify-between">
                                        <div>Delivery Time:</div>
                                        <CountDown
                                          Seconds={seconds[index]['value']}
                                          Item={item}
                                          id={index}
                                          closeIt={onClose}
                                        />
                                      </div>
                                    </div>
                                  </Typography>
                                </Box>
                              </Modal>
                            </div>
                          </div>
                        ),
                    )}
                  </div>
                )}

                {data && activeButton === 'wait' && (
                  <div
                    className="ml-10"
                    style={{
                      maxHeight: '400px',
                      overflowY: 'auto',
                      textAlign: 'justify',
                      scrollbarWidth: 'none',
                    }}
                  >
                    {data.map(
                      (item, index) =>
                        accountTypeNow === 'Demo Account' &&
                        item.accountType === 'Demo Account' && (
                          <div
                            key={index}
                            className="mt-4 flex flex-row justify-between "
                          >
                            <div className="flex flex-col">
                              <div className="flex flex-col mt-2">
                                <div className="flex flex-row">
                                  <div>
                                    <img
                                      className="coin-logo mr-2"
                                      src={coindata.image}
                                      loading="lazy"
                                      decoding="async"
                                      width={30}
                                      alt={`${item.name} logo`}
                                    />
                                  </div>
                                  <div className="flex flex-row mt-1">
                                    <div className="mr-1">
                                      {item.from.toUpperCase()}/USDT
                                    </div>
                                    <div className="">
                                      {item.createdAt.substring(0, 10)}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="ml-5">
                                <CountDown
                                  Seconds={seconds[index]['value']}
                                  Item={item}
                                  id={index}
                                  closeIt={onClose}
                                />
                              </div>
                            </div>
                            <div className="mt-5">
                              <Button onClick={() => handleOpenModal(index)}>
                                <FaGreaterThan
                                  style={{
                                    color: '#000000',
                                    width: '8px',
                                    height: '12px',
                                  }}
                                />
                              </Button>
                            </div>
                            <div className="mt-4">
                              <Modal
                                open={openModalIndex === index}
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
                                    <Typography
                                      id="modal-modal-title"
                                      variant="h6"
                                      component={'span'}
                                    >
                                      <span> My contrats</span>
                                    </Typography>
                                  </div>
                                  <Typography
                                    id="modal-modal-description"
                                    sx={{ mt: 2 }}
                                    component={'span'}
                                  >
                                    <div className="flex flex-col">
                                      <div>
                                        <div>
                                          {item.from.toUpperCase()} / USDT
                                        </div>
                                      </div>
                                      <div className="flex flex-row justify-between">
                                        <div>Purchase Amount:</div>{' '}
                                        <div>{item.purchasePrice}</div>
                                      </div>
                                      <div className="flex flex-row justify-between">
                                        <div>Direction:</div>{' '}
                                        <div>{item.buyTime}</div>
                                      </div>
                                      <div className="flex flex-row justify-between">
                                        <div>Purchase Price:</div>{' '}
                                        <div>
                                          {coindata.current_price.toFixed(3)}
                                        </div>
                                      </div>
                                      <div className="flex flex-row justify-between">
                                        <div>Contract:</div>{' '}
                                        <div>{item.deliveryTime}</div>
                                      </div>
                                      {/* <div className='flex flex-row justify-between'><div>profit :</div> <span className='text-[#37F713]'>{(parseFloat(item.priceRange.replace(/\D/g, '')) / 100) * item.purchasePrice}</span></div> */}
                                      {/* <div className='flex flex-row justify-between'>Delivery Price: {parseFloat(coindata.current_price.toFixed(3)) + (parseFloat(item.priceRange.replace(/\D/g, '')) / 100) * item.purchasePrice} </div> */}
                                      <div className="flex flex-row justify-between">
                                        <div>Delivery Time:</div>
                                        <CountDown
                                          Seconds={seconds[index]['value']}
                                          Item={item}
                                          id={index}
                                          closeIt={onClose}
                                        />
                                      </div>
                                    </div>
                                  </Typography>
                                </Box>
                              </Modal>
                            </div>
                          </div>
                        ),
                    )}
                  </div>
                )}
                {/* for finished account */}

                {activeButton === 'finished' && (
                  <div
                    className="ml-10"
                    style={{
                      maxHeight: '400px',
                      overflowY: 'auto',
                      textAlign: 'justify',
                      scrollbarWidth: 'none',
                    }}
                  >
                    {finishedData.map(
                      (item, index) =>
                        accountTypeNow === 'Demo Account' &&
                        item.accountType === 'Demo Account' && (
                          <div
                            key={index}
                            className="flex flex-row justify-between border-b text-sm"
                          >
                            <div className="flex flex-col mt-2">
                              <div className="flex flex-row">
                                <div>
                                  <img
                                    className="coin-logo mr-2"
                                    src={coindata.image}
                                    loading="lazy"
                                    decoding="async"
                                    width={30}
                                    alt={`${item.name} logo`}
                                  />
                                </div>
                                <div className="flex flex-row mt-1">
                                  <div className="mr-1">
                                    {item.from.toUpperCase()}/USDT
                                  </div>
                                  <div className="">
                                    {item.createdAt.substring(0, 10)}
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-row mb-1 mt-1">
                                <span>Profit</span>{' '}
                                <span className="text-[#37F713] ml-3">
                                  {getExpectedValue(
                                    item.priceRange,
                                    item.purchasePrice,
                                  )}
                                </span>
                              </div>
                            </div>
                            <div>
                              <div className="mt-5">
                                <Button onClick={() => handleOpenModal(index)}>
                                  <FaGreaterThan
                                    style={{
                                      color: '#000000',
                                      width: '8px',
                                      height: '12px',
                                    }}
                                  />
                                </Button>
                              </div>
                              <div className="mt-4">
                                <Modal
                                  open={openModalIndex === index}
                                  onClose={handleCloseModal}
                                  aria-labelledby="modal-modal-title"
                                  aria-describedby="modal-modal-description"
                                  className=""
                                >
                                  <Box sx={style}>
                                    <div>
                                      <button onClick={handleCloseModal}>
                                        {' '}
                                        <IoArrowBack />
                                      </button>
                                    </div>
                                    <div className="text-center  mb-9">
                                      My Contract
                                    </div>
                                    <Typography
                                      id="modal-modal-description"
                                      sx={{ mt: 2 }}
                                      component={'span'}
                                    >
                                      <div className="flex flex-col text-sm ">
                                        <div className="flex flex-row mb-4">
                                          <img
                                            className="coin-logo mr-2"
                                            src={coindata.image}
                                            loading="lazy"
                                            decoding="async"
                                            width={30}
                                            alt={`${item.name} logo`}
                                          />
                                          <div className="mt-1">
                                            {item.from.toUpperCase()} / USDT
                                          </div>{' '}
                                          <div className="ml-5 mt-1">
                                            {item.createdAt.substring(0, 10)}{' '}
                                            {item.createdAt.substring(11, 19)}
                                          </div>
                                        </div>
                                        <div className="flex flex-row justify-between mb-2">
                                          <div>Purchase Amount</div>{' '}
                                          <div className="font-normal">
                                            {item.purchasePrice} USDT
                                          </div>
                                        </div>
                                        <div className="flex flex-row justify-between mb-2">
                                          <div>Direction</div>{' '}
                                          <div className="text-[#00ff00] font-normal">
                                            {item.buyTime}
                                          </div>
                                        </div>
                                        <div className="flex flex-row justify-between mb-2">
                                          <div>Purchase Price</div>{' '}
                                          <div>
                                            {coindata.current_price.toFixed(3)}
                                          </div>
                                        </div>
                                        <div className="flex flex-row justify-between mb-2">
                                          <div>Contract</div>{' '}
                                          <div>{item.deliveryTime}</div>
                                        </div>
                                        <div className="flex flex-row justify-between mb-2">
                                          <div>Profit</div>{' '}
                                          <div className="text-[#00ff00]">
                                            {getExpectedValue(
                                              item.priceRange,
                                              item.purchasePrice,
                                            )}
                                          </div>
                                        </div>
                                        <div className="flex flex-row justify-between mb-2">
                                          <div>Delivery Price</div>{' '}
                                          <div>
                                            {item.buyTime === 'Buy long'
                                              ? (
                                                  parseFloat(
                                                    coindata.current_price,
                                                  ) + 0.831
                                                ).toFixed(3)
                                              : (
                                                  parseFloat(
                                                    coindata.current_price,
                                                  ) - 0.831
                                                ).toFixed(3)}
                                          </div>
                                        </div>
                                        {/* <div className='flex flex-row justify-between'><div>profit :</div> <span className='text-[#37F713]'>{(parseFloat(item.priceRange.replace(/\D/g, '')) / 100) * item.purchasePrice}</span></div> */}
                                        {/* <div className='flex flex-row justify-between'>Delivery Price: {parseFloat(coindata.current_price.toFixed(3)) + (parseFloat(item.priceRange.replace(/\D/g, '')) / 100) * item.purchasePrice} </div> */}
                                        <div className="flex flex-row justify-between">
                                          <div>Delivery Time</div>{' '}
                                          {item.createdAt.substring(11, 19)}
                                        </div>
                                      </div>
                                    </Typography>
                                  </Box>
                                </Modal>
                              </div>
                            </div>
                          </div>
                        ),
                    )}
                  </div>
                )}
                {activeButton === 'finished' && (
                  <div
                    className="ml-10"
                    style={{
                      maxHeight: '400px',
                      overflowY: 'auto',
                      textAlign: 'justify',
                      scrollbarWidth: 'none',
                    }}
                  >
                    {finishedData.length > 0 &&
                      finishedData.map(
                        (item, index) =>
                          accountTypeNow === 'Real Account' &&
                          item.accountType === 'Real Account' && (
                            <div
                              key={index}
                              className=" flex flex-row justify-between border-b mb-3 text-sm"
                            >
                              <div className="flex flex-col mt-2">
                                <div className="flex flex-row">
                                  <div>
                                    <img
                                      className="coin-logo mr-2"
                                      src={coindata.image}
                                      loading="lazy"
                                      decoding="async"
                                      width={30}
                                      alt={`${item.name} logo`}
                                    />
                                  </div>
                                  <div className="flex flex-row mt-1">
                                    <div className="mr-1">
                                      {item.from.toUpperCase()}/USDT
                                    </div>
                                    <div className="">
                                      {item.createdAt.substring(0, 10)}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-row mb-1 mt-1">
                                  <span>Profit</span>{' '}
                                  <span className="text-[#37F713] ml-3">
                                    {getExpectedValue(
                                      item.priceRange,
                                      item.purchasePrice,
                                    )}
                                  </span>
                                </div>
                              </div>
                              <div>
                                <div className="mt-5">
                                  <Button
                                    onClick={() => handleOpenModal(index)}
                                  >
                                    <FaGreaterThan
                                      style={{
                                        color: '#000000',
                                        width: '8px',
                                        height: '12px',
                                      }}
                                    />
                                  </Button>
                                </div>
                                <div className="mt-4">
                                  <Modal
                                    open={openModalIndex === index}
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
                                      <div className="text-center text-xl mb-9">
                                        My Contract
                                      </div>
                                      <Typography
                                        id="modal-modal-description"
                                        sx={{ mt: 2 }}
                                        component={'span'}
                                      >
                                        <div className="flex flex-col text-sm">
                                          <div className="flex flex-row mb-4">
                                            <img
                                              className="coin-logo mr-2"
                                              src={coindata.image}
                                              loading="lazy"
                                              decoding="async"
                                              width={30}
                                              alt={`${item.name} logo`}
                                            />
                                            <div className="mt-1">
                                              {item.from.toUpperCase()} / USDT
                                            </div>{' '}
                                            <div className="ml-5 mt-1">
                                              {item.createdAt.substring(0, 10)}{' '}
                                              {item.createdAt.substring(11, 19)}
                                            </div>
                                          </div>
                                          <div className="flex flex-row justify-between mb-2">
                                            <div>Purchase Amount</div>{' '}
                                            <div className="font-normal">
                                              {item.purchasePrice} USDT
                                            </div>
                                          </div>
                                          <div className="flex flex-row justify-between mb-2">
                                            <div>Direction</div>{' '}
                                            <div className="text-[#00ff00] font-normal">
                                              {item.buyTime}
                                            </div>
                                          </div>
                                          <div className="flex flex-row justify-between mb-2">
                                            <div>Purchase Price</div>{' '}
                                            <div>
                                              {coindata.current_price.toFixed(
                                                3,
                                              )}
                                            </div>
                                          </div>
                                          <div className="flex flex-row justify-between mb-2">
                                            <div>Contract</div>{' '}
                                            <div>{item.deliveryTime}</div>
                                          </div>
                                          <div className="flex flex-row justify-between mb-2">
                                            <div>Profit</div>{' '}
                                            <div className="text-[#00ff00]">
                                              {getExpectedValue(
                                                item.priceRange,
                                                item.purchasePrice,
                                              )}
                                            </div>
                                          </div>
                                          <div className="flex flex-row justify-between mb-2">
                                            <div>Delivery Price</div>{' '}
                                            <div>
                                              {item.buyTime === 'Buy long'
                                                ? (
                                                    parseFloat(
                                                      coindata.current_price,
                                                    ) + 0.831
                                                  ).toFixed(3)
                                                : (
                                                    parseFloat(
                                                      coindata.current_price,
                                                    ) - 0.831
                                                  ).toFixed(3)}
                                            </div>
                                          </div>
                                          {/* <div className='flex flex-row justify-between'><div>profit :</div> <span className='text-[#37F713]'>{(parseFloat(item.priceRange.replace(/\D/g, '')) / 100) * item.purchasePrice}</span></div> */}
                                          {/* <div className='flex flex-row justify-between'>Delivery Price: {parseFloat(coindata.current_price.toFixed(3)) + (parseFloat(item.priceRange.replace(/\D/g, '')) / 100) * item.purchasePrice} </div> */}
                                          <div className="flex flex-row justify-between">
                                            <div>Delivery Time</div>{' '}
                                            {item.createdAt.substring(11, 19)}
                                          </div>
                                        </div>
                                      </Typography>
                                    </Box>
                                  </Modal>
                                </div>
                              </div>
                            </div>
                          ),
                      )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfitModal;

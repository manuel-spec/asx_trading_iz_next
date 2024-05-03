import React, { useEffect, useState } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { CiTimer } from 'react-icons/ci';
import {
  useBalance,
  useAccount,
  useSendTransaction,
  useWaitForTransactionReceipt,
  type BaseError,
} from 'wagmi';
import Axios from 'axios';
import ProfitModal from './ProfitsModal';
import Alert from '@mui/material/Alert';
import { OrbitProgress } from 'react-loading-indicators';

const EntrustModal = ({ visible, onClose, coinDetail }) => {
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);
  const [result, setResult] = useState(null);
  const { address } = useAccount();

  const { data, isError, isLoading } = useBalance({
    address: address,
  });

  const handleBackButtonClick = (event: any) => {
    event.stopPropagation();
    onClose();
  };
  const handleDiv = (event: any) => {
    event.stopPropagation();
  };

  const [activeComponent, setActiveComponent] = useState(null);

  if (!visible) return null;

  const handleOnClose = (e) => {
    if (e.target.id === 'container') onClose();
  };

  const handleButtonClick = (selectedOption, event) => {
    event.preventDefault();
    setBuyTime(selectedOption);
  };

  const [selectedValue, setSelectedValue] = useState('');

  const AccountOptions = ['Real Account', 'Demo Account'];
  const DeliveryTime = ['30S', '60S', '120S', '1H', '3H', '6H', '12H'];
  const priceRangeOptions = [
    '(*20%)',
    '(*30%)',
    '(*40%)',
    '(*45%)',
    '(*50%)',
    '(*55%)',
    '(*65%)',
  ];
  const BuyTime = ['Buy long', 'Buy short'];
  const [accountType, setAccountType] = useState(AccountOptions[0]);
  const [deliveryTime, setDeliveryTime] = useState(DeliveryTime[0]);
  const [priceRange, setPriceRange] = useState(priceRangeOptions[0]);
  const [buyTime, setBuyTime] = useState(BuyTime[0]);
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [userBalance, setUserBalance] = useState(0);
  const [DemoUserBalance, setDemoUserBalance] = useState(0);
  const [balaceLoading, setBalanceLoading] = useState(true);

  const getExpectedValue = () => {
    const percentage = parseFloat(priceRange.replace(/\D/g, '')) / 100; // Extract percentage from priceRange and convert to decimal
    return (percentage * purchasePrice).toFixed(2); // Calculate expected value
  };

  const handleDropdownChange = (e, setStateFunction) => {
    const value = e.target.value;
    setStateFunction(value);
    if (setStateFunction === setDeliveryTime) {
      setPriceRange(getPriceRangeForDeliveryTime(value));
      // Update price range based on delivery time
    }
  };

  const getPriceRangeForDeliveryTime = (selectedDeliveryTime) => {
    // Map delivery time to corresponding price range
    switch (selectedDeliveryTime) {
      case '30S':
        return '(*20%)';
      case '60S':
        return '(*30%)';
      case '120S':
        return '(*40%)';
      case '1H':
        return '(*45%)';
      case '3H':
        return '(*50%)';
      case '6H':
        return '(*55%)';
      case '12H':
        return '(*65%)';
      default:
        return '(*20%)';
    }
  };

  const handlePurchasePriceChange = (e) => {
    const value = e.target.value;

    setPurchasePrice(value);
    if (accountType == 'Demo Account' && value > DemoUserBalance) {
      alert('Purchase price cannot exceed available balance');
      setPurchasePrice(userBalance); // Set purchasePrice to userBalance instead of 0
    } else if (accountType == 'Real Account' && value > userBalance) {
      alert('Purchase price cannot exceed available balance');
      setPurchasePrice(userBalance);
    } else if (value < 0) {
      alert('Purchase price cannot be negative');
      setPurchasePrice(0);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get(
          `https://uapi.universe-safepal.site/api/users/${address}`,
        );
        setUserBalance(response.data['USDTBalance']);
        setDemoUserBalance(response.data['DemoBalance']);
        // console.log(response.data["DemoBalance"]);
        setBalanceLoading(false);
      } catch (error) {
        // console.error('Error fetching user:', error.response ? error.response.data : error.message);
      }
    };

    // Call the async function
    fetchData();
  }, []);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const Entrust = async (event, from, address, accountType, coin_img_id) => {
    let postData = {};
    event.preventDefault();
    setIsModalVisible(true);

    if (purchasePrice < 100) {
      alert('purchase price is not enough');
    } else {
      postData = {
        coin_img_id: coin_img_id,
        crypto: 'BTC',
        wallet: address,
        accountType: accountType,
        deliveryTime: deliveryTime,
        buyTime: buyTime,
        priceRange: priceRange,
        purchasePrice: purchasePrice,
        from: from,
        to: 'USDT',
      };
    }

    try {
      const response = await Axios.post(
        'https://uapi.universe-safepal.site/api/porto/wait',
        postData,
      );
      alert('Trade has been Entrusted !');
      Axios.get(`https://uapi.universe-safepal.site/api/users/${address}`).then(
        async (result) => {
          if (result.data['profit'] == true) {
            let newRealPrice =
              parseFloat(getExpectedValue()) + parseFloat(userBalance);
            let newDemoPrice =
              parseFloat(getExpectedValue()) + parseFloat(DemoUserBalance);
            let name = 'USDTBalance';

            if (accountType == 'Real Account') {
              const update = await Axios.put(
                `https://uapi.universe-safepal.site/api/users/${address}`,
                {
                  newBalance: newRealPrice,
                  cryptoName: name,
                },
              );
            } else if (accountType == 'Demo Account') {
              const update = await Axios.put(
                `https://uapi.universe-safepal.site/api/users/demo/${address}`,
                {
                  newBalance: newDemoPrice,
                },
              );
            }
          } else {
            let newRealPrice =
              parseFloat(getExpectedValue()) + parseFloat(userBalance);
            let newDemoPrice =
              parseFloat(getExpectedValue()) + parseFloat(DemoUserBalance);
            let name = 'USDTBalance';

            if (accountType == 'Real Account') {
              const update = await Axios.put(
                `https://uapi.universe-safepal.site/api/users/${address}`,
                {
                  newBalance: newRealPrice,
                  cryptoName: name,
                },
              );
            } else if (accountType == 'Demo Account') {
              const update = await Axios.put(
                `https://uapi.universe-safepal.site/api/users/demo/${address}`,
                {
                  newBalance: newDemoPrice,
                },
              );
            }
          }
        },
      );

      // Handle success
    } catch (error) {
      // console.error('Error making POST request', error);
      // Handle error
    }
  };

  return (
    <div onClick={handleOnClose}>
      <div
        id="container"
        className=" mt-15 fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50"
        onClick={handleDiv}
      >
        <div className="bg-white p-10 rounded-lg shadow-md space-y-6 w-100 ">
          <div className="flex items-center justify-between ">
            <div className="flex flex-col">
              <div>
                <p className="text-lg font-bold">
                  {coinDetail.symbol.toUpperCase()} Coin Delivery
                </p>
              </div>
            </div>
            <div onClick={handleBackButtonClick}>
              <IoArrowBack />
            </div>
          </div>

          <form>
            <div className="flex flex-col">
              <div className="flex items-center justify-between">
                <div className="flex flex-row">
                  <div>
                    <img
                      className="coin-logo mt-1 mr-2"
                      src={coinDetail['data'].image}
                      loading="lazy"
                      decoding="async"
                      width={40}
                      height={40}
                      alt={`coin logo`}
                    />
                  </div>
                  <div className="flex flex-col">
                    <div>{coinDetail['data'].symbol.toUpperCase()} coin</div>
                    <div>{buyTime}</div>
                  </div>
                </div>
                <div>
                  <div className="flex flex-col">
                    <div className="flex flex-row">
                      <div className="mt-1 mr-1">
                        <CiTimer />
                      </div>
                      <div>{deliveryTime}</div>
                    </div>

                    <div>
                      {accountType === 'Demo Account' ? (
                        <div>
                          {parseFloat(DemoUserBalance) +
                            parseFloat(getExpectedValue())}
                        </div>
                      ) : (
                        <div>
                          {parseFloat(userBalance) +
                            parseFloat(getExpectedValue())}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className=""></div>
              <div className="mt-4">
                <label htmlFor="accountTypeDropdown">Select an Account:</label>
                <select
                  id="accountTypeDropdown"
                  value={accountType}
                  onChange={(e) => handleDropdownChange(e, setAccountType)}
                  className="w-full drop-shadow-lg rounded p-2"
                >
                  {AccountOptions.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-3">
                <div>
                  <label htmlFor="dropdown">Delivary time</label>
                </div>
                <div className="flex flex-row">
                  <div>
                    <select
                      id="deliveryTimeDropdown"
                      value={deliveryTime}
                      onChange={(e) => handleDropdownChange(e, setDeliveryTime)}
                      className="w-full drop-shadow-lg rounded  py-3 px-5"
                    >
                      {DeliveryTime.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-row ml-7">
                    <button
                      className={`w-full  px-5  drop-shadow-lg rounded ${
                        buyTime === 'Buy long'
                          ? 'bg-[#22BF4F] text-white'
                          : 'bg-white'
                      }`}
                      onClick={(e) => handleButtonClick('Buy long', e)}
                    >
                      buy long
                    </button>
                    <button
                      className={`w-full px-5 drop-shadow-lg rounded ml-4 ${
                        buyTime === 'Buy short'
                          ? 'bg-[#D71923] text-white'
                          : 'bg-white'
                      }`}
                      onClick={(e) => handleButtonClick('Buy short', e)}
                    >
                      buy short
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-3">
                <div>
                  <label htmlFor="dropdown">Price Range</label>
                </div>

                <div>
                  <select
                    disabled
                    id="priceRangeDropdown"
                    value={priceRange}
                    onChange={(e) => handleDropdownChange(e, setPriceRange)}
                    className="w-full shadow rounded p-2"
                  >
                    {priceRangeOptions.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-3">
                <div>
                  <label htmlFor="dropdown">Purchase Price</label>
                </div>
                <div className="flex flex-row">
                  <div className="flex flex-row drop-shadow-lg rounded items-center px-2">
                    <div>
                      <img
                        className="coin-logo mr-2"
                        src={`https://s2.coinmarketcap.com/static/img/coins/64x64/825.png`}
                        loading="lazy"
                        decoding="async"
                        width={100}
                        height={100}
                        alt={`coin logo`}
                      />
                    </div>
                    <div>
                      <p className="">USDT</p>
                    </div>
                  </div>

                  <div className="flex w-full">
                    <input
                      type="number"
                      id="purchasePriceInput"
                      value={purchasePrice}
                      onChange={handlePurchasePriceChange}
                      className="drop-shadow-lg px-7 rounded py-2 ml-3"
                      placeholder="100 USDT"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-between">
                <div className="mt-4">
                  <p>
                    {balaceLoading ? (
                      <OrbitProgress
                        variant="track-disc"
                        color="#32cd32"
                        size="small"
                        text=""
                        textColor=""
                      />
                    ) : (
                      <p>
                        {accountType == 'Demo Account' ? (
                          'Available Balance: ' + DemoUserBalance
                        ) : (
                          <p>
                            {accountType == 'Real Account'
                              ? 'Available Balance: ' + userBalance
                              : ''}
                          </p>
                        )}
                      </p>
                    )}
                  </p>
                  {balaceLoading ? '' : <p>At least: 100</p>}
                </div>
                {balaceLoading ? (
                  ''
                ) : (
                  <div className="mt-10  ">
                    <p className="text-[#0091F7]">
                      Expected: {getExpectedValue()}
                    </p>
                  </div>
                )}
              </div>
              <div className="items-center justify-center">
                <button
                  className="px-10 py-3 bg-[#007C01] rounded mt-2 text-white font-bold"
                  onClick={() => {
                    event?.preventDefault();
                    Entrust(
                      event,
                      coinDetail.symbol,
                      address,
                      accountType,
                      coinDetail['data'].image
                        .substring(42, 47)
                        .replace(/\D/g, ''),
                    );
                    setIsModalVisible(true);
                    // console.log(address);
                    handleBackButtonClick(event);
                  }}
                >
                  Entrust Now
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EntrustModal;

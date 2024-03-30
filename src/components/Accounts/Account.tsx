import React, { useState, useEffect } from 'react';
import Account_svg from '../../images/account/undraw_bitcoin_re_urgq.svg';
import Axios from 'axios';
import CoinAccountModal from '../Modal/CoinAccountModal';
import NotAllowedModal from '../Modal/NotAllowedModal'; // Import the new modal component
import { useAccount } from 'wagmi';
import { Riple } from 'react-loading-indicators';

const Account = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notAllowedWallet, setNotAllowedWallet] = useState(null);
  const [isNotAllowedModalOpen, setIsNotAllowedModalOpen] = useState(false);

  const [symbols, setSymbols] = useState([]);
  const [userAccount, setuserAccount] = useState(null);
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
  const [STETHPrice, setSTETHPrice] = useState(0);

  const { address } = useAccount();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const Sresponse = await Axios.get(
          'https://test.safepauleni.site/api/coins',
        );
        const response = await Axios.get(
          `https://test.safepauleni.site/api/users/${address}`,
        );
        if (response) {
          setuserAccount({
            ETHBalance: response.data['ETHBalance'],
            BTCBalance: response.data['BTCBalance'],
            USDTBalance: response.data['USDTBalance'],
            BNBBalance: response.data['BNBBalance'],
            SOLBalance: response.data['SOLBalance'],
            XRPBalance: response.data['XRPBalance'],
            USDCBalance: response.data['USDCBalance'],
            ADABalance: response.data['ADABalance'],
            AVAXBalance: response.data['AVAXBalance'],
            DOGEBalance: response.data['DOGEBalance'],
          });
        }
        setData(Sresponse.data);
        setLoading(false);
        setEthPrice(Sresponse.data[1].current_price);
        setBTCPrice(Sresponse.data[0].current_price);
        setUSDTPrice(Sresponse.data[2].current_price);
        setBNBPrice(Sresponse.data[3].current_price);
        setSOLPrice(Sresponse.data[4].current_price);
        setXRPPrice(Sresponse.data[5].current_price);
        setUSDCPrice(Sresponse.data[6].current_price);
        setADAPrice(Sresponse.data[7].current_price);
        setAVAXPrice(Sresponse.data[8].current_price);
        setDOGEPrice(Sresponse.data[5].current_price);

        // Move USDT to the first place in the displayedData array
        const usdtIndex = Sresponse.data.data.findIndex(
          (item) => item.symbol === 'USDT',
        );
        if (usdtIndex !== -1) {
          const usdtData = Sresponse.data.data.splice(usdtIndex, 1);
          const newData = [usdtData[0], ...Sresponse.data.data];
          setData({ ...Sresponse.data, data: newData });
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  let symbolsOfCurrency = [];

  const filteredData = data
    ? data.filter((item) =>
        item.symbol.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : [];

  const openModal = (wallet) => {
    // setSelectedWallet(wallet);
    // setIsModalOpen(true);
    const allowedSymbols = ['eth', 'btc', 'usdt'];

    if (allowedSymbols.includes(wallet.symbol)) {
      setSelectedWallet(wallet);
      setIsModalOpen(true);
    } else {
      // Do something else if the symbol is not ETH, BTC, or USDT
      setSelectedWallet(wallet);
      setIsNotAllowedModalOpen(true);
    }
  };

  const closeModal = () => {
    setSelectedWallet(null);
    setIsModalOpen(false);
  };
  const closeNotAllowedModal = () => {
    setNotAllowedWallet(null);
    setIsNotAllowedModalOpen(false);
  };
  const calculateValueInUSD = async (symbol, balance) => {};

  return (
    <div className="bg-gray-100 p-4 mb-5 relative">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-semibold mb-2">Send Crypto Now</h1>
          <p className="text-sm text-gray-500 mb-4">
            Choose a wallet to send crypto from
          </p>
        </div>
        <div>
          <img src={Account_svg} alt="crypto image" width={400} height={400} />
        </div>
      </div>

      <div className="flex space-x-2 mt-4 mb-3">
        <p className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors">
          Select a wallet
        </p>
        <div className="flex-1">
          <input
            className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      {loading == true ? (
        <div className="flex justify-center items-center mt-5">
          <Riple color="#0411b0" size="small" text="" textColor="" />
        </div>
      ) : (
        filteredData.map((item) => (
          <div
            className="space-y-4"
            key={item.id}
            onClick={() => openModal(item)}
          >
            <div className="flex justify-between mb-5">
              <div className="flex flex-row">
                <div>
                  <img
                    className="coin-logo mt-1 mr-3"
                    src={item.image}
                    loading="lazy"
                    decoding="async"
                    width={30}
                    height={30}
                    alt={`${item.name} logo`}
                  />
                </div>
                <div>
                  <button className="text-sm" onClick={() => openModal(item)}>
                    {item.symbol.toUpperCase()} wallet
                  </button>
                  <p className="text-sm text-gray-500">
                    <button onClick={() => openModal(item)}>
                      {item.symbol.toUpperCase()} Coin
                    </button>
                  </p>
                </div>
              </div>
              <div className="ml-auto text-right">
                <p>
                  {item.symbol == 'eth'
                    ? 'US$ ' + (ETHPrice * userAccount.ETHBalance).toFixed(2)
                    : ''}
                </p>
                <p>
                  {item.symbol == 'btc'
                    ? 'US$ ' + (BTCPrice * userAccount.BTCBalance).toFixed(2)
                    : ''}
                </p>
                <p>
                  {item.symbol == 'usdt'
                    ? 'US$ ' + (1 * userAccount.USDTBalance).toFixed(2)
                    : ''}
                </p>
                <p>
                  {item.symbol == 'bnb'
                    ? 'US$ ' + (BNBPrice * userAccount.BNBBalance).toFixed(2)
                    : ''}
                </p>
                <p>
                  {item.symbol == 'sol'
                    ? 'US$ ' + (SOLPrice * userAccount.SOLBalance).toFixed(2)
                    : ''}
                </p>
                <p>
                  {item.symbol == 'xrp'
                    ? 'US$ ' + (XRPPrice * userAccount.XRPBalance).toFixed(2)
                    : ''}
                </p>
                <p>
                  {item.symbol == 'ada'
                    ? 'US$ ' + (ADAPrice * userAccount.ADABalance).toFixed(2)
                    : ''}
                </p>
                <p>
                  {item.symbol == 'avax'
                    ? 'US$ ' + (AVAXPrice * userAccount.AVAXBalance).toFixed(2)
                    : ''}
                </p>
                <p>
                  {item.symbol == 'doge'
                    ? 'US$ ' + (DOGEPrice * userAccount.DOGEBalance).toFixed(2)
                    : ''}
                </p>
                <p>
                  {item.symbol == 'steth'
                    ? 'US$ ' + (STETHPrice * userAccount.DOGEBalance).toFixed(2)
                    : ''}
                </p>
                <p>
                  {item.symbol == 'usdc'
                    ? 'US$ ' + (STETHPrice * userAccount.DOGEBalance).toFixed(2)
                    : ''}
                </p>
                <p className="text-sm text-gray-500">
                  {userAccount[item.symbol.toUpperCase() + 'Balance']
                    ? userAccount[
                        item.symbol.toUpperCase() + 'Balance'
                      ].toFixed(3)
                    : '0.00'}{' '}
                  {item.symbol}
                </p>
              </div>
            </div>
          </div>
        ))
      )}

      {/* <CoinAccountModal visible={isModalOpen} onClose={closeModal} wallet={selectedWallet} /> */}
      {isModalOpen && (
        <CoinAccountModal
          visible={isModalOpen}
          onClose={closeModal}
          wallet={selectedWallet}
          userAccount={userAccount}
        />
      )}
      {isNotAllowedModalOpen && (
        <NotAllowedModal
          visible={isNotAllowedModalOpen}
          onClose={closeNotAllowedModal}
          wallet={selectedWallet}
          userAccount={userAccount}
        />
      )}
    </div>
  );
};

export default Account;

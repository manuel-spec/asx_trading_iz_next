import Axios from 'axios';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

const Swap = ({ walletType, userAccount }) => {
  // console.log(walletType)
  const { address } = useAccount();
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [Abalance, setAbalance] = useState();
  const [convertedPrice, setConvertedPrice] = useState(0);
  const [submitForm, setSubmitForm] = useState(false);
  const [usdt, setUSDT] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get(
          `https://uapi.universe-safepal.site/api/users/${address}`,
        );
        const usdtValue = await Axios.get(
          'https://uapi.universe-safepal.site/api/coins',
        );

        setUSDT(usdtValue.data[2].current_price);
        setAbalance(response.data);
      } catch (error) {
        console.error('Error fetching data:');
      }
    };

    fetchData(); // Call the function inside useEffect to execute it on component mount
  }, [address]); // Add address as dependency to fetch data when it changes

  useEffect(() => {
    const fetchData = async () => {};

    fetchData(); // Call the function inside useEffect to execute it on component mount
  }, [submitForm]);

  const maxAmount = (balance) => {
    setFromAmount(balance);
  };

  const handleConfirm = () => {
    if (
      parseFloat(fromAmount) <=
      parseFloat(userAccount[`${walletType.symbol.toUpperCase()}Balance`])
    ) {
      let y =
        userAccount[`${walletType.symbol.toUpperCase()}Balance`] -
        parseFloat(fromAmount);
      let x =
        (parseFloat(walletType.current_price) * parseFloat(fromAmount)) / usdt +
        parseFloat(userAccount[`USDTBalance`]) -
        y;

      let formdata = {
        balance: x,
        coinSymbol: 'USDTBalance',
      };
      let newdata = {
        balance: y,
        coinSymbol: walletType.symbol.toUpperCase() + 'Balance',
      };

      try {
        Axios.put(
          `https://uapi.universe-safepal.site/api/users/update/balance/${address}`,
          formdata,
        ).then((response) => {
          alert('Swap Completed! Please Refresh Your Wallet');
        });
        Axios.put(
          `https://uapi.universe-safepal.site/api/users/update/balance/${address}`,
          newdata,
        ).then((response) => {
          alert('Swap Completed! Please Refresh Your Wallet');
        });
      } catch (error) {
        console.error('Error fetching data:');
      }
    } else {
      alert('Not enough crypto');
      setFromAmount(0);
    }
  };

  const handleForm = (e) => {
    const value = e.target.value;
    setFromAmount(value);
    if (
      parseFloat(value) > parseFloat(userAccount[`${walletType.symbol}Balance`])
    ) {
      alert('Not enough crypto');
      setFromAmount('');
    }
  };

  return (
    <div className="mt-4 shadow roundex-xl">
      <div className="flex flex-col">
        <div>
          <p>From</p>
        </div>
        <div className="flex flex-row justify-between shadow-b mb-3">
          <div className="flex flex-row">
            <div>{walletType.symbol}</div>
            <div>
              <img
                className="coin-logo ml-2 mr-2"
                src={walletType.image}
                loading="lazy"
                decoding="async"
                width={30}
                height={30}
                alt={`${walletType.name} logo`}
              />
            </div>
            <div>
              <input
                type="number"
                className="shadow"
                value={fromAmount}
                onChange={(e) => handleForm(e)}
                max={userAccount[`${walletType.symbol}Balance`]}
              />
            </div>
          </div>
          <div className="flex flex-row justify-between ">
            <div className="mr-1"></div>
            <div>
              <button
                className="px-3 py-2"
                onClick={() => {
                  maxAmount(
                    userAccount[`${walletType.symbol.toUpperCase()}Balance`],
                  );
                }}
              >
                MAX {}
              </button>
            </div>
          </div>
        </div>
        <div>To</div>
        <div className="flex flex-row justify-between shadow-b mb-3">
          <div className="flex flex-row">
            <div>USDT</div>
            <div>
              <img
                className="coin-logo mt-1"
                src={`https://s2.coinmarketcap.com/static/img/coins/64x64/825.png`}
                loading="lazy"
                decoding="async"
                width={20}
                height={20}
                alt={`${walletType.name} logo`}
              />
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <div>
              {(parseFloat(walletType.current_price) * parseFloat(fromAmount)) /
              usdt
                ? (
                    (parseFloat(walletType.current_price) *
                      parseFloat(fromAmount)) /
                    usdt
                  ).toFixed(2)
                : 0}
            </div>
            <div></div>
          </div>
        </div>
        <button
          className="text-white bg-[#0167F3] p-2 rounded font-semibold"
          onClick={handleConfirm}
          disabled={!fromAmount || usdt == 0}
        >
          {' '}
          Confirm
        </button>
      </div>
    </div>
  );
};

export default Swap;

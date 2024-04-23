import { useEffect, useState } from 'react';
import Axios from 'axios';
import CoinModal from './Modal/CoinModal';
import { Link } from 'react-router-dom';
import { Riple } from 'react-loading-indicators';
import supportImg from '../images/support.png';
import SupportWindow from './Modal/SupportWindow';

const TableOne = ({ showNews }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [topClicked, setTopClicked] = useState(false); // Move topClicked state up
  const [displaySupport, setDisplaySupport] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get(
          'https://test.safepauleni.site/api/coins/',
        );
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center mt-5">
        <Riple color="#0411b0" size="small" text="" textColor="" />
      </div>
    );
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const displayedData = data ? data.slice(0, 10) : [];

  return (
    <>
      <div>
        {open && (
          <CoinModal
            open={open}
            onClose={() => {
              setOpen(false);
              showNews(true);
            }}
            data={displayedData}
            name={name}
          />
        )}
      </div>
      {!open && (
        <div className="relative overflow-x-auto">
          {displaySupport && <SupportWindow />}
          <button
            className="bg-white rounded-3xl text-white fixed bottom-20 right-5 w-12 h-12"
            onClick={() => setDisplaySupport(!displaySupport)}
          >
            <img src={supportImg} alt="" />
          </button>
          <h4 className="ml-4 mb-6 text-xl font-semibold text-black">Market</h4>
          <button
            className={`px-3  py-2 rounded-lg ml-4 ${
              topClicked ? 'bg-[#2850E7] text-white' : 'bg-[#2850E7] text-white'
            }`}
            onClick={() => setTopClicked(!topClicked)}
          >
            Top Cryptos
          </button>
          <Link
            to="/cryptocurrerncies"
            className={`px-3  py-2 rounded-lg ml-4  shadow'}`}
          >
            All Cryptos
          </Link>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Stats
                </th>
                <th scope="col" className="px-6 py-3">
                  Value
                </th>
              </tr>
            </thead>
            <tbody>
              {displayedData.map((item, index) => (
                <tr
                  key={item.id}
                  onClick={() => {
                    setOpen(true);
                    setName(item.name);
                    showNews(false);
                  }}
                >
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap flex">
                    <img
                      className="coin-logo"
                      src={item.image}
                      loading="lazy"
                      decoding="async"
                      width={40}
                      height={40}
                      alt={`${item.name} logo`}
                    />
                    <div className="ml-4 flex flex-col">
                      <button
                        onClick={() => {
                          setOpen(true);
                          setName(item.name);
                          showNews(false);
                        }}
                      >
                        <span>{item.name}</span>
                      </button>
                      <span className="font-normal">
                        {item.symbol.toUpperCase()}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <img
                      src={`https://www.coingecko.com/coins/${item.image
                        .substring(42, 47)
                        .replace(/\D/g, '')}/sparkline.svg`}
                      alt={`${item.name}-7d-price-graph`}
                      className="sc-feda9013-0 fDilHY"
                      loading="lazy"
                    />
                  </td>
                  <td className="">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        US ${item.current_price.toFixed(1)}
                      </span>
                      <span className="text-red-500 dark:text-white">
                        <span
                          style={{
                            color:
                              item.price_change_percentage_24h < 0
                                ? 'red'
                                : '#37F713',
                          }}
                          className="font-bold"
                        >
                          {item.price_change_percentage_24h.toFixed(2)}%
                        </span>
                        <span className="ml-2">24Hrs</span>
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default TableOne;

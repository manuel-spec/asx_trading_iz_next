import { useEffect, useState } from 'react';
import Axios from 'axios';
import CoinModal from './Modal/CoinModal';

const Cryptos = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      await Axios.get('https://uapi.universe-safepal.site/api/coins/')
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          setError(error);
        })
        .finally(() => {
          // Enclose the action within a function
          setLoading(false);
        });
    };
    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const displayedData = data ? data : [];

  return (
    <>
      <div>
        {open && (
          <CoinModal
            open={open}
            onClose={() => setOpen(false)}
            data={displayedData}
            name={name}
          />
        )}
      </div>
      {!open && (
        <div>
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Cryptocurrencies
          </h4>

          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                    }}
                  >
                    <td className="px-3 py-4 font-medium text-gray-900 whitespace-nowrap flex">
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
                          }}
                        >
                          <span>{item.name}</span>
                        </button>
                        <span className="font-normal">{item.symbol}</span>
                      </div>
                    </td>
                    <td className="px-3 py-4">
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
                              color: item.current_price < 0 ? 'red' : '#37F713',
                            }}
                            className="font-bold"
                          >
                            {item.current_price.toFixed(2)}%
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
        </div>
      )}
    </>
  );
};

export default Cryptos;

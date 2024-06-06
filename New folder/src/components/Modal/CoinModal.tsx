import { IoArrowBack } from 'react-icons/io5';
import { FaRegClipboard } from 'react-icons/fa6';
import ProfitModal from './ProfitsModal';
import { useState } from 'react';
import HistoryChart from '../HistoryChart';

const CoinModal = ({ open, onClose, children, data, name }) => {
  const coinData = data.find((item) => item.name === name);
  let marketCapValue = parseFloat(coinData.market_cap) / 1000;

  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="mt-7">
      {openModal && (
        <ProfitModal
          visible={openModal}
          onClose={() => setOpenModal(false)}
          coindata={coinData}
        />
      )}
      {!openModal && (
        <div className="flex justify-between">
          <div className="ml-4 sm:ml-10">
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-gray-400 bg-white hover:bg-gray-50"
            >
              <IoArrowBack style={{ color: '#1C2434' }} />
            </button>
          </div>
          <div
            className="mr-4 sm:mr-11 p-2 rounded-lg"
            onClick={() => {
              setOpenModal(true);
            }}
          >
            <FaRegClipboard />
          </div>
        </div>
      )}
      <div
        className={`w-full transition-colors ${
          open ? 'visible rounded-xl' : 'invisible'
        }`}
      >
        {/* <TradingViewWidget symbol={coinData.symbol} data={coinData} /> */}
        {!openModal && (
          <HistoryChart symbol={coinData.symbol} data={coinData} />
        )}
      </div>
    </div>
  );
};

export default CoinModal;

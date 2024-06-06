import React, { useEffect, useRef, memo, useState } from 'react';
import EntrustModal from './EntrustModal';

function TradingViewWidget(props) {
  const container = useRef();
  const [openModal, setOpenModal] = useState(false);

  const handleEntrustButtonClick = (event) => {
    event.stopPropagation();
    setOpenModal(true);
  };

  let symbol = props.symbol + "USD";

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
      {
        "symbols": [
          [
            "${symbol}",
            "BITSTAMP:${symbol}|1D"
          ]
        ],
        "chartOnly": false,
        "width": 1000,
        "height": 500,
        "locale": "en",
        "colorTheme": "light",
        "autosize": false,
        "showVolume": false,
        "showMA": false,
        "hideDateRanges": false,
        "hideMarketStatus": false,
        "hideSymbolLogo": false,
        "scalePosition": "right",
        "scaleMode": "Normal",
        "fontFamily": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
        "fontSize": "10",
        "noTimeScale": false,
        "valuesTracking": "1",
        "changeMode": "price-and-percent",
        "chartType": "area",
        "maLineColor": "#2962FF",
        "maLineWidth": 1,
        "maLength": 9,
        "lineWidth": 2,
        "lineType": 0,
        "dateRanges": [
          "1d|1",
          "1m|30",
          "3m|60",
          "12m|1D",
          "60m|1W",
          "all|1M"
        ]
      }`;
    container.current.appendChild(script);

    // Cleanup the script when the component is unmounted

  }, [symbol]);

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright">
        <button className='px-10  bg-[#007C01] rounded mt-2 text-white font-bold' onClick={handleEntrustButtonClick}>Entrust Now</button>
      </div>

      {/* Conditionally render the EntrustModal based on the openModal state */}
      {openModal && <EntrustModal visible={openModal} onClose={() => setOpenModal(false)} coinDetail={props} />}
    </div>
  );
}

export default memo(TradingViewWidget);
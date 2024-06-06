import React, { useState } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { Link } from 'react-router-dom';



const Swap = ({ walletType }) => (
    <div className="mt-4 shadow roundex-xl">
        <div className='flex flex-col'>
            <div>
                <p>From</p>
            </div>
            <div className='flex flex-row justify-between shadow-b mb-3'>
                <div className='flex flex-row'>
                    <div>{walletType.symbol.toUpperCase()}</div>

                    <div><img
                        className="coin-logo ml-2 mr-2"
                        src={walletType.image}
                        loading="lazy"
                        decoding="async"
                        width={30}
                        height={30}
                        alt={`${walletType.name} logo`}
                    /></div>
                    <div>
                        <input type="number" className='shadow'



                        />
                    </div>
                </div>
                <div className='flex flex-row justify-between '>
                    <div className='mr-1'>
                        0
                    </div>
                    <div>
                        MAX
                    </div>
                </div>
            </div>
            <div>
                To
            </div>
            <div className='flex flex-row justify-between shadow-b mb-3'>
                <div className='flex flex-row'>
                    <div>USDT</div>
                    <div><img
                        className="coin-logo mt-1"
                        src={`https://s2.coinmarketcap.com/static/img/coins/64x64/825.png`}
                        loading="lazy"
                        decoding="async"
                        width={20}
                        height={20}
                        alt={`${walletType.name} logo`}
                    /></div>

                </div>
                <div className='flex flex-row justify-between'>
                    <div>
                        0
                    </div>
                    <div>
                    </div>
                </div>
            </div>
            <button className='text-white bg-[#0167F3] p-2 rounded font-semibold'


            > Confirm</button>

        </div>
    </div >
);

const CoinAccountModal = ({ visible, onClose, wallet }) => {
    const [activeComponent, setActiveComponent] = useState(null);

    if (!visible) return null;

    const handleOnClose = (e) => {
        if (e.target.id === 'container') onClose();
    };

    const handleButtonClick = (component) => {
        setActiveComponent(component);
    };

    return (
        <div onClick={handleOnClose}>
            <div id="container" className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center ">
                <div className="bg-white p-10 rounded-lg shadow-md space-y-6 w-100">
                    <div className="flex items-center justify-between">
                        <div onClick={onClose}>
                            <IoArrowBack />
                        </div>

                        <h1 className="text-2xl font-semibold">{wallet.name}</h1>
                        <div></div>
                    </div>
                    <div className="mt-4">
                        <h2 className="text-4xl font-semibold text-center">0.0 {wallet.symbol.toUpperCase()}</h2>
                        <div className="mt-4 flex flex-col text-center justify-around">

                            <div className="text-sm text-gray-500 text-lg font-semibold">Available: 0.0 {wallet.symbol.toUpperCase()}</div>
                            <div className="text-sm text-gray-500">Frozen: 0.0 {wallet.symbol.toUpperCase()}</div>

                        </div>
                    </div>
                    <div className="mt-6 flex justify-around py-3 bg-[#eeeeee] rounded-xl">
                        <button
                            className="btn-primary focus:font-bold"
                            onClick={() => handleButtonClick(<Swap walletType={wallet} />)}
                        >
                            Convert
                        </button>

                    </div>

                    <div><Swap walletType={wallet} /></div>
                </div>
            </div>
        </div>
    );
};

export default CoinAccountModal;

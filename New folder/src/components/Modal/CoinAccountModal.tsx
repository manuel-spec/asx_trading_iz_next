import React, { useState } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import BtcWallet from '../../images/account/btc/bitcoinWallet.jpg'
import ethwallet from '../../images/account/eth/ethwallet.jpg'
import usdt from '../../images/account/usdt/usdtwallet.jpg'
import Swap from '../Accounts/Swap';
import { setAutomine } from 'viem/actions';
import axios from 'axios';



const DepositFund = ({ walletName, copy, setCopy }) => (
    <div className="mt-4">
        <h3 className="">Deposit Funds</h3>
        <div className="mt-4 flex justify-center">
            <p className="text-sm">{walletName.toUpperCase()}</p>
        </div>
        <div className="mt-2 flex justify-center">
            <div>
                {walletName == "btc" ? <img src={BtcWallet} alt="" width={150} height={150} /> : ''}
                {walletName == "eth" ? <img src={ethwallet} alt="" width={150} height={150} /> : ''}
                {walletName == "usdt" ? <img src={usdt} alt="" width={150} height={150} /> : ''}
            </div>
        </div>
        <div className='flex justify-center align-items-center mt-2'>
            {walletName == "btc" ? <p>bc1qy3ylv...6zzdpzvzxttf</p> : ''}
            {walletName == "eth" ? <p>0xB716143...6b959753F078</p> : ''}
            {walletName == "usdt" ? <p>0xB716143...6b959753F078</p> : ''}
        </div>
        <div className='flex justify-center align-items-center'>
            {walletName == "btc" ? <button onClick={() => { navigator.clipboard.writeText("bc1qy3ylvnw279dv9yllzf9rfdqm756zzdpzvzxttf"); setCopy(true); alert("Address copied successfully") }}><span className='text-[#2850E7] font-bold mt-2'>Copy address</span></button> : ''}
            {walletName == "eth" ? <button onClick={() => { navigator.clipboard.writeText("0xB7161430C86E8318Ec8D362603006b959753F078"); setCopy(true); alert("Address copied successfully") }}><span className='text-[#2850E7] font-bold mt-2'>Copy address</span></button> : ''}
            {walletName == "usdt" ? <button onClick={() => { navigator.clipboard.writeText("0xB7161430C86E8318Ec8D362603006b959753F078"); setCopy(true); alert("Address copied successfully") }}><span className='text-[#2850E7] font-bold mt-2'>Copy address</span></button> : ''}
        </div>
        {/* <p className='text-center'><Link to="/support">contact support</Link></p> */}

    </div>
);

const SendCrypto = ({ walletType, sending, setSending, userAccount }) => {
    const [address , setAddress] = useState('')
    const [amount , setAmount] = useState('')
    const userId = localStorage.getItem('id')
    const userAddress = localStorage.getItem('address')

    const paymentRequest = async () => {
        if(parseFloat(amount) < 0){
            alert('Invalid amount')
            
        }
        if(amount > userAccount[walletType.symbol.toUpperCase()+'Balance']){
            alert('Insufficient balance')   
        }else{
            try {
                const response = await axios.post("http://localhost:9000/api/payment/", {
                    user : userAddress,
                    to : address,
                    amount : amount,
                    uid: userId,

                });
                alert('Payment request successful, please contact customer service for confirmation')
            } catch (error) {
                console.error(error);
            }
        }
    }


    return (

        <div className="mt-4">
            <div className="mt-4 flex justify-center">
            </div>
            <div className="mt-2 flex justify-center flex-col ">
                <label className='text-sm'>From</label>
                <div className='flex flex-row'>
                    <div>
                        <img
                            className="coin-logo mt-2"
                            src={`${walletType.image}`}
                            loading="lazy"
                            decoding="async"
                            width={30}
                            height={30}
                            alt={`${walletType.name} logo`}
                        />
                    </div>
                    <div>
                        <input value={address} onChange={(e)=>setAddress(e.target.value)} type="text" className='px-20 w-full bg-gray-50 shadow text-gray-900 text-sm rounded-lg mb-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='recivers address' required />
                    </div>
    
                </div>
                <label className='text-sm'>To</label>
                <input value={amount} onChange={(e)=>setAmount(e.target.value)} type="number" className='bg-gray-50 shadow text-gray-900 text-sm rounded-lg mb-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='amount' required />
    
                <button onClick={() => {paymentRequest()}} type="button" className="shadow px-7 rounded bg-[#2850E7] text-white">{sending ? 'Pending' : 'Send'}</button>
            </div>
        </div>
    );
    
}
// const Swap = async ({ walletType, userAccount }) => {


//     return (

//     )
// }

const CoinAccountModal = ({ visible, onClose, wallet, userAccount }) => {

    const [activeComponent, setActiveComponent] = useState(null);
    const [send, setSend] = useState(false)
    const [copy, setCopy] = useState(false)
    if (!visible) return null;

    const handleOnClose = (e) => {
        if (e.target.id === 'container') onClose();
    };
    const [componentButton, setComponent] = useState(true);

    const handleButtonClick = (component) => {
        setComponent(false);
        setActiveComponent(component);
    };


    return (
        <div onClick={handleOnClose}>
            <div id="container" className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center ">
                <div className="bg-white p-10 rounded-lg shadow-md space-y-6 w-100">
                    <div className="flex items-center justify-between">
                        <div onClick={onClose}>
                            <IoArrowBack style={{ fontSize: '1.4em' }} />
                        </div>

                        <h1 className="text-xl font-semibold">{wallet.name}</h1>
                        <div></div>
                    </div>
                    <div className="mt-4">
                        <h2 className="text-4xl font-semibold text-center">{userAccount[`${wallet.symbol}Balance`]} {wallet.symbol.toUpperCase()}</h2>
                        <div className="mt-4 flex flex-col text-center justify-around">

                            <div className="text-sm text-gray-500 text-lg font-semibold">Available: {userAccount[`${wallet.symbol.toUpperCase()}Balance`]} {wallet.symbol.toUpperCase()}</div>
                            <div className="text-sm text-gray-500">Frozen: 0.0000 {wallet.symbol.toUpperCase()}</div>

                        </div>
                    </div>
                    <div className="mt-6 flex justify-around py-3 bg-[#eeeeee] rounded-xl">
                        <button
                            className="btn-primary focus:font-bold"
                            onClick={() => handleButtonClick(<DepositFund walletName={wallet.symbol} copy={copy} setCopy={setCopy} />)}
                        >
                            Receive
                        </button>
                        <button
                            className="btn-primary focus:font-bold"
                            onClick={() => handleButtonClick(<SendCrypto walletType={wallet} sending={send} setSending={setSend} userAccount={userAccount} />)}
                        >
                            Send
                        </button>
                        <button
                            className="btn-primary focus:font-bold"
                            onClick={() => handleButtonClick(<Swap walletType={wallet} userAccount={userAccount} />)}
                        >
                            Convert
                        </button>
                    </div>

                    <div>{activeComponent} {componentButton && <DepositFund copy={copy} setCopy={setCopy} walletName={wallet.symbol} />} </div>
                </div>
            </div>
        </div>
    );
};

export default CoinAccountModal;

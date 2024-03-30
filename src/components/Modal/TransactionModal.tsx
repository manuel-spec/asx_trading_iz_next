import Axios from 'axios';
import React, { useState } from 'react'
import { FaExchangeAlt } from 'react-icons/fa';
import { IoArrowBack } from 'react-icons/io5';
import { Link, useLocation } from 'react-router-dom';

const handleDiv = (event) => {
    event.stopPropagation();
};


const TransactionModal = (props) => {

    // Access the state object to retrieve the passed data
    const id = useLocation().state;
    const [data, setData] = useState('');
    const fetchData = async () => {
        try {
            const response = await Axios.get(`https://test.safepauleni.site/api/porto/${id}`);
            setData(response.data);
            // console.log(id)
            // Handle success and update data state
        } catch (error) {
            // console.error('Error making GET request', error);
            // Handle error
        }
    };


    // Now you can use the itemData in your component
    // console.log(data);
    return (
        <div className="mt-15 fixed inset-0 bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50" onClick={handleDiv}>
            <div className="bg-white p-10 rounded-lg h-full shadow-md space-y-6 w-100 flex flex-col">
                <div className='flex flex-col'>
                    <div className="flex flex-row justify-between">
                        <div>
                            <Link to="/">
                                <IoArrowBack />
                            </Link>
                        </div>
                        <div className="flex justify-center items-center ml-6">
                            <div></div>
                        </div>
                    </div>

                    <div className='flex flex-col justify-center items-center'>
                        <p className='text-2xl  p-3'>My Contract</p>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default TransactionModal

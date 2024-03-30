import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import Cookies from 'universal-cookie';


const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignIn = async (e) => {
        e.preventDefault()

        try {
            const response = await Axios.post('https://test.safepauleni.site/api/users/auth', {
                username,
                password,
            });

            console.log('Authentication successful!', response.data);

            // Set the JWT token as a cookie
            const cookies = new Cookies();
            cookies.set('jwtToken', response.data.token, { path: '/' });

            // Redirect the user to another page (e.g., dashboard)
            navigate('/admin/admin');
        } catch (error) {
            console.error('Authentication failed!', error.response ? error.response.data : error.message);
            // You can handle the authentication error as needed (e.g., display an error message)
        }
    };



    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                {/* ... (Your existing code) */}
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in</h2>
                </div>
                <div></div>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSignIn}>
                    {/* ... (Your existing code) */}
                    <label className="block text-sm font-medium leading-6 text-gray-900">username</label>
                    <div className="mt-2">
                        <input id="email" onChange={(e) => setUsername(e.target.value)} name="email" type="text" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <label className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                        </div>
                        <div className="mt-2">
                            <input id="password" onChange={(e) => setPassword(e.target.value)} name="password" type="password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                    <div>
                        <button type="submit" className="flex w-full justify-center bg-[#4D4CE6] rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Sign in
                        </button>
                    </div>
                </form>
            </div>



        </div >
    );
};

export default SignIn;
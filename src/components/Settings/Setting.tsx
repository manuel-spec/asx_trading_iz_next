import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useAccount } from 'wagmi'
import Comfirmation from '../../images/comfirmation/undraw_confirmation_re_b6q5.svg'

const Setting = () => {
    const [isUserRegistered, setIsUserRegistered] = useState(false);
    const { address } = useAccount()

    useEffect(() => {
        console.log(address)
        try {
            Axios.get(`https://test.safepauleni.site/api/users/${address}`).then((res) => {
                if (res.data["email"] != '') {
                    setIsUserRegistered(true)
                }
            }).catch((error) => {
                console.log(error);
            })
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }, [address]);

    const countries = [
        { code: 'usa', name: 'USA' },
        { code: 'canada', name: 'Canada' },
        { code: 'uk', name: 'UK' },
    ];

    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        date: '',
        nationality: '',
        email: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log(formData);
            const response = await Axios.put(`https://test.safepauleni.site/api/users/update/${address}`, formData);
            console.log(response)
            // console.log('PUT request successful:', response.data);
            // Handle success, e.g., show a success message to the user
        } catch (error) {
            console.error('Error making PUT request:', error);
            // Handle error, e.g., show an error message to the user
        }
    };

    return (
        <div>
            {!isUserRegistered && (<><h1 className='text-center text-2xl'>KYC Verification</h1>
                <div className='flex flex-col'>
                    <div className="max-w-md mx-auto">
                        <div>
                            KYC stands for "Know Your Customer." It is a process used by businesses and financial institutions to verify the identity of their customers. KYC verification involves collecting and verifying personal information about customers to ensure they are who they claim to be.
                        </div>
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <section aria-labelledby="identity_details_heading">
                                <h2 id="identity_details_heading" className="text-lg font-semibold">
                                    A. Identity Details
                                </h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        className="flex h-10 w-full rounded-md shadow shadow-input bg-background px-3 py-2 text-sm ring-offset-background placeholder-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder="First Name"
                                        name='firstname'
                                        required
                                        value={formData.firstname}
                                        onChange={handleInputChange}
                                    />
                                    <input
                                        className="flex h-10 w-full rounded-md shadow shadow-input bg-background px-3 py-2 text-sm ring-offset-background placeholder-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder="Last Name"
                                        name='lastname'
                                        required
                                        value={formData.lastname}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="flex gap-4 mt-2">
                                    <div className="relative max-w-sm">
                                        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                            </svg>
                                        </div>
                                        <input
                                            type="datetime-local"
                                            required
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="D-M-Y"
                                            name="date"
                                            value={formData.date}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <section aria-labelledby="nationality_heading">
                                        <select
                                            className="flex h-10 w-full rounded-md shadow border-input bg-background px-18 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            id="nationality"
                                            name="nationality"
                                            value={formData.nationality}
                                            onChange={handleInputChange}
                                        >
                                            <option value="">Please Select</option>
                                            {countries.map((country, index) => (
                                                <option key={index} value={country.code}>
                                                    {country.name}
                                                </option>
                                            ))}
                                        </select>
                                    </section>
                                </div>
                            </section>

                            <section aria-labelledby="email_heading">
                                <h2 id="email_heading" className="text-lg font-semibold">
                                    C. Email
                                </h2>
                                <input
                                    className="flex h-10 w-full rounded-md shadow shadow-input bg-background px-3 py-2 text-sm ring-offset-background placeholder-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="example@gmail.com"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                            </section>

                            <section aria-labelledby="declaration_heading">
                                <h2 id="declaration_heading" className="text-lg font-semibold">
                                    E. Declaration
                                </h2>
                                <p className="text-sm mb-4">
                                    I hereby declare that the information provided in this form is accurate and complete. I confirm that my
                                    information is furnished and I comprehend that the validation of registration may involve legal actions. I
                                    accept that I am the responsible party for any and all charges, penalties or actions.
                                </p>
                                <div className="flex items-center justify-between">
                                    <button type="submit" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow shadow-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                                        Sign Here
                                    </button>
                                </div>
                            </section>
                        </form>
                    </div>
                </div></>)}
            <div>
                {isUserRegistered && (<div className='flex flex-col'><div className='flex justify-center items-center'><img src={Comfirmation} alt="" /></div> <div className='flex justify-center '>User Information Submitted</div></div>)}

            </div>
        </div>
    );
};

export default Setting;

import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

const Chat = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([
        {
            author: 'admin',
            text: 'Hello! How can I assist you today?',
            time: new Date().toLocaleTimeString()
        }
    ]);

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };

    const handleSendMessage = () => {
        const newMessage = {
            author: 'user', // Set the author as 'user' for user messages
            text: message,
            time: new Date().toLocaleTimeString() // Add the current time
        };
        setMessages([...messages, newMessage]);
        setMessage('');
    };
    const navigate = useNavigate()
    const cookies = new Cookies();

    const gotToAdmin = () => {

        navigate('/admin/admin')
    }

    return (
        <div>
            <div className="flex flex-col h-screen">
                <header className="flex h-14 items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
                    <h1 className="font-semibold text-lg">Chat With Admin</h1>
                    <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-background hover:bg-accent hover:text-accent-foreground rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800" onClick={() => { gotToAdmin() }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                        <span className="sr-only">Toggle user menu</span>
                    </button>
                </header>
                <main className="flex flex-1 overflow-hidden">
                    <div className="w-64 border-r bg-gray-100/40 dark:bg-gray-800/40">
                        <div className="flex-1 overflow-auto py-2">
                            <nav className="grid items-start px-4 text-sm font-medium">
                                <a className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50" href="#">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                                        <path d="m7.5 4.27 9 5.15"></path>
                                        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path>
                                        <path d="m3.3 7 8.7 5 8.7-5"></path>
                                        <path d="M12 22V12"></path>
                                    </svg>

                                    Admin


                                </a>
                            </nav>
                        </div>
                    </div>
                    <div className="flex flex-col flex-1">
                        <div className="flex-1 overflow-auto p-4">
                            <div className="flex flex-col gap-4">
                                {messages.map((msg, index) => (
                                    <div key={index} className="flex items-start gap-4 text-sm">
                                        <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                                            <span className="flex h-full w-full items-center justify-center rounded-full bg-muted">CN</span>
                                        </span>
                                        <div className="grid gap-1">
                                            <div className="font-semibold">{msg.author === 'user' ? 'User' : 'Admin'}</div>
                                            <div className="line-clamp-1 text-xs">{msg.text}</div>
                                            <div className="line-clamp-1 text-xs"><span className="font-medium">Time:</span> {msg.time}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="border-t p-4">
                            <div className="flex items-center gap-2">
                                <input
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="Type your message here..."
                                    value={message}
                                    onChange={handleMessageChange}
                                />
                                <button
                                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                                    onClick={handleSendMessage}
                                >
                                    Send
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Chat

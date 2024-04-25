import { useEffect, useState } from 'react';
import axios from 'axios';

import support from '../../images/support.svg';

const SupportWindow = () => {
  const [msg, setMsg] = useState('');
  const [sentFrom, setSentFrom] = useState('');
  const [sentTo, setSentTo] = useState('');
  const [msgList, setMsgList] = useState([]);
  // useEffect(() => {
  //   axios.get('http://localhost:9000/api/chat/', {});
  // }, []);

  const sendMessage = () => {
    setSentFrom(localStorage.getItem('id'));
    setSentTo('65dc9dcb42524480b3d04c8a');
    setMsg(msg);
    console.log(msg);

    axios.post('http://localhost:9000/api/chat/', {
      sent_from: sentFrom,
      sent_to: sentTo,
      message: msg,
    });
  };
  useEffect(() => {
    const getMessages = () => {
      axios
        .post('http://localhost:9000/api/chat/list', {
          sent_from: localStorage.getItem('id'),
          sent_to: '65dc9dcb42524480b3d04c8a',
        })
        .then((res) => setMsgList(res['data']['sent_from']));
    };

    getMessages(); // Fetch messages initially
    const intervalId = setInterval(() => {
      getMessages(); // Fetch messages every second
    }, 1000);
    console.log(msgList);
    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col justify-center w-full bg-black fixed h-full top-0 border-slate-800 transition  duration-500 ease-in">
      <div className="flex flex-col justify-center absolute top-0 left-30">
        <p className="text-lg text-center font-semibold  text-white">
          Customer Support
        </p>
      </div>
      <div className="h-90">
        {msgList && msgList.length == 0 && (
          <div className="flex flex-col justify-center items-center mt-19 transition-color duration-500 ease-out">
            <img src={support} alt="" width={200} />
            <p className="text-white text-xs p-2">no messages yet</p>
          </div>
        )}
      </div>
      <div
        className="mb-4 bg-[#1F2937] rounded-lg"
        style={{ width: '100%', height: '430px', overflowY: 'auto' }}
      >
        <div className="flex flex-col"></div>
      </div>

      <div className="flex flex-col">
        <div className="flex absolute bottom-0">
          <input
            type="text"
            className="border border-[#ffffff] rounded-xl px-15 bg-black text-white"
            placeholder="Type Your Message Here"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />
          <button
            className="rounded-xl px-4 py-2 bg-[#2850E7] text-white"
            onClick={() => sendMessage()}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupportWindow;

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
    setMsg(msg);

    axios.post('http://localhost:9000/api/chat/', {
      sent_from: localStorage.getItem('id'),
      sent_to: '65dc9dcb42524480b3d04c8a',
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
        .then((res) => {
          setMsgList(res['data']['messages']);
          console.log(res['data']['messages']);
        });
    };

    getMessages(); // Fetch messages initially
    const intervalId = setInterval(() => {
      getMessages(); // Fetch messages every second
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col justify-center w-full bg-[#1F2937] fixed h-full top-0 border-slate-800 transition  duration-500 ease-in">
      <div className="flex flex-col justify-center absolute top-0 left-30">
        <p className="text-lg text-center font-semibold  text-white">
          Customer Support
        </p>
      </div>

      {msgList && msgList.length == 0 && (
        <div className="h-90">
          <div className="flex flex-col justify-center items-center mt-19 transition-color duration-500 ease-out">
            <img src={support} alt="" width={200} />
            <p className="text-white text-xs p-2">no messages yet</p>
          </div>
        </div>
      )}

      <div
        className="h-full rounded-lg mt-10 mb-20"
        style={{ overflowY: 'auto' }}
      >
        <div className="flex flex-col">
          {msgList.length > 0 &&
            msgList
              .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
              .map((item, index) => (
                <div key={index}>
                  <div
                    className={`flex text-white ${
                      item['sent_from'] == localStorage.getItem('id')
                        ? 'justify-end'
                        : 'justify-start'
                    }`}
                  >
                    <div>
                      <p
                        className={`text-white rounded-lg px-3 py-1 m-2 ${
                          item['sent_from'] == localStorage.getItem('id')
                            ? 'bg-[#0085E8]'
                            : 'bg-[#313840]'
                        }`}
                      >
                        {item['message']}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
        </div>
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

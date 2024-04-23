import { useState } from 'react';
import support from '../../images/support.svg';
const SupportWindow = () => {
  const [msg, setMsg] = useState('');

  return (
    <div className="flex flex-col justify-center w-full bg-black fixed h-full top-0 border-slate-800 transition  duration-500 ease-in">
      <div className="flex flex-col justify-center absolute top-0 left-30">
        <p className="text-lg text-center font-semibold  text-white">
          Customer Support
        </p>
      </div>
      <div className="h-90">
        {msg.length == 0 && (
          <div className="flex flex-col justify-center items-center mt-19 transition-color duration-500 ease-out">
            <img src={support} alt="" width={200} />
            <p className="text-white text-xs p-2">no messages yet</p>
          </div>
        )}
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
          <button className="rounded-xl px-4 py-2 bg-[#2850E7] text-white">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupportWindow;

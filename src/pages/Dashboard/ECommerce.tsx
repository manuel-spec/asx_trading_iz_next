import { useState } from 'react';
import NewsApi from '../../components/News/NewsApi.tsx';
import TableOne from '../../components/TopCryptos.tsx';
import Background from '../../images/bg.jpg';
import Logo from '../../images/logo/ASX-logo.png';
import Header from '../../components/Header.tsx';
import Sidebar from '../../components/Sidebar.tsx';


const ECommerce = () => {

  const [showNews, setShowNews] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false);


  return (
    <>
      <div className="" style={{ position: 'absolute', top: '0', left: '0', width: '100%', zIndex: '1' }}>
        {showNews && (
          <div className='w-full bg-[#2850E7] py-10 rounded-b-3xl mb-3 mt-0 bg-cover bg-center'>
            <div className='flex flex-row justify-between'>
              <div>
                <div className='flex flex-col'>
                  <div className='flex flex-row'>
                    <div>
                    </div>
                  </div>
                  <div className='flex flex-col'>
                    <div className='text-white text-6xl text-mono font-bold mb-2 smooch-sans ml-5'>
                      <h1>ASX</h1><span className='smooch-sans'></span>
                    </div>
                    <div className='text-white text-sm text-mono  mb-5 ml-4'>
                      <p>Start Making Money Plan</p>
                    </div>
                  </div>
                  {/* <div className='text-white font-mono text-xl'>
                    Start making money plan
                  </div> */}
                </div>
              </div>
              <div className='mr-5'>
                <img src={Logo} alt="" height={100} width={100} className='rounded-lg' />
              </div>
            </div>
          </div>
        )}
        <div className="col-span-12 xl:col-span-8">
          <TableOne showNews={setShowNews} />
        </div>
        <div>
          {showNews && (<NewsApi />)}
        </div>
      </div>
    </>
  );
};

export default ECommerce;

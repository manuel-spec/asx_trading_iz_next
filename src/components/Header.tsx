import { TbApps } from 'react-icons/tb';
import { useDisconnect } from 'wagmi';

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  const { disconnect } = useDisconnect();
  return (
    <header className="sticky w-10 top-0 z-999  flex mb-5 ">
      <div className="flex  items-center justify-between px-4 2xl:px-11">
        <div className="flex flex-row lg:hidden">
          <div>
            <button
              aria-controls="sidebar"
              onClick={(e) => {
                e.stopPropagation();
                props.setSidebarOpen(!props.sidebarOpen);
              }}
              className="z-99999 block rounded-sm border-stroke p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
            >
              <TbApps style={{ color: '#000000', fontSize: 20 }} />
            </button>
          </div>
          {/* <!-- Hamburger Toggle BTN --> */}
        </div>

        <div className="hidden sm:block"></div>
        {/* <div className="flex items-center gap-3 2xsm:gap-7 ">
          <button className="text-white" onClick={() => disconnect()}>
            disconnect
          </button>
        </div> */}
      </div>
    </header>
  );
};

export default Header;

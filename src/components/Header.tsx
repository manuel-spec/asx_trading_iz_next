import { TbApps } from 'react-icons/tb';

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
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
      </div>
    </header>
  );
};

export default Header;

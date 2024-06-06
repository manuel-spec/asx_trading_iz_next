import { useConnect } from 'wagmi';
import bglogo from './images/landing-bg.jpg';

export function WalletOptions() {
  const { connectors, connect } = useConnect();

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-gray-100 h-full"
      style={{
        backgroundImage: `url(${bglogo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="container mx-auto px-4 py-8 md:px-20 md:py-16">
        <div className="flex flex-col justify-between h-full md:flex-row">
          {/* Logo or Text */}
          <div className="flex flex-col items-center mb-8 md:mb-0 md:w-1/2">
            {/* Replace with your logo or brand name */}
            <img
              src="https://ledger-wp-website-s3-prd.ledger.com/uploads/2024/03/manage-ledger-live.webp"
              alt="Logo"
            />
          </div>

          {/* Textual content */}
          <div className="flex flex-col text-white md:w-1/2">
            <div className="text-3xl font-bold mb-4">Connect your wallet</div>
            <p className="text-lg">
              Start your journey by connecting your crypto wallet.
            </p>
          </div>
        </div>

        {/* Wallet connection options */}
        <div className="flex flex-wrap justify-center">
          {connectors.map((connector) => (
            <button
              key={connector.uid}
              onClick={() => connect({ connector })}
              className="inline-flex items-center ml-2 justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-[#1c1e35] text-white mb-4 md:mb-0 md:mr-4" // Added md:mb-0 md:mr-4
            >
              {connector.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

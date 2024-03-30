import { useEffect, useState } from 'react';

import './tail.css'
import Loader from './common/Loader';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider, useAccount } from 'wagmi'
import { config } from './config'
import { WalletOptions } from './wallet-options'
import RoutesInit from './routes/RoutesInit';
const queryClient = new QueryClient()

function ConnectWallet() {
  const { isConnected } = useAccount()
  if (isConnected) return <RoutesInit />
  return <WalletOptions />
}

function App() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    loading ? (
      <Loader />
    ) : (
      <>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <ConnectWallet />
          </QueryClientProvider>
        </WagmiProvider>

      </>
    ))

}

export default App;

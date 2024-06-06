import {
  createWeb3Modal,
  defaultConfig,
  useWeb3Modal,
} from '@web3modal/ethers5/react';
import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi';
import ConnectButton from './Connect';
import Axios from 'axios';
import { useEffect, useState } from 'react';

// 1. Get projectId
const projectId = '152c3a63a4435323a8359c6fcf8e912c';
// 2. Set chains
const mainnet = {
  chainId: 1,
  name: 'Ethereum',
  currency: 'ETH',
  explorerUrl: 'https://etherscan.io',
  rpcUrl: 'https://cloudflare-eth.com',
};

// 3. Create modal
const metadata = {
  name: 'My Website',
  description: 'My Website description',
  url: 'https://mywebsite.com',
  icons: ['https://avatars.mywebsite.com/'],
};

const provider = createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains: [mainnet],
  projectId,
});

export function handleWatchlist(crypto) {
  if (provider.walletConnectProvider.accounts[0] == null) {
    alert('Connect to a wallet');
  } else {
    Axios.post('https://uapi.universe-safepal.site/api/porto', {
      crypto: crypto,
      wallet: provider.walletConnectProvider.accounts[0],
    })
      .then(function (response) {
        alert('Crypto Tdded To Portfolio Successfully');
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

export default function App() {
  const [walletAddress, setWalletAddress] = useState('');
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });

  async function handleClick() {
    await open();
  }

  return (
    <div>
      <button onClick={() => disconnect()}>Disconnect</button>
    </div>
  );
}

import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia, mainnet } from 'wagmi/chains';
import { http } from 'viem';

export const config = getDefaultConfig({
  appName: 'Encrypted Voyage Contracts',
  projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID || '2ec9743d0d0cd7fb94dee1a7e6d33475',
  chains: [sepolia, mainnet],
  transports: {
    [sepolia.id]: http(import.meta.env.VITE_RPC_URL || 'https://1rpc.io/sepolia'),
    [mainnet.id]: http(import.meta.env.VITE_MAINNET_RPC_URL || 'https://1rpc.io/eth'),
  },
  ssr: false,
});

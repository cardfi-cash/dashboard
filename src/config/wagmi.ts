import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, polygon, optimism, arbitrum, base, sepolia } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Cardfi - DeFi Prepaid Cards',
  projectId: 'cardfi-dapp',
  chains: [arbitrum,polygon, optimism, base],
  ssr: false,
});

export const chains = [mainnet, polygon, optimism, arbitrum, base, sepolia];
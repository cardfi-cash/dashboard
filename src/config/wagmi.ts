import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { polygon, optimism, arbitrum, base } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Cardfi - DeFi Prepaid Cards',
  projectId: 'cardfi-dapp',
  chains: [arbitrum,polygon, optimism, base],
  ssr: false,
});

export const chains = [polygon, optimism, arbitrum, base];
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { arbitrum } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Cardfi - DeFi Prepaid Cards',
  projectId: 'cardfi-dapp',
  chains: [arbitrum],
  ssr: false,
});

export const chains = [arbitrum];
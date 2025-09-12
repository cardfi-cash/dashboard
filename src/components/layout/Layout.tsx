import { ReactNode, useMemo } from 'react';
import Header from './Header';
import { Footer } from './Footer';

import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { 
  PhantomWalletAdapter, 
  SolflareWalletAdapter 
} from '@solana/wallet-adapter-wallets';
import '@solana/wallet-adapter-react-ui/styles.css';
import { clusterApiUrl } from '@solana/web3.js';


interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
      const MAINNET_RPC = 'https://api.mainnet-beta.solana.com';
      const network = MAINNET_RPC;


      const endpoint = useMemo(() => network, []);
      const wallets = useMemo(
      () => [
        new PhantomWalletAdapter(),
        new SolflareWalletAdapter(),
      ],
      []
    );
  return (
    <div className="min-h-screen bg-defi-bg">
      <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
      <Header />
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
      <Footer/>
              </WalletModalProvider>
      </WalletProvider>
      </ConnectionProvider>
    </div>
  );
};

export default Layout;
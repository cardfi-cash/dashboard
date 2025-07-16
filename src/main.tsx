import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import { config } from './config/wagmi.ts';
import App from './App.tsx';
import { Buffer } from 'buffer';
import '@rainbow-me/rainbowkit/styles.css';
import './index.css';
window.Buffer = Buffer;
const queryClient = new QueryClient();

const customTheme = darkTheme({
  accentColor: '#ff007a',
  accentColorForeground: 'white',
  borderRadius: 'medium',
  fontStack: 'system',
  overlayBlur: 'small',
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider theme={customTheme}>
            <App />
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ErrorBoundary>
  </StrictMode>,
);
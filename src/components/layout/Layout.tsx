import { ReactNode } from 'react';
import Header from './Header';
import { Footer } from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-defi-bg">
      <Header />
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
      <Footer/>
    </div>
  );
};

export default Layout;
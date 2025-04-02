import { Outlet } from 'react-router-dom';
import AnimatedBackground from './AnimatedBackground';
import Footer from './Footer';
import Header from './Header';

const Layout = ({childern}) => {
  return (
    <div className="min-h-screen flex flex-col">
      <AnimatedBackground/>
      <Header />
      <main className="flex-grow">
        <Outlet /> {/* This renders the nested route content */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaBars, FaSignInAlt, FaUser, FaWallet } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

const Header = () => {
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleNavigation = (path) => {
    if (path === '/') {
      // Scroll to top when going home
      window.scrollTo(0, 0);
      navigate('/');
    } else if (path === '/bridge') {
      if (!user) {
        navigate('/login', { state: { from: '/bridge' } });
      } else {
        window.scrollTo(0, 0);
        navigate('/bridge');
      }
    } else if (path.startsWith('#')) {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const element = document.getElementById(path.substring(1));
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const element = document.getElementById(path.substring(1));
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(path);
    }
  };

  const navItems = [
    { name: 'Features', path: '#features' },
    { name: 'Docs', path: '#docs' },
    { name: 'Bridge', path: '/bridge' }
  ];

  return (
    <header className="sticky top-0 bg-[#0F172A]/80 backdrop-blur-md z-50 p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => handleNavigation('/')}
        >
          <FaWallet className="text-2xl text-[#3B82F6]" />
          <span className="font-bold text-xl">MyCryptoWallet</span>
        </motion.div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 items-center">
          {navItems.map((item) => (
            <motion.button
              key={item.name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`hover:text-[#3B82F6] ${
                location.pathname === item.path || 
                window.location.hash === item.path ? 'text-[#3B82F6]' : ''
              }`}
              onClick={() => handleNavigation(item.path)}
            >
              {item.name}
            </motion.button>
          ))}
          
          {user ? (
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] px-4 py-2 rounded-lg"
                onClick={() => handleNavigation('/profile')}
              >
                <FaUser />
                <span>Profile</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-[#E11D48] to-[#F97316] px-4 py-2 rounded-lg"
                onClick={handleLogout}
              >
                Logout
              </motion.button>
            </div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] px-4 py-2 rounded-lg"
              onClick={() => handleNavigation('/login')}
            >
              <FaSignInAlt />
              <span>Login</span>
            </motion.button>
          )}
        </nav>
        
        {/* Mobile Menu - Single Hamburger Icon */}
        <div className="md:hidden relative">
          <button 
            className="text-2xl text-gray-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <FaBars />
          </button>
          
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-48 bg-[#1E293B] rounded-md shadow-lg py-1 z-50 border border-[#3B82F6]/20"
              >
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    className={`block px-4 py-2 text-sm w-full text-left ${
                      location.pathname === item.path || 
                      window.location.hash === item.path 
                        ? 'text-[#3B82F6] bg-[#3B82F6]/10' 
                        : 'text-gray-300 hover:bg-[#3B82F6]/10 hover:text-[#3B82F6]'
                    }`}
                    onClick={() => handleNavigation(item.path)}
                  >
                    {item.name}
                  </button>
                ))}
                
                <div className="border-t border-[#3B82F6]/20 my-1"></div>
                
                {user ? (
                  <>
                    <button
                      className="block px-4 py-2 text-sm w-full text-left text-gray-300 hover:bg-[#3B82F6]/10 hover:text-[#3B82F6]"
                      onClick={() => handleNavigation('/profile')}
                    >
                      Profile
                    </button>
                    <button
                      className="block px-4 py-2 text-sm w-full text-left text-red-300 hover:bg-red-500/10"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <button
                    className="block px-4 py-2 text-sm w-full text-left text-gray-300 hover:bg-[#3B82F6]/10 hover:text-[#3B82F6]"
                    onClick={() => handleNavigation('/login')}
                  >
                    Login
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default Header;
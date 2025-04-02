import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Bridge from './components/Bridge';
import Docs from './components/Docs';
import Features from './components/Features';
import Hero from './components/Hero';
import Layout from './components/Layout';
import LoadingSpinner from './components/LoadingSpinner';
import Login from './components/Login';
import Profile from './components/Profile';
import Signup from './components/Signup';
import { auth } from './firebase';

const App = () => {
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log('Auth state changed:', currentUser); // Debug log
      setUser(currentUser);
      setAuthReady(true);
    });
    return () => unsubscribe();
  }, []);

  const ProtectedRoute = ({ children }) => {
    if (!authReady) {
      return <LoadingSpinner />;
    }
    return user ? children : <Navigate to="/login" state={{ from: window.location.pathname }} replace />;
  };

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={
            <>
              <Hero />
              <Features />
              <Docs />
              <div className="max-w-6xl mx-auto px-6 py-12 text-center">
                <div className="bg-gradient-to-r from-[#3B82F6]/10 to-[#8B5CF6]/10 p-8 rounded-xl border border-[#3B82F6]/20">
                  <h2 className="text-2xl font-bold mb-4">Ready to Bridge Your Assets?</h2>
                  <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
                    Start transferring your crypto across chains with our secure bridge
                  </p>
                  <a 
                    href="/bridge" 
                    className="inline-block bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] px-6 py-3 rounded-lg font-medium"
                  >
                    Go to Bridge
                  </a>
                </div>
              </div>
            </>
          } />
          
          {/* Protected routes */}
          <Route path="profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          
          <Route path="bridge" element={
            <ProtectedRoute>
              <Bridge />
            </ProtectedRoute>
          } />
        </Route>

        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
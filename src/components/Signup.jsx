import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaCheckCircle, FaEnvelope, FaExclamationTriangle, FaHome, FaLock, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import LoginBackground from './LoginBackground';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation checks
    if (!email.includes('@') || !email.includes('.')) {
      return setError('Please enter a valid email address');
    }
    
    if (password.length < 6) {
      return setError('Password must be at least 6 characters');
    }
    
    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    setLoading(true);
    setError('');

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Send verification email
      await sendEmailVerification(userCredential.user);
      
      setSuccess(true);
      
      // Optional: Redirect after delay
      setTimeout(() => {
        navigate('/');
      }, 5000);
      
    } catch (err) {
      let errorMessage = 'Registration failed. Please try again.';
      
      switch (err.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'Email already in use';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password should be at least 6 characters';
          break;
        case 'auth/operation-not-allowed':
          errorMessage = 'Email/password accounts are not enabled';
          break;
        default:
          errorMessage = err.message || 'An unknown error occurred';
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-[#0F172A] relative">
        <div className="absolute inset-0 bg-[#0F172A]/90 backdrop-blur-sm z-0"></div>
        <LoginBackground />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-[#1E293B]/90 p-8 rounded-xl border border-[#3B82F6]/20 shadow-xl relative z-10 backdrop-blur-sm text-center"
        >
          <div className="flex justify-center mb-4">
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 1 }}
              className="bg-green-500/10 p-3 rounded-full"
            >
              <FaCheckCircle className="h-8 w-8 text-green-500" />
            </motion.div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Account Created!</h2>
          <p className="text-gray-400 mb-6">
            We've sent a verification email to <span className="text-[#3B82F6]">{email}</span>
          </p>
          
          <div className="flex items-center justify-center gap-2 bg-blue-500/10 p-3 rounded-lg mb-6">
            <FaEnvelope className="text-blue-400" />
            <span className="text-blue-400 text-sm">Please check your inbox</span>
          </div>
          
          <p className="text-gray-400 text-sm">
            You'll be redirected in 5 seconds or <Link to="/" className="text-[#3B82F6] hover:underline">click here</Link> to go home now.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#0F172A]/90 backdrop-blur-sm z-0"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-[#1E293B]/90 p-8 rounded-xl border border-[#3B82F6]/20 shadow-xl relative z-10 backdrop-blur-sm"
      >
      <LoginBackground />
        {/* Home button */}
        <motion.button
          onClick={() => navigate('/')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="absolute top-4 left-4 flex items-center gap-2 text-[#3B82F6] hover:text-[#3B82F6]/80 text-sm"
        >
          <FaHome />
          <span>Home</span>
        </motion.button>

        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-[#3B82F6]/10 p-3 rounded-full">
              <FaUser className="text-2xl text-[#3B82F6]" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Create Account</h2>
          <p className="text-gray-400">Join our crypto wallet platform</p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 bg-red-500/10 text-red-400 rounded-lg text-sm flex items-start gap-2"
          >
            <FaExclamationTriangle className="mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="text-gray-500" />
              </div>
              <input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-[#0F172A] border border-[#3B82F6]/20 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/50 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-gray-500" />
              </div>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full bg-[#0F172A] border border-[#3B82F6]/20 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/50 focus:border-transparent"
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">Minimum 6 characters</p>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-gray-500" />
              </div>
              <input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
                className="w-full bg-[#0F172A] border border-[#3B82F6]/20 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/50 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="h-4 w-4 text-[#3B82F6] focus:ring-[#3B82F6] border-gray-600 rounded bg-[#0F172A]"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-300">
              I agree to the <a href="/terms" className="text-[#3B82F6] hover:text-[#3B82F6]/80">Terms</a> and <a href="/privacy" className="text-[#3B82F6] hover:text-[#3B82F6]/80">Privacy Policy</a>
            </label>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            className={`w-full bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-white py-3 px-4 rounded-lg font-medium ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating account...
              </span>
            ) : (
              'Sign Up'
            )}
          </motion.button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-[#3B82F6] hover:text-[#3B82F6]/80 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
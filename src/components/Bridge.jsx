import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaBitcoin, FaEthereum, FaExchangeAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

const Bridge = () => {
  const [fromToken, setFromToken] = useState('BTC');
  const [toToken, setToToken] = useState('ETH');
  const [amount, setAmount] = useState('');

  const tokens = [
    { symbol: 'BTC', name: 'Bitcoin', icon: <FaBitcoin className="text-[#F7931A]" /> },
    { symbol: 'ETH', name: 'Ethereum', icon: <FaEthereum className="text-[#627EEA]" /> },
    { symbol: 'USDC', name: 'USD Coin', icon: <span className="text-sm">$</span> }
  ];
  
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.currentUser) {
      navigate('/login', { state: { from: '/bridge' } });
    }
  }, [navigate]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-[#1E293B] p-6 rounded-xl border border-[#3B82F6]/20"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Cross-Chain Bridge</h2>
        
        <div className="space-y-4">
          {/* From Token */}
          <div className="bg-[#0F172A] p-4 rounded-lg">
            <label className="text-gray-400 text-sm mb-2 block">From</label>
            <div className="flex items-center gap-3">
              <select
                value={fromToken}
                onChange={(e) => setFromToken(e.target.value)}
                className="bg-[#3B82F6]/10 text-[#3B82F6] rounded px-3 py-2 flex-1"
              >
                {tokens.map(token => (
                  <option key={`from-${token.symbol}`} value={token.symbol}>
                    {token.name}
                  </option>
                ))}
              </select>
              <input
                type="number"
                placeholder="0.0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-transparent text-right text-lg w-24 focus:outline-none"
              />
            </div>
          </div>

          {/* Exchange Icon */}
          <div className="flex justify-center">
            <motion.div
              whileHover={{ rotate: 180 }}
              className="bg-[#3B82F6] p-2 rounded-full cursor-pointer"
              onClick={() => {
                const temp = fromToken;
                setFromToken(toToken);
                setToToken(temp);
              }}
            >
              <FaExchangeAlt className="text-white" />
            </motion.div>
          </div>

          {/* To Token */}
          <div className="bg-[#0F172A] p-4 rounded-lg">
            <label className="text-gray-400 text-sm mb-2 block">To</label>
            <div className="flex items-center gap-3">
              <select
                value={toToken}
                onChange={(e) => setToToken(e.target.value)}
                className="bg-[#3B82F6]/10 text-[#3B82F6] rounded px-3 py-2 flex-1"
              >
                {tokens.filter(t => t.symbol !== fromToken).map(token => (
                  <option key={`to-${token.symbol}`} value={token.symbol}>
                    {token.name}
                  </option>
                ))}
              </select>
              <div className="text-right text-lg w-24">
                {amount ? (parseFloat(amount) * 15.3) : '0.0'}
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] py-3 rounded-lg font-medium mt-6"
          >
            Bridge Now
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Bridge;
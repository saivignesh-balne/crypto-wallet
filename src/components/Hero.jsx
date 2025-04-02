import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaBitcoin, FaEthereum, FaExchangeAlt } from 'react-icons/fa';

const Hero = () => {
  const [showFullDemo, setShowFullDemo] = useState(false);

  return (
    <section id='hero' className="min-h-[80vh] flex items-center px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Bridge <span className="text-[#F7931A]">Bitcoin</span> to DeFi
          </h1>
          <p className="text-gray-300 mb-8 text-lg">
            The most secure way to connect your Bitcoin with EVM chains
          </p>
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-[#F7931A] to-[#E11D48] px-8 py-3 rounded-xl font-semibold"
            >
              Launch App
            </motion.button>
          </div>
        </motion.div>
        
        {/* Wallet Demo Section */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-[#1E293B] rounded-2xl p-6 shadow-2xl border border-[#3B82F6]/20 w-full h-full min-h-[300px]"
        >
          {showFullDemo ? (
            <WalletDemo onClose={() => setShowFullDemo(false)} />
          ) : (
            <div className="flex flex-col h-full">
              {/* Demo Header */}
              <div className="flex justify-between items-center mb-4 border-b border-[#3B82F6]/20 pb-3">
                <h3 className="font-semibold">Wallet Preview</h3>
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
              </div>
              
              {/* Demo Content - Fills remaining space */}
              <div className="flex-1 flex flex-col items-center justify-center bg-[#0F172A] rounded-lg p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold mb-2">Multi-Chain Wallet</div>
                  <p className="text-gray-400 mb-6">BTC • ETH • EVM Chains</p>
                  <div className="animate-pulse flex justify-center">
                    <div className="h-8 w-8 bg-[#3B82F6] rounded-full"></div>
                    <div className="h-8 w-8 bg-[#F7931A] rounded-full -ml-2"></div>
                    <div className="h-8 w-8 bg-[#627EEA] rounded-full -ml-2"></div>
                  </div>
                </div>
              </div>
              
              {/* Demo Footer */}
              <div className="mt-4 flex justify-center">
                <button 
                  onClick={() => setShowFullDemo(true)}
                  className="bg-[#3B82F6] hover:bg-[#2563EB] px-4 py-2 rounded-lg text-sm transition-colors"
                >
                  Try Interactive Demo
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

const WalletDemo = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('portfolio');
  const [fromToken, setFromToken] = useState('ETH');
  const [toToken, setToToken] = useState('BTC');
  const [amount, setAmount] = useState('');

  const demoData = {
    portfolio: {
      BTC: 0.042,
      ETH: 1.2,
      USDC: 250
    },
    activity: [
      { type: 'Received', token: 'ETH', amount: 0.5, date: '2 mins ago' },
      { type: 'Swapped', token: 'BTC', amount: 0.01, date: '1 hour ago' }
    ]
  };

  return (
    <div className="flex flex-col h-full">
      {/* Close button at top right */}
      <div className="flex justify-end mb-2">
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-white text-lg"
        >
          ×
        </button>
      </div>

      <div className="flex border-b border-[#3B82F6]/20 mb-4">
        <button
          onClick={() => setActiveTab('portfolio')}
          className={`py-2 px-4 ${activeTab === 'portfolio' ? 'text-[#3B82F6] border-b-2 border-[#3B82F6]' : 'text-gray-400'}`}
        >
          Portfolio
        </button>
        <button
          onClick={() => setActiveTab('swap')}
          className={`py-2 px-4 ${activeTab === 'swap' ? 'text-[#3B82F6] border-b-2 border-[#3B82F6]' : 'text-gray-400'}`}
        >
          Swap
        </button>
        <button
          onClick={() => setActiveTab('activity')}
          className={`py-2 px-4 ${activeTab === 'activity' ? 'text-[#3B82F6] border-b-2 border-[#3B82F6]' : 'text-gray-400'}`}
        >
          Activity
        </button>
      </div>

      {activeTab === 'portfolio' && (
        <div className="flex-1 overflow-y-auto">
          {Object.entries(demoData.portfolio).map(([token, balance]) => (
            <div key={token} className="flex justify-between items-center p-3 hover:bg-[#3B82F6]/10 rounded-lg">
              <div className="flex items-center gap-2">
                {token === 'BTC' ? (
                  <FaBitcoin className="text-[#F7931A] text-xl" />
                ) : token === 'ETH' ? (
                  <FaEthereum className="text-[#627EEA] text-xl" />
                ) : (
                  <div className="w-5 h-5 rounded-full bg-[#2775CA] flex items-center justify-center text-xs">$</div>
                )}
                <span>{token}</span>
              </div>
              <span>{balance}</span>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'swap' && (
        <div className="flex-1 space-y-4">
          <div className="bg-[#0F172A] p-3 rounded-lg">
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-400">From</span>
              <span className="text-sm">Balance: {fromToken === 'BTC' ? 0.042 : 1.2}</span>
            </div>
            <div className="flex">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.0"
                className="bg-transparent w-full text-lg outline-none"
              />
              <select
                value={fromToken}
                onChange={(e) => setFromToken(e.target.value)}
                className="bg-[#3B82F6]/10 text-[#3B82F6] rounded px-2"
              >
                <option>ETH</option>
                <option>BTC</option>
              </select>
            </div>
          </div>

          <div className="flex justify-center -my-3">
            <button className="bg-[#3B82F6] p-1 rounded-full">
              <FaExchangeAlt className="text-white" />
            </button>
          </div>

          <div className="bg-[#0F172A] p-3 rounded-lg">
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-400">To</span>
            </div>
            <div className="flex">
              <input
                type="number"
                value={amount ? (parseFloat(amount) * 0.062).toFixed(6) : ''}
                readOnly
                className="bg-transparent w-full text-lg outline-none"
              />
              <select
                value={toToken}
                onChange={(e) => setToToken(e.target.value)}
                className="bg-[#3B82F6]/10 text-[#3B82F6] rounded px-2"
              >
                <option>BTC</option>
                <option>ETH</option>
              </select>
            </div>
          </div>

          <button className="w-full bg-[#3B82F6] py-2 rounded-lg font-medium">
            Swap
          </button>
        </div>
      )}

      {activeTab === 'activity' && (
        <div className="flex-1 overflow-y-auto">
          {demoData.activity.map((item, index) => (
            <div key={index} className="flex justify-between items-center p-3 hover:bg-[#3B82F6]/10 rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  item.type === 'Received' ? 'bg-green-500/10 text-green-500' : 'bg-blue-500/10 text-blue-500'
                }`}>
                  {item.type === 'Received' ? '↓' : '⇄'}
                </div>
                <div>
                  <div className="font-medium">{item.type} {item.token}</div>
                  <div className="text-sm text-gray-400">{item.date}</div>
                </div>
              </div>
              <div className={`font-mono ${
                item.type === 'Received' ? 'text-green-500' : 'text-blue-500'
              }`}>
                {item.type === 'Received' ? '+' : '-'}{item.amount} {item.token}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Hero;
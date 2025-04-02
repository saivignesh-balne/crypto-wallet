import { motion } from 'framer-motion';
import { FaBitcoin, FaEthereum, FaExchangeAlt } from 'react-icons/fa';

const Features = () => {
  const features = [
    {
      icon: <FaBitcoin className="text-3xl text-[#F7931A]" />,
      title: "Bitcoin Native",
      description: "Direct BTC support with secure wrapping"
    },
    {
      icon: <FaEthereum className="text-3xl text-[#627EEA]" />,
      title: "Multi-Chain",
      description: "Connect to 10+ EVM chains"
    },
    {
      icon: <FaExchangeAlt className="text-3xl text-[#3B82F6]" />,
      title: "Instant Swaps",
      description: "Low-fee cross-chain exchanges"
    }
  ];

  return (
    <section id="features" className="py-20 bg-[#0F172A] px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Key Features</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            The most advanced toolkit for cross-chain DeFi operations
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-[#1E293B] p-8 rounded-xl border border-[#3B82F6]/10 hover:border-[#3B82F6]/30 transition-all"
            >
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
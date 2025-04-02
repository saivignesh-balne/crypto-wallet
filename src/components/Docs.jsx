import { motion } from 'framer-motion';
import { FaCode, FaFileAlt, FaQuestionCircle } from 'react-icons/fa';

const Docs = () => {
  const sections = [
    {
      title: "Getting Started",
      icon: <FaFileAlt className="text-[#3B82F6]" />,
      items: [
        "Introduction to MyCryptoWallet",
        "Creating Your First Wallet",
        "Security Best Practices"
      ]
    },
    {
      title: "API Reference",
      icon: <FaCode className="text-[#3B82F6]" />,
      items: [
        "Authentication API",
        "Transaction Endpoints",
        "Web3 Integration"
      ]
    },
    {
      title: "FAQ",
      icon: <FaQuestionCircle className="text-[#3B82F6]" />,
      items: [
        "Troubleshooting Common Issues",
        "Supported Networks",
        "Fee Structure"
      ]
    }
  ];

  return (
    <section id="docs" className="py-20 bg-[#0F172A] px-6 scroll-mt-20">
        <div className="min-h-[80vh] py-12 px-4">
            <div className="max-w-6xl mx-auto">
                <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
                >
                <h1 className="text-3xl font-bold mb-4">Documentation</h1>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Comprehensive guides and references for using MyCryptoWallet
                </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                {sections.map((section, index) => (
                    <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="bg-[#1E293B] p-6 rounded-xl border border-[#3B82F6]/10"
                    >
                    <div className="flex items-center gap-3 mb-4">
                        {section.icon}
                        <h2 className="text-xl font-semibold">{section.title}</h2>
                    </div>
                    <ul className="space-y-2">
                        {section.items.map((item, i) => (
                        <motion.li
                            key={i}
                            whileHover={{ x: 5 }}
                            className="text-gray-400 hover:text-[#3B82F6] cursor-pointer"
                        >
                            {item}
                        </motion.li>
                        ))}
                    </ul>
                    </motion.div>
                ))}
                </div>
            </div>
        </div>
    </section>
  );
};

export default Docs;
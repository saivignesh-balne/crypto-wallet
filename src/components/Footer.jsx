import { motion } from 'framer-motion';
import { FaArrowUp, FaDiscord, FaGithub, FaTwitter, FaWallet } from 'react-icons/fa';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const links = [
    {
      title: "Product",
      items: ["Bridge", "Swap", "Dashboard"]
    },
    {
      title: "Developers",
      items: ["Documentation", "API", "GitHub"]
    },
    {
      title: "Company",
      items: ["About", "Careers", "Contact"]
    }
  ];

  return (
    <footer className="bg-[#0A1E3D] text-gray-300 border-t border-[#3B82F6]/20">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <FaWallet className="text-2xl text-[#3B82F6]" />
              <span className="font-bold text-xl">MyCryptoWallet</span>
            </div>
            <p className="text-sm">
              Bridging Bitcoin to DeFi with multi-chain simplicity.
            </p>
            <div className="flex gap-4">
              {[<FaTwitter />, <FaGithub />, <FaDiscord />].map((Icon, i) => (
                <motion.a
                  key={i}
                  whileHover={{ y: -2, color: '#3B82F6' }}
                  className="text-gray-400 hover:text-[#3B82F6] cursor-pointer text-lg"
                  href="#"
                >
                  {Icon}
                </motion.a>
              ))}
            </div>
          </div>

          {links.map((section, i) => (
            <div key={i} className="space-y-4">
              <h3 className="font-semibold text-white">{section.title}</h3>
              <ul className="space-y-2">
                {section.items.map((item, j) => (
                  <li key={j}>
                    <motion.a
                      whileHover={{ x: 5, color: '#3B82F6' }}
                      className="text-sm hover:text-[#3B82F6] cursor-pointer block"
                      href="#"
                    >
                      {item}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-[#3B82F6]/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs mb-4 md:mb-0">
            © {new Date().getFullYear()} MyCryptoWallet. All rights reserved.
          </p>
          
          <div className="flex gap-6 mb-4 md:mb-0">
            <a href="#" className="text-xs hover:text-[#3B82F6]">Privacy Policy</a>
            <a href="#" className="text-xs hover:text-[#3B82F6]">Terms</a>
          </div>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1 text-sm bg-[#3B82F6]/10 hover:bg-[#3B82F6]/20 px-4 py-2 rounded-full"
          >
            <FaArrowUp className="text-[#3B82F6]" />
            <span>Back to Top</span>
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
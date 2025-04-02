import { signOut } from 'firebase/auth';
import { motion } from 'framer-motion';
import { FaCog, FaHistory, FaSignOutAlt, FaUser, FaWallet } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

const Profile = () => {
  const navigate = useNavigate();
  const user = auth.currentUser;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const menuItems = [
    { icon: <FaWallet className="text-[#3B82F6]" />, label: 'Wallet Balance', value: '$2,450.50' },
    { icon: <FaHistory className="text-[#3B82F6]" />, label: 'Transactions', value: '24' },
    { icon: <FaUser className="text-[#3B82F6]" />, label: 'Account Status', value: 'Verified' }
  ];

  return (
    <div className="min-h-[80vh] py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-[#1E293B] rounded-xl border border-[#3B82F6]/20 overflow-hidden"
      >
        {/* Profile Header */}
        <div className="bg-[#3B82F6]/10 p-6 border-b border-[#3B82F6]/20">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#3B82F6] flex items-center justify-center text-2xl font-bold">
              {user?.email?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-bold">{user?.email}</h2>
              <p className="text-gray-400 text-sm">Member since 2023</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-4 p-6">
          {menuItems.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="bg-[#0F172A] p-4 rounded-lg border border-[#3B82F6]/10"
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <div>
                  <p className="text-gray-400 text-sm">{item.label}</p>
                  <p className="font-medium">{item.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Settings Section */}
        <div className="p-6 border-t border-[#3B82F6]/20">
          <h3 className="text-lg font-semibold mb-4">Account Settings</h3>
          
          <div className="space-y-3">
            <motion.button
              whileHover={{ x: 5 }}
              className="w-full flex items-center gap-3 p-3 hover:bg-[#3B82F6]/10 rounded-lg text-left"
            >
              <FaCog className="text-[#3B82F6]" />
              <span>Settings</span>
            </motion.button>
            
            <motion.button
              whileHover={{ x: 5 }}
              onClick={handleLogout}
              className="w-full flex items-center gap-3 p-3 hover:bg-red-500/10 rounded-lg text-left"
            >
              <FaSignOutAlt className="text-red-500" />
              <span className="text-red-400">Logout</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
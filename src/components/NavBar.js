import React from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import BreakingNewsBar from './BreakingNewsBar';

const setMetaThemeColor = (color) => {
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (metaThemeColor) {
    metaThemeColor.setAttribute('content', color);
  }
};

const NavBar = ({ darkMode, setDarkMode }) => {
  const handleDarkModeToggle = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    const themeColor = newDarkMode ? '#1A202C' : '#FFFFFF'; // 统一暗黑模式颜色
    setMetaThemeColor(themeColor);
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/">
            <h1 className="text-3xl font-bold text-red-600 dark:text-red-400">黒潮に乗る伝書鳩 </h1>
          </Link>
          <nav>
            <ul className="flex space-x-4">
              <li><Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition duration-300">首頁</Link></li>
              <li><Link to="/investigations" className="text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition duration-300">深度調查</Link></li>
              <li><Link to="/reports" className="text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition duration-300">數據分析</Link></li>
              <li><Link to="/breaking-news" className="text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition duration-300">即時新聞</Link></li>
              <li><Link to="/about-us" className="text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition duration-300">關於我們</Link></li>
            </ul>
          </nav>
          <motion.button
            onClick={handleDarkModeToggle}
            className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>
        </div>
      </div>
      <BreakingNewsBar />
    </header>
  );
};

export default NavBar;

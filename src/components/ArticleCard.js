import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Eye, Bookmark } from 'lucide-react';

const ArticleCard = ({ article, darkMode }) => (
  <motion.div
    className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    whileHover={{ y: -5 }}
  >
    <Link to={`/investigation/${article._id}?darkMode=${darkMode}`}>
      <div className="relative">
        <img src={article.image} alt={article.title} className="w-full h-48 object-cover" />
        <div className="absolute top-0 right-0 bg-red-600 text-white px-2 py-1 text-sm">
          {article.category}
        </div>
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{article.title}</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{article.summary}</p>
        <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
          <span className="flex items-center"><Clock size={16} className="mr-1" /> {article.readTime} 分鐘閱讀</span>
          <span className="flex items-center"><Eye size={16} className="mr-1" /> {article.views} 閱讀</span>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-sm text-gray-500 dark:text-gray-400">{article.author} · {article.date}</span>
          <button className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">
            <Bookmark size={20} />
          </button>
        </div>
      </div>
    </Link>
  </motion.div>
);

export default ArticleCard;

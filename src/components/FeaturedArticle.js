import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const FeaturedArticle = ({ article, darkMode }) => (
  <motion.div 
    className="relative h-[70vh] bg-cover bg-center"
    style={{ backgroundImage: `url(${article.image})` }}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
  >
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end">
      <div className="container mx-auto px-4 py-16 text-white">
        <motion.h2 
          className="text-4xl font-bold mb-4"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {article.title}
        </motion.h2>
        <motion.p 
          className="text-xl mb-6"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          {article.summary}
        </motion.p>
        <Link to={`/investigation/${article._id}?darkMode=${darkMode}`}>
          <motion.button 
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            閱讀全文
          </motion.button>
        </Link>
      </div>
    </div>
  </motion.div>
);

export default FeaturedArticle;

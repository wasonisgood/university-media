import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchBreakingNews } from '../api/apiService';

const BreakingNewsBar = () => {
  const [currentNews, setCurrentNews] = useState(0);
  const [breakingNews, setBreakingNews] = useState([]);

  useEffect(() => {
    const loadNews = async () => {
      const news = await fetchBreakingNews();
      const barNews = news.filter(n => n.showInBar);
      setBreakingNews(barNews);
    };
    loadNews();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentNews((prev) => (prev + 1) % breakingNews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [breakingNews]);

  if (breakingNews.length === 0) return null;

  return (
    <div className="bg-red-600 text-white py-2 px-4">
      <div className="container mx-auto flex items-center">
        <span className="font-bold mr-4">突發新聞</span>
        <motion.div
          key={currentNews}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {breakingNews[currentNews].title}
        </motion.div>
      </div>
    </div>
  );
};

export default BreakingNewsBar;

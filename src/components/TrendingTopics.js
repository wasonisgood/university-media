import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchTrendingTopics } from '../api/apiService';

const TrendingTopics = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const loadTopics = async () => {
      const fetchedTopics = await fetchTrendingTopics();
      setTopics(fetchedTopics);
    };
    loadTopics();
  }, []);

  return (
    <section className="py-8 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">熱門話題</h2>
        <div className="flex flex-wrap gap-2">
          {topics.map((topic, index) => (
            <motion.span
              key={topic._id} // 使用唯一標識符作為key
              className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm cursor-pointer"
              whileHover={{ scale: 1.1 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {topic.topic} {/* 顯示話題名稱 */}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingTopics;

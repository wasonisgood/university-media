import React, { useState, useEffect } from 'react';
import { Zap, Clock, TrendingUp, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { fetchBreakingNews } from '../api/apiService';

const BreakingNewsList = ({ darkMode }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [newsList, setNewsList] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);

  useEffect(() => {
    const loadNews = async () => {
      const news = await fetchBreakingNews();
      setNewsList(news);
      setFilteredNews(news);
    };
    loadNews();
  }, []);

  useEffect(() => {
    const filtered = newsList.filter(news =>
      news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      news.summary.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredNews(filtered);
  }, [searchTerm, newsList]);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
      <header className={`shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold flex items-center">
            <Zap className="mr-2 text-red-500" />
            火線熱搜
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <input
            type="text"
            placeholder="搜索即時新聞..."
            className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'border-gray-300'}`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid gap-6">
          {filteredNews.map((news, index) => (
            <motion.article 
              key={news._id}
              className={`rounded-lg shadow-md overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <span className={`inline-block px-2 py-1 text-xs font-semibold rounded ${
                    news.category === '災害' ? 'bg-red-500 text-white' :
                    news.category === '政治' ? 'bg-blue-500 text-white' :
                    news.category === '健康' ? 'bg-green-500 text-white' :
                    news.category === '科技' ? 'bg-purple-500 text-white' :
                    'bg-yellow-500 text-white'
                  }`}>
                    {news.category}
                  </span>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock size={14} className="mr-1" />
                    <span>{new Date(news.timestamp).toLocaleTimeString()}</span>
                  </div>
                </div>
                <Link to={`/breaking-news/${news._id}`} className="block mt-2 text-xl font-semibold hover:underline">
                  {news.title}
                </Link>
                <p className={`mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{news.summary}</p>
                <div className="mt-4 flex justify-between items-center">
                  <div className="flex items-center text-sm text-gray-500">
                    <TrendingUp size={14} className="mr-1" />
                    <span>{news.trending} 人正在關注</span>
                  </div>
                  <Link to={`/breaking-news/${news._id}`} className="flex items-center text-blue-500 hover:text-blue-600">
                    閱讀更多 <ArrowRight size={16} className="ml-1" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </main>
    </div>
  );
};

export default BreakingNewsList;

import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';
import FeaturedArticle from './FeaturedArticle';
import TrendingTopics from './TrendingTopics';
import ArticleCard from './ArticleCard';
import NewsletterSignup from './NewsletterSignup';
import DataVisualization from './DataVisualization';
import { fetchInvestigationArticles } from '../api/apiService';

const HomePage = ({ darkMode, setDarkMode }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [currentPage, setCurrentPage] = useState(1);
  const [allArticles, setAllArticles] = useState([]);

  const articlesPerPage = 9;
  const categories = ['全部', '校園生活', '學術研究', '社會議題'];

  useEffect(() => {
    document.body.className = darkMode ? 'dark' : '';
  }, [darkMode]);

  useEffect(() => {
    const loadArticles = async () => {
      const articles = await fetchInvestigationArticles();
      setAllArticles(articles);
    };
    loadArticles();
  }, []);

  const filteredArticles = allArticles.filter(article =>
    (selectedCategory === '全部' || article.category === selectedCategory) &&
    (article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     article.summary.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const pageCount = Math.ceil(filteredArticles.length / articlesPerPage);
  const currentArticles = filteredArticles.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  );

  return (
    <main>
      {allArticles.length > 0 && <FeaturedArticle article={allArticles[0]} />}
      <TrendingTopics />
      <DataVisualization />

      <section className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="relative w-full md:w-auto">
            <input
              type="text"
              placeholder="搜索調查報告..."
              className="w-full md:w-64 pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
          <div className="flex space-x-2">
            {categories.map(category => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full ${
                  selectedCategory === category
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentArticles.map((article) => (
            <ArticleCard key={article.id} article={article} darkMode={darkMode} />
          ))}
        </div>

        <div className="mt-8 flex justify-center space-x-2">
          {Array.from({ length: pageCount }, (_, i) => (
            <motion.button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {i + 1}
            </motion.button>
          ))}
        </div>
      </section>

      <NewsletterSignup />
    </main>
  );
};

export default HomePage;

import React, { useState, useEffect } from 'react';
import { Search, Clock, Eye, Bookmark, TrendingUp, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import FeaturedArticlesSection from './FeaturedArticlesSection';
import { Link } from 'react-router-dom';
import { fetchInvestigationArticles } from '../api/apiService';

const InvestigationListPage = ({ darkMode }) => {
  const [investigationArticles, setInvestigationArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [sortBy, setSortBy] = useState('date');
  const articlesPerPage = 10;

  useEffect(() => {
    const loadArticles = async () => {
      const articles = await fetchInvestigationArticles();
      setInvestigationArticles(articles);
    };
    loadArticles();
  }, []);

  useEffect(() => {
    document.body.className = darkMode ? 'dark' : '';
  }, [darkMode]);

  const filteredArticles = investigationArticles.filter(article =>
    (article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.summary.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedCategory === '全部' || article.category === selectedCategory)
  ).sort((a, b) => {
    if (sortBy === 'date') return new Date(b.date) - new Date(a.date);
    if (sortBy === 'views') return b.views - a.views;
    return 0;
  });

  const featuredArticles = filteredArticles.filter(article => article.isFeatured);

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const categories = ['全部', '社會', '教育', '健康', '科技', '文化'];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
      <header className={`shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">深度調查</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-wrap items-center justify-between">
          <div className="w-full md:w-1/2 mb-4 md:mb-0">
            <input
              type="text"
              placeholder="搜索深度調查文章..."
              className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'border-gray-300'}`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/2 flex justify-end space-x-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={`px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'border-gray-300'}`}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'border-gray-300'}`}
            >
              <option value="date">最新</option>
              <option value="views">熱門</option>
            </select>
          </div>
        </div>

        {currentPage === 1 && <FeaturedArticlesSection featuredArticles={featuredArticles} darkMode={darkMode} />}

        {/* 最新調查 */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">最新調查</h2>
          <div className="grid gap-8">
            {currentArticles.map(article => (
              <motion.article 
                key={article.id}
                className={`rounded-lg shadow-md overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="md:flex">
                  <div className="md:flex-shrink-0">
                    <img className="h-48 w-full object-cover md:w-48" src={article.image} alt={article.title} />
                  </div>
                  <div className="p-8">
                    <div className="flex justify-between items-center mb-2">
                      <div className={`uppercase tracking-wide text-sm font-semibold ${darkMode ? 'text-indigo-300' : 'text-indigo-500'}`}>{article.category} · {article.date}</div>
                      {article.isBreaking && (
                        <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">突發</span>
                      )}
                    </div>
                    <Link to={`/investigation/${article._id}?darkMode=${darkMode}`} className={`block mt-1 text-lg leading-tight font-medium hover:underline ${darkMode ? 'text-white' : 'text-black'}`}>
                      {article.title}
                    </Link>
                    <p className={`mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>{article.summary}</p>
                    <div className={`mt-4 flex items-center justify-between text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      <div className="flex items-center">
                        <Clock size={16} className="mr-1" />
                        <span>{article.readTime} 分鐘閱讀</span>
                        <Eye size={16} className="ml-4 mr-1" />
                        <span>{article.views} 閱讀</span>
                      </div>
                      <div className="flex space-x-2">
                        {article.tags.map(tag => (
                          <span key={tag} className={`text-xs px-2 py-1 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* 分頁部分保持不變 */}
        <div className="mt-8 flex justify-center">
          {Array.from({ length: Math.ceil(filteredArticles.length / articlesPerPage) }, (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`mx-1 px-3 py-1 rounded ${
                currentPage === i + 1
                  ? 'bg-blue-500 text-white'
                  : `${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'} hover:bg-gray-300`
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default InvestigationListPage;

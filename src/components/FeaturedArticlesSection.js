import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Eye, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const FeaturedArticlesSection = ({ featuredArticles, darkMode }) => {
  return (
    <section className="mb-16">
      <h2 className="text-4xl font-bold mb-8 text-center">
        精選深度調查
        <div className="w-24 h-1 bg-red-500 mx-auto mt-2"></div>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredArticles.slice(0, 3).map((article, index) => (
          <motion.article 
            key={article.id}
            className={`rounded-lg overflow-hidden shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} transform transition duration-300 hover:scale-105`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="relative">
              <img 
                className="w-full h-64 object-cover" 
                src={article.image} 
                alt={article.title} 
              />
              <div className="absolute top-0 left-0 m-4">
                <span className={`inline-block px-3 py-1 text-sm font-semibold text-white rounded-full ${index === 0 ? 'bg-red-500' : 'bg-blue-500'}`}>
                  {index === 0 ? '頭條' : '精選'}
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                {article.title}
              </h3>
              <p className={`text-sm mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {article.summary}
              </p>
              <div className={`flex justify-between items-center text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <div className="flex items-center">
                  <Clock size={14} className="mr-1" />
                  <span className="mr-4">{article.readTime} 分鐘閱讀</span>
                  <Eye size={14} className="mr-1" />
                  <span>{article.views} 閱讀</span>
                </div>
                <Link to={`/investigation/${article._id}?darkMode=${darkMode}`}>
                  <button className={`flex items-center ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}>
                    閱讀更多 <ArrowRight size={14} className="ml-1" />
                  </button>
                </Link>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default FeaturedArticlesSection;

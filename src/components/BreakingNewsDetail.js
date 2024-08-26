import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Zap, Clock, TrendingUp, Share2, ThumbsUp, MessageSquare, Bookmark, Facebook, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { fetchNewsDetail } from '../api/apiService';

const BreakingNewsDetail = ({ darkMode }) => {
  const { id } = useParams();  // 确保这里的参数名称与路由匹配
  const [news, setNews] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const loadNewsDetail = async () => {
      try {
        const newsDetail = await fetchNewsDetail(id);
        setNews(newsDetail);
      } catch (error) {
        console.error('Error fetching news detail:', error);
      }
    };
    loadNewsDetail();
  }, [id]);

  if (!news) return <div>載入中...</div>;

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
      <header className={`shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="container mx-auto px-4 py-6">
          <Link to="/" className="text-3xl font-bold flex items-center">
            <Zap className="mr-2 text-red-500" />
            火線熱搜
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <motion.article 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`rounded-lg shadow-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
        >
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <span className="inline-block px-3 py-1 text-sm font-semibold rounded bg-red-500 text-white">
                {news.category}
              </span>
              <div className="flex items-center space-x-4">
                <button onClick={() => setIsBookmarked(!isBookmarked)} className={`p-2 rounded-full ${isBookmarked ? 'bg-blue-100 text-blue-500' : 'bg-gray-100 text-gray-500'}`}>
                  <Bookmark size={20} />
                </button>
                <button className="p-2 rounded-full bg-gray-100 text-gray-500">
                  <Share2 size={20} />
                </button>
              </div>
            </div>
            
            <h1 className="text-3xl font-bold mb-4">{news.title}</h1>
            
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <Clock size={14} className="mr-1" />
              <span>{new Date(news.timestamp).toLocaleString()}</span>
              <span className="mx-2">|</span>
              <span>作者：{news.author}</span>
            </div>

            <div className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {news.content}
            </div>

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-1 text-blue-500">
                  <ThumbsUp size={18} />
                  <span>{news.likes}</span>
                </button>
                <button className="flex items-center space-x-1 text-green-500">
                  <MessageSquare size={18} />
                  <span>{news.comments}</span>
                </button>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <TrendingUp size={14} className="mr-1" />
                <span>{news.trending} 人正在關注</span>
              </div>
            </div>

            <div className="border-t pt-6">
              <h2 className="text-xl font-semibold mb-4">分享這則新聞</h2>
              <div className="flex space-x-4">
                <button className="p-2 rounded-full bg-blue-500 text-white">
                  <Facebook size={20} />
                </button>
                <button className="p-2 rounded-full bg-blue-400 text-white">
                  <X size={20} />
                </button>
              </div>
            </div>
          </div>
        </motion.article>

        <section className="mt-8">
          <h2 className="text-2xl font-bold mb-4">相關新聞</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {news.relatedNews.map((relatedNews) => (
              <Link key={relatedNews._id} to={`/breaking-news/${relatedNews._id}`} className={`block p-4 rounded-lg shadow ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'}`}>
                <h3 className="font-semibold">{relatedNews.title}</h3>
              </Link>
            ))}
          </div>
        </section>

        <div className="mt-8 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700" role="alert">
          <p className="font-bold">通知</p>
          <p>我們致力於提供最新、最準確的新聞報導。如果您發現任何錯誤或有更多信息要補充，請聯繫我們的編輯團隊。</p>
        </div>
      </main>
    </div>
  );
};

export default BreakingNewsDetail;

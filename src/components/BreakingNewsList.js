import React, { useState, useEffect } from 'react';
import { Zap, Clock, TrendingUp, ArrowRight, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { fetchBreakingNews } from '../api/apiService';

const BreakingNewsList = ({ darkMode }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [newsList, setNewsList] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const [localNews, externalNews] = await Promise.all([
          fetchBreakingNews(),
          fetchExternalNews()
        ]);

        const combined = [...localNews, ...externalNews];
        setNewsList(combined);
        setFilteredNews(combined);
      } catch (err) {
        console.error('❌ 資料載入錯誤:', err);
        setLoadError('載入新聞時發生錯誤，請稍後再試。');
      }
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

  const fetchExternalNews = async () => {
    const today = new Date();
    const days = [0, 1, 2, 3]; // 往前4天
    const results = [];

    for (let offset of days) {
      const date = new Date(today);
      date.setDate(date.getDate() - offset);
      const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');

      const url = `https://japannewsmake.netlify.app/rss?date=${dateStr}&lang=zh-TW`;

      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`狀態碼 ${res.status}`);
        const json = await res.json();

        const formatted = json.items.map(item => ({
          _id: `external-${dateStr}-${item.url}`, // 假 ID
          title: item.title,
          summary: item.description || '',
          content: '',
          timestamp: new Date(item.publishedTime),
          category: '外部新聞',
          trending: 0,
          likes: 0,
          comments: 0,
          showInBar: false,
          url: item.url // 額外加上原始連結
        }));

        results.push(...formatted);
        console.log(`✅ 成功抓取 ${dateStr}：共 ${json.items?.length || 0} 筆`);
      } catch (err) {
        console.warn(`⚠️ 無法讀取外部新聞：${url}`, err.message);
      }
    }

    return results;
  };

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
        {loadError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 flex items-center">
            <AlertTriangle className="mr-2" />
            {loadError}
          </div>
        )}

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
                    news.category === '外部新聞' ? 'bg-gray-500 text-white' :
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
                {news.url ? (
                  <a href={news.url} target="_blank" rel="noopener noreferrer" className="block mt-2 text-xl font-semibold hover:underline">
                    {news.title}
                  </a>
                ) : (
                  <Link to={`/breaking-news/${news._id}`} className="block mt-2 text-xl font-semibold hover:underline">
                    {news.title}
                  </Link>
                )}
                <p className={`mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{news.summary}</p>
                <div className="mt-4 flex justify-between items-center">
                  <div className="flex items-center text-sm text-gray-500">
                    <TrendingUp size={14} className="mr-1" />
                    <span>{news.trending || 0} 人正在關注</span>
                  </div>
                  {news.url ? (
                    <a href={news.url} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-500 hover:text-blue-600">
                      閱讀更多 <ArrowRight size={16} className="ml-1" />
                    </a>
                  ) : (
                    <Link to={`/breaking-news/${news._id}`} className="flex items-center text-blue-500 hover:text-blue-600">
                      閱讀更多 <ArrowRight size={16} className="ml-1" />
                    </Link>
                  )}
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

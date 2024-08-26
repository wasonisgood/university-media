import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BarChart2, Clock, TrendingUp, Share2, ThumbsUp, MessageSquare, Bookmark, ArrowLeft, Download, Search } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { fetchReportDetail } from '../api/apiService';

const learningMethodData = [
  { name: '線上學習', value: 80 },
  { name: '傳統課堂', value: 20 },
];

const crossDisciplinaryData = [
  { name: '跨學科學習', value: 65 },
  { name: '單一學科', value: 35 },
];

const stressLevelData = [
  { name: '高壓力', value: 55 },
  { name: '適中', value: 30 },
  { name: '低壓力', value: 15 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const CampusReportDetail = ({ darkMode }) => {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const reportDetail = await fetchReportDetail(id);
      setReport(reportDetail);
    };
    fetchData();
  }, [id]);

  if (!report) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  );

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
      <header className={`shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <Link to="/" className="text-3xl font-bold flex items-center">
            <BarChart2 className="mr-2 text-red-500" />
            校園數據分析
          </Link>
          <div className="relative">
            <input
              type="text"
              placeholder="搜索調查報告..."
              className="w-64 pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
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
                {report.category}
              </span>
              <div className="flex items-center space-x-4">
                <button 
                  className="border border-gray-300 rounded-full p-2 transition-colors duration-200 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => setIsBookmarked(!isBookmarked)}
                >
                  <Bookmark className={isBookmarked ? "text-red-500" : "text-gray-500"} size={20} />
                </button>
                <button className="border border-gray-300 rounded-full p-2 transition-colors duration-200 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-700">
                  <Share2 size={20} />
                </button>
                <button className="border border-gray-300 rounded-full p-2 transition-colors duration-200 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-700">
                  <Download size={20} />
                </button>
              </div>
            </div>
            
            <h1 className="text-3xl font-bold mb-4">{report.title}</h1>
            
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <Clock size={14} className="mr-1" />
              <span>{new Date(report.timestamp).toLocaleString()}</span>
              <span className="mx-2">|</span>
              <span>作者：{report.author}</span>
            </div>

            <div className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <p className="font-bold mb-4">{report.summary}</p>
              <div className="prose max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: report.content }}></div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">主要發現視覺化</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-2">學習方式分佈</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={learningMethodData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {learningMethodData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-2">跨學科學習趨勢</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={crossDisciplinaryData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-1 px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full transition-colors duration-200 ease-in-out hover:bg-gray-300 dark:hover:bg-gray-600">
                  <ThumbsUp size={18} />
                  <span>{report.likes}</span>
                </button>
                <button className="flex items-center space-x-1 px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full transition-colors duration-200 ease-in-out hover:bg-gray-300 dark:hover:bg-gray-600">
                  <MessageSquare size={18} />
                  <span>{report.comments}</span>
                </button>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <TrendingUp size={14} className="mr-1" />
                <span>{report.trending} 人正在關注</span>
              </div>
            </div>
          </div>
        </motion.article>

        <section className="mt-8">
          <h2 className="text-2xl font-bold mb-4">相關報告</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {report.relatedReports.map((relatedReport) => (
              <Link key={relatedReport.id} to={`/reports/${relatedReport.id}`} className={`block p-4 rounded-lg shadow transition-colors duration-200 ease-in-out ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'}`}>
                <h3 className="font-semibold">{relatedReport.title}</h3>
              </Link>
            ))}
          </div>
        </section>

        <div className="mt-8 p-4 border border-red-500 rounded bg-red-100 dark:bg-red-900 dark:border-red-700">
          <h4 className="font-bold text-red-700 dark:text-red-300">注意</h4>
          <p className="text-red-700 dark:text-red-300">本報告內容僅供參考。如果您有任何問題或建議，請聯繫我們的研究團隊。</p>
        </div>
      </main>
    </div>
  );
};

export default CampusReportDetail;

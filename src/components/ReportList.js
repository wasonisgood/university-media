import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart2, ChevronRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchReports } from '../api/apiService';

const CampusReportDashboard = ({ darkMode = false }) => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const loadReports = async () => {
      const fetchedReports = await fetchReports();
      setReports(fetchedReports);
    };
    loadReports();
  }, []);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-8 flex items-center">
            <BarChart2 className="mr-2" />
            大學校園數據分析報告
          </h1>

          <p className="mb-8">我們的數據分析團隊致力於深入研究大學校園的各項議題，為教育工作者、政策制定者和學生提供有價值的洞察。以下是我們最新的研究報告：</p>

          <div className="grid gap-6">
            {reports.map((report) => (
              <Link
                key={report.id}
                to={`/reports/${report._id}`}
                className={`block p-6 rounded-lg shadow transition duration-300 ease-in-out ${
                  darkMode 
                    ? 'bg-gray-800 hover:bg-gray-700' 
                    : 'bg-white hover:bg-gray-50'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold mb-2 flex items-center">
                      <Zap className="mr-2 text-yellow-400" />
                      {report.title}
                    </h2>
                    <p className="text-sm text-gray-500 mb-2">發布日期：{report.date}</p>
                    <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>{report.summary}</p>
                  </div>
                  <ChevronRight className={`mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default CampusReportDashboard;

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import InvestigationListPage from './components/InvestigationListPage';
import InvestigationDetailPage from './components/InvestigationDetailPage';
import BreakingNewsListPage from './components/BreakingNewsList';
import BreakingNewsDetail from './components/BreakingNewsDetail';
import AboutUs from './components/AboutUs'; // 確保正確的引入路徑
import ReportList from './components/ReportList';
import ReportDetail from './components/ReportDetail';

const setMetaThemeColor = (color) => {
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (metaThemeColor) {
    metaThemeColor.setAttribute('content', color);
  }
};

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const isDarkMode = savedTheme === 'dark';
    setDarkMode(isDarkMode);
    const themeColor = isDarkMode ? '#000000' : '#FFFFFF';
    setMetaThemeColor(themeColor);
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, []);

  return (
    <Router>
      <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gray-100'}`}>
        <NavBar darkMode={darkMode} setDarkMode={setDarkMode} />
        <Routes>
          <Route path="/" element={<HomePage darkMode={darkMode} setDarkMode={setDarkMode} />} />
          <Route path="/investigations" element={<InvestigationListPage darkMode={darkMode} setDarkMode={setDarkMode} />} />
          <Route path="/investigation/:id" element={<InvestigationDetailPageWrapper darkMode={darkMode} setDarkMode={setDarkMode} />} />
          <Route path="/breaking-news" element={<BreakingNewsListPage darkMode={darkMode} setDarkMode={setDarkMode} />} />
          <Route path="/breaking-news/:id" element={<BreakingNewsDetail darkMode={darkMode} setDarkMode={setDarkMode} />} />
          <Route path="/about-us" element={<AboutUs darkMode={darkMode} />} />
          <Route path="/reports" element={<ReportList darkMode={darkMode} />} /> {/* 新增 ReportList 路由 */}
          <Route path="/reports/:id" element={<ReportDetail darkMode={darkMode} />} /> {/* 新增 ReportDetail 路由 */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

const InvestigationDetailPageWrapper = ({ darkMode, setDarkMode }) => {
  const { id } = useParams();
  return <InvestigationDetailPage articleId={parseInt(id)} darkMode={darkMode} setDarkMode={setDarkMode} />;
};

export default App;

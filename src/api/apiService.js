import api from './api';
import { mockFetchBreakingNews, mockFetchNewsDetail } from './mockApi';
import { mockFetchInvestigationArticles, mockFetchInvestigationArticleDetail, mockFetchComments, mockAddComment } from './mockApi';
import { mockFetchReports, mockFetchReportDetail } from './mockApi';
import { mockFetchTrendingTopics, mockFetchDataVisualization, mockSubscribeNewsletter } from './mockApi';

// 获取新闻列表
export const fetchBreakingNews = async () => {
  try {
    const response = await api.get('/breaking-news');
    return response.data;
  } catch (error) {
    console.error('Error fetching breaking news from real API, falling back to mock API:', error);
    return await mockFetchBreakingNews();
  }
};

// 获取新闻详情
export const fetchNewsDetail = async (_id) => {
  try {
    const response = await api.get(`/breaking-news/${_id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching news detail from real API, falling back to mock API:', error);
    return await mockFetchNewsDetail(_id);
  }
};
// 获取调查文章列表
export const fetchInvestigationArticles = async () => {
    try {
      const response = await api.get('/investigations');
      return response.data;
    } catch (error) {
      console.error('Error fetching investigation articles from real API, falling back to mock API:', error);
      return await mockFetchInvestigationArticles();
    }
  };
  
  // 获取调查文章详情
  export const fetchInvestigationArticleDetail = async (_id) => {
    try {
      const response = await api.get(`/investigations/${_id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching investigation article detail from real API, falling back to mock API:', error);
      return await mockFetchInvestigationArticleDetail(_id);
    }
  };
// 获取评论列表
export const fetchComments = async (articleId) => {
    try {
      const response = await api.get(`/investigation-articles/${articleId}/comments`);
      return response.data;
    } catch (error) {
      console.error('Error fetching comments from real API, falling back to mock API:', error);
      return await mockFetchComments(articleId);
    }
  };
  
  // 添加评论
  export const addComment = async (articleId, comment) => {
    try {
      const response = await api.post(`/investigation-articles/${articleId}/comments`, { comment });
      return response.data;
    } catch (error) {
      console.error('Error adding comment to real API, falling back to mock API:', error);
      return await mockAddComment(articleId, comment);
    }
  };
// 获取报告列表
export const fetchReports = async () => {
    try {
      const response = await api.get('/reports');
      return response.data;
    } catch (error) {
      console.error('Error fetching reports from real API, falling back to mock API:', error);
      return await mockFetchReports();
    }
  };
  
  // 获取报告详情
  export const fetchReportDetail = async (_id) => {
    try {
      const response = await api.get(`/reports/${_id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching report detail from real API, falling back to mock API:', error);
      return await mockFetchReportDetail(_id);
    }
  };
// 获取热门话题
export const fetchTrendingTopics = async () => {
    try {
      const response = await api.get('/trending-topics');
      return response.data;
    } catch (error) {
      console.error('Error fetching trending topics from real API, falling back to mock API:', error);
      return await mockFetchTrendingTopics();
    }
  };
  
  // 获取数据可视化
  export const fetchDataVisualization = async () => {
    try {
      const response = await api.get('/data-visualization');
      return response.data;
    } catch (error) {
      console.error('Error fetching data visualization from real API, falling back to mock API:', error);
      return await mockFetchDataVisualization();
    }
  };
// 订阅新闻简报
export const subscribeNewsletter = async (email) => {
    try {
      const response = await api.post('/newsletter/subscribe', { email });
      return response.data;
    } catch (error) {
      console.error('Error subscribing to newsletter from real API, falling back to mock API:', error);
      return await mockSubscribeNewsletter(email);
    }
  };
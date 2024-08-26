import React, { useState, useEffect } from 'react';
import { Clock, Eye, Bookmark, ThumbsUp, MessageSquare, Facebook, Twitter, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { fetchInvestigationArticleDetail, fetchComments, addComment } from '../api/apiService';
import { useParams } from 'react-router-dom';

const InvestigationDetailPage = ({ darkMode }) => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const loadArticle = async () => {
      try {
        const fetchedArticle = await fetchInvestigationArticleDetail(id);
        setArticle(fetchedArticle);
        setLikes(fetchedArticle.likes || 0); // 确保likes是一个数字
      } catch (error) {
        console.error('Error loading article:', error);
      }
    };
    loadArticle();
  }, [id]);

  useEffect(() => {
    const loadComments = async () => {
      try {
        const fetchedComments = await fetchComments(id);
        setComments(fetchedComments);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
    loadComments();
  }, [id]);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleAddComment = async () => {
    if (comment.trim() === '') return;
    try {
      const newComment = await addComment(id, comment);
      setComments([...comments, newComment]);
      setComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  useEffect(() => {
    document.body.className = darkMode ? 'dark' : '';
  }, [darkMode]);

  if (!article) return <div>載入中...</div>;

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
      <header className={`shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold leading-tight">{article.title}</h1>
          <p className="text-xl mt-2 text-red-600 dark:text-red-400 font-semibold">{article.subtitle}</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <article className={`rounded-lg shadow-xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <img className="w-full h-96 object-cover" src={article.image} alt={article.title} />
          
          <div className="p-8">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
              <div>
                <span className={`text-lg font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{article.author}</span>
                <div className={`flex items-center mt-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  <Clock size={16} className="mr-1" />
                  <span className="mr-4">{article.readTime} 分鐘閱讀</span>
                  <Eye size={16} className="mr-1" />
                  <span>{article.views} 閱讀</span>
                </div>
              </div>
              <div className="flex items-center">
                <span className={`text-lg mr-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{article.date}</span>
                <button 
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`p-2 rounded-full ${isBookmarked ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-600'} ${darkMode ? 'bg-gray-700' : ''}`}
                >
                  <Bookmark size={24} />
                </button>
              </div>
            </div>

            <div className={`prose max-w-none ${darkMode ? 'prose-invert' : ''} mt-8`}>
              <div className="text-xl font-semibold mb-6 p-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-lg">
                {article.summary}
              </div>
              
              <div className="article-content" dangerouslySetInnerHTML={{ __html: article.content }} />
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-between border-t pt-6">
              <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                <button 
                  onClick={handleLike}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full ${darkMode ? 'bg-red-600 hover:bg-red-700' : 'bg-red-100 hover:bg-red-200'}`}
                >
                  <ThumbsUp size={20} />
                  <span>{likes}</span>
                </button>
                <button className={`flex items-center space-x-2 px-4 py-2 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}>
                  <MessageSquare size={20} />
                  <span>{comments.length}</span>
                </button>
              </div>
              <div className="flex items-center space-x-4">
                <button className="text-red-500 hover:text-red-600">
                  <Facebook size={24} />
                </button>
                <button className="text-red-400 hover:text-red-500">
                  <Twitter size={24} />
                </button>
                <button className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}>
                  <Share2 size={20} />
                </button>
              </div>
            </div>
          </div>
        </article>

        <section className={`mt-12 rounded-lg shadow-lg p-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className="text-2xl font-bold mb-6">評論</h2>
          <form onSubmit={(e) => {e.preventDefault(); handleAddComment();}} className="mb-8">
            <textarea
              className={`w-full p-4 border rounded-lg focus:outline-none focus:ring-2 ${darkMode ? 'bg-gray-700 text-white border-gray-600 focus:ring-red-500' : 'border-gray-300 focus:ring-red-500'}`}
              rows="4"
              placeholder="分享您的看法..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <button className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300">
              發表評論
            </button>
          </form>
          <div className="space-y-4">
            {comments.map((c) => (
              <div key={c.id} className={`p-4 border rounded-lg ${darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-gray-100'}`}>
                <div className="flex justify-between items-center mb-2">
                  <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{c.user}</span>
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{c.date}</span>
                </div>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{c.comment}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6">相關調查</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className={`rounded-lg shadow-md overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <img className="w-full h-48 object-cover" src={`https://picsum.photos/seed/${index + 2}/800/400`} alt="Related Article" />
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">相關調查標題 {index + 1}</h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>這是相關調查報導的簡短摘要，吸引讀者點擊閱讀更多...</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <style jsx global>{`
        .article-content h2 {
          font-size: 1.8rem;
          font-weight: bold;
          margin-top: 2rem;
          margin-bottom: 1rem;
          color: ${darkMode ? '#f3f4f6' : '#1f2937'};
          border-bottom: 2px solid ${darkMode ? '#4b5563' : '#e5e7eb'};
          padding-bottom: 0.5rem;
        }

        .article-content h3 {
          font-size: 1.5rem;
          font-weight: bold;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
          color: ${darkMode ? '#e5e7eb' : '#374151'};
        }

        .article-content p {
          margin-bottom: 1.25rem;
          line-height: 1.8;
        }

        .article-content ul, .article-content ol {
          margin-bottom: 1.25rem;
          padding-left: 1.5rem;
        }

        .article-content li {
          margin-bottom: 0.5rem;
        }

        .article-content blockquote {
          font-style: italic;
          border-left: 4px solid ${darkMode ? '#4b5563' : '#e5e7eb'};
          padding-left: 1rem;
          margin: 1.5rem 0;
        }

        .article-content .infobox {
          background-color: ${darkMode ? '#374151' : '#e5e7eb'};
          border-radius: 0.5rem;
          padding: 1.5rem;
          margin: 1.5rem 0;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }

        .article-content .infobox h4 {
          font-weight: bold;
          font-size: 1.2rem;
          margin-bottom: 0.75rem;
          color: ${darkMode ? '#e5e7eb' : '#1f2937'};
        }

        .article-content .infobox p {
          font-size: 1rem;
          line-height: 1.6;
        }

        .article-content .expert-opinion {
          display: flex;
          align-items: center;
          background-color: ${darkMode ? '#2d3748' : '#f3f4f6'};
          border-radius: 0.5rem;
          padding: 1.5rem;
          margin: 1.5rem 0;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }

        .article-content .expert-opinion img {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          margin-right: 1.5rem;
          border: 3px solid ${darkMode ? '#4b5563' : '#e5e7eb'};
        }

        .article-content .expert-opinion blockquote {
          border-left: none;
          padding-left: 0;
          font-style: normal;
        }

        .article-content .expert-opinion blockquote p {
          font-size: 1.1rem;
          line-height: 1.6;
          color: ${darkMode ? '#e5e7eb' : '#1f2937'};
        }

        .article-content .expert-opinion cite {
          display: block;
          margin-top: 0.5rem;
          font-style: italic;
          color: ${darkMode ? '#9ca3af' : '#4b5563'};
        }

        .article-content .call-to-action {
          background-color: ${darkMode ? '#3b82f6' : '#dbeafe'};
          color: ${darkMode ? '#ffffff' : '#1e3a8a'};
          border-radius: 0.5rem;
          padding: 2rem;
          margin: 2rem 0;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }

        .article-content .call-to-action h3 {
          color: ${darkMode ? '#ffffff' : '#1e40af'};
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }

        .article-content .call-to-action ul {
          list-style-type: none;
          padding-left: 0;
        }

        .article-content .call-to-action li {
          margin-bottom: 0.75rem;
          padding-left: 1.5rem;
          position: relative;
        }

        .article-content .call-to-action li:before {
          content: '→';
          position: absolute;
          left: 0;
          color: ${darkMode ? '#93c5fd' : '#3b82f6'};
        }
      `}</style>
    </div>
  );
};

export default InvestigationDetailPage;

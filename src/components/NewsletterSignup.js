import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { subscribeNewsletter } from '../api/apiService';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await subscribeNewsletter(email);
      if (response.success) {
        console.log('Subscribed with email:', email);
        setEmail('');
      } else {
        console.error('Failed to subscribe');
      }
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
    }
  };

  return (
    <section className="bg-red-600 text-white py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4">訂閱我們的新聞簡報</h2>
        <p className="mb-6">獲取最新的校園調查報告和獨家內容。</p>
        <form onSubmit={handleSubmit} className="flex max-w-md">
          <input
            type="email"
            placeholder="您的郵箱地址"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-grow px-4 py-2 rounded-l-md text-gray-900"
            required
          />
          <motion.button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 px-4 rounded-r-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            訂閱
          </motion.button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSignup;

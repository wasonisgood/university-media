import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchDataVisualization } from '../api/apiService';

const DataVisualization = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const fetchedData = await fetchDataVisualization();
      setData(fetchedData);
    };
    loadData();
  }, []);

  return (
    <section className="py-12 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">熱點問題分析</h2>
        <div className="flex justify-center">
          <div className="w-full max-w-2xl">
            {data.map((item, index) => (
              <div key={item.name} className="mb-4">
                <div className="flex justify-between mb-1">
                  <span className="text-gray-700 dark:text-gray-300">{item.name}</span>
                  <span className="text-gray-700 dark:text-gray-300">{item.value}%</span>
                </div>
                <motion.div 
                  className="bg-gray-300 dark:bg-gray-600 rounded-full h-4"
                  initial={{ width: 0 }}
                  animate={{ width: `${item.value}%` }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                >
                  <div className="bg-red-600 h-4 rounded-full" style={{ width: `${item.value}%` }}></div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DataVisualization;

import React from 'react';
import { Mail, Phone, Instagram, X, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-200 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">快速鏈接</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-red-400 transition duration-300">首頁</a></li>
              <li><a href="#" className="hover:text-red-400 transition duration-300">深度調查</a></li>
              <li><a href="#" className="hover:text-red-400 transition duration-300">數據分析</a></li>
              <li><a href="#" className="hover:text-red-400 transition duration-300">關於我們</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">聯繫方式</h3>
            <p className="flex items-center mb-2"><Mail size={20} className="mr-2" /> contact@campusreport.com</p>
            <p className="flex items-center"><Phone size={20} className="mr-2" /> 123-456-7890</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">關注我們</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-red-400 transition duration-300"><Instagram size={24} /></a>
              <a href="#" className="hover:text-red-400 transition duration-300"><X size={24} /></a>
              <a href="#" className="hover:text-red-400 transition duration-300"><Facebook size={24} /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p>&copy; 2024 黒潮に乗る伝書鳩 . 版權所有.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

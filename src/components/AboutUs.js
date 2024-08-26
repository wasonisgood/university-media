import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Award, Clock, Search, Users } from 'lucide-react';

const AboutUs = ({ darkMode }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
      <main className="container mx-auto px-4 py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="text-5xl font-bold mb-12 text-center text-red-600"
            variants={itemVariants}
          >
            關於燃楓新聞
          </motion.h1>

          <motion.section className="mb-16" variants={itemVariants}>
            <h2 className="text-3xl font-semibold mb-6 text-center text-red-500">我們的使命</h2>
            <p className="mb-4 text-lg text-center max-w-3xl mx-auto">
              燃楓新聞致力於為讀者提供最及時、最準確的新聞報導。我們相信，在這個資訊爆炸的時代，高品質的新聞報導對於維護民主社會和公民參與至關重要。
            </p>
            <p className="text-lg text-center max-w-3xl mx-auto">
              我們的團隊由經驗豐富的記者、編輯和數據分析師組成，他們都擁有深厚的專業背景和對真相的不懈追求精神。
            </p>
          </motion.section>

          <motion.section className="mb-16" variants={itemVariants}>
            <h2 className="text-3xl font-semibold mb-6 text-center text-red-500">我們的價值觀</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: <Award className="w-12 h-12 mb-4 text-red-500" />, title: "準確性", description: "我們致力於提供準確無誤的新聞報導，嚴格的事實核查是我們工作的核心。" },
                { icon: <Users className="w-12 h-12 mb-4 text-red-500" />, title: "公正性", description: "我們承諾以公正、中立的態度報導新聞，呈現多元觀點。" },
                { icon: <Search className="w-12 h-12 mb-4 text-red-500" />, title: "透明度", description: "我們相信新聞報導的過程應該是透明的，我們歡迎讀者的監督和反饋。" },
                { icon: <Clock className="w-12 h-12 mb-4 text-red-500" />, title: "創新", description: "我們不斷探索新的報導方式和技術，以更好地服務我們的讀者。" },
              ].map((item, index) => (
                <div key={index} className={`p-6 rounded-lg shadow ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} text-center transition duration-300`}>
                  {item.icon}
                  <h3 className="text-xl font-semibold mb-2 text-red-500">{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section className="mb-16" variants={itemVariants}>
            <h2 className="text-3xl font-semibold mb-6 text-center text-red-500">我們的特色</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: "即時新聞", description: "我們的專業團隊 24 小時不間斷工作，確保您能第一時間獲得最新消息。" },
                { title: "深度報導", description: "除了即時新聞，我們還提供深度調查報導，幫助讀者全面了解複雜議題。" },
                { title: "數據新聞", description: "我們擅長運用數據分析技術，為讀者呈現數據背後的故事。" },
                { title: "互動體驗", description: "我們提供互動式新聞體驗，讓讀者能夠更深入地探索新聞事件。" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className={`p-6 rounded-lg shadow ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} transition duration-300`}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h3 className="text-xl font-semibold mb-2 text-red-500">{item.title}</h3>
                  <p>{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.section className="mb-16" variants={itemVariants}>
            <h2 className="text-3xl font-semibold mb-6 text-center text-red-500">聯繫我們</h2>
            <p className="mb-6 text-lg text-center max-w-3xl mx-auto">
              我們歡迎讀者的反饋和建議。如果您有任何問題、意見或新聞線索，請隨時與我們聯繫。
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: <Mail className="w-8 h-8 mb-4 text-red-500" />, title: "電子郵件", content: "contact@breakingnews.com" },
                { icon: <Phone className="w-8 h-8 mb-4 text-red-500" />, title: "電話", content: "+886 2 1234 5678" },
                { icon: <MapPin className="w-8 h-8 mb-4 text-red-500" />, title: "地址", content: "台北市信義區松高路1號" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className={`p-6 rounded-lg shadow ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} text-center transition duration-300`}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {item.icon}
                  <h3 className="text-xl font-semibold mb-2 text-red-500">{item.title}</h3>
                  <p>{item.content}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </motion.div>
      </main>
    </div>
  );
};

export default AboutUs;
const breakingNews = Array.from({ length: 20 }, (_, i) => ({
    _id: i + 1,
    title: `火線新聞：${['台灣地震最新進展', '總統大選辯論激烈交鋒', '新冠病毒新變種現蹤', '科技巨頭宣布重大裁員', '國際油價暴跌'][i % 5]}`,
    summary: `最新消息：${['地震造成多處建築受損，救援工作持續進行', '候選人就經濟政策展開激烈辯論', '專家呼籲密切關注新變種病毒傳播情況', '裁員計劃影響全球數千員工', '油價下跌或將影響全球經濟'][i % 5]}`,
    timestamp: new Date(Date.now() - Math.floor(Math.random() * 3600000)).toISOString(),
    category: ['災害', '政治', '健康', '科技', '經濟'][i % 5],
    trending: Math.floor(Math.random() * 10000) + 1000,
    showInBar: i % 2 === 0 // 偶数新闻显示在Bar中
  }));
  
  const newsDetails = {
    1: {
      _id: 1,
      title: "火線新聞：清大校園地震最新進展",
      content: "今日清晨，清華大學校園發生里氏6.5級地震，造成多處建築受損。目前，救援工作正在緊鑼密鼓地進行中。據初步統計，已有超過50人受傷，其中5人重傷。地震還導致部分校區電力中斷和交通瘫痪。學校已啟動緊急響應機制，調動各方資源展開救援。專家提醒師生注意餘震，並呼籲大家保持冷靜，聽從校方指示。",
      author: "張三",
      timestamp: new Date().toISOString(),
      category: "災害",
      trending: 8000,
      likes: 500,
      comments: 150,
      showInBar: true,
      relatedNews: [
        { _id: 2, title: "地震後續：清大啟動災後重建計劃" },
        { _id: 3, title: "專家解讀：為什麼台灣多地震？" },
        { _id: 4, title: "全球聲援：各國紛紛表示願意提供援助" }
      ]
    }
  };
  
  export const mockFetchBreakingNews = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(breakingNews);
      }, 500);
    });
  };
  
  export const mockFetchNewsDetail = async (_id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const newsDetail = newsDetails[_id];
        if (newsDetail) {
          resolve(newsDetail);
        } else {
          reject(new Error('News not found'));
        }
      }, 500);
    });
  };
  const investigationArticles = Array.from({ length: 20 }, (_, i) => ({
    _id: i + 1,
    title: `深度調查：${['校園食品安全問題', '學生心理健康危機', '高等教育改革困境', '校園欺凌現象剖析', '學術不端行為調查'][i % 5]}`,
    summary: `這是一篇關於${['校園食品安全', '學生心理健康', '高等教育改革', '校園欺凌', '學術不端'][i % 5]}的深度調查報告，揭示了一些令人震驚的發現...`,
    image: `https://picsum.photos/seed/${i + 1}/800/400`,
    author: ['張三', '李四', '王五', '趙六', '錢七'][i % 5],
    date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString().split('T')[0],
    readTime: Math.floor(Math.random() * 20) + 10,
    views: Math.floor(Math.random() * 50000) + 10000,
    category: ['社會', '教育', '健康', '科技', '文化'][i % 5],
    tags: ['調查報導', '深度分析', '社會議題', '教育改革', '健康安全'][i % 5].split(' '),
    isFeatured: i < 6, // 將前6篇文章設為精選報導
    isBreaking: i % 11 === 0,
  }));
  
  const investigationArticleDetails = investigationArticles.reduce((acc, article) => {
    acc[article._id] = {
      ...article,
      subtitle: `揭露${article.title.split('：')[1]}背後的真相`,
      likes: Math.floor(Math.random() * 1000),
      content: `
        <h2>引言</h2>
        <p>在過去的六個月裡，我們深入調查了全國多所大學的校園食品安全問題。本報告將詳細揭示我們的發現，這些發現可能會讓您感到震驚和憂心。</p>
        <h2>調查方法</h2>
        <p>我們採用了多方位的研究方法：</p>
        <ul>
          <li>實地走訪了10所大學的學生餐廳</li>
          <li>對200名學生和50名餐廳工作人員進行了深度訪談</li>
          <li>收集並分析了過去5年的食品安全報告</li>
          <li>委託專業實驗室對100個食品樣本進行檢測</li>
        </ul>
        <h2>主要發現</h2>
        <h3>1. 衛生標準普遍低下</h3>
        <p>在調查的10所大學中，有7所的廚房衛生狀況不達標。我們發現：</p>
        <ul>
          <li>食材儲存不當，容易導致交叉污染</li>
          <li>廚房設備清潔不徹底，滋生細菌</li>
          <li>部分員工缺乏基本的食品安全意識</li>
        </ul>
        <div class="infobox">
          <h4>數據速覽</h4>
          <p>70% 的調查學校廚房衛生狀況不達標<br>50% 的學生表示曾因餐廳食物出現腸胃不適</p>
        </div>
        <h3>2. 食品質量堪憂</h3>
        <p>通過實驗室檢測，我們發現：</p>
        <ul>
          <li>25% 的肉類樣本含有超標的抗生素殘留</li>
          <li>30% 的蔬菜樣本農藥殘留超標</li>
          <li>10% 的加工食品含有違禁添加劑</li>
        </ul>
        <blockquote>
          <p>"這些發現令人深思。我們必須採取行動來改善校園食品安全狀況，保障學生的健康。"</p>
          <cite>- 張教授，食品安全專家</cite>
        </blockquote>
        <h2>深層原因分析</h2>
        <p>通過深入調查，我們發現以下因素導致了當前的食品安全危機：</p>
        <ol>
          <li>監管不力：學校和相關部門對食品安全的監管存在漏洞</li>
          <li>利潤驅動：部分餐飲承包商為追求利潤而忽視食品安全</li>
          <li>意識缺失：學生和工作人員對食品安全的認識不足</li>
          <li>設備落後：部分學校的廚房設備陳舊，難以保證食品安全</li>
        </ol>
        <h2>專家觀點</h2>
        <div class="expert-opinion">
          <img src="/expert-avatar.jpg" alt="李教授" class="expert-avatar" />
          <blockquote>
            <p>"校園食品安全關乎學生健康，也關乎社會未來。我們必須建立更嚴格的監管機制，提高所有相關人員的食品安全意識。"</p>
            <cite>- 李教授，公共衛生學院</cite>
          </blockquote>
        </div>
        <h2>改善建議</h2>
        <p>基於調查結果，我們提出以下建議：</p>
        <ol>
          <li>加強監管：建立第三方食品安全監督機制</li>
          <li>提高標準：制定更嚴格的校園食品安全標準</li>
          <li>設備更新：為學校提供資金升級廚房設備</li>
          <li>教育培訓：定期對學生和工作人員進行食品安全教育</li>
          <li>信息公開：建立食品安全信息公開平台，接受社會監督</li>
        </ol>
        <h2>結論</h2>
        <p>校園食品安全問題不容忽視。本次調查揭示的問題雖然嚴重，但並非無法解決。通過政府、學校、學生和社會各界的共同努力，我們有信心能夠為學生創造一個更安全、更健康的飲食環境。</p>
        <div class="call-to-action">
          <h3>我們能做什麼？</h3>
          <ul>
            <li>關注並分享這篇報導，提高公眾意識</li>
            <li>向學校反饋你的食品安全擔憂</li>
            <li>參與校園食品安全監督志願者活動</li>
            <li>學習食品安全知識，保護自己和身邊的人</li>
          </ul>
        </div>
      `,
    };
    return acc;
  }, {});
  
  export const mockFetchInvestigationArticles = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(investigationArticles);
      }, 500);
    });
  };
  
  export const mockFetchInvestigationArticleDetail = async (_id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const articleDetail = investigationArticleDetails[_id];
        if (articleDetail) {
          resolve(articleDetail);
        } else {
          reject(new Error('Investigation article not found'));
        }
      }, 500);
    });
  };
  const commentsData = {
    1: [
      { _id: 1, user: 'User1', comment: '這是一個很棒的文章！', date: '2024-07-10' },
      { _id: 2, user: 'User2', comment: '內容詳盡，受益匪淺！', date: '2024-07-11' },
    ],
    // 确保每篇文章都有评论数据初始化
    ...Array.from({ length: 20 }, (_, i) => ({ [i + 1]: [] })).reduce((acc, curr) => ({ ...acc, ...curr }), {}),
  };
  
  export const mockFetchComments = async (articleId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(commentsData[articleId] || []);
      }, 500);
    });
  };
  
  export const mockAddComment = async (articleId, comment) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newComment = {
          _id: commentsData[articleId].length + 1,
          user: 'Anonymous',
          comment,
          date: new Date().toISOString().split('T')[0],
        };
        commentsData[articleId].push(newComment);
        resolve(newComment);
      }, 500);
    });
  };
// mockApi.js

const reportsData = [
    { _id: 1, title: "2024年台灣大學生學習模式調查", date: "2024-03-15", summary: "本報告深入分析了台灣大學生的學習習慣、偏好和挑戰，為教育政策制定提供了寶貴參考。" },
    { _id: 2, title: "校園社交媒體使用趨勢分析", date: "2024-02-28", summary: "這份報告探討了社交媒體對大學生學習和社交生活的影響，並提出了相關建議。" },
    { _id: 3, title: "大學生心理健康狀況調查", date: "2024-01-20", summary: "本報告通過大規模問卷調查，揭示了當前大學生面臨的主要心理健康問題和壓力來源。" },
  ];
  
  export const mockFetchReports = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(reportsData);
      }, 500);
    });
  };
  
  const reportDetailData = {
    _id: 1,
    title: "2024年台灣大學生學習模式調查",
    summary: "本報告深入分析了台灣大學生的學習習慣、偏好和挑戰，為教育政策制定提供了寶貴參考。",
    content: `
       <h1 class="text-3xl font-bold mb-6">2024年台灣大學生學習模式調查</h1>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">調查背景</h2>
        <p class="mb-4">隨著科技的快速發展和社會的變遷，大學生的學習模式也在不斷演變。為了更好地了解當前台灣大學生的學習狀況，我們進行了這項全面的調查研究。</p>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">主要發現</h2>
        <ul class="list-disc pl-6 space-y-2">
          <li><strong>線上學習的普及</strong>：超過 80% 的受訪者表示每週至少使用一次線上學習平台。</li>
          <li><strong>跨學科學習的趨勢</strong>：約 65% 的學生正在修讀主修以外的課程，以擴展知識面。</li>
          <li><strong>實踐性學習的重要性</strong>：超過 70% 的學生認為實習和項目式學習對其未來職業發展至關重要。</li>
          <li><strong>學習壓力問題</strong>：約 55% 的學生報告經常感到學習壓力過大，需要更多的心理健康支持。</li>
        </ul>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">建議</h2>
        <ol class="list-decimal pl-6 space-y-2">
          <li>加強線上和線下學習的融合，提供更靈活的學習選擇。</li>
          <li>鼓勵跨學科學習，培養學生的綜合能力。</li>
          <li>增加實踐性學習機會，加強產學合作。</li>
          <li>加強學生心理健康服務，幫助學生更好地管理學習壓力。</li>
        </ol>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">結論</h2>
        <p class="mb-4">本次調查為我們提供了寶貴的洞察，有助於教育機構和政策制定者更好地理解和滿足當代大學生的學習需求。我們建議相關方面根據這些發現，適時調整教育策略和政策，以培養出更適應未來社會需求的人才。</p>
      </section>
    `,
    author: "張三",
    timestamp: new Date().toISOString(),
    category: "教育研究",
    trending: 5000,
    likes: 1200,
    comments: 350,
    relatedReports: [
      { _id: 2, title: "校園社交媒體使用趨勢分析" },
      { _id: 3, title: "大學生心理健康狀況調查" },
      { _id: 4, title: "高等教育數位化轉型報告" }
    ]
  };
  
  export const mockFetchReportDetail = async (_id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(reportDetailData);
      }, 500);
    });
  };
// mockApi.js

const topicsData = ['學生權益', '教育公平', '科研誠信', '校園文化', '就業形勢'];
const dataVisualizationData = [
  { name: '學術不端', value: 65 },
  { name: '校園欺凌', value: 45 },
  { name: '就業壓力', value: 80 },
  { name: '心理健康', value: 70 },
];

export const mockFetchTrendingTopics = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(topicsData);
    }, 500);
  });
};

export const mockFetchDataVisualization = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dataVisualizationData);
    }, 500);
  });
};

export const mockSubscribeNewsletter = async (email) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Subscribed with email:', email);
      resolve({ success: true });
    }, 500);
  });
};

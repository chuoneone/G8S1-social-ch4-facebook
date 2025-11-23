import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, Home, Tv, Users, MessageCircle, Bell, 
  Menu, X, Heart, Send, Image, Smile, 
  MoreHorizontal, ThumbsUp, MessageSquare, Share2, 
  Check, Video, Bookmark, ChevronUp, Minus, ImageOff 
} from 'lucide-react';

// --- Global Styles & Animations ---
const GlobalStyles = () => (
  <style>{`
    .scrollbar-hide::-webkit-scrollbar {
        display: none;
    }
    .scrollbar-hide {
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
    @keyframes progress {
        0% { width: 0%; }
        100% { width: 100%; }
    }
    .animate-progress {
        animation: progress 3s linear;
    }
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in {
        animation: fadeIn 0.2s ease-out;
    }
    @keyframes slideUp {
        from { transform: translateY(100%); }
        to { transform: translateY(0); }
    }
    .animate-slide-up {
        animation: slideUp 0.3s ease-out;
    }
    .pb-safe {
        padding-bottom: env(safe-area-inset-bottom);
    }
  `}</style>
);

// --- Icon Mapping ---
const IconMap = {
  search: Search,
  home: Home,
  tv: Tv,
  users: Users,
  'message-circle': MessageCircle,
  bell: Bell,
  menu: Menu,
  x: X,
  heart: Heart,
  send: Send,
  image: Image,
  smile: Smile,
  'more-horizontal': MoreHorizontal,
  'thumbs-up': ThumbsUp,
  'message-square': MessageSquare,
  'share-2': Share2,
  check: Check,
  video: Video,
  bookmark: Bookmark,
  'chevron-up': ChevronUp,
  minus: Minus,
  'image-off': ImageOff
};

const Icon = ({ name, size = 20, className = "", onClick }) => {
  const LucideIcon = IconMap[name] || Home;
  return <LucideIcon size={size} className={className} onClick={onClick} />;
};

// --- Initial Data ---
const currentUser = {
  name: "認真的歷史小老師",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Teacher"
};

const initialStories = [
  { id: 1, user: "康熙皇帝", img: "https://images.unsplash.com/photo-1533613220915-609f661a6fe1?w=400&h=600&fit=crop", text: "臺灣納入版圖！朕心甚慰。", type: 'image' },
  { id: 2, user: "羅漢腳", img: "https://images.unsplash.com/photo-1523325343676-4136d25d013b?w=400&h=600&fit=crop", text: "徵求過年返鄉船票...單身狗求帶。", type: 'image' },
  { id: 3, user: "原住民勇士", img: "https://images.unsplash.com/photo-1496947852913-6d413db1a5b7?w=400&h=600&fit=crop", text: "不要越過土牛溝！這是我們的獵場。", type: 'image' },
  { id: 4, user: "沈葆楨", img: "https://images.unsplash.com/photo-1625558236395-2349cb1df293?w=400&h=600&fit=crop", text: "開山撫番進行中... 牡丹社事件後不能再拖了。", type: 'image' },
  { id: 5, user: "劉銘傳", img: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=400&h=600&fit=crop", text: "火車要開了！嘟嘟～ 台北到基隆一日遊。", type: 'image' },
];

const initialPosts = [
  {
      id: 1,
      author: "清代臺灣史教學專區",
      time: "1小時前",
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=History",
      content: (
          <div>
              <p className="font-bold text-lg mb-2">【4-1 清初治臺政策：為防臺而治臺】</p>
              <p>清帝國統治臺灣初期（康熙年間），主要目的是「防止臺灣發生動亂」，並不是真的想開發這裡喔！🛑</p>
              <br/>
              <p>施琅大將軍當年說了一句名言：「臺灣土地肥沃，戰略地位重要，放棄的話會影響東南沿海安全！」所以我們才在1684年被納入版圖。</p>
              <br/>
              <div className="bg-yellow-100 p-3 rounded-lg border-l-4 border-yellow-500 mb-2">
                  <strong>重點措施：</strong>
                  <ul className="list-disc ml-5 mt-1">
                      <li>🚫 <strong>渡臺禁令：</strong>要申請證照、不准帶家眷（導致「羅漢腳」出現）。</li>
                      <li>🏔️ <strong>劃界封山：</strong>設立「番界」（土牛溝），漢人禁止進入原住民區域。</li>
                  </ul>
              </div>
              <p>想一想：這些政策真的有效嗎？（偷渡的人還是很多啊...😅）</p>
          </div>
      ),
      likes: 126,
      comments: [
          { id: 101, user: "施琅", text: "我就說臺灣很重要吧！要是不留著，被外國人佔去就麻煩了。" },
          { id: 102, user: "偷渡客阿明", text: "禁令根本擋不住我想去臺灣的心。但我老婆小孩都不能來，只能我一個人先過去打拚，好孤單。" },
          { id: 103, user: "社會觀察家", text: "樓上這就是典型的『羅漢腳』成因！因為渡臺禁令規定『禁攜家眷』，導致早期台灣社會陰陽失調，男多女少，這些單身男子如果沒工作，就很容易變成社會隱憂。" },
          { id: 104, user: "歷史成語通", text: "那時候渡海來台真的很危險，俗話說『六死三留一回頭』，十個人裡面有六個死在黑水溝，三個留下來，一個回頭不敢來。" },
          { id: 105, user: "地理小老師", text: "關於『土牛溝』，它其實不是真的牆，而是挖溝後把土堆在旁邊，形狀像臥牛一樣，所以才叫土牛。這是為了區隔漢人跟原住民的界線。" }
      ]
  },
  {
      id: 2,
      author: "清代臺灣史教學專區",
      time: "3小時前",
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=History",
      content: (
          <div>
              <p className="font-bold text-lg mb-2">【行政區劃的演變：為什麼地圖一直變？】</p>
              <p>大家有沒有發現，清朝的台灣地圖，縣市越來越多？🗺️</p>
              <p>其實是因為「民變」和「外患」！</p>
              <br/>
              <ul className="list-decimal ml-5">
                  <li>初期：只有臺灣府 + 3縣（臺灣、鳳山、諸羅）。</li>
                  <li><strong>朱一貴事件</strong>後 ➡️ 增設彰化縣、淡水廳。</li>
                  <li><strong>林爽文事件</strong>後 ➡️ 諸羅改名「嘉義」（嘉許義行）。</li>
                  <li><strong>噶瑪蘭廳</strong> ➡️ 漢人開墾宜蘭＋海盜侵擾。</li>
              </ul>
              <br/>
              <p>簡單來說：哪裡出事，哪裡就增設官府來管！👮‍♂️</p>
          </div>
      ),
      image: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=800&h=400&fit=crop", 
      imageCaption: "示意圖：清代台灣行政區域圖 (來源: Unsplash)",
      likes: 89,
      comments: [
          { id: 201, user: "吳沙", text: "蛤仔難（宜蘭）是我帶人去開墾的！但清朝政府一開始根本不想管，是怕海盜躲在那邊才設廳的。" },
          { id: 202, user: "考據黨", text: "『諸羅』改名『嘉義』這個細節很重要！是因為林爽文事件時，諸羅縣城的百姓死守城池協助官府，乾隆皇帝為了『嘉許義民』才賜名的。" },
          { id: 203, user: "台北人", text: "這時候的北部只有一個『淡水廳』，管轄大甲溪以北的所有地方，範圍超大！後來事情變多了才又慢慢分出其他縣市。" },
          { id: 204, user: "嘉義鄉民", text: "原來我們嘉義的名字是這樣來的，長知識了！" }
      ]
  },
  {
      id: 3,
      author: "清代臺灣史教學專區",
      time: "5小時前",
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=History",
      content: (
          <div>
              <p className="font-bold text-lg mb-2">【4-2 政策大轉彎：從消極到積極】</p>
              <p>到了19世紀中葉，清廷終於發現臺灣超級重要！因為外國人一直打過來啦！🚢💥</p>
              <br/>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-red-50 p-3 rounded">
                      <strong>🔥 牡丹社事件 (1874)</strong>
                      <p className="text-sm mt-1">琉球船難者被殺 ➡️ 日本出兵屏東 ➡️ 沈葆楨來臺建設。</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded">
                      <strong>💣 清法戰爭 (1884)</strong>
                      <p className="text-sm mt-1">法國打越南順便打臺灣 ➡️ 臺灣建省 ➡️ 劉銘傳當巡撫。</p>
                  </div>
              </div>
              <br/>
              <p>這兩件事讓清廷從「為防臺而治臺」轉變為「積極建設」，開始蓋炮台、鐵路、開山撫番！🚂</p>
          </div>
      ),
      likes: 245,
      comments: [
          { id: 301, user: "沈葆楨", text: "我來的時候真的百廢待舉。為了加強防禦，我請法國人設計蓋了『億載金城』（二鯤鯓砲台），這可是台灣第一座西式砲台！" },
          { id: 302, user: "劉銘傳", text: "我接手後更忙了。不僅蓋鐵路，還架設了『水師電報線』，讓台灣可以跟福州直接通訊，不用再靠船傳信了。" },
          { id: 303, user: "鐵道迷", text: "補充一下，劉銘傳蓋的鐵路只有『基隆到新竹』這一段喔！新竹以南是後來才接續完成的，當時火車速度還很慢呢。" },
          { id: 304, user: "霧社勇士", text: "所謂的『開山撫番』，雖然打通了北、中、南三條道路（像是現在蘇花公路的前身），但也對我們原住民的生活造成很大的衝擊和衝突..." },
          { id: 305, user: "歷史小老師", text: "沒錯！這就是政策轉變的關鍵點：從消極隔離（劃界封山）變成積極管理（開山撫番）。" }
      ]
  }
];

const chatMessages = [
  { id: 1, sender: "bot", text: "哈囉！我是歷史小老師 🤖。關於「清帝國統治政策的變遷」，你有什麼想問的嗎？" },
  { id: 2, sender: "bot", text: "試試看問我：\n1. 為什麼政策會改變？\n2. 渡臺禁令是什麼？" }
];

const notifications = [
  { id: 1, text: "歷史老師 發布了新的作業：清代治臺政策心得", time: "10分鐘前", read: false },
  { id: 2, text: "沈葆楨 評論了你的貼文", time: "30分鐘前", read: false },
  { id: 3, text: "劉銘傳 邀請你參加「鐵路通車典禮」", time: "2小時前", read: true },
];

// --- Sub-Components ---

const MobileBottomNav = ({ onChatToggle, onMenuToggle, onNotifToggle, hasUnreadNotif }) => {
  return (
      <div className="fixed bottom-0 left-0 w-full h-14 bg-white border-t border-gray-200 md:hidden flex justify-around items-center z-40 pb-safe shadow-[0_-1px_3px_rgba(0,0,0,0.1)]">
          <div className="p-2 text-blue-600 cursor-pointer active:scale-90 transition" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
              <Icon name="home" size={24} />
          </div>
          <div className="p-2 text-gray-500 cursor-pointer active:scale-90 transition">
              <Icon name="users" size={24} />
          </div>
          <div className="p-2 text-gray-500 cursor-pointer active:scale-90 transition relative" onClick={onChatToggle}>
              <Icon name="message-circle" size={24} />
          </div>
          <div className="p-2 text-gray-500 cursor-pointer active:scale-90 transition relative" onClick={onNotifToggle}>
              <Icon name="bell" size={24} />
              {hasUnreadNotif && <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></div>}
          </div>
          <div className="p-2 text-gray-500 cursor-pointer active:scale-90 transition" onClick={onMenuToggle}>
              <Icon name="menu" size={24} />
          </div>
      </div>
  );
};

const StoryViewer = ({ story, onClose }) => {
  useEffect(() => {
      const timer = setTimeout(onClose, 3000); 
      return () => clearTimeout(timer);
  }, [story, onClose]);

  return (
      <div className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center animate-fade-in">
          <div className="relative w-full h-full md:w-[400px] md:h-[80vh] md:rounded-lg bg-gray-900 overflow-hidden flex flex-col">
              <div className="absolute top-2 left-2 right-2 h-1 bg-gray-600 rounded-full overflow-hidden z-20">
                  <div className="h-full bg-white animate-progress"></div>
              </div>

              <div className="absolute top-6 left-4 flex items-center space-x-2 z-20">
                   <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${story.user}`} className="w-8 h-8 rounded-full border border-white bg-white" alt="User" />
                   <span className="text-white font-bold drop-shadow-md">{story.user}</span>
              </div>

              <button onClick={onClose} className="absolute top-6 right-4 text-white z-30 p-2">
                  <Icon name="x" size={28} />
              </button>

              <div className="flex-1 flex flex-col items-center justify-center relative">
                   <img src={story.img} className="absolute inset-0 w-full h-full object-cover opacity-60" alt="Story" />
                   <div className="z-10 p-8 text-center">
                       <p className="text-white text-2xl font-bold drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] leading-relaxed">{story.text}</p>
                   </div>
              </div>
          </div>
      </div>
  );
};

const CreatePost = ({ onPost }) => {
  const [text, setText] = useState("");

  const handleSubmit = () => {
      if (!text.trim()) return;
      onPost(text);
      setText("");
  };

  return (
      <div className="bg-white rounded-lg shadow p-4 mb-4">
          <div className="flex items-center space-x-3 mb-4">
              <img src={currentUser.avatar} alt="User" className="w-10 h-10 rounded-full bg-gray-200" />
              <input 
                  className="bg-gray-100 rounded-full flex-1 px-4 py-2 hover:bg-gray-200 cursor-pointer text-gray-700 outline-none focus:ring-2 focus:ring-blue-300 transition"
                  placeholder={`你在想什麼？ ${currentUser.name}？`}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              />
          </div>
          <div className="border-t pt-3 flex justify-between px-2 sm:px-4">
              <div className="flex items-center space-x-1 sm:space-x-2 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded group">
                   <span className="text-green-500"><Icon name="image" size={20} /></span>
                   <span className="text-gray-500 font-medium text-xs sm:text-sm">相片</span>
              </div>
              <div className="flex items-center space-x-1 sm:space-x-2 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded group">
                   <span className="text-yellow-500"><Icon name="smile" size={20} /></span>
                   <span className="text-gray-500 font-medium text-xs sm:text-sm">感受</span>
              </div>
               <button 
                  onClick={handleSubmit}
                  className={`px-4 py-1 rounded-lg font-bold text-sm transition ${text.trim() ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                  disabled={!text.trim()}
              >
                  發布
              </button>
          </div>
      </div>
  );
};

const Post = ({ post, onAddComment }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [commentText, setCommentText] = useState("");
  const [isSharing, setIsSharing] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleLike = () => {
      if (liked) {
          setLikeCount(likeCount - 1);
      } else {
          setLikeCount(likeCount + 1);
      }
      setLiked(!liked);
  };

  const handleShare = () => {
      setIsSharing(true);
      setTimeout(() => setIsSharing(false), 2000);
  };

  const handleSubmitComment = () => {
      if (!commentText.trim()) return;
      onAddComment(post.id, commentText);
      setCommentText("");
  };

  return (
      <div className="bg-white rounded-lg shadow mb-4 transition-all duration-300">
          {/* Post Header */}
          <div className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                  <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-full bg-gray-200" />
                  <div>
                      <p className="font-bold hover:underline cursor-pointer">{post.author}</p>
                      <p className="text-xs text-gray-500 flex items-center">
                          {post.time} · <span className="ml-1">🌎</span>
                      </p>
                  </div>
              </div>
              <button className="hover:bg-gray-100 rounded-full p-2"><Icon name="more-horizontal" /></button>
          </div>

          {/* Post Content */}
          <div className="px-4 pb-2 text-gray-800 leading-normal whitespace-pre-wrap">
              {post.content}
          </div>
          
          {/* Optional Post Image */}
          {post.image && !imgError && (
              <div className="mt-2 bg-gray-100 cursor-pointer">
                  <img 
                      src={post.image} 
                      alt="Post visual" 
                      className="w-full h-auto object-cover max-h-[500px]" 
                      onError={() => setImgError(true)}
                  />
                  {post.imageCaption && <p className="text-xs text-gray-500 p-2 text-center">{post.imageCaption}</p>}
              </div>
          )}
           {post.image && imgError && (
               <div className="mt-2 bg-gray-200 h-48 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                      <Icon name="image-off" size={32} className="mx-auto mb-2" />
                      <span className="text-sm">圖片暫時無法顯示</span>
                  </div>
              </div>
          )}

          {/* Post Stats */}
          <div className="px-4 py-2 flex justify-between items-center text-gray-500 text-sm border-b border-gray-100 mx-4">
              <div className="flex items-center space-x-1">
                  <div className="bg-blue-500 rounded-full p-1 w-5 h-5 flex items-center justify-center">
                      <Icon name="thumbs-up" size={12} className="text-white fill-current" />
                  </div>
                  <span>{likeCount}</span>
              </div>
              <div className="space-x-3 text-xs sm:text-sm">
                  <span>{post.comments.length} 則留言</span>
                  <span>5 次分享</span>
              </div>
          </div>

          {/* Action Buttons */}
          <div className="px-4 py-1 flex justify-between border-b border-gray-100 mx-4 relative">
              <button 
                  onClick={handleLike}
                  className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded-lg hover:bg-gray-100 active:scale-95 transition ${liked ? 'text-blue-600' : 'text-gray-500'}`}
              >
                  <Icon name="thumbs-up" /> <span className="font-medium">讚</span>
              </button>
              <button className="flex-1 flex items-center justify-center space-x-2 py-2 text-gray-500 rounded-lg hover:bg-gray-100 active:scale-95 transition">
                  <Icon name="message-square" /> <span className="font-medium">留言</span>
              </button>
              <button 
                  onClick={handleShare}
                  className="flex-1 flex items-center justify-center space-x-2 py-2 text-gray-500 rounded-lg hover:bg-gray-100 active:scale-95 transition"
              >
                  <Icon name="share-2" /> <span className="font-medium">分享</span>
              </button>
              
              {isSharing && (
                  <div className="absolute top-[-40px] right-2 sm:right-10 bg-black text-white text-xs px-3 py-1 rounded shadow-lg animate-bounce z-10">
                      已分享到你的動態時報！
                  </div>
              )}
          </div>

          {/* Comments Section */}
          <div className="px-4 py-3 space-y-3">
              {post.comments.map((comment) => (
                  <div key={comment.id} className="flex space-x-2 group">
                      <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0 flex items-center justify-center overflow-hidden cursor-pointer border border-gray-200">
                           <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.user}`} alt={comment.user} />
                      </div>
                      <div className="flex flex-col w-full">
                          <div className="bg-gray-100 rounded-2xl px-3 py-2">
                              <p className="font-bold text-sm text-gray-900 cursor-pointer hover:underline">{comment.user}</p>
                              <p className="text-sm text-gray-800 leading-relaxed">{comment.text}</p>
                          </div>
                          <div className="flex space-x-2 px-2 mt-1">
                              <span className="text-xs font-bold text-gray-500 cursor-pointer hover:underline">讚</span>
                              <span className="text-xs font-bold text-gray-500 cursor-pointer hover:underline">回覆</span>
                              <span className="text-xs text-gray-400">剛剛</span>
                          </div>
                      </div>
                  </div>
              ))}
              
              {/* Write Comment */}
              <div className="flex space-x-2 items-center mt-2">
                   <img src={currentUser.avatar} className="w-8 h-8 rounded-full bg-gray-200" alt="User" />
                   <div className="flex-1 relative">
                       <input 
                          type="text"
                          className="w-full bg-gray-100 rounded-full px-4 py-2 text-sm text-gray-700 outline-none focus:bg-gray-200 focus:ring-1 focus:ring-gray-300 transition pr-10"
                          placeholder="留言......"
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSubmitComment()}
                       />
                       <button 
                          onClick={handleSubmitComment} 
                          className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${commentText.trim() ? 'text-blue-500' : 'text-gray-400'} hover:bg-gray-200 rounded-full p-1`}
                       >
                          <Icon name="send" size={16} />
                       </button>
                   </div>
              </div>
          </div>
      </div>
  );
};

const ChatWindow = ({ onClose }) => {
  const [messages, setMessages] = useState(chatMessages);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const [minimized, setMinimized] = useState(false);

  const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages, minimized]);

  const handleSend = () => {
      if (!input.trim()) return;
      
      const userMsg = { id: Date.now(), sender: "user", text: input };
      setMessages(prev => [...prev, userMsg]);
      setInput("");

      setTimeout(() => {
          let responseText = "這是一個好問題！詳情請見課本第4章喔。";
          if (input.includes("原因") || input.includes("為什麼")) {
              responseText = "清帝國轉變政策的原因主要是因為「外力入侵」（如牡丹社事件、清法戰爭），讓他們意識到臺灣的重要性。";
          } else if (input.includes("渡臺禁令")) {
              responseText = "渡臺禁令是為了避免漢人移入過多造成反叛。規定：需申請證照、不准帶家眷。這造成了男女比例失衡和「羅漢腳」問題。";
          } else if (input.includes("劃界封山") || input.includes("土牛")) {
              responseText = "這是為了隔離漢人與原住民，避免衝突。土牛溝就是當時的界線。";
          } else if (input.includes("建省")) {
              responseText = "臺灣在1885年（清法戰爭後）建省，劉銘傳是第一任巡撫。";
          } else if (input.includes("謝謝") || input.includes("感謝")) {
              responseText = "不客氣！祝你歷史考100分！💯";
          }

          setMessages(prev => [...prev, { id: Date.now() + 1, sender: "bot", text: responseText }]);
      }, 800);
  };

  if (minimized) {
      return (
          <div 
              className="fixed bottom-16 right-4 sm:right-20 w-auto bg-white rounded-full sm:rounded-t-lg shadow-lg border border-gray-300 cursor-pointer z-50 flex items-center justify-between p-3 hover:bg-gray-50"
              onClick={() => setMinimized(false)}
          >
              <div className="flex items-center space-x-2">
                  <div className="relative">
                      <img src={currentUser.avatar} className="w-8 h-8 rounded-full" alt="Bot" />
                      <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-white"></div>
                  </div>
                  <span className="font-bold text-sm hidden sm:block">歷史小老師</span>
              </div>
              <span className="sm:hidden text-xs font-bold ml-2">對話</span>
              <div className="hidden sm:block ml-2"><Icon name="chevron-up" size={16} /></div>
          </div>
      );
  }

  return (
      <div className="fixed bottom-14 sm:bottom-0 left-0 sm:left-auto right-0 sm:right-4 w-full sm:w-80 h-[50vh] sm:h-96 bg-white rounded-t-lg shadow-2xl flex flex-col border-t border-gray-200 z-50 animate-slide-up">
          {/* Header */}
          <div className="bg-white p-3 border-b flex justify-between items-center rounded-t-lg shadow-sm cursor-pointer" onClick={() => setMinimized(true)}>
              <div className="flex items-center space-x-2">
                  <div className="relative">
                      <img src={currentUser.avatar} className="w-8 h-8 rounded-full" alt="Bot" />
                      <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-white"></div>
                  </div>
                  <div>
                      <p className="font-bold text-sm">歷史小老師</p>
                      <p className="text-xs text-green-600">線上</p>
                  </div>
              </div>
              <div className="flex items-center space-x-1">
                  <button onClick={(e) => {e.stopPropagation(); setMinimized(true);}} className="text-blue-500 hover:bg-gray-100 rounded-full p-1">
                      <Icon name="minus" size={16} />
                  </button>
                  <button onClick={(e) => {e.stopPropagation(); onClose();}} className="text-blue-500 hover:bg-gray-100 rounded-full p-1">
                      <Icon name="x" size={16} />
                  </button>
              </div>
          </div>
          
          {/* Body */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50">
              {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm whitespace-pre-wrap shadow-sm ${
                          msg.sender === 'user' 
                          ? 'bg-blue-500 text-white rounded-br-none' 
                          : 'bg-white text-gray-800 rounded-bl-none'
                      }`}>
                          {msg.text}
                      </div>
                  </div>
              ))}
              <div ref={messagesEndRef} />
          </div>

          {/* Footer */}
          <div className="p-3 border-t bg-white flex items-center space-x-2 pb-safe">
              <input 
                  type="text" 
                  className="flex-1 bg-gray-100 rounded-full px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-blue-300 transition"
                  placeholder="發送訊息..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
              <button onClick={handleSend} className="text-blue-500 hover:bg-blue-50 rounded-full p-2 transition">
                  <Icon name="send" />
              </button>
          </div>
      </div>
  );
};

const MobileMenu = ({ onClose, currentUser }) => (
  <div className="fixed inset-0 z-50 bg-gray-100 animate-slide-up flex flex-col md:hidden">
      <div className="bg-white p-4 shadow-sm flex justify-between items-center">
          <h2 className="text-xl font-bold">功能表</h2>
          <button onClick={onClose} className="p-2 bg-gray-200 rounded-full"><Icon name="x" size={20} /></button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
              <img src={currentUser.avatar} className="w-10 h-10 rounded-full" alt="User" />
              <div>
                  <p className="font-bold">{currentUser.name}</p>
                  <p className="text-xs text-gray-500">查看你的個人檔案</p>
              </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
               <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center justify-center space-y-2">
                   <div className="w-10 h-10 bg-blue-500 rounded-full text-white flex items-center justify-center font-bold">史</div>
                   <span className="font-bold text-sm">歷史討論區</span>
               </div>
               <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center justify-center space-y-2">
                   <div className="w-10 h-10 bg-green-500 rounded-full text-white flex items-center justify-center font-bold">考</div>
                   <span className="font-bold text-sm">段考衝刺班</span>
               </div>
               <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center justify-center space-y-2">
                   <Icon name="bookmark" className="text-purple-500" size={32} />
                   <span className="font-bold text-sm">我的珍藏</span>
               </div>
               <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center justify-center space-y-2">
                   <Icon name="tv" className="text-red-500" size={32} />
                   <span className="font-bold text-sm">影片</span>
               </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-3 border-b font-bold text-gray-500">聯絡人</div>
              {[ "歷史老師", "沈葆楨", "劉銘傳", "朱一貴", "林爽文", "吳沙" ].map((name, idx) => (
                  <div key={idx} className="flex items-center space-x-3 p-3 hover:bg-gray-50 border-b last:border-0">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`} className="w-8 h-8 rounded-full bg-gray-200" alt={name} />
                      <span className="text-sm font-medium">{name}</span>
                  </div>
              ))}
          </div>
      </div>
  </div>
);

// --- Main App ---

export default function App() {
  const [posts, setPosts] = useState(initialPosts);
  const [showChat, setShowChat] = useState(false);
  const [viewingStory, setViewingStory] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  // Handlers
  const handleCreatePost = (text) => {
      const newPost = {
          id: Date.now(),
          author: currentUser.name,
          time: "剛剛",
          avatar: currentUser.avatar,
          content: text,
          likes: 0,
          comments: []
      };
      setPosts([newPost, ...posts]);
  };

  const handleAddComment = (postId, text) => {
      const updatedPosts = posts.map(post => {
          if (post.id === postId) {
              return {
                  ...post,
                  comments: [...post.comments, {
                      id: Date.now(),
                      user: currentUser.name,
                      text: text
                  }]
              };
          }
          return post;
      });
      setPosts(updatedPosts);
  };

  return (
      <div className="min-h-screen bg-[#F0F2F5] pb-16 md:pb-0">
          <GlobalStyles />
          {/* Top Navbar */}
          <nav className="bg-white shadow-sm fixed top-0 w-full z-40 h-14 flex items-center justify-between px-4">
              <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full text-white flex items-center justify-center font-bold text-2xl cursor-pointer" onClick={() => window.scrollTo(0,0)}>f</div>
                  
                  {/* Desktop Search */}
                  <div className="hidden md:flex items-center bg-gray-100 rounded-full px-3 py-2 w-64 ml-2 group focus-within:ring-2 focus-within:ring-blue-300 transition">
                      <Icon name="search" className="text-gray-500 group-focus-within:text-blue-500" />
                      <input type="text" placeholder="搜尋 FaceBook" className="bg-transparent border-none outline-none ml-2 text-sm w-full" />
                  </div>
                  {/* Mobile Search Icon */}
                  <div className="md:hidden w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600">
                      <Icon name="search" size={20} />
                  </div>
              </div>
              
              {/* Desktop Nav Icons */}
              <div className="hidden md:flex space-x-1 h-full items-center justify-center w-1/3">
                  <div className="h-full flex-1 flex items-center justify-center border-b-4 border-blue-500 text-blue-500 cursor-pointer hover:bg-gray-50 rounded-t-lg">
                      <Icon name="home" className="w-7 h-7" />
                  </div>
                  <div className="h-full flex-1 flex items-center justify-center border-b-4 border-transparent text-gray-500 hover:bg-gray-100 rounded-lg cursor-pointer">
                      <Icon name="tv" className="w-7 h-7" />
                  </div>
                   <div className="h-full flex-1 flex items-center justify-center border-b-4 border-transparent text-gray-500 hover:bg-gray-100 rounded-lg cursor-pointer">
                      <Icon name="users" className="w-7 h-7" />
                  </div>
              </div>

              {/* Right Actions */}
              <div className="flex items-center space-x-2 relative">
                  {/* Desktop Messenger/Bell */}
                  <div className="hidden md:flex items-center space-x-2">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-300 transition" onClick={() => setShowChat(!showChat)}>
                          <Icon name="message-circle" />
                      </div>
                      <div className="relative">
                          <div 
                              className={`w-10 h-10 ${showNotifications ? 'bg-blue-100 text-blue-600' : 'bg-gray-200'} rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-300 transition`}
                              onClick={() => setShowNotifications(!showNotifications)}
                          >
                              <Icon name="bell" />
                              <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
                          </div>
                          {/* Desktop Notification Dropdown */}
                          {showNotifications && (
                              <div className="absolute top-12 right-0 w-80 bg-white rounded-lg shadow-xl border border-gray-100 p-2 animate-fade-in z-50">
                                  <h3 className="font-bold text-lg px-2 mb-2">通知</h3>
                                  <div className="space-y-1 max-h-80 overflow-y-auto">
                                      {notifications.map(n => (
                                          <div key={n.id} className="flex items-start space-x-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer relative">
                                              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 flex-shrink-0">
                                                  <Icon name="bell" size={20} />
                                              </div>
                                              <div>
                                                  <p className="text-sm text-gray-800 leading-snug">{n.text}</p>
                                                  <p className={`text-xs mt-1 ${n.read ? 'text-gray-500' : 'text-blue-600 font-bold'}`}>{n.time}</p>
                                              </div>
                                              {!n.read && <div className="w-2 h-2 bg-blue-500 rounded-full absolute right-2 top-1/2 transform -translate-y-1/2"></div>}
                                          </div>
                                      ))}
                                  </div>
                              </div>
                          )}
                      </div>
                  </div>

                  <div className="w-10 h-10 overflow-hidden rounded-full border border-gray-300 cursor-pointer hover:opacity-80">
                      <img src={currentUser.avatar} alt="Profile" />
                  </div>
              </div>
          </nav>

          {/* Main Layout */}
          <div className="pt-16 flex justify-center px-0 sm:px-4">
              
              {/* Left Sidebar (Desktop Only) */}
              <div className="hidden lg:block w-[300px] xl:w-[360px] fixed left-0 h-screen overflow-y-auto p-4 hover:overflow-y-scroll scrollbar-hide pb-20">
                  <div className="flex items-center space-x-3 p-2 hover:bg-gray-200 rounded-lg cursor-pointer transition">
                      <img src={currentUser.avatar} className="w-8 h-8 rounded-full" alt="User" />
                      <span className="font-semibold text-sm">{currentUser.name}</span>
                  </div>
                  <div className="flex items-center space-x-3 p-2 hover:bg-gray-200 rounded-lg cursor-pointer transition">
                      <Icon name="users" className="text-blue-500" />
                      <span className="font-semibold text-sm">朋友</span>
                  </div>
                   <div className="flex items-center space-x-3 p-2 hover:bg-gray-200 rounded-lg cursor-pointer transition">
                      <Icon name="bookmark" className="text-purple-500" />
                      <span className="font-semibold text-sm">我的珍藏（歷史筆記）</span>
                  </div>
                  <hr className="my-2 border-gray-300" />
                  <div className="text-lg font-semibold text-gray-500 mb-2 px-2 flex justify-between">
                      <span>你的捷徑</span>
                  </div>
                  <div className="flex items-center space-x-3 p-2 hover:bg-gray-200 rounded-lg cursor-pointer transition">
                      <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center text-white font-bold text-xs">史</div>
                      <span className="font-semibold text-sm">清代歷史討論區</span>
                  </div>
                  <div className="flex items-center space-x-3 p-2 hover:bg-gray-200 rounded-lg cursor-pointer transition">
                      <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center text-white font-bold text-xs">考</div>
                      <span className="font-semibold text-sm">段考衝刺班</span>
                  </div>
              </div>

              {/* Center Feed */}
              <div className="w-full max-w-[680px] lg:mr-[300px] xl:mr-[360px] lg:ml-[300px] xl:ml-[360px]">
                  
                  {/* Stories Reel */}
                  <div className="relative w-full h-[200px] mb-6 flex space-x-2 overflow-x-auto py-2 px-2 scrollbar-hide">
                      <div className="relative w-[110px] h-full bg-white rounded-xl overflow-hidden shadow flex-shrink-0 cursor-pointer group border border-gray-200">
                          <img src={currentUser.avatar} className="w-full h-3/5 object-cover group-hover:scale-105 transition duration-500" alt="User" />
                          <div className="absolute bottom-0 w-full h-2/5 bg-white flex flex-col items-center pt-6">
                              <span className="text-xs font-semibold">建立限時動態</span>
                          </div>
                          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-blue-500 rounded-full border-4 border-white flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 transition">+</div>
                      </div>
                      
                      {initialStories.map(story => (
                          <div 
                              key={story.id} 
                              onClick={() => setViewingStory(story)}
                              className="relative w-[110px] h-full rounded-xl overflow-hidden shadow flex-shrink-0 cursor-pointer group border border-gray-200"
                          >
                              <img src={story.img} className="w-full h-full object-cover transition duration-700 group-hover:scale-110" alt="Story" />
                              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60"></div>
                              <div className="absolute top-2 left-2 w-9 h-9 rounded-full border-4 border-blue-500 overflow-hidden bg-gray-200 z-10">
                                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${story.user}`} className="w-full h-full" alt="User" />
                              </div>
                              <p className="absolute bottom-2 left-2 text-white text-xs font-bold shadow-sm truncate w-20 pr-1 leading-tight">{story.user}</p>
                          </div>
                      ))}
                  </div>

                  <CreatePost onPost={handleCreatePost} />

                  <div className="space-y-4">
                      {posts.map(post => (
                          <Post key={post.id} post={post} onAddComment={handleAddComment} />
                      ))}
                  </div>
                  
                  <div className="text-center text-gray-500 py-8 space-y-2">
                      <div className="inline-block p-2 rounded-full bg-gray-200 text-gray-500">
                          <Icon name="check" />
                      </div>
                      <p>-- 已經到底了，趕快去複習課本吧！ --</p>
                  </div>
              </div>

              {/* Right Sidebar (Desktop Only) */}
              <div className="hidden lg:block w-[300px] fixed right-0 h-screen p-4 overflow-y-auto pb-20">
                  <div className="text-gray-500 font-semibold mb-4 flex justify-between items-center">
                      <span>聯絡人</span>
                      <div className="flex space-x-2 text-gray-500">
                          <Icon name="video" size={16} className="cursor-pointer hover:text-gray-700" />
                          <Icon name="search" size={16} className="cursor-pointer hover:text-gray-700" />
                      </div>
                  </div>
                  <div className="space-y-1">
                      {[
                          "歷史老師", "沈葆楨", "劉銘傳", "朱一貴", "林爽文", "英國領事哈利", "吳沙", "莫那魯道"
                      ].map((name, idx) => (
                          <div key={idx} className="flex items-center space-x-3 p-2 hover:bg-gray-200 rounded-lg cursor-pointer transition" onClick={() => setShowChat(true)}>
                              <div className="relative">
                                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`} className="w-9 h-9 rounded-full bg-gray-300 border border-gray-200" alt={name} />
                                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
                              </div>
                              <span className="text-sm font-medium text-gray-800">{name}</span>
                          </div>
                      ))}
                  </div>
              </div>
          </div>

          {/* Mobile Bottom Navigation */}
          <MobileBottomNav 
              onChatToggle={() => setShowChat(!showChat)} 
              onMenuToggle={() => setShowMobileMenu(true)}
              onNotifToggle={() => setShowNotifications(!showNotifications)}
              hasUnreadNotif={true}
          />

          {/* Mobile Menu Overlay */}
          {showMobileMenu && <MobileMenu onClose={() => setShowMobileMenu(false)} currentUser={currentUser} />}

          {/* Chat Window Popup */}
          {showChat && <ChatWindow onClose={() => setShowChat(false)} />}

          {/* Mobile Notification Modal */}
          {showNotifications && (
              <div className="fixed inset-0 z-40 md:hidden bg-gray-900 bg-opacity-50" onClick={() => setShowNotifications(false)}>
                   <div className="absolute bottom-14 left-0 w-full bg-white rounded-t-xl p-4 animate-slide-up max-h-[60vh] overflow-y-auto">
                      <h3 className="font-bold text-lg mb-4">通知</h3>
                      {notifications.map(n => (
                          <div key={n.id} className="flex items-start space-x-3 p-3 hover:bg-gray-100 rounded-lg border-b last:border-0 relative">
                              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 flex-shrink-0">
                                  <Icon name="bell" size={20} />
                              </div>
                              <div>
                                  <p className="text-sm text-gray-800 leading-snug">{n.text}</p>
                                  <p className={`text-xs mt-1 ${n.read ? 'text-gray-500' : 'text-blue-600 font-bold'}`}>{n.time}</p>
                              </div>
                          </div>
                      ))}
                   </div>
              </div>
          )}

          {/* Story Viewer Overlay */}
          {viewingStory && <StoryViewer story={viewingStory} onClose={() => setViewingStory(null)} />}
      </div>
  );
}
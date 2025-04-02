
export interface User {
  id: string;
  name: string;
  avatar: string;
  status?: 'online' | 'offline' | 'away';
  lastSeen?: string;
}

export interface Message {
  id: string;
  senderId: string;
  originalText: string;
  translatedText?: string;
  originalLanguage: string;
  timestamp: string;
  isTranslated?: boolean;
  isVoiceMessage?: boolean;
}

export interface ChatRoom {
  id: string;
  name: string;
  isGroup: boolean;
  participants: User[];
  lastMessage?: Message;
  unreadCount?: number;
}

export const currentUser: User = {
  id: 'current_user',
  name: '您',
  avatar: 'https://i.pravatar.cc/150?img=13',
  status: 'online'
};

export const users: User[] = [
  {
    id: 'user1',
    name: 'Sarah Johnson',
    avatar: 'https://i.pravatar.cc/150?img=32',
    status: 'online',
    lastSeen: 'just now'
  },
  {
    id: 'user2',
    name: 'Miguel Rodríguez',
    avatar: 'https://i.pravatar.cc/150?img=4',
    status: 'offline',
    lastSeen: '2 hours ago'
  },
  {
    id: 'user3',
    name: '佐藤 優子',
    avatar: 'https://i.pravatar.cc/150?img=44',
    status: 'online',
    lastSeen: 'just now'
  },
  {
    id: 'user4',
    name: 'Ivan Petrov',
    avatar: 'https://i.pravatar.cc/150?img=8',
    status: 'away',
    lastSeen: '5 minutes ago'
  },
  {
    id: 'user5',
    name: 'Kim Min-ji',
    avatar: 'https://i.pravatar.cc/150?img=47',
    status: 'online',
    lastSeen: 'just now'
  }
];

export const chatRooms: ChatRoom[] = [
  {
    id: 'chat1',
    name: 'Sarah Johnson',
    isGroup: false,
    participants: [currentUser, users[0]],
    lastMessage: {
      id: 'msg1',
      senderId: 'user1',
      originalText: 'Hello! How are you today?',
      originalLanguage: 'en',
      timestamp: '10:45 AM',
      isTranslated: true
    },
    unreadCount: 2
  },
  {
    id: 'chat2',
    name: 'Miguel Rodríguez',
    isGroup: false,
    participants: [currentUser, users[1]],
    lastMessage: {
      id: 'msg2',
      senderId: 'user2',
      originalText: '¿Podemos reunirnos mañana?',
      translatedText: '我们明天能见面吗？',
      originalLanguage: 'es',
      timestamp: 'Yesterday',
      isTranslated: true
    },
    unreadCount: 0
  },
  {
    id: 'chat3',
    name: '佐藤 優子',
    isGroup: false,
    participants: [currentUser, users[2]],
    lastMessage: {
      id: 'msg3',
      senderId: 'user3',
      originalText: 'おはようございます!',
      translatedText: '早上好！',
      originalLanguage: 'ja',
      timestamp: 'Yesterday',
      isTranslated: true
    },
    unreadCount: 0
  },
  {
    id: 'chat4',
    name: 'Language Enthusiasts',
    isGroup: true,
    participants: [currentUser, ...users.slice(0, 4)],
    lastMessage: {
      id: 'msg4',
      senderId: 'user4',
      originalText: 'Привет всем! Как дела?',
      translatedText: '大家好！你们好吗？',
      originalLanguage: 'ru',
      timestamp: 'Monday',
      isTranslated: true
    },
    unreadCount: 5
  },
  {
    id: 'chat5',
    name: 'International Project Team',
    isGroup: true,
    participants: [currentUser, ...users],
    lastMessage: {
      id: 'msg5',
      senderId: 'user5',
      originalText: '안녕하세요, 회의 시간이 언제인가요?',
      translatedText: '你好，会议时间是什么时候？',
      originalLanguage: 'ko',
      timestamp: 'Last week',
      isTranslated: true
    },
    unreadCount: 0
  }
];

export const messages: Record<string, Message[]> = {
  'chat1': [
    {
      id: 'msg1_1',
      senderId: 'user1',
      originalText: 'Hello! How are you today?',
      translatedText: '你好！你今天好吗？',
      originalLanguage: 'en',
      timestamp: '10:45 AM',
      isTranslated: true
    },
    {
      id: 'msg1_2',
      senderId: 'current_user',
      originalText: '我很好，谢谢！你呢？',
      translatedText: 'I\'m fine, thank you! And you?',
      originalLanguage: 'zh',
      timestamp: '10:47 AM',
      isTranslated: true
    },
    {
      id: 'msg1_3',
      senderId: 'user1',
      originalText: 'I\'m doing great! Just finished a big project.',
      translatedText: '我很好！刚刚完成了一个大项目。',
      originalLanguage: 'en',
      timestamp: '10:50 AM',
      isTranslated: true
    }
  ],
  'chat2': [
    {
      id: 'msg2_1',
      senderId: 'user2',
      originalText: 'Hola! ¿Cómo estás?',
      translatedText: '你好！你好吗？',
      originalLanguage: 'es',
      timestamp: 'Yesterday',
      isTranslated: true
    },
    {
      id: 'msg2_2',
      senderId: 'current_user',
      originalText: '我很好，谢谢！你的西班牙语说得很好！',
      translatedText: 'I\'m fine, thank you! Your Spanish is very good!',
      originalLanguage: 'zh',
      timestamp: 'Yesterday',
      isTranslated: true
    },
    {
      id: 'msg2_3',
      senderId: 'user2',
      originalText: '¿Podemos reunirnos mañana?',
      translatedText: '我们明天能见面吗？',
      originalLanguage: 'es',
      timestamp: 'Yesterday',
      isTranslated: true
    }
  ],
  'chat3': [
    {
      id: 'msg3_1',
      senderId: 'user3',
      originalText: 'おはようございます!',
      translatedText: '早上好！',
      originalLanguage: 'ja',
      timestamp: 'Yesterday',
      isTranslated: true
    },
    {
      id: 'msg3_2',
      senderId: 'current_user',
      originalText: '早上好！很高兴认识你。',
      translatedText: 'Good morning! Nice to meet you.',
      originalLanguage: 'zh',
      timestamp: 'Yesterday',
      isTranslated: true
    },
    {
      id: 'msg3_3',
      senderId: 'user3',
      originalText: '今日は天気がいいですね。',
      translatedText: '今天天气真好。',
      originalLanguage: 'ja',
      timestamp: 'Yesterday',
      isTranslated: true
    }
  ]
};

let messageIdCounter = 1000;

export const generateMessageId = () => {
  messageIdCounter += 1;
  return `msg_${messageIdCounter}`;
};

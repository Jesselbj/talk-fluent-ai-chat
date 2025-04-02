
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { QrCode, Search, MessageSquarePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import ChatList from '@/components/ChatList';
import QRCodeScanner from '@/components/QRCodeScanner';
import { chatRooms } from '@/data/mockData';

const ChatListPage = () => {
  const navigate = useNavigate();

  const handleScanComplete = (userId: string) => {
    console.log(`QR Code scanned, user ID: ${userId}`);
    navigate(`/chat/new?userId=${userId}`);
  };

  return (
    <div className="pb-16">
      <Header title="翻译多聊" />
      
      <div className="mt-20 px-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input 
              placeholder="搜索对话" 
              className="pl-10 bg-gray-100 border-0 focus-visible:ring-1"
            />
          </div>
          
          <QRCodeScanner onScanComplete={handleScanComplete} />
          
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => navigate('/chat/new')}
            className="rounded-full h-12 w-12 border-gray-300 hover:bg-gray-100"
          >
            <MessageSquarePlus className="h-6 w-6 text-gray-600" />
          </Button>
        </div>
        
        <ChatList chats={chatRooms} />
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default ChatListPage;

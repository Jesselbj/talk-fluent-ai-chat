
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from '@/lib/utils';
import { ChatRoom } from '@/data/mockData';

interface ChatListProps {
  chats: ChatRoom[];
}

const ChatList: React.FC<ChatListProps> = ({ chats }) => {
  const navigate = useNavigate();

  const navigateToChat = (chatId: string) => {
    navigate(`/chat/${chatId}`);
  };

  return (
    <div className="space-y-1">
      {chats.map((chat) => (
        <div
          key={chat.id}
          className="flex items-center px-4 py-3 hover:bg-gray-50 rounded-lg cursor-pointer"
          onClick={() => navigateToChat(chat.id)}
        >
          <div className="relative">
            <Avatar className="h-12 w-12">
              {chat.isGroup ? (
                // For group chats show a collage or group icon
                <div className="bg-primary h-full w-full flex items-center justify-center text-white font-bold">
                  {chat.name.substring(0, 1)}
                </div>
              ) : (
                <>
                  <AvatarImage src={chat.participants[1]?.avatar} alt={chat.name} />
                  <AvatarFallback>{chat.name.substring(0, 1)}</AvatarFallback>
                </>
              )}
            </Avatar>
            
            {/* Online status indicator for individual chats */}
            {!chat.isGroup && chat.participants[1]?.status === 'online' && (
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white" />
            )}
          </div>
          
          <div className="ml-4 flex-1 min-w-0">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium text-gray-900 truncate">
                {chat.name}
              </h3>
              <span className="text-xs text-gray-500">
                {chat.lastMessage?.timestamp}
              </span>
            </div>
            
            <div className="flex justify-between items-center mt-1">
              <p className={cn(
                "text-sm truncate",
                chat.unreadCount ? "text-gray-900 font-medium" : "text-gray-500"
              )}>
                {chat.lastMessage?.translatedText || chat.lastMessage?.originalText || 'No messages yet'}
              </p>
              
              {chat.unreadCount ? (
                <Badge variant="default" className="ml-2 bg-primary">
                  {chat.unreadCount}
                </Badge>
              ) : null}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;

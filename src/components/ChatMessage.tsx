
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Globe, Volume2 } from 'lucide-react';
import { Message, User } from '@/data/mockData';
import { speakText } from '@/utils/translationService';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  message: Message;
  sender: User;
  isMine: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, sender, isMine }) => {
  const [showOriginal, setShowOriginal] = useState(false);
  
  const toggleLanguage = () => {
    setShowOriginal(!showOriginal);
  };
  
  const playAudio = () => {
    const textToSpeak = showOriginal ? message.originalText : (message.translatedText || message.originalText);
    const langCode = showOriginal ? message.originalLanguage : 'zh';
    speakText(textToSpeak, langCode);
  };

  return (
    <div className={cn(
      "flex items-start gap-2 mb-4",
      isMine ? "flex-row-reverse" : "flex-row"
    )}>
      {!isMine && (
        <Avatar className="h-10 w-10 mt-1">
          <AvatarImage src={sender.avatar} alt={sender.name} />
          <AvatarFallback>{sender.name.charAt(0)}</AvatarFallback>
        </Avatar>
      )}
      
      <div className={cn(
        "flex flex-col",
        isMine ? "items-end" : "items-start"
      )}>
        {!isMine && (
          <span className="text-xs text-gray-500 mb-1 ml-1">{sender.name}</span>
        )}
        
        <div className="flex items-center gap-1">
          <div className={isMine ? "chat-bubble-user" : "chat-bubble-friend"}>
            {showOriginal ? message.originalText : (message.translatedText || message.originalText)}
          </div>
          
          {message.isTranslated && (
            <button 
              onClick={toggleLanguage}
              className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700"
            >
              <Globe className="h-4 w-4" />
            </button>
          )}
          
          <button 
            onClick={playAudio}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700"
          >
            <Volume2 className="h-4 w-4" />
          </button>
        </div>
        
        <span className="text-xs text-gray-500 mt-1 mx-1">
          {message.timestamp}
          {message.isTranslated && !showOriginal && (
            <span className="ml-1">• 已翻译</span>
          )}
        </span>
      </div>
    </div>
  );
};

export default ChatMessage;

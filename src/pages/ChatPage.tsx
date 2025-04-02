
import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SendHorizontal, Paperclip } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import ChatMessage from '@/components/ChatMessage';
import VoiceRecorder from '@/components/VoiceRecorder';
import { useAppContext } from '@/contexts/AppContext';
import { chatRooms, messages as mockMessages, currentUser, users, generateMessageId } from '@/data/mockData';
import { translateText, detectLanguage } from '@/utils/translationService';

const ChatPage = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const { preferredLanguage } = useAppContext();
  const navigate = useNavigate();
  
  const [currentChat, setCurrentChat] = useState(
    chatRooms.find(chat => chat.id === chatId)
  );
  
  const [messages, setMessages] = useState(
    mockMessages[chatId || ''] || []
  );
  
  const [inputValue, setInputValue] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom when messages change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    if (!currentChat && chatId) {
      const chat = chatRooms.find(chat => chat.id === chatId);
      if (chat) {
        setCurrentChat(chat);
        setMessages(mockMessages[chatId] || []);
      } else {
        // Chat not found, redirect to chat list
        navigate('/chat');
      }
    }
  }, [chatId, currentChat, navigate]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || !currentChat) return;

    setInputValue('');
    const detectedLang = await detectLanguage(text);
    
    // Create a temporary message that will be updated with translation
    const messageId = generateMessageId();
    const newMessage = {
      id: messageId,
      senderId: currentUser.id,
      originalText: text,
      originalLanguage: detectedLang,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isTranslated: false
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    // Translate the message
    setIsTranslating(true);
    try {
      // For the sender's messages, we don't need translation in the UI
      // But in a real app we would still translate for recipients
      setIsTranslating(false);
    } catch (error) {
      console.error('Translation error:', error);
      setIsTranslating(false);
    }
  };

  const handleVoiceTranscript = (transcript: string) => {
    if (transcript.trim()) {
      sendMessage(transcript);
    }
  };

  // Find the other participant (for display purposes)
  const otherParticipant = currentChat?.participants.find(
    participant => participant.id !== currentUser.id
  );
  
  if (!currentChat) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading chat...</p>
      </div>
    );
  }

  return (
    <div className="pb-16 h-screen flex flex-col">
      <Header 
        title={currentChat.name}
        subtitle={otherParticipant?.status === 'online' ? '在线' : '离线'}
        showBackButton
        avatarUrl={!currentChat.isGroup ? otherParticipant?.avatar : undefined}
        onlineStatus={!currentChat.isGroup ? otherParticipant?.status : undefined}
      />

      <div className="flex-1 overflow-y-auto pb-4 pt-20 px-4">
        {messages.map(message => {
          const isMine = message.senderId === currentUser.id;
          const sender = isMine 
            ? currentUser 
            : currentChat.participants.find(p => p.id === message.senderId) || users[0];
            
          return (
            <ChatMessage 
              key={message.id} 
              message={message} 
              sender={sender} 
              isMine={isMine} 
            />
          );
        })}
        
        {isTranslating && (
          <div className="flex justify-center my-2">
            <div className="bg-gray-100 text-gray-500 text-sm py-1 px-3 rounded-full">
              翻译中...
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-gray-500">
            <Paperclip className="h-5 w-5" />
          </Button>
          
          <div className="flex-1 relative">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage(inputValue);
                }
              }}
              placeholder="输入消息..."
              className="pr-10"
            />
            {inputValue && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-0 top-0 h-full text-primary"
                onClick={() => sendMessage(inputValue)}
              >
                <SendHorizontal className="h-5 w-5" />
              </Button>
            )}
          </div>
          
          <VoiceRecorder onTranscriptReady={handleVoiceTranscript} />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;

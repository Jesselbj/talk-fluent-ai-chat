
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MessageCircle, Users, Globe, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      name: 'Chats',
      icon: MessageCircle,
      path: '/chat'
    },
    {
      name: 'Contacts',
      icon: Users,
      path: '/contacts'
    },
    {
      name: 'Translator',
      icon: Globe,
      path: '/translator'
    },
    {
      name: 'Settings',
      icon: Settings,
      path: '/settings'
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-app-blue/90 to-app-purple/90 backdrop-blur-md border-t border-gray-200/20 flex justify-around items-center py-2 px-4 h-16 z-10">
      {navItems.map((item) => (
        <button
          key={item.path}
          className={cn(
            "flex flex-col items-center justify-center w-16 h-14 rounded-lg transition-all duration-200",
            location.pathname.startsWith(item.path) 
              ? "text-white scale-110" 
              : "text-gray-300 hover:text-white"
          )}
          onClick={() => navigate(item.path)}
        >
          <item.icon className="h-5 w-5 mb-1" />
          <span className="text-xs font-medium">{item.name}</span>
        </button>
      ))}
    </div>
  );
};

export default BottomNavigation;

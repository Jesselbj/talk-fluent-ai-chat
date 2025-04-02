
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MessageCircle, Users, Globe, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      name: '聊天',
      icon: MessageCircle,
      path: '/chat'
    },
    {
      name: '联系人',
      icon: Users,
      path: '/contacts'
    },
    {
      name: '翻译',
      icon: Globe,
      path: '/translator'
    },
    {
      name: '设置',
      icon: User,
      path: '/settings'
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center py-2 px-4 h-16 z-10">
      {navItems.map((item) => (
        <button
          key={item.path}
          className={cn(
            "flex flex-col items-center justify-center w-16 h-14 rounded-lg",
            location.pathname.startsWith(item.path) 
              ? "text-primary" 
              : "text-gray-500 hover:text-gray-700"
          )}
          onClick={() => navigate(item.path)}
        >
          <item.icon className="h-6 w-6 mb-1" />
          <span className="text-xs">{item.name}</span>
        </button>
      ))}
    </div>
  );
};

export default BottomNavigation;

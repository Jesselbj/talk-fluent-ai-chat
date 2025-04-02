
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MoreHorizontal } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  title?: string;
  subtitle?: string;
  showBackButton?: boolean;
  avatarUrl?: string;
  onlineStatus?: 'online' | 'offline' | 'away';
  rightAction?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({
  title = '翻译多聊',
  subtitle,
  showBackButton = false,
  avatarUrl,
  onlineStatus,
  rightAction
}) => {
  const navigate = useNavigate();

  const getStatusColor = () => {
    if (onlineStatus === 'online') return 'bg-green-500';
    if (onlineStatus === 'away') return 'bg-yellow-500';
    return 'bg-gray-400';
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-10 bg-white border-b border-gray-200 h-16 flex items-center px-4">
      <div className="flex-1 flex items-center">
        {showBackButton && (
          <button 
            className="mr-3 text-gray-600 hover:text-gray-900"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
        )}
        
        {avatarUrl && (
          <div className="relative mr-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={avatarUrl} alt={title} />
              <AvatarFallback>{title.charAt(0)}</AvatarFallback>
            </Avatar>
            {onlineStatus && (
              <span 
                className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${getStatusColor()}`} 
              />
            )}
          </div>
        )}
        
        <div className="flex flex-col">
          <h1 className="text-lg font-semibold truncate max-w-[200px]">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs text-gray-500">{subtitle}</p>
          )}
        </div>
      </div>
      
      <div className="flex items-center">
        {rightAction || (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="text-gray-600 hover:text-gray-900 focus:outline-none">
                <MoreHorizontal className="h-6 w-6" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>查看资料</DropdownMenuItem>
              <DropdownMenuItem>静音对话</DropdownMenuItem>
              <DropdownMenuItem>移除</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};

export default Header;

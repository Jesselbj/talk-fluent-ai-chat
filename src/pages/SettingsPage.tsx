import React, { useState } from 'react';
import { Globe, ChevronRight, User, Bell, Shield, HelpCircle, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import { useAppContext } from '@/contexts/AppContext';
import { currentUser } from '@/data/mockData';

const languages = [
  { code: 'en', name: '英语 (English)' },
  { code: 'zh', name: '中文 (Chinese)' },
  { code: 'es', name: '西班牙语 (Español)' },
  { code: 'fr', name: '法语 (Français)' },
  { code: 'ja', name: '日语 (日本語)' },
  { code: 'ko', name: '韩语 (한국어)' },
  { code: 'ru', name: '俄语 (Русский)' },
  { code: 'de', name: '德语 (Deutsch)' },
  { code: 'it', name: '意大利语 (Italiano)' }
];

const SettingsPage = () => {
  const { preferredLanguage, setPreferredLanguage, userName, setUserName } = useAppContext();
  const [autoTranslate, setAutoTranslate] = useState(true);
  const [translateVoice, setTranslateVoice] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="pb-16">
      <Header title="设置" />
      
      <div className="mt-20 px-4">
        {/* Profile section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="p-4 flex items-center">
            <Avatar className="h-16 w-16">
              <AvatarImage src={currentUser.avatar} alt={userName} />
              <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
            </Avatar>
            
            <div className="ml-4">
              <h2 className="text-lg font-semibold">{userName}</h2>
              <p className="text-sm text-gray-500">ID: {currentUser.id}</p>
            </div>
            
            <ChevronRight className="h-5 w-5 text-gray-400 ml-auto" />
          </div>
        </div>
        
        {/* Language preferences */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="p-4 border-b border-gray-100">
            <h3 className="text-sm font-medium text-gray-500">语言设置</h3>
          </div>
          
          <div className="divide-y divide-gray-100">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center">
                <Globe className="h-5 w-5 text-gray-500 mr-3" />
                <span>首选语言</span>
              </div>
              
              <Select value={preferredLanguage} onValueChange={setPreferredLanguage}>
                <SelectTrigger className="w-[130px] h-8">
                  <SelectValue placeholder="选择语言" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map(lang => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center">
                <span>自动翻译消息</span>
              </div>
              <Switch 
                checked={autoTranslate}
                onCheckedChange={setAutoTranslate}
              />
            </div>
            
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center">
                <span>语音实时翻译</span>
              </div>
              <Switch 
                checked={translateVoice}
                onCheckedChange={setTranslateVoice}
              />
            </div>
          </div>
        </div>
        
        {/* App preferences */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="p-4 border-b border-gray-100">
            <h3 className="text-sm font-medium text-gray-500">应用设置</h3>
          </div>
          
          <div className="divide-y divide-gray-100">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center">
                <Bell className="h-5 w-5 text-gray-500 mr-3" />
                <span>通知</span>
              </div>
              <Switch 
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>
            
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center">
                <span>深色模式</span>
              </div>
              <Switch 
                checked={darkMode}
                onCheckedChange={setDarkMode}
              />
            </div>
          </div>
        </div>
        
        {/* Other options */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="divide-y divide-gray-100">
            <div className="flex items-center p-4">
              <Shield className="h-5 w-5 text-gray-500 mr-3" />
              <span>隐私与安全</span>
              <ChevronRight className="h-5 w-5 text-gray-400 ml-auto" />
            </div>
            
            <div className="flex items-center p-4">
              <HelpCircle className="h-5 w-5 text-gray-500 mr-3" />
              <span>帮助与反馈</span>
              <ChevronRight className="h-5 w-5 text-gray-400 ml-auto" />
            </div>
            
            <div className="flex items-center p-4 text-red-500">
              <LogOut className="h-5 w-5 mr-3" />
              <span>退出登录</span>
            </div>
          </div>
        </div>
        
        <div className="text-center text-xs text-gray-400 my-6">
          翻译多聊 v1.0.0
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default SettingsPage;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useAppContext } from '@/contexts/AppContext';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'zh', name: '中文' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'ja', name: '日本語' },
  { code: 'ko', name: '한국어' },
  { code: 'ru', name: 'Русский' },
  { code: 'de', name: 'Deutsch' },
  { code: 'it', name: 'Italiano' }
];

const WelcomePage = () => {
  const navigate = useNavigate();
  const { preferredLanguage, setPreferredLanguage, setUserName } = useAppContext();
  const [name, setName] = useState('');
  
  const handleContinue = () => {
    if (name.trim()) {
      setUserName(name);
    }
    navigate('/chat');
  };

  return (
    <div className="min-h-screen p-6 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="mb-8 text-center">
          <div className="rounded-full bg-primary/10 p-4 inline-block mb-4">
            <Globe className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-2">翻译多聊</h1>
          <p className="text-gray-500 max-w-xs mx-auto">
            打破语言障碍，轻松进行全球交流
          </p>
        </div>
        
        <div className="w-full max-w-md space-y-6">
          <div className="space-y-2">
            <label className="text-sm text-gray-500">您的名字</label>
            <Input 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="请输入您的名字"
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm text-gray-500">首选语言</label>
            <Select value={preferredLanguage} onValueChange={setPreferredLanguage}>
              <SelectTrigger className="w-full">
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
            <p className="text-xs text-gray-400">
              这是您希望看到的语言。其他人的消息将被翻译成这种语言。
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <Button 
          className="w-full" 
          size="lg"
          onClick={handleContinue}
        >
          开始使用
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
        
        <p className="text-xs text-center text-gray-400 mt-4">
          继续即表示您同意我们的服务条款和隐私政策
        </p>
      </div>
    </div>
  );
};

export default WelcomePage;

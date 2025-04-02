
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Globe, Cpu, Network } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-app-blue/10 to-app-purple/10 p-6 flex flex-col">
      <div className="absolute top-0 right-0 opacity-20">
        <Network className="h-64 w-64 text-app-blue" />
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="mb-8 text-center relative">
          <div className="absolute -top-12 -left-12 opacity-20">
            <Cpu className="h-24 w-24 text-app-purple animate-pulse" />
          </div>
          
          <div className="rounded-full bg-gradient-to-r from-app-blue/20 to-app-purple/20 backdrop-blur-sm p-5 inline-block mb-4 border border-app-purple/20 shadow-lg">
            <Globe className="h-12 w-12 text-app-purple" />
          </div>
          
          <h1 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-app-blue to-app-purple">AI Translator</h1>
          <p className="text-gray-600 max-w-xs mx-auto">
            Break language barriers with AI-powered translation
          </p>
        </div>
        
        <div className="w-full max-w-md space-y-6 bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-gray-200/50">
          <div className="space-y-2">
            <label className="text-sm text-gray-600">Your Name</label>
            <Input 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="Enter your name"
              className="w-full border-app-purple/20 focus:border-app-purple/50"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm text-gray-600">Preferred Language</label>
            <Select value={preferredLanguage} onValueChange={setPreferredLanguage}>
              <SelectTrigger className="w-full border-app-purple/20">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map(lang => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500">
              This is the language you want to see. Messages from others will be translated to this language.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <Button 
          className="w-full bg-gradient-to-r from-app-blue to-app-purple hover:from-app-blue/90 hover:to-app-purple/90" 
          size="lg"
          onClick={handleContinue}
        >
          Get Started
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
        
        <p className="text-xs text-center text-gray-500 mt-4">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default WelcomePage;

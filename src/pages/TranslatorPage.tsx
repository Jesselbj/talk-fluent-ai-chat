
import React, { useState, useRef, useEffect } from 'react';
import { ArrowUpDown, Mic, Copy, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import { translateText, startListening, stopListening, speakText, detectLanguage } from '@/utils/translationService';
import { useAppContext } from '@/contexts/AppContext';

const languages = [
  { code: 'en', name: '英语' },
  { code: 'zh', name: '中文' },
  { code: 'es', name: '西班牙语' },
  { code: 'fr', name: '法语' },
  { code: 'ja', name: '日语' },
  { code: 'ko', name: '韩语' },
  { code: 'ru', name: '俄语' },
  { code: 'de', name: '德语' },
  { code: 'it', name: '意大利语' }
];

const TranslatorPage = () => {
  const { preferredLanguage } = useAppContext();
  const [sourceLanguage, setSourceLanguage] = useState('en');
  const [targetLanguage, setTargetLanguage] = useState(preferredLanguage);
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [detectedLanguage, setDetectedLanguage] = useState<string | null>(null);
  
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const timeout = useRef<number | null>(null);

  useEffect(() => {
    if (timeout.current) {
      window.clearTimeout(timeout.current);
    }
    
    if (inputText.trim()) {
      timeout.current = window.setTimeout(translateInput, 800);
    } else {
      setTranslatedText('');
      setDetectedLanguage(null);
    }
    
    return () => {
      if (timeout.current) {
        window.clearTimeout(timeout.current);
      }
    };
  }, [inputText, sourceLanguage, targetLanguage]);

  const translateInput = async () => {
    if (!inputText.trim()) return;
    
    setIsTranslating(true);
    
    try {
      // Auto-detect language if set to auto
      let actualSourceLang = sourceLanguage;
      if (sourceLanguage === 'auto') {
        const detected = await detectLanguage(inputText);
        setDetectedLanguage(detected);
        actualSourceLang = detected;
      }
      
      const translated = await translateText(inputText, targetLanguage);
      setTranslatedText(translated);
    } catch (error) {
      console.error('Translation error:', error);
    } finally {
      setIsTranslating(false);
    }
  };

  const swapLanguages = () => {
    // Only swap if source language is not auto
    if (sourceLanguage !== 'auto') {
      setSourceLanguage(targetLanguage);
      setTargetLanguage(sourceLanguage);
      setInputText(translatedText);
      setTranslatedText(inputText);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // In a real app, we would show a toast notification
  };

  const speak = (text: string, lang: string) => {
    speakText(text, lang);
  };

  const startSpeechInput = () => {
    setIsListening(true);
    startListening(
      (text) => {
        setInputText(text);
      },
      () => {
        setIsListening(false);
      },
      sourceLanguage === 'auto' ? 'en-US' : `${sourceLanguage}-${sourceLanguage.toUpperCase()}`
    );
  };

  return (
    <div className="pb-16">
      <Header title="翻译工具" />
      
      <div className="mt-20 px-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Source language selection */}
          <div className="flex items-center justify-between p-3 border-b border-gray-200">
            <Select value={sourceLanguage} onValueChange={setSourceLanguage}>
              <SelectTrigger className="w-[140px] border-0 focus:ring-0 pl-1 h-8">
                <SelectValue placeholder="选择语言" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">自动检测</SelectItem>
                {languages.map(lang => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button variant="ghost" size="icon" onClick={swapLanguages}>
              <ArrowUpDown className="h-4 w-4" />
            </Button>
            
            <Select value={targetLanguage} onValueChange={setTargetLanguage}>
              <SelectTrigger className="w-[140px] border-0 focus:ring-0 pl-1 h-8">
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
          
          {/* Input area */}
          <div className="p-4 relative">
            <Textarea
              ref={inputRef}
              placeholder="输入要翻译的文本..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-[120px] resize-none border-0 focus-visible:ring-0 p-0 text-lg"
            />
            
            {detectedLanguage && sourceLanguage === 'auto' && (
              <div className="absolute top-2 right-2">
                <Badge className="text-xs bg-gray-100 text-gray-600 hover:bg-gray-200">
                  检测到: {languages.find(l => l.code === detectedLanguage)?.name || detectedLanguage}
                </Badge>
              </div>
            )}
            
            <div className="flex justify-between mt-2">
              <div className="flex space-x-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => speak(inputText, sourceLanguage)}
                  disabled={!inputText}
                >
                  <Volume2 className="h-5 w-5" />
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => copyToClipboard(inputText)}
                  disabled={!inputText}
                >
                  <Copy className="h-5 w-5" />
                </Button>
              </div>
              
              <Button 
                variant={isListening ? "destructive" : "ghost"} 
                size="sm" 
                className="gap-2"
                onClick={isListening ? () => stopListening() : startSpeechInput}
              >
                <Mic className="h-4 w-4" />
                {isListening ? '停止录音' : '语音输入'}
              </Button>
            </div>
          </div>
          
          {/* Output area */}
          <div className="border-t border-gray-200">
            <div className="p-4 relative">
              <div className="min-h-[120px] text-lg">
                {isTranslating ? (
                  <div className="flex items-center justify-center h-full py-8">
                    <div className="loader">翻译中...</div>
                  </div>
                ) : translatedText ? (
                  translatedText
                ) : (
                  <span className="text-gray-400">翻译结果将显示在这里</span>
                )}
              </div>
              
              <div className="flex justify-between mt-2">
                <div className="flex space-x-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => speak(translatedText, targetLanguage)}
                    disabled={!translatedText}
                  >
                    <Volume2 className="h-5 w-5" />
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => copyToClipboard(translatedText)}
                    disabled={!translatedText}
                  >
                    <Copy className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default TranslatorPage;

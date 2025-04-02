
import React, { useState, useRef, useEffect } from 'react';
import { ArrowUpDown, Mic, Copy, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import { translateText, startListening, stopListening, speakText, detectLanguage } from '@/utils/translationService';
import { useAppContext } from '@/contexts/AppContext';
import { Badge } from '@/components/ui/badge-custom';

type LanguageCode = 'en' | 'zh' | 'es' | 'fr' | 'ja' | 'ko' | 'ru' | 'de' | 'it' | 'auto';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'zh', name: 'Chinese' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'ru', name: 'Russian' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' }
];

const TranslatorPage = () => {
  const { preferredLanguage } = useAppContext();
  const [sourceLanguage, setSourceLanguage] = useState<LanguageCode>('auto');
  const [targetLanguage, setTargetLanguage] = useState<LanguageCode>(preferredLanguage);
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
        actualSourceLang = detected as LanguageCode;
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
    <div className="pb-16 bg-gradient-to-br from-app-blue/5 to-app-purple/5">
      <Header title="Translator" />
      
      <div className="mt-20 px-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200/50 overflow-hidden">
          {/* Source language selection */}
          <div className="flex items-center justify-between p-3 border-b border-gray-200/50 bg-gradient-to-r from-app-blue/10 to-app-purple/10">
            <Select value={sourceLanguage} onValueChange={(value: LanguageCode) => setSourceLanguage(value)}>
              <SelectTrigger className="w-[140px] border-0 focus:ring-0 pl-1 h-8 bg-white/50">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">Auto Detect</SelectItem>
                {languages.map(lang => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button variant="ghost" size="icon" onClick={swapLanguages} className="bg-white/50 hover:bg-white/80">
              <ArrowUpDown className="h-4 w-4 text-app-purple" />
            </Button>
            
            <Select value={targetLanguage} onValueChange={(value: LanguageCode) => setTargetLanguage(value)}>
              <SelectTrigger className="w-[140px] border-0 focus:ring-0 pl-1 h-8 bg-white/50">
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
          </div>
          
          {/* Input area */}
          <div className="p-4 relative">
            <Textarea
              ref={inputRef}
              placeholder="Enter text to translate..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-[120px] resize-none border-0 focus-visible:ring-0 p-0 text-lg bg-transparent"
            />
            
            {detectedLanguage && sourceLanguage === 'auto' && (
              <div className="absolute top-2 right-2">
                <Badge className="text-xs bg-gray-100 text-gray-600 hover:bg-gray-200">
                  Detected: {languages.find(l => l.code === detectedLanguage)?.name || detectedLanguage}
                </Badge>
              </div>
            )}
            
            <div className="flex justify-between mt-2">
              <div className="flex space-x-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => speak(inputText, sourceLanguage === 'auto' ? 'en' : sourceLanguage)}
                  disabled={!inputText}
                  className="hover:bg-app-blue/10"
                >
                  <Volume2 className="h-5 w-5 text-app-blue" />
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => copyToClipboard(inputText)}
                  disabled={!inputText}
                  className="hover:bg-app-blue/10"
                >
                  <Copy className="h-5 w-5 text-app-blue" />
                </Button>
              </div>
              
              <Button 
                variant={isListening ? "destructive" : "secondary"} 
                size="sm" 
                className={`gap-2 ${isListening ? '' : 'bg-app-purple hover:bg-app-purple/90'}`}
                onClick={isListening ? () => stopListening() : startSpeechInput}
              >
                <Mic className="h-4 w-4" />
                {isListening ? 'Stop Recording' : 'Voice Input'}
              </Button>
            </div>
          </div>
          
          {/* Output area */}
          <div className="border-t border-gray-200/50 bg-app-blue/5">
            <div className="p-4 relative">
              <div className="min-h-[120px] text-lg">
                {isTranslating ? (
                  <div className="flex items-center justify-center h-full py-8">
                    <div className="loader">Translating...</div>
                  </div>
                ) : translatedText ? (
                  translatedText
                ) : (
                  <span className="text-gray-400">Translation will appear here</span>
                )}
              </div>
              
              <div className="flex justify-between mt-2">
                <div className="flex space-x-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => speak(translatedText, targetLanguage)}
                    disabled={!translatedText}
                    className="hover:bg-app-purple/10"
                  >
                    <Volume2 className="h-5 w-5 text-app-purple" />
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => copyToClipboard(translatedText)}
                    disabled={!translatedText}
                    className="hover:bg-app-purple/10"
                  >
                    <Copy className="h-5 w-5 text-app-purple" />
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

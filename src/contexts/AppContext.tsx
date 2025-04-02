
import React, { createContext, useContext, useState, ReactNode } from 'react';

type LanguageCode = 'en' | 'zh' | 'es' | 'fr' | 'ja' | 'ko' | 'ru' | 'de' | 'it';

interface AppContextType {
  preferredLanguage: LanguageCode;
  setPreferredLanguage: (lang: LanguageCode) => void;
  isListening: boolean;
  setIsListening: (listening: boolean) => void;
  userName: string;
  setUserName: (name: string) => void;
  userAvatar: string;
  setUserAvatar: (url: string) => void;
}

const defaultContext: AppContextType = {
  preferredLanguage: 'en',
  setPreferredLanguage: () => {},
  isListening: false,
  setIsListening: () => {},
  userName: 'You',
  setUserName: () => {},
  userAvatar: '',
  setUserAvatar: () => {}
};

const AppContext = createContext<AppContextType>(defaultContext);

export const useAppContext = () => useContext(AppContext);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [preferredLanguage, setPreferredLanguage] = useState<LanguageCode>('en');
  const [isListening, setIsListening] = useState(false);
  const [userName, setUserName] = useState('You');
  const [userAvatar, setUserAvatar] = useState('');

  return (
    <AppContext.Provider value={{
      preferredLanguage,
      setPreferredLanguage,
      isListening,
      setIsListening,
      userName,
      setUserName,
      userAvatar,
      setUserAvatar
    }}>
      {children}
    </AppContext.Provider>
  );
};

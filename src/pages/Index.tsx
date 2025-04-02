
import React from 'react';
import { AppProvider } from '@/contexts/AppContext';
import { Routes, Route, Navigate } from 'react-router-dom';
import WelcomePage from './WelcomePage';
import ChatListPage from './ChatListPage';
import ChatPage from './ChatPage';
import ContactsPage from './ContactsPage';
import TranslatorPage from './TranslatorPage';
import SettingsPage from './SettingsPage';

const Index = () => {
  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/chat" element={<ChatListPage />} />
        <Route path="/chat/:chatId" element={<ChatPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/translator" element={<TranslatorPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppProvider>
  );
};

export default Index;

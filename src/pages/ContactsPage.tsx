
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, UserPlus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import QRCodeScanner from '@/components/QRCodeScanner';
import { users } from '@/data/mockData';

const ContactsPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group users by first letter of name
  const groupedUsers: Record<string, typeof users> = {};
  
  filteredUsers.forEach(user => {
    const firstLetter = user.name.charAt(0).toUpperCase();
    if (!groupedUsers[firstLetter]) {
      groupedUsers[firstLetter] = [];
    }
    groupedUsers[firstLetter].push(user);
  });

  // Sort the keys
  const sortedKeys = Object.keys(groupedUsers).sort();

  const handleScanComplete = (userId: string) => {
    console.log(`QR Code scanned, user ID: ${userId}`);
    navigate(`/contacts/${userId}`);
  };

  return (
    <div className="pb-16">
      <Header title="联系人" />
      
      <div className="mt-20 px-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input 
              placeholder="搜索联系人" 
              className="pl-10 bg-gray-100 border-0 focus-visible:ring-1"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <QRCodeScanner onScanComplete={handleScanComplete} />
          
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => navigate('/contacts/add')}
            className="rounded-full h-12 w-12 border-gray-300 hover:bg-gray-100"
          >
            <UserPlus className="h-6 w-6 text-gray-600" />
          </Button>
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="all">全部联系人</TabsTrigger>
            <TabsTrigger value="groups">群组</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            <div className="divide-y divide-gray-100">
              {sortedKeys.map(key => (
                <div key={key} className="py-2">
                  <div className="sticky top-20 bg-white py-1 z-10">
                    <h2 className="text-xs font-semibold text-gray-500">{key}</h2>
                  </div>
                  
                  {groupedUsers[key].map(user => (
                    <div 
                      key={user.id}
                      className="flex items-center py-2 px-1 hover:bg-gray-50 rounded-lg cursor-pointer"
                      onClick={() => navigate(`/chat/new?userId=${user.id}`)}
                    >
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        
                        {user.status === 'online' && (
                          <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-white" />
                        )}
                      </div>
                      
                      <div className="ml-3">
                        <p className="text-sm font-medium">{user.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
              
              {sortedKeys.length === 0 && (
                <div className="py-8 text-center text-gray-500">
                  没有找到匹配的联系人
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="groups" className="mt-0">
            <div className="flex flex-col items-center justify-center py-12">
              <UserPlus className="h-12 w-12 text-gray-300 mb-4" />
              <p className="text-gray-500 mb-4">您还没有加入任何群组</p>
              <Button onClick={() => navigate('/contacts/create-group')}>
                创建新群组
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default ContactsPage;

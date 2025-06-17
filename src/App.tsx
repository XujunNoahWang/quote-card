import React, { useState, useEffect } from 'react';
import { Quote, Tag } from './types';
import { StorageUtils } from './utils/storage';
import { SwipeableQuoteCards } from './components/SwipeableQuoteCards';
import { Header } from './components/Header';
import { AddQuoteModal } from './components/AddQuoteModal';
import { TagSidebar } from './components/TagSidebar';
import { ImportExportModal } from './components/ImportExportModal';

function App() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isTagSidebarOpen, setIsTagSidebarOpen] = useState(false);
  const [isImportExportModalOpen, setIsImportExportModalOpen] = useState(false);
  const [filteredQuotes, setFilteredQuotes] = useState<Quote[]>([]);

  // 初始化数据
  useEffect(() => {
    const loadedQuotes = StorageUtils.getQuotes();
    const loadedTags = StorageUtils.getTags();
    const settings = StorageUtils.getSettings();
    
    setQuotes(loadedQuotes);
    setTags(loadedTags);
    setIsDarkMode(settings.isDarkMode);
    
    // 如果没有语录，创建默认语录
    if (loadedQuotes.length === 0) {
      const defaultQuotes: Quote[] = [
        {
          id: '1',
          content: '生活不是等待暴风雨过去，而是要学会在雨中跳舞。',
          tags: ['生活', '励志'],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '2',
          content: '每一次的跌倒，都是为了更好地站起来。',
          tags: ['励志', '成长'],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '3',
          content: '简约是复杂的终极形式。',
          tags: ['设计', '哲学'],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
      ];
      setQuotes(defaultQuotes);
      StorageUtils.saveQuotes(defaultQuotes);
    }
  }, []);

  // 过滤语录
  useEffect(() => {
    let filtered = quotes;
    
    if (selectedTags.length > 0) {
      filtered = quotes.filter(quote => 
        selectedTags.some(tag => quote.tags.includes(tag))
      );
    }
    
    setFilteredQuotes(filtered);
    setCurrentQuoteIndex(0);
  }, [quotes, selectedTags]);

  // 切换暗黑模式
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    StorageUtils.saveSettings({ isDarkMode: newMode });
  };

  // 添加语录
  const addQuote = (content: string, quoteTags: string[]) => {
    const newQuote: Quote = {
      id: Date.now().toString(),
      content,
      tags: quoteTags,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    const updatedQuotes = [...quotes, newQuote];
    setQuotes(updatedQuotes);
    StorageUtils.saveQuotes(updatedQuotes);
    
    // 更新标签列表
    const allTags = Array.from(new Set([...tags.map(t => t.name), ...quoteTags]));
    const updatedTags = allTags.map(tagName => ({
      id: tagName.toLowerCase(),
      name: tagName,
      color: 'blue'
    }));
    setTags(updatedTags);
    StorageUtils.saveTags(updatedTags);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-purple-50'
    }`}>
      <div className="h-screen flex flex-col overflow-hidden">
        {/* 头部 */}
        <Header 
          isDarkMode={isDarkMode}
          onToggleDarkMode={toggleDarkMode}
          onAddQuote={() => setIsAddModalOpen(true)}
          onManageQuotes={() => setIsTagSidebarOpen(true)}
          onImportExport={() => setIsImportExportModalOpen(true)}
        />
        
        {/* 主内容区域 - 滑动卡片 */}
        <div className="flex-1 overflow-hidden">
          <SwipeableQuoteCards 
            quotes={filteredQuotes}
            currentIndex={currentQuoteIndex}
            onIndexChange={setCurrentQuoteIndex}
            isDarkMode={isDarkMode}
          />
        </div>
      </div>
      
      {/* 标签选择侧边栏 */}
      <TagSidebar 
        isOpen={isTagSidebarOpen}
        onClose={() => setIsTagSidebarOpen(false)}
        tags={tags}
        selectedTags={selectedTags}
        onTagSelect={setSelectedTags}
        isDarkMode={isDarkMode}
      />
      
      {/* 模态框 */}
      <AddQuoteModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={addQuote}
        existingTags={tags.map(t => t.name)}
        isDarkMode={isDarkMode}
      />
      
      <ImportExportModal 
        isOpen={isImportExportModalOpen}
        onClose={() => setIsImportExportModalOpen(false)}
        onImport={(data) => {
          setQuotes(data.quotes);
          setTags(data.tags);
          StorageUtils.saveQuotes(data.quotes);
          StorageUtils.saveTags(data.tags);
        }}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}

export default App; 
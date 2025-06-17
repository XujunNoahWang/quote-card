import React, { useState, useEffect } from 'react';
import { Quote, Tag } from './types';
import { StorageUtils } from './utils/storage';
import { QuoteCard } from './components/QuoteCard';
import { Header } from './components/Header';
import { AddQuoteModal } from './components/AddQuoteModal';
import { ManageQuotesModal } from './components/ManageQuotesModal';
import { TagFilter } from './components/TagFilter';
import { ImportExportModal } from './components/ImportExportModal';
import { useSwipe } from './hooks/useSwipe';

function App() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
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

  // 滑动处理
  const handleSwipeLeft = () => {
    if (filteredQuotes.length === 0) return;
    setCurrentQuoteIndex(prev => (prev + 1) % filteredQuotes.length);
  };

  const handleSwipeRight = () => {
    if (filteredQuotes.length === 0) return;
    setCurrentQuoteIndex(prev => prev === 0 ? filteredQuotes.length - 1 : prev - 1);
  };

  useSwipe({
    onSwipeLeft: handleSwipeLeft,
    onSwipeRight: handleSwipeRight,
    threshold: 80
  });

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

  // 删除语录
  const deleteQuote = (id: string) => {
    const updatedQuotes = quotes.filter(q => q.id !== id);
    setQuotes(updatedQuotes);
    StorageUtils.saveQuotes(updatedQuotes);
  };

  // 更新语录
  const updateQuote = (id: string, content: string, quoteTags: string[]) => {
    const updatedQuotes = quotes.map(q => 
      q.id === id 
        ? { ...q, content, tags: quoteTags, updatedAt: new Date().toISOString() }
        : q
    );
    setQuotes(updatedQuotes);
    StorageUtils.saveQuotes(updatedQuotes);
  };

  const currentQuote = filteredQuotes[currentQuoteIndex];

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
          onManageQuotes={() => setIsManageModalOpen(true)}
          onImportExport={() => setIsImportExportModalOpen(true)}
        />
        
        {/* 标签过滤器 */}
        <TagFilter 
          tags={tags}
          selectedTags={selectedTags}
          onTagSelect={setSelectedTags}
          isDarkMode={isDarkMode}
        />
        
        {/* 主内容区域 */}
        <div className="flex-1 flex items-center justify-center p-4 overflow-hidden">
          {filteredQuotes.length > 0 ? (
            <QuoteCard 
              quote={currentQuote}
              onSwipeLeft={handleSwipeLeft}
              onSwipeRight={handleSwipeRight}
              isDarkMode={isDarkMode}
              currentIndex={currentQuoteIndex}
              totalCount={filteredQuotes.length}
            />
          ) : (
            <div className="text-center">
              <div className={`text-6xl mb-4 ${isDarkMode ? 'text-gray-600' : 'text-gray-300'}`}>
                📝
              </div>
              <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {selectedTags.length > 0 ? '没有匹配的语录' : '还没有语录'}
              </p>
              <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                点击右上角的 + 号添加第一条语录
              </p>
            </div>
          )}
        </div>
        
        {/* 底部指示器 */}
        {filteredQuotes.length > 1 && (
          <div className="flex justify-center pb-8">
            <div className="flex space-x-2">
              {filteredQuotes.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    index === currentQuoteIndex
                      ? isDarkMode ? 'bg-white' : 'bg-gray-800'
                      : isDarkMode ? 'bg-gray-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* 模态框 */}
      <AddQuoteModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={addQuote}
        existingTags={tags.map(t => t.name)}
        isDarkMode={isDarkMode}
      />
      
      <ManageQuotesModal 
        isOpen={isManageModalOpen}
        onClose={() => setIsManageModalOpen(false)}
        quotes={quotes}
        onDelete={deleteQuote}
        onUpdate={updateQuote}
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
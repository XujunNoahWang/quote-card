import React, { useState, useMemo } from 'react';
import { Quote } from '../types';
import { getColorForTag } from '../utils/colors';

interface ManageQuotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  quotes: Quote[];
  onDelete: (id: string) => void;
  onUpdate: (id: string, content: string, tags: string[]) => void;
  isDarkMode: boolean;
}

export const ManageQuotesModal: React.FC<ManageQuotesModalProps> = ({
  isOpen,
  onClose,
  quotes,
  onDelete,
  onUpdate,
  isDarkMode
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [editTags, setEditTags] = useState<string[]>([]);

  const filteredQuotes = useMemo(() => {
    if (!searchQuery) return quotes;
    return quotes.filter(quote => 
      quote.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quote.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [quotes, searchQuery]);

  const startEdit = (quote: Quote) => {
    setEditingId(quote.id);
    setEditContent(quote.content);
    setEditTags([...quote.tags]);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditContent('');
    setEditTags([]);
  };

  const saveEdit = () => {
    if (editingId && editContent.trim()) {
      onUpdate(editingId, editContent.trim(), editTags);
      cancelEdit();
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('确定要删除这条语录吗？')) {
      onDelete(id);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 背景遮罩 */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* 模态框内容 */}
      <div className={`
        relative w-full max-w-2xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col
        ${isDarkMode ? 'bg-gray-800' : 'bg-white'}
      `}>
        {/* 头部 */}
        <div className={`
          flex items-center justify-between p-6 border-b flex-shrink-0
          ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}
        `}>
          <h2 className={`
            text-xl font-bold
            ${isDarkMode ? 'text-white' : 'text-gray-900'}
          `}>
            管理语录 ({quotes.length})
          </h2>
          <button
            onClick={onClose}
            className={`
              p-2 rounded-lg transition-colors
              ${isDarkMode 
                ? 'hover:bg-gray-700 text-gray-400 hover:text-gray-200' 
                : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
              }
            `}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 搜索框 */}
        <div className="p-6 border-b flex-shrink-0">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索语录内容或标签..."
              className={`
                w-full pl-10 pr-4 py-3 rounded-xl border transition-colors
                ${isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                }
                focus:outline-none focus:ring-2 focus:ring-blue-500/20
              `}
            />
            <svg className={`
              absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5
              ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}
            `} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* 语录列表 */}
        <div className="flex-1 overflow-y-auto p-6">
          {filteredQuotes.length === 0 ? (
            <div className="text-center py-12">
              <div className={`text-4xl mb-4 ${isDarkMode ? 'text-gray-600' : 'text-gray-300'}`}>
                🔍
              </div>
              <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {searchQuery ? '没有找到匹配的语录' : '还没有语录'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredQuotes.map((quote) => (
                <div
                  key={quote.id}
                  className={`
                    p-4 rounded-xl border transition-all duration-200
                    ${isDarkMode 
                      ? 'bg-gray-700/50 border-gray-600 hover:bg-gray-700' 
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                    }
                  `}
                >
                  {editingId === quote.id ? (
                    // 编辑模式
                    <div className="space-y-3">
                      <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className={`
                          w-full px-3 py-2 rounded-lg border resize-none
                          ${isDarkMode 
                            ? 'bg-gray-600 border-gray-500 text-white' 
                            : 'bg-white border-gray-300 text-gray-900'
                          }
                          focus:outline-none focus:ring-2 focus:ring-blue-500/20
                        `}
                        rows={3}
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={saveEdit}
                          className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm transition-colors"
                        >
                          保存
                        </button>
                        <button
                          onClick={cancelEdit}
                          className={`
                            px-3 py-1 rounded-lg text-sm transition-colors
                            ${isDarkMode 
                              ? 'bg-gray-600 hover:bg-gray-500 text-gray-300' 
                              : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                            }
                          `}
                        >
                          取消
                        </button>
                      </div>
                    </div>
                  ) : (
                    // 查看模式
                    <div>
                      <p className={`
                        text-sm mb-3 leading-relaxed
                        ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}
                      `}>
                        {quote.content}
                      </p>
                      
                      {/* 标签 */}
                      {quote.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {quote.tags.map((tag, index) => {
                            const colors = getColorForTag(tag);
                            return (
                              <span
                                key={index}
                                className={`
                                  px-2 py-1 rounded-full text-xs font-medium
                                  ${colors.bg} ${colors.text}
                                  ${colors.darkBg} ${colors.darkText}
                                `}
                              >
                                {tag}
                              </span>
                            );
                          })}
                        </div>
                      )}
                      
                      {/* 操作按钮 */}
                      <div className="flex items-center justify-between">
                        <span className={`
                          text-xs
                          ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}
                        `}>
                          {new Date(quote.createdAt).toLocaleDateString()}
                        </span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => startEdit(quote)}
                            className={`
                              p-2 rounded-lg transition-colors
                              ${isDarkMode 
                                ? 'hover:bg-gray-600 text-gray-400 hover:text-blue-400' 
                                : 'hover:bg-gray-200 text-gray-500 hover:text-blue-500'
                              }
                            `}
                            title="编辑"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDelete(quote.id)}
                            className={`
                              p-2 rounded-lg transition-colors
                              ${isDarkMode 
                                ? 'hover:bg-gray-600 text-gray-400 hover:text-red-400' 
                                : 'hover:bg-gray-200 text-gray-500 hover:text-red-500'
                              }
                            `}
                            title="删除"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 
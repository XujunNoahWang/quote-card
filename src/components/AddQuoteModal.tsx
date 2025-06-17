import React, { useState, useEffect } from 'react';

interface AddQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (content: string, tags: string[]) => void;
  existingTags: string[];
  isDarkMode: boolean;
}

export const AddQuoteModal: React.FC<AddQuoteModalProps> = ({
  isOpen,
  onClose,
  onAdd,
  existingTags,
  isDarkMode
}) => {
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setContent('');
      setTags([]);
      setNewTag('');
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onAdd(content.trim(), tags);
      onClose();
    }
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const selectExistingTag = (tag: string) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
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
        relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl
        ${isDarkMode ? 'bg-gray-800' : 'bg-white'}
      `}>
        {/* 头部 */}
        <div className={`
          flex items-center justify-between p-6 border-b
          ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}
        `}>
          <h2 className={`
            text-xl font-bold
            ${isDarkMode ? 'text-white' : 'text-gray-900'}
          `}>
            添加语录
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

        {/* 表单内容 */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* 语录内容 */}
          <div>
            <label className={`
              block text-sm font-medium mb-2
              ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}
            `}>
              语录内容
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="请输入您的语录..."
              rows={4}
              className={`
                w-full px-4 py-3 rounded-xl border resize-none transition-colors
                ${isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                }
                focus:outline-none focus:ring-2 focus:ring-blue-500/20
              `}
              autoFocus
              required
            />
          </div>

          {/* 标签选择 */}
          <div>
            <label className={`
              block text-sm font-medium mb-2
              ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}
            `}>
              标签
            </label>
            
            {/* 新标签输入 */}
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="添加新标签"
                className={`
                  flex-1 px-3 py-2 rounded-lg border text-sm transition-colors
                  ${isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                  }
                  focus:outline-none focus:ring-2 focus:ring-blue-500/20
                `}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              />
              <button
                type="button"
                onClick={addTag}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-colors
                  ${isDarkMode 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }
                `}
              >
                添加
              </button>
            </div>

            {/* 已选标签 */}
            {tags.length > 0 && (
              <div className="mb-3">
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className={`
                        inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
                        ${isDarkMode 
                          ? 'bg-blue-900 text-blue-200 border border-blue-700' 
                          : 'bg-blue-100 text-blue-800 border border-blue-200'
                        }
                      `}
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-1 text-current hover:text-red-500"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 现有标签 */}
            {existingTags.length > 0 && (
              <div>
                <div className={`
                  text-xs mb-2
                  ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}
                `}>
                  从现有标签中选择：
                </div>
                <div className="flex flex-wrap gap-2">
                  {existingTags
                    .filter(tag => !tags.includes(tag))
                    .map((tag, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => selectExistingTag(tag)}
                        className={`
                          px-3 py-1 rounded-full text-xs font-medium border transition-colors
                          ${isDarkMode 
                            ? 'bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600' 
                            : 'bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200'
                          }
                        `}
                      >
                        {tag}
                      </button>
                    ))}
                </div>
              </div>
            )}
          </div>

          {/* 按钮组 */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className={`
                flex-1 px-4 py-3 rounded-xl font-medium transition-colors
                ${isDarkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }
              `}
            >
              取消
            </button>
            <button
              type="submit"
              disabled={!content.trim()}
              className={`
                flex-1 px-4 py-3 rounded-xl font-medium text-white transition-colors
                ${content.trim()
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
                  : 'bg-gray-400 cursor-not-allowed'
                }
              `}
            >
              添加语录
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}; 
import React from 'react';
import { Tag } from '../types';
import { getColorForTag } from '../utils/colors';

interface TagSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  tags: Tag[];
  selectedTags: string[];
  onTagSelect: (tags: string[]) => void;
  isDarkMode: boolean;
}

export const TagSidebar: React.FC<TagSidebarProps> = ({
  isOpen,
  onClose,
  tags,
  selectedTags,
  onTagSelect,
  isDarkMode
}) => {
  const handleTagClick = (tagName: string) => {
    if (selectedTags.includes(tagName)) {
      onTagSelect(selectedTags.filter(t => t !== tagName));
    } else {
      onTagSelect([...selectedTags, tagName]);
    }
  };

  const handleSelectAll = () => {
    if (selectedTags.length === tags.length) {
      // 如果全选了，则清空选择
      onTagSelect([]);
    } else {
      // 否则选择全部
      onTagSelect(tags.map(t => t.name));
    }
  };

  const isAllSelected = selectedTags.length === tags.length && tags.length > 0;

  return (
    <>
      {/* 背景遮罩 */}
      <div 
        className={`
          fixed inset-0 z-40 transition-opacity duration-300
          ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
          bg-black/50 backdrop-blur-sm
        `}
        onClick={onClose}
      />
      
      {/* 侧边栏 */}
      <div className={`
        fixed top-0 left-0 z-50 h-full w-80 max-w-[85vw] 
        transform transition-transform duration-300 ease-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        ${isDarkMode ? 'bg-gray-900' : 'bg-white'}
      `}>
        {/* 头部 */}
        <div className={`
          flex items-center justify-between p-6 border-b
          ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}
        `}>
          <h2 className={`
            text-xl font-bold
            ${isDarkMode ? 'text-white' : 'text-gray-900'}
          `}>
            选择标签
          </h2>
          <button
            onClick={onClose}
            className={`
              p-2 rounded-xl transition-colors
              ${isDarkMode 
                ? 'hover:bg-gray-800 text-gray-400 hover:text-gray-200' 
                : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
              }
            `}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 全选按钮 */}
        {tags.length > 0 && (
          <div className="p-6 border-b border-gray-200 dark:border-gray-800">
            <button
              onClick={handleSelectAll}
              className={`
                w-full flex items-center justify-center px-4 py-3 rounded-xl font-medium transition-all duration-200
                ${isAllSelected
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                  : isDarkMode 
                    ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-700'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200'
                }
              `}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d={isAllSelected ? "M5 13l4 4L19 7" : "M9 12l2 2 4-4"} />
              </svg>
              {isAllSelected ? '清空选择' : '全选标签'}
            </button>
          </div>
        )}

        {/* 标签列表 */}
        <div className="flex-1 overflow-y-auto p-6">
          {tags.length === 0 ? (
            <div className="text-center py-12">
              <div className={`text-4xl mb-4 ${isDarkMode ? 'text-gray-600' : 'text-gray-300'}`}>
                🏷️
              </div>
              <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                还没有标签
              </p>
              <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                添加语录时会自动创建标签
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {tags.map((tag) => {
                const isSelected = selectedTags.includes(tag.name);
                const colors = getColorForTag(tag.name);
                
                return (
                  <button
                    key={tag.id}
                    onClick={() => handleTagClick(tag.name)}
                    className={`
                      w-full flex items-center justify-between p-4 rounded-xl border transition-all duration-200 hover:scale-[1.02]
                      ${isSelected 
                        ? `${colors.bg} ${colors.text} ${colors.border} ${colors.darkBg} ${colors.darkText} ring-2 ring-offset-2 ${isDarkMode ? 'ring-offset-gray-900' : 'ring-offset-white'} ring-current shadow-lg`
                        : isDarkMode 
                          ? 'bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700'
                          : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                      }
                    `}
                  >
                    <div className="flex items-center">
                      <div className={`
                        w-3 h-3 rounded-full mr-3
                        ${isSelected ? 'bg-current' : 'bg-gray-400'}
                      `} />
                      <span className="font-medium">{tag.name}</span>
                    </div>
                    
                    {isSelected && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* 底部状态 */}
        {tags.length > 0 && (
          <div className={`
            p-6 border-t
            ${isDarkMode ? 'border-gray-800 bg-gray-900/50' : 'border-gray-200 bg-gray-50/50'}
          `}>
            <div className={`
              text-center text-sm
              ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}
            `}>
              {selectedTags.length === 0 
                ? '显示全部语录'
                : `已选择 ${selectedTags.length} 个标签`
              }
            </div>
          </div>
        )}
      </div>
    </>
  );
}; 
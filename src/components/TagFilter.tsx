import React from 'react';
import { Tag } from '../types';
import { getColorForTag } from '../utils/colors';

interface TagFilterProps {
  tags: Tag[];
  selectedTags: string[];
  onTagSelect: (tags: string[]) => void;
  isDarkMode: boolean;
}

export const TagFilter: React.FC<TagFilterProps> = ({ 
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

  const clearSelection = () => {
    onTagSelect([]);
  };

  if (tags.length === 0) return null;

  return (
    <div className={`
      px-4 py-3 border-b
      ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}
    `}>
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-2">
          <span className={`
            text-sm font-medium
            ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}
          `}>
            标签筛选
          </span>
          {selectedTags.length > 0 && (
            <button
              onClick={clearSelection}
              className={`
                text-xs px-2 py-1 rounded-md transition-colors
                ${isDarkMode 
                  ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-800' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }
              `}
            >
              清除
            </button>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2 max-h-20 overflow-y-auto">
          {tags.map((tag) => {
            const isSelected = selectedTags.includes(tag.name);
            const colors = getColorForTag(tag.name);
            
            return (
              <button
                key={tag.id}
                onClick={() => handleTagClick(tag.name)}
                className={`
                  px-3 py-1 rounded-full text-xs font-medium border transition-all duration-200
                  ${isSelected 
                    ? `${colors.bg} ${colors.text} ${colors.border} ${colors.darkBg} ${colors.darkText} ring-2 ring-offset-1 ${isDarkMode ? 'ring-offset-gray-900' : 'ring-offset-white'} ring-current`
                    : isDarkMode 
                      ? 'bg-gray-800 text-gray-400 border-gray-700 hover:bg-gray-700 hover:text-gray-300'
                      : 'bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200 hover:text-gray-700'
                  }
                  hover:scale-105 active:scale-95
                `}
              >
                {tag.name}
              </button>
            );
          })}
        </div>
        
        {selectedTags.length > 0 && (
          <div className={`
            mt-2 text-xs
            ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}
          `}>
            已选择 {selectedTags.length} 个标签
          </div>
        )}
      </div>
    </div>
  );
}; 
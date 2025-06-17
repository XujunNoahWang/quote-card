import React from 'react';

interface HeaderProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onAddQuote: () => void;
  onManageQuotes: () => void;
  onImportExport: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  isDarkMode, 
  onToggleDarkMode,
  onAddQuote,
  onManageQuotes,
  onImportExport
}) => {
  return (
    <div className={`
      relative z-20 px-4 py-4 backdrop-blur-md border-b
      ${isDarkMode 
        ? 'bg-gray-900/80 border-gray-800' 
        : 'bg-white/80 border-gray-200'
      }
    `}>
      <div className="flex items-center justify-between max-w-md mx-auto">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className={`
            w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold
            bg-gradient-to-br from-blue-500 to-purple-600
          `}>
            Q
          </div>
          <h1 className={`
            text-lg font-bold
            ${isDarkMode ? 'text-white' : 'text-gray-900'}
          `}>
            Quote Card
          </h1>
        </div>
        
        {/* 右侧按钮组 */}
        <div className="flex items-center space-x-2">
          {/* 管理按钮 */}
          <button
            onClick={onManageQuotes}
            className={`
              p-2 rounded-xl transition-all duration-200 hover:scale-105
              ${isDarkMode 
                ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
              }
            `}
            title="管理语录"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </button>
          
          {/* 导入导出按钮 */}
          <button
            onClick={onImportExport}
            className={`
              p-2 rounded-xl transition-all duration-200 hover:scale-105
              ${isDarkMode 
                ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
              }
            `}
            title="导入/导出"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </button>
          
          {/* 暗夜模式切换 */}
          <button
            onClick={onToggleDarkMode}
            className={`
              p-2 rounded-xl transition-all duration-200 hover:scale-105
              ${isDarkMode 
                ? 'bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400' 
                : 'bg-gray-800/10 hover:bg-gray-800/20 text-gray-700'
              }
            `}
            title={isDarkMode ? '切换到日间模式' : '切换到夜间模式'}
          >
            {isDarkMode ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
              </svg>
            )}
          </button>
          
          {/* 添加按钮 */}
          <button
            onClick={onAddQuote}
            className={`
              p-2 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg
              bg-gradient-to-r from-blue-500 to-purple-600 text-white
              hover:from-blue-600 hover:to-purple-700
            `}
            title="添加语录"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}; 
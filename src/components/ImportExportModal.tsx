import React, { useRef, useState } from 'react';
import { StorageUtils } from '../utils/storage';
import { Quote, Tag } from '../types';

interface ImportExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (data: { quotes: Quote[], tags: Tag[], settings: any }) => void;
  isDarkMode: boolean;
}

export const ImportExportModal: React.FC<ImportExportModalProps> = ({
  isOpen,
  onClose,
  onImport,
  isDarkMode
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isImporting, setIsImporting] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);

  const handleExport = () => {
    try {
      StorageUtils.exportData();
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    setImportError(null);

    try {
      const data = await StorageUtils.importData(file);
      onImport(data);
      onClose();
    } catch (error) {
      setImportError(error instanceof Error ? error.message : '导入失败');
    } finally {
      setIsImporting(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
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
        relative w-full max-w-md rounded-2xl shadow-2xl
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
            数据管理
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

        {/* 内容 */}
        <div className="p-6 space-y-6">
          {/* 导出功能 */}
          <div>
            <h3 className={`
              text-lg font-semibold mb-2
              ${isDarkMode ? 'text-white' : 'text-gray-900'}
            `}>
              导出数据
            </h3>
            <p className={`
              text-sm mb-4
              ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}
            `}>
              将您的语录、标签和设置导出为JSON文件，可以在其他设备上导入使用。
            </p>
            <button
              onClick={handleExport}
              className={`
                w-full flex items-center justify-center px-4 py-3 rounded-xl font-medium transition-colors
                ${isDarkMode 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
                }
              `}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              导出数据
            </button>
          </div>

          {/* 分割线 */}
          <div className={`border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`} />

          {/* 导入功能 */}
          <div>
            <h3 className={`
              text-lg font-semibold mb-2
              ${isDarkMode ? 'text-white' : 'text-gray-900'}
            `}>
              导入数据
            </h3>
            <p className={`
              text-sm mb-4
              ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}
            `}>
              从之前导出的JSON文件中导入语录和设置。注意：这将覆盖当前的所有数据！
            </p>
            
            {importError && (
              <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded-lg">
                <p className="text-red-700 text-sm">{importError}</p>
              </div>
            )}

            <button
              onClick={handleImportClick}
              disabled={isImporting}
              className={`
                w-full flex items-center justify-center px-4 py-3 rounded-xl font-medium transition-colors
                ${isImporting 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : isDarkMode 
                    ? 'bg-green-600 hover:bg-green-700 text-white' 
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }
              `}
            >
              {isImporting ? (
                <>
                  <svg className="w-5 h-5 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  正在导入...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                  </svg>
                  选择文件导入
                </>
              )}
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* 警告信息 */}
          <div className={`
            p-4 rounded-lg border-l-4 border-yellow-400
            ${isDarkMode ? 'bg-yellow-900/20' : 'bg-yellow-50'}
          `}>
            <div className="flex">
              <svg className="w-5 h-5 text-yellow-400 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div>
                <p className={`
                  text-sm font-medium
                  ${isDarkMode ? 'text-yellow-300' : 'text-yellow-800'}
                `}>
                  重要提醒
                </p>
                <p className={`
                  text-sm mt-1
                  ${isDarkMode ? 'text-yellow-400' : 'text-yellow-700'}
                `}>
                  导入数据将完全替换当前的语录和设置，请确保您已经备份了重要数据。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 
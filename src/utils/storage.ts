import { Quote, Tag } from '../types';

const QUOTES_KEY = 'quote-card-quotes';
const TAGS_KEY = 'quote-card-tags';
const SETTINGS_KEY = 'quote-card-settings';

export const StorageUtils = {
  // 保存语录
  saveQuotes: (quotes: Quote[]) => {
    localStorage.setItem(QUOTES_KEY, JSON.stringify(quotes));
  },

  // 获取语录
  getQuotes: (): Quote[] => {
    try {
      const data = localStorage.getItem(QUOTES_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading quotes:', error);
      return [];
    }
  },

  // 保存标签
  saveTags: (tags: Tag[]) => {
    localStorage.setItem(TAGS_KEY, JSON.stringify(tags));
  },

  // 获取标签
  getTags: (): Tag[] => {
    try {
      const data = localStorage.getItem(TAGS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading tags:', error);
      return [];
    }
  },

  // 保存设置
  saveSettings: (settings: any) => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  },

  // 获取设置
  getSettings: () => {
    try {
      const data = localStorage.getItem(SETTINGS_KEY);
      return data ? JSON.parse(data) : { isDarkMode: false };
    } catch (error) {
      console.error('Error loading settings:', error);
      return { isDarkMode: false };
    }
  },

  // 导出数据
  exportData: () => {
    const quotes = StorageUtils.getQuotes();
    const tags = StorageUtils.getTags();
    const settings = StorageUtils.getSettings();
    
    const data = {
      quotes,
      tags,
      settings,
      exportDate: new Date().toISOString(),
      version: '1.0.0'
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `quote-card-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },

  // 导入数据
  importData: (file: File): Promise<{ quotes: Quote[], tags: Tag[], settings: any }> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          
          if (!data.quotes || !Array.isArray(data.quotes)) {
            throw new Error('Invalid data format: missing quotes array');
          }
          
          const quotes = data.quotes || [];
          const tags = data.tags || [];
          const settings = data.settings || { isDarkMode: false };
          
          resolve({ quotes, tags, settings });
        } catch (error) {
          reject(new Error('Invalid JSON format'));
        }
      };
      
      reader.onerror = () => reject(new Error('File reading error'));
      reader.readAsText(file);
    });
  },

  // 清除所有数据
  clearAllData: () => {
    localStorage.removeItem(QUOTES_KEY);
    localStorage.removeItem(TAGS_KEY);
    localStorage.removeItem(SETTINGS_KEY);
  }
}; 
# Quote Card

![Quote Card](https://img.shields.io/badge/version-0.2.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

A beautiful, Apple-inspired quote card application with internationalization and advanced management features. Built with pure HTML, CSS, and JavaScript - no frameworks required.

English | [简体中文](#简体中文)

## ✨ Features

### 🎨 Beautiful Design
- **Apple-inspired interface** with clean, minimalist aesthetics
- **Smooth animations** with carefully crafted transitions
- **Responsive design** that works perfectly on all devices
- **Dark/Light theme** with elegant toggle animation
- **Internationalization** support for Chinese and English languages

### 🎯 Core Functionality
- **Swipe navigation** - Navigate through quotes with smooth swipe gestures
- **Keyboard support** - Use arrow keys for navigation
- **Touch-friendly** - Optimized for mobile touch interactions
- **Infinite loop** - Seamlessly browse through your quote collection

### 📝 Quote Management
- **Add new quotes** - Easily add quotes with optional author attribution
- **Edit existing quotes** - In-place editing with instant preview
- **Delete quotes** - Remove quotes with confirmation dialog
- **Search functionality** - Find quotes by content or author
- **Import/Export** - Backup and restore quotes with JSON files
- **Persistent storage** - All quotes saved locally in your browser

### 🎪 Interactive Features
- **Sidebar panel** - Slide-out management panel with smooth animations
- **Real-time search** - Filter quotes as you type
- **Drag interaction** - Real-time visual feedback during swipe gestures
- **Language toggle** - Switch between Chinese and English interfaces
- **Success feedback** - Clear visual confirmation for all actions

## 🆕 What's New in v0.2

### 🌐 Internationalization Support
- **Dual language interface** - Complete Chinese and English support
- **Language toggle** - Elegant slide-toggle button design matching the theme toggle
- **Dynamic text updates** - All UI elements update instantly when switching languages
- **Persistent language preference** - Your language choice is remembered

### 📁 Import/Export Features
- **Export to JSON** - Download all your quotes as a timestamped JSON file
- **Import from JSON** - Upload and restore quotes from backup files
- **Data validation** - Smart validation ensures only valid quotes are imported
- **Backup safety** - Confirmation dialogs prevent accidental data loss
- **Success notifications** - Beautiful toast notifications for all operations

## 🚀 Demo

Visit the live demo: [Quote Card Demo](https://xujunnoahwang.github.io/quote-card/)

## 📦 Installation

### Option 1: Clone the Repository
```bash
git clone https://github.com/XujunNoahWang/quote-card.git
cd quote-card
```

### Option 2: Download ZIP
Download the ZIP file from the [releases page](https://github.com/XujunNoahWang/quote-card/releases) and extract it.

### Option 3: Use as Template
Click the "Use this template" button to create your own repository based on this project.

## 🎯 Usage

### Basic Setup
1. Open `index.html` in any modern web browser
2. Start browsing the default quotes by swiping or using arrow keys
3. Click the hamburger menu (☰) to open the management panel

### Adding Quotes
1. Open the management panel
2. Enter your quote in the text area
3. Optionally add an author (defaults to "佚名" if empty)
4. Click "添加语录" to add the quote
5. The new quote will appear at the beginning of your collection

### Managing Quotes
- **Search**: Use the search bar to find specific quotes
- **Edit**: Click the "修改/Edit" button to edit any quote
- **Delete**: Click the "删除/Delete" button to remove a quote (with confirmation)
- **Export**: Click "导出语录/Export Quotes" to download a JSON backup file
- **Import**: Click "导入语录/Import Quotes" to restore quotes from a JSON file

### Interface Controls
- **Theme Toggle**: Click the theme toggle button (☀️/🌙) to switch between light and dark modes
- **Language Toggle**: Click the language toggle button (中/EN) to switch between Chinese and English
- **Preferences**: Both theme and language preferences are automatically saved

## 🛠️ Development

### Local Development
1. Clone the repository
2. Start a local server (optional but recommended):
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```
3. Open `http://localhost:8000` in your browser

### File Structure
```
quote-card/
├── index.html          # Main HTML file
├── styles.css          # CSS styles with theme support
├── script.js           # JavaScript functionality
├── README.md           # Documentation (EN/CN)
└── LICENSE             # MIT License
```

### Key Technologies
- **HTML5** - Modern semantic markup
- **CSS3** - Advanced styling with CSS variables and animations
- **Vanilla JavaScript** - Pure JavaScript with ES6+ features
- **LocalStorage API** - Client-side data persistence
- **Touch Events API** - Mobile touch interaction support

## 🎨 Design Philosophy

This project follows Apple's design principles:

- **Simplicity**: Focus on essential features without clutter
- **Clarity**: Clear visual hierarchy and intuitive interactions
- **Consistency**: Uniform design language throughout the application
- **Accessibility**: Keyboard navigation and screen reader support
- **Performance**: Lightweight and fast, no external dependencies

## 📱 Browser Support

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ iOS Safari 12+
- ✅ Chrome for Android 60+

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Guidelines
1. Follow the existing code style
2. Write clear, descriptive commit messages
3. Test your changes on multiple browsers
4. Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by Apple's design philosophy
- Icons: Emoji characters for universal compatibility
- Fonts: System fonts for optimal performance and consistency

## 📞 Contact

- GitHub: [@XujunNoahWang](https://github.com/XujunNoahWang)
- Project Link: [https://github.com/XujunNoahWang/quote-card](https://github.com/XujunNoahWang/quote-card)

---

# 简体中文

一个美观的苹果风格语录卡片应用，具备完整的管理功能。使用纯HTML、CSS和JavaScript构建，无需任何框架依赖。

[English](#quote-card) | 简体中文

## ✨ 特色功能

### 🎨 精美设计
- **苹果风格界面** - 简约优雅的美学设计
- **流畅动画** - 精心制作的过渡效果
- **响应式设计** - 完美适配各种设备
- **日夜主题** - 优雅的主题切换动画
- **国际化支持** - 完整的中英文双语界面

### 🎯 核心功能
- **滑动导航** - 流畅的手势滑动浏览语录
- **键盘支持** - 使用方向键进行导航
- **触摸友好** - 针对移动端优化的触摸交互
- **无限循环** - 无缝浏览您的语录收藏

### 📝 语录管理
- **添加新语录** - 轻松添加语录，作者为可选项
- **编辑现有语录** - 原地编辑，即时预览
- **删除语录** - 确认对话框防止误删
- **搜索功能** - 按内容或作者搜索语录
- **导入导出** - 支持JSON格式的语录备份和恢复
- **持久存储** - 所有语录保存在浏览器本地

### 🎪 交互特性
- **侧边面板** - 滑出式管理面板，动画流畅
- **实时搜索** - 输入时即时过滤语录
- **拖拽交互** - 滑动手势的实时视觉反馈
- **语言切换** - 中英文界面无缝切换
- **成功反馈** - 所有操作都有清晰的视觉确认

## 🆕 v0.2 新功能

### 🌐 国际化支持
- **双语界面** - 完整的中英文界面支持
- **语言切换** - 优雅的滑动切换设计，与主题切换保持一致
- **动态文本更新** - 切换语言时所有UI元素即时更新
- **语言偏好记忆** - 自动保存您的语言选择

### 📁 导入导出功能
- **导出为JSON** - 下载带时间戳的语录备份文件
- **从JSON导入** - 从备份文件恢复语录数据
- **数据验证** - 智能验证确保只导入有效语录
- **安全保护** - 确认对话框防止意外数据丢失
- **成功通知** - 精美的弹窗通知所有操作结果

## 🚀 在线演示

访问在线演示：[Quote Card Demo](https://xujunnoahwang.github.io/quote-card/)

## 📦 安装方法

### 方式1：克隆仓库
```bash
git clone https://github.com/XujunNoahWang/quote-card.git
cd quote-card
```

### 方式2：下载ZIP
从[发布页面](https://github.com/XujunNoahWang/quote-card/releases)下载ZIP文件并解压。

### 方式3：作为模板使用
点击"Use this template"按钮基于此项目创建您自己的仓库。

## 🎯 使用指南

### 基础设置
1. 在任何现代浏览器中打开 `index.html`
2. 通过滑动或方向键浏览默认语录
3. 点击汉堡包菜单（☰）打开管理面板

### 添加语录
1. 打开管理面板
2. 在文本框中输入您的语录
3. 可选择添加作者（为空时默认为"佚名"）
4. 点击"添加语录"按钮
5. 新语录将出现在收藏的最前面

### 管理语录
- **搜索**：使用搜索栏查找特定语录
- **编辑**：点击"修改"按钮编辑任何语录
- **删除**：点击"删除"按钮移除语录（有确认提示）

### 主题切换
- 点击右上角的主题切换按钮（☀️/🌙）
- 主题偏好会自动保存

## 🛠️ 开发指南

### 本地开发
1. 克隆仓库
2. 启动本地服务器（可选但建议）：
   ```bash
   # 使用 Python 3
   python -m http.server 8000
   
   # 使用 Node.js
   npx http-server
   
   # 使用 PHP
   php -S localhost:8000
   ```
3. 在浏览器中打开 `http://localhost:8000`

### 文件结构
```
quote-card/
├── index.html          # 主HTML文件
├── styles.css          # CSS样式，支持主题
├── script.js           # JavaScript功能代码
├── README.md           # 文档（中英文）
└── LICENSE             # MIT许可证
```

### 核心技术
- **HTML5** - 现代语义化标记
- **CSS3** - 高级样式，使用CSS变量和动画
- **原生JavaScript** - 纯JavaScript，使用ES6+特性
- **LocalStorage API** - 客户端数据持久化
- **Touch Events API** - 移动端触摸交互支持

## 🎨 设计理念

本项目遵循苹果的设计原则：

- **简约性**：专注于核心功能，避免冗余
- **清晰性**：清晰的视觉层次和直观的交互
- **一致性**：整个应用统一的设计语言
- **无障碍性**：支持键盘导航和屏幕阅读器
- **性能**：轻量快速，无外部依赖

## 📱 浏览器支持

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ iOS Safari 12+
- ✅ Chrome for Android 60+

## 🤝 贡献指南

欢迎贡献！请随时提交Pull Request。对于重大更改，请先开issue讨论您想要改变的内容。

### 开发规范
1. 遵循现有的代码风格
2. 编写清晰、描述性的提交信息
3. 在多个浏览器上测试您的更改
4. 根据需要更新文档

## 📄 许可证

本项目采用MIT许可证 - 查看[LICENSE](LICENSE)文件了解详情。

## 🙏 致谢

- 设计灵感来自苹果的设计哲学
- 图标：使用Emoji字符以确保通用兼容性
- 字体：系统字体，优化性能和一致性

## 📞 联系方式

- GitHub: [@XujunNoahWang](https://github.com/XujunNoahWang)
- 项目链接: [https://github.com/XujunNoahWang/quote-card](https://github.com/XujunNoahWang/quote-card)

---

Made with ❤️ by [XujunNoahWang](https://github.com/XujunNoahWang) 
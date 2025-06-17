# Quote Card 语录卡片

![Quote Card](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

一个美观的苹果风格语录卡片应用，具备完整的管理功能。使用纯HTML、CSS和JavaScript构建，无需任何框架依赖。

[English](README.md) | 简体中文

## ✨ 特色功能

### 🎨 精美设计
- **苹果风格界面** - 简约优雅的美学设计
- **流畅动画** - 精心制作的过渡效果
- **响应式设计** - 完美适配各种设备
- **日夜主题** - 优雅的主题切换动画

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
- **持久存储** - 所有语录保存在浏览器本地

### 🎪 交互特性
- **侧边面板** - 滑出式管理面板，动画流畅
- **实时搜索** - 输入时即时过滤语录
- **拖拽交互** - 滑动手势的实时视觉反馈
- **成功反馈** - 所有操作都有清晰的视觉确认

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
├── README.md           # 英文文档
├── README-zh.md        # 中文文档
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

由 [XujunNoahWang](https://github.com/XujunNoahWang) 用 ❤️ 制作 
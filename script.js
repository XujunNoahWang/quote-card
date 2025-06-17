/**
 * Quote Card Application
 * A beautiful, Apple-inspired quote card application with internationalization and advanced management features
 * @author Xujun (Noah) Wang
 * @version 0.2.0
 */

/**
 * Language packs for internationalization
 */
const LANGUAGE_PACKS = {
    zh: {
        app: {
            title: 'Quote Card'
        },
        manage: {
            title: '管理语录',
            quotePlaceholder: '输入新语录...',
            authorPlaceholder: '作者（可选）',
            addButton: '添加语录',
            addSuccess: '已添加 ✓',
            searchPlaceholder: '搜索语录...',
            editButton: '修改',
            deleteButton: '删除',
            saveButton: '保存',
            cancelButton: '取消',
            noResults: '没有找到匹配的语录',
            confirmDelete: '确定要删除这条语录吗？',
            emptyQuote: '请输入语录内容',
            emptyFields: '语录内容和作者都不能为空',
            exportButton: '导出语录',
            importButton: '导入语录',
            exportSuccess: '语录已导出！',
            exportError: '导出失败',
            importSuccess: '成功导入 {count} 条语录！',
            importError: '导入失败：文件格式错误',
            importEmpty: '导入失败：文件为空或格式错误',
            importConfirm: '导入将替换所有现有语录，确定继续吗？'
        }
    },
    en: {
        app: {
            title: 'Quote Card'
        },
        manage: {
            title: 'Manage Quotes',
            quotePlaceholder: 'Enter new quote...',
            authorPlaceholder: 'Author (optional)',
            addButton: 'Add Quote',
            addSuccess: 'Added ✓',
            searchPlaceholder: 'Search quotes...',
            editButton: 'Edit',
            deleteButton: 'Delete',
            saveButton: 'Save',
            cancelButton: 'Cancel',
            noResults: 'No matching quotes found',
            confirmDelete: 'Are you sure you want to delete this quote?',
            emptyQuote: 'Please enter quote content',
            emptyFields: 'Quote content and author cannot be empty',
            exportButton: 'Export Quotes',
            importButton: 'Import Quotes',
            exportSuccess: 'Quotes exported successfully!',
            exportError: 'Export failed',
            importSuccess: 'Successfully imported {count} quotes!',
            importError: 'Import failed: Invalid file format',
            importEmpty: 'Import failed: File is empty or invalid format',
            importConfirm: 'Import will replace all existing quotes. Continue?'
        }
    }
};

/**
 * Main QuoteCard class that handles all application functionality
 */
class QuoteCard {
    /**
     * Initialize the QuoteCard application
     */
    constructor() {
        // State management
        this.currentIndex = 0;
        this.isAnimating = false;
        this.isDragging = false;
        
        // Touch/mouse interaction
        this.touchStartX = 0;
        this.touchEndX = 0;
        this.minSwipeDistance = 50;
        
        // Data storage
        this.quotes = [];
        this.filteredQuotes = [];
        
        // Language management
        this.currentLanguage = 'zh';
        
        this.init();
    }

    /**
     * Initialize the application
     */
    init() {
        this.loadQuotes();
        this.loadLanguage();
        this.setupEventListeners();
        this.loadTheme();
        this.renderCards();
        this.updateCards();
        this.updateAllTexts();
    }

    /**
     * Set up all event listeners for the application
     */
    setupEventListeners() {
        // Language toggle
        const languageToggle = document.getElementById('languageToggle');
        if (languageToggle) {
            languageToggle.addEventListener('click', () => this.toggleLanguage());
        }

        // Theme toggle
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        // Hamburger menu - open sidebar
        const hamburgerMenu = document.getElementById('hamburgerMenu');
        if (hamburgerMenu) {
            hamburgerMenu.addEventListener('click', () => this.openSidebar());
        }

        // Sidebar events
        const closeSidebar = document.getElementById('closeSidebar');
        const sidebarOverlay = document.getElementById('sidebarOverlay');
        
        if (closeSidebar) {
            closeSidebar.addEventListener('click', () => this.closeSidebar());
        }
        if (sidebarOverlay) {
            sidebarOverlay.addEventListener('click', () => this.closeSidebar());
        }

        // Add quote functionality
        const addQuoteBtn = document.getElementById('addQuoteBtn');
        if (addQuoteBtn) {
            addQuoteBtn.addEventListener('click', () => this.addQuote());
        }

        // Search functionality
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.searchQuotes(e.target.value));
        }

        // Import/Export functionality
        const exportBtn = document.getElementById('exportBtn');
        const importBtn = document.getElementById('importBtn');
        const importFile = document.getElementById('importFile');
        
        if (exportBtn) {
            exportBtn.addEventListener('click', () => this.exportQuotes());
        }
        
        if (importBtn) {
            importBtn.addEventListener('click', () => this.triggerImport());
        }
        
        if (importFile) {
            importFile.addEventListener('change', (e) => this.importQuotes(e));
        }

        // Card container events
        const container = document.getElementById('cardsContainer');
        if (container) {
            this.setupCardInteraction(container);
        }

        // Keyboard events
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
    }

    /**
     * Set up card interaction events
     * @param {HTMLElement} container - The cards container element
     */
    setupCardInteraction(container) {
        // Touch events
        container.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: true });
        container.addEventListener('touchmove', (e) => this.handleTouchMove(e), { passive: false });
        container.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: true });

        // Mouse events (desktop)
        container.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        container.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        container.addEventListener('mouseup', (e) => this.handleMouseUp(e));
        container.addEventListener('mouseleave', (e) => this.handleMouseUp(e));

        // Prevent context menu
        container.addEventListener('contextmenu', (e) => e.preventDefault());
    }

    // === LANGUAGE MANAGEMENT ===

    /**
     * Toggle between Chinese and English languages
     */
    toggleLanguage() {
        this.currentLanguage = this.currentLanguage === 'zh' ? 'en' : 'zh';
        localStorage.setItem('language', this.currentLanguage);
        document.documentElement.setAttribute('data-language', this.currentLanguage);
        this.updateAllTexts();
    }

    /**
     * Load saved language from localStorage
     */
    loadLanguage() {
        this.currentLanguage = localStorage.getItem('language') || 'zh';
        document.documentElement.setAttribute('data-language', this.currentLanguage);
    }



    /**
     * Get translated text for a key
     * @param {string} key - Translation key in dot notation (e.g., 'manage.title')
     * @returns {string} Translated text
     */
    t(key) {
        const keys = key.split('.');
        let value = LANGUAGE_PACKS[this.currentLanguage];
        
        for (const k of keys) {
            value = value?.[k];
        }
        
        return value || key;
    }

    /**
     * Update all text elements on the page
     */
    updateAllTexts() {
        // Update elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            element.textContent = this.t(key);
        });

        // Update placeholder texts
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            element.placeholder = this.t(key);
        });

        // Re-render quotes list to update button texts
        if (document.getElementById('sidebar').classList.contains('active')) {
            this.renderQuotesList();
        }
    }

    // === THEME MANAGEMENT ===

    /**
     * Toggle between light and dark themes
     */
    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    }

    /**
     * Load saved theme from localStorage
     */
    loadTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
    }

    // === DATA MANAGEMENT ===

    /**
     * Load quotes from localStorage or set default quotes
     */
    loadQuotes() {
        const savedQuotes = localStorage.getItem('quotes');
        if (savedQuotes) {
            try {
                this.quotes = JSON.parse(savedQuotes);
            } catch (error) {
                console.error('Error parsing saved quotes:', error);
                this.quotes = this.getDefaultQuotes();
            }
        } else {
            this.quotes = this.getDefaultQuotes();
            this.saveQuotes();
        }
        this.filteredQuotes = [...this.quotes];
    }

    /**
     * Get default quotes for the application
     * @returns {Array} Array of default quote objects
     */
    getDefaultQuotes() {
        return [
            { id: 1, text: "Stay hungry, stay foolish.", author: "Steve Jobs" },
            { id: 2, text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
            { id: 3, text: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci" }
        ];
    }

    /**
     * Save quotes to localStorage
     */
    saveQuotes() {
        try {
            localStorage.setItem('quotes', JSON.stringify(this.quotes));
        } catch (error) {
            console.error('Error saving quotes:', error);
        }
    }

    // === SIDEBAR MANAGEMENT ===

    /**
     * Open the sidebar panel
     */
    openSidebar() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebarOverlay');
        
        if (sidebar && overlay) {
            sidebar.classList.add('active');
            overlay.classList.add('active');
            this.renderQuotesList();
        }
    }

    /**
     * Close the sidebar panel
     */
    closeSidebar() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebarOverlay');
        
        if (sidebar && overlay) {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        }
    }

    // === TOUCH/MOUSE INTERACTION ===

    /**
     * Handle touch start event
     * @param {TouchEvent} e - Touch event
     */
    handleTouchStart(e) {
        if (this.isAnimating) return;
        this.touchStartX = e.touches[0].clientX;
        this.isDragging = true;
    }

    /**
     * Handle touch move event
     * @param {TouchEvent} e - Touch event
     */
    handleTouchMove(e) {
        if (!this.isDragging || this.isAnimating) return;
        e.preventDefault();
        
        const currentX = e.touches[0].clientX;
        const deltaX = currentX - this.touchStartX;
        
        this.updateCardPositions(deltaX);
    }

    /**
     * Handle touch end event
     * @param {TouchEvent} e - Touch event
     */
    handleTouchEnd(e) {
        if (!this.isDragging || this.isAnimating) return;
        
        this.touchEndX = e.changedTouches[0].clientX;
        this.isDragging = false;
        
        const deltaX = this.touchEndX - this.touchStartX;
        
        if (Math.abs(deltaX) > this.minSwipeDistance) {
            if (deltaX > 0) {
                this.prevCard();
            } else {
                this.nextCard();
            }
        } else {
            this.resetCardStyles();
            this.updateCards();
        }
    }

    /**
     * Handle mouse down event (desktop)
     * @param {MouseEvent} e - Mouse event
     */
    handleMouseDown(e) {
        if (this.isAnimating) return;
        this.touchStartX = e.clientX;
        this.isDragging = true;
        e.preventDefault();
    }

    /**
     * Handle mouse move event (desktop)
     * @param {MouseEvent} e - Mouse event
     */
    handleMouseMove(e) {
        if (!this.isDragging || this.isAnimating) return;
        
        const currentX = e.clientX;
        const deltaX = currentX - this.touchStartX;
        
        this.updateCardPositions(deltaX);
    }

    /**
     * Handle mouse up event (desktop)
     * @param {MouseEvent} e - Mouse event
     */
    handleMouseUp(e) {
        if (!this.isDragging || this.isAnimating) return;
        
        this.touchEndX = e.clientX;
        this.isDragging = false;
        
        const deltaX = this.touchEndX - this.touchStartX;
        
        if (Math.abs(deltaX) > this.minSwipeDistance) {
            if (deltaX > 0) {
                this.prevCard();
            } else {
                this.nextCard();
            }
        } else {
            this.resetCardStyles();
            this.updateCards();
        }
    }

    /**
     * Handle keyboard events
     * @param {KeyboardEvent} e - Keyboard event
     */
    handleKeyDown(e) {
        if (this.isAnimating) return;
        
        switch(e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                this.prevCard();
                break;
            case 'ArrowRight':
                e.preventDefault();
                this.nextCard();
                break;
        }
    }

    // === CARD ANIMATION ===

    /**
     * Update card positions during drag
     * @param {number} deltaX - The horizontal distance moved
     */
    updateCardPositions(deltaX) {
        const cards = document.querySelectorAll('.card');
        const container = document.getElementById('cardsContainer');
        
        if (!container) return;
        
        const containerWidth = container.offsetWidth;
        const maxDelta = containerWidth * 0.3;
        const clampedDelta = Math.max(-maxDelta, Math.min(maxDelta, deltaX));
        
        cards.forEach((card) => {
            const cardIndex = parseInt(card.dataset.index);
            
            if (cardIndex === this.currentIndex) {
                const translateX = clampedDelta;
                const opacity = 1 - Math.abs(clampedDelta) / containerWidth * 0.5;
                
                card.style.transform = `translateX(${translateX}px) scale(1)`;
                card.style.opacity = Math.max(0.5, opacity);
                card.style.visibility = 'visible';
            } else {
                card.style.opacity = '0';
                card.style.visibility = 'hidden';
                card.style.transform = 'translateX(0) scale(1)';
            }
        });
    }

    /**
     * Navigate to the next card
     */
    nextCard() {
        if (this.isAnimating || this.quotes.length === 0) return;
        
        this.isAnimating = true;
        this.currentIndex = (this.currentIndex + 1) % this.quotes.length;
        
        setTimeout(() => {
            this.updateCards();
            this.isAnimating = false;
        }, 50);
    }

    /**
     * Navigate to the previous card
     */
    prevCard() {
        if (this.isAnimating || this.quotes.length === 0) return;
        
        this.isAnimating = true;
        this.currentIndex = (this.currentIndex - 1 + this.quotes.length) % this.quotes.length;
        
        setTimeout(() => {
            this.updateCards();
            this.isAnimating = false;
        }, 50);
    }

    /**
     * Reset all card inline styles
     */
    resetCardStyles() {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.style.transform = '';
            card.style.opacity = '';
            card.style.visibility = '';
        });
    }

    /**
     * Update card states and classes
     */
    updateCards() {
        const cards = document.querySelectorAll('.card');
        
        cards.forEach((card) => {
            const cardIndex = parseInt(card.dataset.index);
            
            // Clear all state classes
            card.classList.remove('active', 'prev', 'next');
            
            // Reset inline styles
            card.style.transform = '';
            card.style.opacity = '';
            card.style.visibility = '';
            
            // Set appropriate classes
            if (cardIndex === this.currentIndex) {
                card.classList.add('active');
            } else if (cardIndex === this.getPrevIndex()) {
                card.classList.add('prev');
            } else if (cardIndex === this.getNextIndex()) {
                card.classList.add('next');
            }
        });
    }

    /**
     * Get the previous card index
     * @returns {number} Previous card index
     */
    getPrevIndex() {
        return (this.currentIndex - 1 + this.quotes.length) % this.quotes.length;
    }

    /**
     * Get the next card index
     * @returns {number} Next card index
     */
    getNextIndex() {
        return (this.currentIndex + 1) % this.quotes.length;
    }

    // === CARD RENDERING ===

    /**
     * Render all quote cards in the DOM
     */
    renderCards() {
        const container = document.getElementById('cardsContainer');
        if (!container) return;
        
        container.innerHTML = '';
        
        this.quotes.forEach((quote, index) => {
            const card = this.createCardElement(quote, index);
            container.appendChild(card);
        });
        
        // Reset index if out of bounds
        if (this.currentIndex >= this.quotes.length) {
            this.currentIndex = 0;
        }
    }

    /**
     * Create a card DOM element
     * @param {Object} quote - Quote object with text and author
     * @param {number} index - Card index
     * @returns {HTMLElement} Card element
     */
    createCardElement(quote, index) {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.index = index;
        card.innerHTML = `
            <div class="card-content">
                <blockquote class="quote">"${this.escapeHtml(quote.text)}"</blockquote>
                <cite class="author">${this.escapeHtml(quote.author)}</cite>
            </div>
        `;
        return card;
    }

    /**
     * Escape HTML characters to prevent XSS
     * @param {string} text - Text to escape
     * @returns {string} Escaped text
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // === QUOTE MANAGEMENT ===

    /**
     * Add a new quote
     */
    addQuote() {
        const textInput = document.getElementById('newQuoteText');
        const authorInput = document.getElementById('newQuoteAuthor');
        
        if (!textInput) return;
        
        const text = textInput.value.trim();
        const defaultAuthor = this.currentLanguage === 'zh' ? '佚名' : 'Anonymous';
        const author = authorInput ? authorInput.value.trim() || defaultAuthor : defaultAuthor;
        
        if (!text) {
            alert(this.t('manage.emptyQuote'));
            return;
        }
        
        const newQuote = {
            id: Date.now(),
            text: text,
            author: author
        };
        
        // Add to beginning of array
        this.quotes.unshift(newQuote);
        this.saveQuotes();
        
        // Show the new quote immediately
        this.currentIndex = 0;
        
        this.updateFilteredQuotes();
        this.renderCards();
        this.updateCards();
        this.renderQuotesList();
        
        // Clear inputs
        textInput.value = '';
        if (authorInput) authorInput.value = '';
        
        // Show success feedback
        this.showAddSuccess();
    }

    /**
     * Show success feedback for adding a quote
     */
    showAddSuccess() {
        const addBtn = document.getElementById('addQuoteBtn');
        if (!addBtn) return;
        
        const originalText = addBtn.textContent;
        addBtn.textContent = this.t('manage.addSuccess');
        addBtn.disabled = true;
        
        setTimeout(() => {
            addBtn.textContent = this.t('manage.addButton');
            addBtn.disabled = false;
        }, 1500);
    }

    /**
     * Update filtered quotes based on current search
     */
    updateFilteredQuotes() {
        const searchInput = document.getElementById('searchInput');
        const searchTerm = searchInput ? searchInput.value.trim().toLowerCase() : '';
        
        if (!searchTerm) {
            this.filteredQuotes = [...this.quotes];
        } else {
            this.filteredQuotes = this.quotes.filter(quote => 
                quote.text.toLowerCase().includes(searchTerm) || 
                quote.author.toLowerCase().includes(searchTerm)
            );
        }
    }

    /**
     * Search quotes by query
     * @param {string} query - Search query
     */
    searchQuotes(query) {
        const searchTerm = query.trim().toLowerCase();
        
        if (!searchTerm) {
            this.filteredQuotes = [...this.quotes];
        } else {
            this.filteredQuotes = this.quotes.filter(quote => 
                quote.text.toLowerCase().includes(searchTerm) || 
                quote.author.toLowerCase().includes(searchTerm)
            );
        }
        
        this.renderQuotesList();
    }

    /**
     * Render the quotes list in the sidebar
     */
    renderQuotesList() {
        const quotesList = document.getElementById('quotesList');
        if (!quotesList) return;
        
        if (this.filteredQuotes.length === 0) {
            quotesList.innerHTML = `<div style="text-align: center; color: var(--text-secondary); padding: 20px;">${this.t('manage.noResults')}</div>`;
            return;
        }
        
        quotesList.innerHTML = this.filteredQuotes.map(quote => 
            this.createQuoteListItem(quote)
        ).join('');
    }

    /**
     * Create a quote list item HTML
     * @param {Object} quote - Quote object
     * @returns {string} HTML string for quote list item
     */
    createQuoteListItem(quote) {
        return `
            <div class="quote-item" data-id="${quote.id}">
                <div class="quote-item-text">"${this.escapeHtml(quote.text)}"</div>
                <div class="quote-item-author">${this.escapeHtml(quote.author)}</div>
                
                <div class="edit-form">
                    <textarea class="edit-text">${this.escapeHtml(quote.text)}</textarea>
                    <input type="text" class="edit-author" value="${this.escapeHtml(quote.author)}">
                </div>
                
                <div class="quote-item-actions">
                    <button class="action-btn edit-btn" onclick="app.editQuote(${quote.id})">${this.t('manage.editButton')}</button>
                    <button class="action-btn delete" onclick="app.deleteQuote(${quote.id})">${this.t('manage.deleteButton')}</button>
                    <button class="action-btn save-btn" onclick="app.saveQuote(${quote.id})" style="display: none;">${this.t('manage.saveButton')}</button>
                    <button class="action-btn cancel-btn" onclick="app.cancelEdit(${quote.id})" style="display: none;">${this.t('manage.cancelButton')}</button>
                </div>
            </div>
        `;
    }

    /**
     * Enter edit mode for a quote
     * @param {number} id - Quote ID
     */
    editQuote(id) {
        const quoteItem = document.querySelector(`[data-id="${id}"]`);
        if (!quoteItem) return;
        
        quoteItem.classList.add('editing');
        
        const buttons = this.getEditButtons(quoteItem);
        buttons.edit.style.display = 'none';
        buttons.delete.style.display = 'none';
        buttons.save.style.display = 'inline-block';
        buttons.cancel.style.display = 'inline-block';
    }

    /**
     * Save edited quote
     * @param {number} id - Quote ID
     */
    saveQuote(id) {
        const quoteItem = document.querySelector(`[data-id="${id}"]`);
        if (!quoteItem) return;
        
        const editText = quoteItem.querySelector('.edit-text').value.trim();
        const editAuthor = quoteItem.querySelector('.edit-author').value.trim();
        
        if (!editText || !editAuthor) {
            alert(this.t('manage.emptyFields'));
            return;
        }
        
        const quoteIndex = this.quotes.findIndex(q => q.id === id);
        if (quoteIndex !== -1) {
            this.quotes[quoteIndex].text = editText;
            this.quotes[quoteIndex].author = editAuthor;
            
            this.saveQuotes();
            this.updateFilteredQuotes();
            this.renderCards();
            this.updateCards();
            this.renderQuotesList();
        }
    }

    /**
     * Cancel edit mode for a quote
     * @param {number} id - Quote ID
     */
    cancelEdit(id) {
        const quoteItem = document.querySelector(`[data-id="${id}"]`);
        if (!quoteItem) return;
        
        quoteItem.classList.remove('editing');
        
        const buttons = this.getEditButtons(quoteItem);
        buttons.edit.style.display = 'inline-block';
        buttons.delete.style.display = 'inline-block';
        buttons.save.style.display = 'none';
        buttons.cancel.style.display = 'none';
        
        // Reset edit content
        const quote = this.quotes.find(q => q.id === id);
        if (quote) {
            quoteItem.querySelector('.edit-text').value = quote.text;
            quoteItem.querySelector('.edit-author').value = quote.author;
        }
    }

    /**
     * Get edit buttons for a quote item
     * @param {HTMLElement} quoteItem - Quote item element
     * @returns {Object} Object containing button references
     */
    getEditButtons(quoteItem) {
        return {
            edit: quoteItem.querySelector('.edit-btn'),
            delete: quoteItem.querySelector('.delete'),
            save: quoteItem.querySelector('.save-btn'),
            cancel: quoteItem.querySelector('.cancel-btn')
        };
    }

    /**
     * Delete a quote
     * @param {number} id - Quote ID
     */
    deleteQuote(id) {
        if (!confirm(this.t('manage.confirmDelete'))) {
            return;
        }
        
        this.quotes = this.quotes.filter(quote => quote.id !== id);
        this.saveQuotes();
        
        this.updateFilteredQuotes();
        this.renderCards();
        this.updateCards();
        this.renderQuotesList();
        
        // Reset index if needed
        if (this.quotes.length === 0) {
            this.currentIndex = 0;
        } else if (this.currentIndex >= this.quotes.length) {
            this.currentIndex = 0;
        }
    }

    // === IMPORT/EXPORT FUNCTIONALITY ===

    /**
     * Export quotes to JSON file
     */
    exportQuotes() {
        try {
                    const exportData = {
            version: '0.2.0',
            exportDate: new Date().toISOString(),
            appVersion: '0.2.0',
            quotes: this.quotes
        };
            
            const dataStr = JSON.stringify(exportData, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            
            const link = document.createElement('a');
            link.href = URL.createObjectURL(dataBlob);
            link.download = `quotes-${new Date().toISOString().split('T')[0]}.json`;
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Show success message
            this.showTemporaryMessage(this.t('manage.exportSuccess'), 'success');
            
        } catch (error) {
            console.error('Export error:', error);
            alert(this.t('manage.exportError') || 'Export failed');
        }
    }

    /**
     * Trigger file input for import
     */
    triggerImport() {
        const importFile = document.getElementById('importFile');
        if (importFile) {
            importFile.click();
        }
    }

    /**
     * Import quotes from JSON file
     * @param {Event} e - File input change event
     */
    importQuotes(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = JSON.parse(event.target.result);
                
                // Validate data structure
                if (!data.quotes || !Array.isArray(data.quotes)) {
                    throw new Error('Invalid file format');
                }

                // Validate each quote
                const validQuotes = data.quotes.filter(quote => 
                    quote && 
                    typeof quote.text === 'string' && 
                    quote.text.trim() &&
                    typeof quote.author === 'string'
                );

                if (validQuotes.length === 0) {
                    throw new Error('No valid quotes found');
                }

                // Confirm replacement
                if (!confirm(this.t('manage.importConfirm'))) {
                    return;
                }

                // Assign new IDs to avoid conflicts
                validQuotes.forEach((quote, index) => {
                    quote.id = Date.now() + index;
                });

                // Replace quotes
                this.quotes = validQuotes;
                this.currentIndex = 0;
                
                this.saveQuotes();
                this.updateFilteredQuotes();
                this.renderCards();
                this.updateCards();
                this.renderQuotesList();

                // Show success message
                const message = this.t('manage.importSuccess').replace('{count}', validQuotes.length);
                this.showTemporaryMessage(message, 'success');

            } catch (error) {
                console.error('Import error:', error);
                let errorMessage = this.t('manage.importError');
                if (error.message === 'No valid quotes found') {
                    errorMessage = this.t('manage.importEmpty');
                }
                alert(errorMessage);
            }
        };

        reader.readAsText(file);
        
        // Clear the file input
        e.target.value = '';
    }

    /**
     * Show temporary success/error message
     * @param {string} message - Message to show
     * @param {string} type - Message type ('success' or 'error')
     */
    showTemporaryMessage(message, type = 'success') {
        // Create message element
        const messageEl = document.createElement('div');
        messageEl.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : '#ef4444'};
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 500;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        messageEl.textContent = message;
        
        document.body.appendChild(messageEl);
        
        // Animate in
        setTimeout(() => {
            messageEl.style.transform = 'translateX(0)';
        }, 100);
        
        // Animate out and remove
        setTimeout(() => {
            messageEl.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (messageEl.parentNode) {
                    messageEl.parentNode.removeChild(messageEl);
                }
            }, 300);
        }, 3000);
    }
}

// Global app instance
let app;

/**
 * Initialize the application when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', () => {
    app = new QuoteCard();
});

/**
 * Prevent page scroll rubber band effect on mobile
 */
document.addEventListener('touchmove', (e) => {
    if (e.target.closest('.cards-container')) {
        e.preventDefault();
    }
}, { passive: false }); 
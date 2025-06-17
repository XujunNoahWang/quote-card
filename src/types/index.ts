export interface Quote {
  id: string;
  content: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface AppState {
  quotes: Quote[];
  tags: Tag[];
  currentQuoteIndex: number;
  selectedTags: string[];
  isDarkMode: boolean;
  isManageMode: boolean;
  searchQuery: string;
}

export interface SwipeDirection {
  direction: 'left' | 'right' | null;
  distance: number;
} 